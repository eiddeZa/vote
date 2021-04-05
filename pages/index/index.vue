<template>
	<view class="content">
		<u-swiper mode="rect" :list="list" duration="3000" bg-color="#f75360" :effect3d="true"></u-swiper>
		<view class="hot_tit">
			<image src="/static/image/hot.png" mode=""></image>
			<text>热门活动</text>
		</view>
		<view class="content_vote"><u-empty text="暂无数据" mode="list"></u-empty></view>
		
		<u-tabbar :list="tabs" :mid-button="true" active-color="#f47347"></u-tabbar>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: [
				{
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
		this.tabs = this.$store.state.tabbarList;
		console.log(this.$store.state.tabbarList);
		uni.login({
		  provider: 'weixin',
		  success: function (loginRes) {
		    console.log(loginRes.authResult);
		    // 获取用户信息
		    uni.getUserInfo({
		      provider: 'weixin',
		      success: function (infoRes) {
				   console.log(infoRes);
		        console.log('用户昵称为：' + infoRes.userInfo.nickName);
		      }
		    });
		  }
		});
	},
	methods: {}
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
