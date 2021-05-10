<template>
	<view>
		<u-swiper mode="rect" :list="slideShowlist" duration="3000" :effect3d="true"></u-swiper>
		
		<view class="hot_tit">
			<image src="../../static/image/top.png" mode=""></image>
			<text>排行榜</text>
		</view>

		<view class="hdOption" v-for="(item, index) in data.voteItemlist" :key="index">
			<view class="hdOptionBtn">
				<image v-if="index==0" src="../../static/image/first.png" mode=""></image>
				<image v-if="index==1" src="../../static/image/second.png" mode=""></image>
				<image v-if="index==2" src="../../static/image/third.png" mode=""></image>
				<text class="num" v-if="index>2">{{index}}</text>
				<text>{{ item.content }}</text>
				<u-count-to :start-val="0" font-size="40" :end-val="item.vote+''" class="voteNum"></u-count-to>
				<!-- <u-icon name="checkbox-mark" color="#2979ff" size="28"></u-icon> -->
			</view>
		</view>
		<u-loadmore :status="status" :load-text="loadText" />
		<view class="zwf_"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				slideShowlist: [{
						image: require("../../static/image/imgList1.jpg"),
					},
					{
						image: require("../../static/image/imgList2.jpg"),
					},
					{
						image: require("../../static/image/imgList3.jpg"),
					},
				],
				banner: '',
				data: [],
				status: 'nomore',
				loadText: {
					nomore: '没有更多了'
				}
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
			console.log(this.banner);
			uni.setNavigationBarTitle({
				title: this.banner.title
			});
			this.getlist();
		},
		methods: {
			getlist() {
				uni.showLoading({
					title: '加载中...',
					mask: true
				});
				let that = this;
				uniCloud.callFunction({
					name: 'getDetail',
					data: {
						_id: that.banner._id,
						type: that.banner.type
					},
					success(res) {
						uni.hideLoading();
						if (res.result.data) {
							that.data = res.result.data[0];
							that.data.voteItemlist = that.data.voteItemlist.sort((a, b) => {
								return b.vote - a.vote
							})
						} else {
							that.$operate.toast({
								title: res.result.msg
							});
						}
					},
					fail(error) {
						uni.hideLoading();
						that.$operate.toast({
							title: '网络请求错误！'
						});
					}
				});

			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #ffffff;
	}

	.hot_tit {
		font-size: 40rpx;
		line-height: 40rpx;
		margin: 50rpx 0;
		display: flex;
		justify-content: center;
		image {
			width: 45rpx;
			height: 45rpx;
			margin-right: 10rpx;
		}
	}


	.hdOption {
		margin-bottom: 40rpx;
		display: flex;
		padding: 0 30rpx;
		.hdOptionBtn {
			border: 1px solid #dcdcdc;
			padding: 28rpx;
			width: 100%;
			border-radius: 10rpx;
			font-size: 32rpx;
			image {
				width: 32rpx;
				height: 32rpx;
				margin-right: 15rpx;
				margin-top: 6rpx;
			}

			.num {
				display: inline-block;
				text-align: center;
				color:#f16131 ;
				width: 45rpx;
				height: 45rpx;
				margin-right: 15rpx;
			}
		}

		.voteNum {
			margin-left: 20rpx;
			float: right;
		}
	}
	.zwf_ {
		height: 140rpx;
	}
</style>
