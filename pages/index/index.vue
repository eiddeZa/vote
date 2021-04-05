<template>
	<view class="content">
		<u-swiper mode="rect" :list="list" duration="3000" bg-color="#f75360" :effect3d="true"></u-swiper>
		<view class="hot_tit">
			<image src="/static/image/hot.png" mode=""></image>
			<text>热门活动</text>
		</view>
		<view class="content_vote">
			<u-empty text="暂无数据" mode="list"></u-empty>
		</view>

		<!-- 这是登录页面 global/login/index -->
		<button class="sys_btn" open-type="getUserInfo" lang="zh_CN" @getuserinfo="appLoginWx">小程序登录授权</button>
	
		<u-tabbar :list="tabs" :mid-button="true" active-color="#f47347"></u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
						image: 'https://cdn.uviewui.com/uview/swiper/1.jpg'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/2.jpg'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/3.jpg'
					}
				],
				tabs: ''
			};
		},
		onLoad() {
			/* wx.authorizeForMiniProgram({
			  scope: 'scope.record',
			  success () {
			    // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
			    wx.startRecord()
			  }
			})
			 */


			// this.appLoginWx();

			this.tabs = this.$store.state.tabbarList;
			console.log(this.$store.state.tabbarList);
			uni.login({
				provider: 'weixin',
				success: function(loginRes) {
					console.log(loginRes.authResult);
					// 获取用户信息
					uni.getUserInfo({
						provider: 'weixin',
						success: function(infoRes) {
							console.log(infoRes);
							console.log('用户昵称为：' + infoRes.userInfo.nickName);
						}
					});
				}
			});
		},
		methods: {
			appLoginWx() {
				// #ifdef MP-WEIXIN
				uni.getProvider({
					service: 'oauth',
					success: function(res) {
						alert(res)
						if (~res.provider.indexOf('weixin')) {
							uni.login({
								provider: 'weixin',
								success: (res2) => {

									uni.getUserInfo({
										provider: 'weixin',
										success: (info) => { //这里请求接口
											console.log(res2);
											console.log(info);

										},
										fail: () => {
											uni.showToast({
												title: "微信登录授权失败",
												icon: "none"
											});
										}
									})

								},
								fail: () => {
									uni.showToast({
										title: "微信登录授权失败",
										icon: "none"
									});
								}
							})

						} else {
							uni.showToast({
								title: '请先安装微信或升级版本',
								icon: "none"
							});
						}
					}
				});
				//#endif
			}
		}
	};
</script>

<style lang="scss">
	.content {
		height: 100%;
		background: #ffffff;
	}

	.hot_tit {
		font-size: 40rpx;
		line-height: 40rpx;
		text-align: center;
		margin: 50rpx 0;

		image {
			width: 40rpx;
			height: 40rpx;
			margin-right: 10rpx;
		}
	}
</style>
