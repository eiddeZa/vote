<template>
	<view>
		<view class="initiatorInfo">
			
		</view>
		<view class="tit">
			投票标题
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onLoad(event) {
			// TODO 后面把参数名替换成 payload
			const payload = event.detailDate || event.payload;
			// 目前在某些平台参数会被主动 decode，暂时这样处理。
			try {
				this.banner = JSON.parse(decodeURIComponent(payload));
			} catch (error) {
				this.banner = JSON.parse(payload);
			}
			console.log(this.banner)
			uni.setNavigationBarTitle({
				title: this.banner.title
			});
			this.getDetail();
		},
		methods: {
			getDetail() {
				uni.showLoading({
					title: '加载中...',
					mask: true
				})
				let that = this;
				uniCloud.callFunction({
					name: "getDetail",
					data: {
						type: "ImageTextVote",
						_id: that.banner._id
					},
					success(res) {
						uni.hideLoading();
						console.log(res);
						if (res.result.data) {

						}
					},
					fail(error) {
						uni.hideLoading();
						that.$operate.toast({
							title: "网络请求错误！"
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
.initiatorInfo{
	
}
</style>
