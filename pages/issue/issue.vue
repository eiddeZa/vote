<template>
	<view>
		<view class="selectItem" @click="gopage('textVote')">
			<view>
				<view class="itemTit">
					文字投票
				</view>
				<view>
					极速创建文字投票，不限选手，不限流量。
				</view>
			</view>
			<view>
				<image src="../../static/image/wenzi.png" class="itemIcon" mode=""></image>
			</view>
		</view>

		<view class="selectItem bgc2" @click="gopage('ImageTextVote')">
			<view>
				<view class="itemTit">
					图文投票
				</view>
				<view>
					活动样式多样化，自定义图片上传，极速创建图文投票。
				</view>
			</view>
			<view>
				<image src="../../static/image/tuwentoupiao.png" class="itemIcon" mode=""></image>
			</view>
		</view>

		<view class="selectItem bgc3" @click="gopage('videoTextVote')">
			<view>
				<view class="itemTit">
					视频投票
				</view>
				<view>
					一键上传视频，最直观的展示，投票内容丰富多样。
				</view>
			</view>
			<view>
				<image src="../../static/image/xingxing.png" class="itemIcon" mode=""></image>
			</view>
		</view>

		<view class="wrap">
			<view class="demo-layout bgc1" @click="gofaq">
				<image src="../../static/image/changjianwenti.png" mode="" ></image>
				<view>常见问题</view>
			</view>
			<view class="demo-layout bgc2" @click="gnjj">
				<image src="../../static/image/gongneng.png" mode=""></image>
				<view>功能讲解</view>
			</view>
			<view class="demo-layout bgc3" style="margin:0;" @click="lkjc">
				<image src="../../static/image/jiaocheng.png" mode=""></image>
				<view>查看教程</view>
			</view>
		</view>
		<!-- 弹窗 -->
		<u-toast ref="uToast" class="uToast" />
		<u-tabbar :list="tabs" :mid-button="true" active-color="#f47347"></u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabs: ""
			};
		},
		onLoad() {
			this.tabs = this.$store.state.tabbarList;
		},
		methods: {
			gopage(page) {
				if (uni.getStorageSync('userInfo') == '' || uni.getStorageSync('userInfo') == null) {
					uni.showToast({
						title: '请先登录！',
						duration: 2000,
						icon: 'none'
					});
					return false;
				}
				if (page == "textVote") {
					uni.navigateTo({
						url: '../textVote/textVote'
					});
				} else if (page == "ImageTextVote") {
					uni.navigateTo({
						url: '../ImageTextVote/ImageTextVote'
					});
				} else if (page == "videoTextVote") {
					uni.navigateTo({
						url: '../videoTextVote/videoTextVote'
					});
				}else {
					this.$refs.uToast.show({
						type:"error",
						title: "努力开发中，敬请期待！",
						position: "top",
					});
				}
			},
			gofaq(){
				uni.navigateTo({
					url: '../FAQ/FAQ'
				});
			},
			gnjj(){
				uni.navigateTo({
					url: '../functional/functional'
				});
			},
			lkjc(){
				uni.navigateTo({
					url: '../course/course'
				});
			}
		}
	};
</script>

<style lang="scss">
	page {
		background: #f8f6f7;
	}

	.selectItem {
		margin: 30rpx;
		background-image: linear-gradient(135deg, #F6416C 30%, #FFF6B7 100%);
		color: #FFFFFF;
		padding: 30rpx;
		border-radius: 10rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.itemTit {
			font-size: 40rpx;
			font-weight: 500;
			line-height: 60rpx;
		}

		.itemIcon {
			width: 70rpx;
			height: 70rpx;
			margin: 0 20rpx;
		}
	}

	.bgc1 {
		background-image: linear-gradient(135deg, #F6416C 30%, #FFF6B7 100%);
	}

	.bgc2 {
		// background-image: linear-gradient(135deg, #F067B4 10%, #81FFEF 100%);
		background-image: linear-gradient(135deg, #28C76F 30%, #81FBB8 100%);
	}

	.bgc3 {
		background-image: linear-gradient(135deg, #0396FF 30%, #ABDCFF 100%);
	}

	.wrap {
		padding: 30rpx;
		display: flex;

		/deep/.u-col {
			padding: 0 !important;
		}

		.demo-layout {
			flex: 1;
			text-align: center;
			padding: 20rpx;
			margin-right: 20rpx;
			color: #fff;
			border-radius: 10rpx;

			image {
				width: 70rpx;
				height: 70rpx;
			}
		}
	}

	.bg-p1 {
		background-image: linear-gradient(135deg, #FAD7A1 10%, #E96D71 100%);
	}

	.bg-p2 {
		background-image: linear-gradient(135deg, #FCCF31 10%, #F55555 100%);
	}

	.bg-p3 {
		background-image: linear-gradient(135deg, #43CBFF 10%, #9708CC 100%);
	}

	.uToast {
		/deep/.u-text {
			min-width: 320rpx;
		}
	}
</style>
