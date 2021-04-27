<template>
	<view>
		<view class="tabs">
			<u-subsection :list="list" :current="current" :animation="true" active-color="#f16131" @change="tabsChange">
			</u-subsection>
		</view>

		<view v-for="(item, index) in activityList" :key="index" class="activityList" @click="goDetail(item)">
			<view class="activityImage" v-if="activeName!='文字投票'">
				<image :src="item.voteItemlist[0].imgList[0]" mode=""></image>
			</view>
			<view class="activityContent">
				<view class="activityTit">
					<u-icon class="iconz" color="#f16131" name="grid-fill" size="28"></u-icon>{{item.activityTitle}}
				</view>
				<view class="activityNum">
					<u-icon class="iconz" color="#f16131" name="heart-fill" size="28"></u-icon>浏览{{item.pageview}}次,已投票 {{item.voteItemlist | total}}
				</view>
				<view class="activityEndTime">
					<u-icon class="iconz" color="#f16131" name="clock-fill" size="28"></u-icon>{{item.endTime}} 结束
				</view>
			</view>
		</view>
		<u-loadmore :status="status" :icon-type="iconType" :load-text="loadText" />
		
		系统主要分为两大块客户端和服务端；
		小程序的客户端的主体框架采用uniAPP+unview进行编写的、
		服务端采用的是 DCloud 联合阿里云、腾讯云，为开发者提供的基于 serverless 模式和 js 编程的云开发平台uniCloud。
		数据库采用可视化的MySQL。
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
						name: '文字投票'
					},
					{
						name: '图文投票'
					},
					{
						name: '视频投票'
					}
				],
				activeName: "文字投票",
				current: 0,
				activityList: [],
				page: 1,
				status: "loadmore",
				iconType: "flower",
				loadText: {
					loadmore: "轻轻上拉",
					loading: "努力加载中",
					nomore: "没有更多了",
				},
				requestName: "get_votelist"
			}
		},
		onLoad(event) {
			// TODO 后面把参数名替换成 payload
			const payload = event.Date || event.payload;
			// 目前在某些平台参数会被主动 decode，暂时这样处理。
			try {
				this.banner = JSON.parse(decodeURIComponent(payload));
			} catch (error) {
				this.banner = JSON.parse(payload);
			}
			this.getList();
		},
		onReachBottom(e) {
			this.status = "loading";
			this.getList();
		},
		filters: {
			total(data) {
				let num=0;
				for(let i=0;i<data.length;i++){
					num=num+data[i].vote;
				}
				return num;
			}
		},
		methods: {
			// tabs通知swiper切换
			tabsChange(index) {
				this.swiperCurrent = index;
				this.activeName = this.list[index].name;
				this.activityList = [];
				this.page=1;
				if (this.activeName == "文字投票") {
					this.requestName = "get_votelist";
				} else if (this.activeName == "图文投票") {
					this.requestName = "get_ImageTextVote";
				} else {
					return false;
				}
				this.getList();
			},
			getList() {
				let that = this;
				uni.showLoading({
					title: '加载中...'
				});
				uniCloud.callFunction({
					name: that.requestName,
					data: {
						openid: "omYkt447GHtxQyuXmQT9IKuNH-ek",
						paging: {
							page: that.page,
							limit: 5,
						},
					},
					success(res) {
						console.log(res);
						uni.hideLoading();
						if (res.result.data) {
							for (let i = 0; i < res.result.data.length; i++) {
								that.activityList.push(res.result.data[i]);
							}
							that.page++;
							that.status = "loadmore";
							if (res.result.data.length < 5) {
								that.status = "nomore";
							}
						}
					},
					fail(error) {
						uni.hideLoading();
						that.$operate.toast({
							title: "网络请求错误！"
						})
					}
				});
			},
			goDetail(item){
				let detail = {
					title: item.activityTitle,
					_id: item._id,
					type:item.voteType
				};
				console.log(detail);
				uni.navigateTo({
					url: "../detail/detail?detailDate=" +
						encodeURIComponent(JSON.stringify(detail)),
				});	
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #FFFFFF;
	}

	.tabs {
		padding: 30rpx;
	}

	//
	.activityList {
		margin: 30rpx;
		border-radius: 10rpx;
		overflow: hidden;
		box-shadow: #dedede 0px 0px 10px;

		.activityImage {
			width: 100%;
			height: 360rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.activityContent {
			padding: 16rpx 30rpx;

			.iconz {
				margin-right: 10rpx;
			}

			.activityTit {
				font-size: 34rpx;
				line-height: 60rpx;
			}

			.activityNum {
				font-size: 32rpx;
				line-height: 60rpx;
			}

			.activityEndTime {
				line-height: 60rpx;
				color: #919191;
				font-size: 32rpx;
			}
		}

	}
</style>
