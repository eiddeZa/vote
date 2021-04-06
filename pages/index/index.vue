<template>
	<view class="content">
		<u-swiper mode="rect" :list="list" duration="3000" bg-color="#f75360" :effect3d="true"></u-swiper>
		<view class="hot_tit">
			<image src="/static/image/hot.png" mode=""></image>
			<text>热门活动</text>
		</view>
		<view class="content_vote"><u-empty text="暂无数据" mode="list"></u-empty></view>

		<button open-type="getUserInfo" @tap="theFourth">点击用户授权</button>

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
								
		/* uni.login({
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
		}); */
	},
	methods: {
				theFourth() {
					uni.authorize({
					    scope: 'scope.userLocation',
					    success(res) {
					       console.log(res);
					    },
						fail(err) {
							console.log(err)
						}
					})
					var that = this;
					uni.getProvider({
						service: 'oauth',
						success:(res)=> {
							console.log(res.provider);
							//支持微信、qq和微博等
							if (~res.provider.indexOf('weixin')) {
								uni.login({
									provider: 'weixin',
									success:(loginRes)=> {
										// loginRes.code;
										let code = loginRes.code;
										// console.log(code)
											// code=1314;
										// 获取用户信息
										uni.getUserInfo({
											provider: 'weixin',
											success:(infoRes)=> {
												console.log('-------获取微信用户所有-----');
												let infoRess = infoRes.userInfo;
												that.userImage=infoRess.avatarUrl;
												that.usertitle_1 = infoRess.nickName
												that.userUrl=false;
												console.log(infoRess)
											}
										});
									}
								});
							}
						}
					});
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
