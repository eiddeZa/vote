<template>
	<view class="mine_box">
		<view class="mine_bgc">
			<view class="mine_info">
				<view class="userInfo_box" @click="handleLogin">
					<u-avatar :src="src" mode="square" size="large" class="userAvatar"></u-avatar>
					<view class="user_info">
						<view class="userName" @click="handleLogin">{{ userName }}</view>
						<u-button class="syncBtn" :ripple="true" size="mini" shape="circle" @click="syncZL">同步微信资料
						</u-button>
					</view>
				</view>
				<!-- <u-gap height="30" bg-color="#fff"></u-gap> -->
				<u-grid :col="3" :border="false">
					<u-grid-item @click="goMineIssue({ status: 1 })">
						<u-icon name="photo" :size="46"></u-icon>
						<view class="grid-text">待开始的活动</view>
					</u-grid-item>
					<u-grid-item @click="goMineIssue({ status: 2 })">
						<u-icon name="clock-fill" :size="46"></u-icon>
						<view class="grid-text">进行中的活动</view>
					</u-grid-item>
					<u-grid-item @click="goMineIssue({ status: 3 })">
						<u-icon name="hourglass" :size="46"></u-icon>
						<view class="grid-text">结束的活动</view>
					</u-grid-item>
				</u-grid>
			</view>
		</view>

		<view class="cellListBox">
			<u-cell-group class="cellList">
				<u-cell-item icon="setting-fill" title="关注公众号"></u-cell-item>
				<u-cell-item icon="integral-fill" title="常见问题"></u-cell-item>
				<u-cell-item icon="server-fill"><button class="service" open-type='contact'
						hover-class="u-cell-hover">联系客服</button></u-cell-item>
			</u-cell-group>
		</view>

		<view class="cellListBox">
			<u-cell-group class="cellList">
				<u-cell-item icon="integral-fill" title="免责声明" @click="Disclaimer"></u-cell-item>
				<u-cell-item icon="setting-fill" title="退出登录" @click="quit"></u-cell-item>
			</u-cell-group>
		</view>

		<u-tabbar :list="tabs" :mid-button="true" active-color="#f47347"></u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabs: '',
				src: '',
				userName: '请登录',
				user: ''
			};
		},
		onLoad() {
			this.tabs = this.$store.state.tabbarList;
			this.user = uni.getStorageSync('userInfo');
			console.log(this.user);
			if (this.user) {
				this.src = this.user.avatarUrl;
				this.userName = this.user.nickName;
			}
		},
		methods: {
			handleLogin() {
				if (uni.getStorageSync('userInfo') == '' || uni.getStorageSync('userInfo') == null) {
					uni.redirectTo({
						url: '../login/login',
						animationType: 'pop-in',
						animationDuration: 200
					});
				}
			},
			goMineIssue(name) {
				if (uni.getStorageSync('userInfo') == '' || uni.getStorageSync('userInfo') == null) {
					uni.showToast({
						title: '请先登录！',
						duration: 2000,
						icon: 'none'
					});
					return false;
				}
				// status 状态 1:创建完成(不是所有投票都是创建后，直接开始的，也可能是以后的时间)2:进行中的投票3:已结束的投票
				uni.navigateTo({
					url: '../mineIssue/mineIssue?Date=' + encodeURIComponent(JSON.stringify(name))
				});
			},
			syncZL() {
				if (this.user != '' && this.user != null) {
					uni.showToast({
						title: '同步成功',
						duration: 2000,
						icon: 'none'
					});
				} else {
					uni.showToast({
						title: '请先登录',
						duration: 2000,
						icon: 'none'
					});
				}
			},
			//免责声明
			Disclaimer() {
				uni.showModal({
					title: '温馨提示',
					content: `我们仅提供发起及参与投票的平台，不对第三方发起人行为承担资任，所有投票奖品均为发起者提供并发放。本平台会在法律范围内尽可能的规范和督促用户遵守相关法律，营造良好的投票平台给用户。`,
					showCancel: false,
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
						}
					}
				});
			},
			//退出登录 
			quit() {
				try {
					uni.clearStorageSync();
					uni.showToast({
						title: '退出成功',
						duration: 2000,
						icon: 'none'
					});
					this.src = '';
					this.userName = '请登录';
					this.user = '';
				} catch (e) {
					// error
					uni.showToast({
						title: 'error',
						duration: 2000,
						icon: 'none'
					});
				}
			}
		}
	};
</script>

<style lang="scss">
	.mine_box {
		height: 100%;
		background: #efeff0;
	}

	.mine_bgc {
		height: 330rpx;
		// background: #f16131;
		background: #DCDCDC;
		padding: 30rpx;
		margin-bottom: 120rpx;

		.mine_info {
			border-radius: 10rpx;
			height: 390rpx;
			background: #ffffff;

			.userInfo_box {
				padding: 30rpx 60rpx;
				overflow: hidden;
			}

			.userAvatar,
			.user_info {
				margin: 20rpx;
				float: left;
			}

			.userName {
				font-size: 50rpx;
			}

			.syncBtn {
				margin-top: 20rpx;
				color: #f16131;
			}
		}
	}

	.badge-icon {
		position: absolute;
		top: 14rpx;
		right: 40rpx;
		width: 30rpx;
		height: 30rpx;
	}

	.grid-text {
		font-size: 28rpx;
		margin-top: 4rpx;
		color: $u-type-info;
	}

	.cellListBox {
		padding: 0 30rpx 30rpx;

		.cellList {
			border-radius: 10rpx !important;
			overflow: hidden;
		}
	}

	.service {
		background: #fff;
		width: 100%;
		height: 100%;
		font-size: 28rpx;
		color: #606266;
		text-align: left;
		padding: 0;

		/deep/ &:after {
			border: none;
		}
	}
</style>
