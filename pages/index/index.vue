<template>
	<view class="content">
		<!--  bg-color="#f75360" -->
		<u-swiper mode="rect" :list="slideShowlist" duration="3000" :effect3d="true"></u-swiper>
		<view class="hot_tit">
			<image src="../../static/image/hot.png" mode=""></image>
			<text>热门活动</text>
		</view>
		<view v-for="(item, index) in activityList" :key="index" class="activityList" @click="goDetail(item)">
			<view class="activityImage" v-if="item.voteType=='ImageTextVote'">
				<image :src="item.voteItemlist[0].imgList[0]" mode=""></image>
			</view>
			<view class="activityImage" v-if="item.voteType=='videoTextVote'" @click.stop="">
				<video :src="item.voteItemlist[0].video" style="width: 100%; height: 100%"></video>
			</view>
			<view class="activityContent">
				<view class="activityTit">
					<u-icon class="iconz" color="#f16131" name="grid-fill" size="28"></u-icon>{{item.activityTitle}}
				</view>
				<view class="activityNum">
					<u-icon class="iconz" color="#f16131" name="heart-fill" size="28"></u-icon>浏览{{item.pageview}}次,
					已投票{{item.voteItemlist | total}}
				</view>
				<view class="activityEndTime">
					<u-icon class="iconz" color="#f16131" name="clock-fill" size="28"></u-icon>{{item.endTime}} 结束
				</view>
			</view>
		</view>
		<view class="content_vote" v-if="activityList.length==0">
			<u-empty text="暂无数据" mode="list"></u-empty>
		</view>
		<u-loadmore v-else :status="status" :icon-type="iconType" :load-text="loadText" />

		<u-tabbar :list="tabs" :mid-button="true" active-color="#f47347"></u-tabbar>
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
				tabs: "",
				activityList: [],
				page: 1,
				status: "loadmore",
				iconType: "flower",
				loadText: {
					loadmore: "轻轻上拉",
					loading: "努力加载中",
					nomore: "没有更多了",
				}
			};
		},
		//分享给朋友
		onShareAppMessage(res) {
			return {
				title: this.banner.title,
				path: this.getUrl(),
				success: res => {
					console.info(res)
				}
			}
		},
		//分享到朋友圈
		onShareTimeline(res) {
			return {
				title: "迅投，快来投票吧！",
				query: this.getUrl(),
			}
		},
		onLoad() {
			this.tabs = this.$store.state.tabbarList;
			//查询活动列表
			this.getList();
		},
		// 监听下拉刷新
		onPullDownRefresh() {
			this.page = 1;
			this.activityList = [];
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
			cs(){
				let detail={};
				uni.navigateTo({
					url: "../wxgzh/wxgzh?detailDate=" +
						encodeURIComponent(JSON.stringify(detail)),
				});
			},
			getList() {
				let that = this;
				uniCloud.callFunction({
					name: "get_hotlist",
					data: {
						paging: {
							page: that.page,
							limit: 5,
						},
					},
					success(res) {
						console.log(res);
						if (res.result.data) {
							if (that.page === 1) {
								uni.stopPullDownRefresh();
							}
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
						that.$operate.toast({
							title: "网络请求错误！"
						})
						console.log(error);
					},
				});
			},
			goDetail(item) {
				if (uni.getStorageSync('userInfo') == '' || uni.getStorageSync('userInfo') == null) {
					uni.showToast({
						title: '请先登录！',
						duration: 2000,
						icon: 'none'
					});
					return false;
				}
				let detail = {
					title: item.activityTitle,
					_id: item._id,
					type:"hotList"
				};
				console.log(detail);
				uni.navigateTo({
					url: "../detail/detail?detailDate=" +
						encodeURIComponent(JSON.stringify(detail)),
				});
				
			}
		},
	};
</script>

<style lang="scss">
	.content {
		min-height: 100%;
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
