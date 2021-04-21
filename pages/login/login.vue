<template>
	<view class="container">
		<view class="wechatapp">
			<view class="header"><open-data class="avatar" type="userAvatarUrl"></open-data></view>
		</view>
		<view class="auth-title">申请获取以下权限</view>
		<view class="auth-subtitle">获得你的公开信息（昵称、头像等）</view>
		<view class="login-btn">
			<!-- 获取微信用户信息（旧版已弃用） -->
			<!-- <button class="button btn-normal" open-type="getUserInfo" lang="zh_CN" @getuserinfo="getUserInfo">授权登录</button> -->
			<!-- 获取微信用户信息（新版） -->
			<button class="button btn-normal" @click.stop="getUserProfile">授权登录</button>
		</view>
		<view class="no-login-btn"><button class="button btn-normal" @click="handleCancel">暂不登录</button></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 微信小程序登录凭证 (code)
			// 提交到后端，用于换取openid
			code: ''
		};
	},

	created() {
		// 获取code
		// this.getCode()
	},

	methods: {
		// 获取code
		// https://developers.weixin.qq.com/miniprogram/dev/api/open-api/login/wx.login.html
		async getCode(userInfo) {
			uni.showLoading({
					title: '登录中'
				});
			const app = this;
			uni.login({
				provider: 'weixin',
				success(login) {
					console.log(login);
					uni.getUserInfo({
						provider: 'weixin',
						lang: 'zh_CN',
						success(res) {
							console.log(res);
							let data = {
								code: login.code,
								signature: res.signature,
								encrypted_data: res.encryptedData,
								iv: res.iv,
								userInfo: userInfo
							};
							console.log(data);
							// 登录请求
							uniCloud
								.callFunction({
									name: 'wx_login',
									data: data
								})
								.then(res => {
									console.log('微信授权成功', res);
									uni.hideLoading();
									// 显示登录成功
									uni.showToast({
										title: res.result.msg,
										duration: 2000,
										icon: 'none'
									});
									if (res.result.status == 1) {
										// 跳转回原页面
										setTimeout(() => {
											// app.onNavigateBack();
											uni.switchTab({
											    url: '/pages/index/index'
											});
										}, 500);
										uni.setStorageSync('token', res.result.token);
										uni.setStorageSync('userInfo', res.result.userInfo);
									}
								});
						}
					});
				},
				fail(err) {
					uni.hideLoading();
					console.log(err);
					uni.showToast({
						title: "登录失败",
						duration: 2000,
						icon: 'none'
					});
				}
			});
		},

		// 获取微信用户信息(新版)
		getUserProfile() {
			const app = this;
			wx.canIUse('getUserProfile') &&
				wx.getUserProfile({
					lang: 'zh_CN',
					desc: '获取用户相关信息',
					success({ userInfo }) {
						console.log('用户同意了授权');
						console.log('userInfo：', userInfo);
						app.getCode(userInfo);
						// 授权成功事件
						// app.onAuthSuccess(userInfo);
					},
					fail() {
						console.log('用户拒绝了授权');
						uni.showToast({
							title: "登录失败",
							duration: 2000,
							icon: 'none'
						});
					}
				});
		},

		// 授权成功事件
		// 这里分为两个逻辑:
		// 1.将code和userInfo提交到后端，如果存在该用户 则实现自动登录，无需再填写手机号
		// 2.如果不存在该用户, 则显示注册页面, 需填写手机号
		async onAuthSuccess(userInfo) {
			const app = this;
			// 提交到后端
			/* store
				.dispatch('MpWxLogin', { code: await app.getCode(), userInfo })
				.then(result => {
					// 显示登录成功
					app.$toast(result.message);
					// 跳转回原页面
					setTimeout(() => {
						app.onNavigateBack();
					}, 2000);
				})
				.catch(() => {
					// 将oauth提交给父级
					app.onEmitSuccess(userInfo);
				}); */
		},
		// 将oauth提交给父级
		// 这里要重新获取code, 因为上一次获取的code不能复用(会报错)
		async onEmitSuccess(userInfo) {
			const app = this;
			app.$emit('success', {
				oauth: 'MP-WEIXIN', // 第三方登录类型: MP-WEIXIN
				code: await app.getCode(), // 微信登录的code, 用于换取openid
				userInfo // 微信用户信息
			});
		},

		// /**
		//  * 授权登录（旧版弃用）
		//  */
		// getUserInfo(e) {
		//   const app = this
		//   if (e.detail.errMsg === 'getUserInfo:ok') {
		//     app.$emit('success', {
		//       oauth: 'MP-WEIXIN', // 第三方登录类型: MP-WEIXIN
		//       code: app.code, // 微信登录的code, 用于换取openid
		//       userInfo: JSON.parse(e.detail.rawData) // 微信用户信息
		//     })
		//   }
		// },

		/**
		 * 暂不登录
		 */
		handleCancel() {
			// 跳转回原页面
			this.onNavigateBack();
		},

		/**
		 * 授权成功 跳转回原页面
		 */
		onNavigateBack(delta = 1) {
			uni.navigateBack({
				delta: Number(delta)
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.container {
	padding: 0 60rpx;
	font-size: 32rpx;
	background: #fff;
	min-height: 100vh;
}

.wechatapp {
	padding: 80rpx 0 48rpx;
	border-bottom: 1rpx solid #e3e3e3;
	margin-bottom: 72rpx;
	text-align: center;

	.header {
		width: 190rpx;
		height: 190rpx;
		border: 4rpx solid #fff;
		margin: 0 auto 0;
		border-radius: 50%;
		overflow: hidden;
		box-shadow: 2rpx 0 10rpx rgba(50, 50, 50, 0.3);
	}
}

.auth-title {
	color: #585858;
	font-size: 34rpx;
	margin-bottom: 40rpx;
}

.auth-subtitle {
	color: #888;
	margin-bottom: 88rpx;
	font-size: 28rpx;
}

.login-btn {
	padding: 0 20rpx;
	.button {
		height: 88rpx;
		line-height: 88rpx;
		background: #04be01;
		color: #fff;
		font-size: 30rpx;
		border-radius: 999rpx;
		text-align: center;
	}
	.button::after {
		border: none; //黑色边框去掉了
	}
}

.no-login-btn {
	margin-top: 20rpx;
	padding: 0 20rpx;
	.button {
		height: 88rpx;
		line-height: 88rpx;
		background: #dfdfdf;
		color: #fff;
		font-size: 30rpx;
		border-radius: 999rpx;
		text-align: center;
	}
	.button::after {
		border: none; //黑色边框去掉了
	}
}
</style>
