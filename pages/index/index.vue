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
			this.tabs = this.$store.state.tabbarList;
			console.log(this.$store.state.tabbarList);

			let arr = [{
					name: "李1",
					FullPrice: 1
				},
				{
					name: "李2",
					FullPrice: 1
				},
				{
					name: "李3",
					FullPrice: 2
				},
				{
					name: "李4",
					FullPrice: 2
				},
				{
					name: "李5",
					FullPrice: 6
				},
			];

			const fn = (list) => {
				const result = [];
				const map = new Map();
				list.forEach((item) => {
					map.set(item.FullPrice, item);
				})
				map.forEach((value, key) => result.push(value));
				return result;
			};
			console.log(fn(arr));
			uniCloud.callFunction({
				name: "get_votelist",
				data: {
					openid: "123",
					paging: {
						page: 1,
						limit: 5
					}
				},
				success(res) {
					console.log(res);
					/* uni.hideLoading();
					if (res.result.code == 200) {
						uni.showToast({
							title: res.result.msg,
							duration: 2000
						});
					} else {
						this.$refs.uToast.show({
							title: res.result.msg,
							type: 'error',
							position: 'top'
						});
					} */
				},
				fail(error) {
					console.log(err);
					/* uni.hideLoading();
					*/
				}
			})

		},
		methods: {

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
