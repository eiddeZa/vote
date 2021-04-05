<template>
	<view class="mine_box">
		<view class="mine_bgc">
			<view class="mine_info">
				<view class="userInfo_box">
					<u-avatar :src="src" mode="square" size="large" class="userAvatar"></u-avatar>
					<view class="user_info">
						<view class="userName">we can</view>
						<u-button class="syncBtn" :ripple="true" size="mini" shape="circle">同步微信资料</u-button>
					</view>
				</view>
				<!-- <u-gap height="30" bg-color="#fff"></u-gap> -->
				<u-grid :col="3" :border="false">
					<u-grid-item>
						<u-badge count="9" :offset="[20, 20]"></u-badge>
						<u-icon name="photo" :size="46"></u-icon>
						<view class="grid-text">参与的活动</view>
					</u-grid-item>
					<u-grid-item>
						<u-icon name="lock" :size="46"></u-icon>
						<view class="grid-text">发起的活动</view>
					</u-grid-item>
					<u-grid-item>
						<u-icon name="hourglass" :size="46"></u-icon>
						<view class="grid-text">报名的活动</view>
					</u-grid-item>
				</u-grid>
			</view>
		</view>

		<view class="cellListBox">
			<u-cell-group class="cellList">
				<u-cell-item icon="setting-fill" title="我的足迹"></u-cell-item>
				<u-cell-item icon="integral-fill" title="常见问题" value="新版本"></u-cell-item>
				<u-cell-item icon="server-fill" title="联系客服"></u-cell-item>
			</u-cell-group>
		</view>

		<view class="cellListBox">
			<u-cell-group class="cellList">
				<u-cell-item icon="setting-fill" title="关注公众号"></u-cell-item>
				<u-cell-item icon="integral-fill" title="免责声明"></u-cell-item>
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
			src: 'https://img0.baidu.com/it/u=2291332875,175289127&fm=26&fmt=auto&gp=0.jpg'
		};
	},
	onLoad() {
		this.tabs = this.$store.state.tabbarList;
	},
	methods: {}
};
</script>

<style lang="scss">
.mine_box {
	height: 100%;
	background: #efeff0;
}
.mine_bgc {
	height: 330rpx;
	background: #f75360;
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
		.userAvatar {
			margin: 20rpx;
		}
		.userAvatar,
		.user_info {
			float: left;
		}
		.userName {
			font-size: 50rpx;
		}
		.syncBtn {
			margin-top: 20rpx;
			color: #f75360;
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
</style>
