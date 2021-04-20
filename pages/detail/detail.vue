<template>
	<view>
		<view class="initiatorInfo">
			<view class="Info1">
				<u-avatar :src="src" class="uavatar"></u-avatar>
				<view class="infotxt">
					<view class="name">we 投票发起人</view>
					<view class="fqr_txt">投票发起人</view>
				</view>
			</view>
			<view class="Info2">
				<view class="tp_status"><u-tag text="投票中" type="warning" mode="light" size="mini" /></view>
				<view class="enddate">{{this.data.endTime}}结束</view>
			</view>
		</view>
		<view class="tit">{{this.data.activityTitle}}</view>

		<view class="hd_rule">
			<view class=""><u-tag text="投票规则" type="warning" mode="dark" /></view>
			<view class="item_rule">
				<view class="startTit">开始时间</view>
				<view class="">{{this.data.startTime}}</view>
			</view>
			<view class="item_rule">
				<view class="startTit">结束时间</view>
				<view class="">{{this.data.endTime}}</view>
			</view>
			<view class="item_rule">
				<view class="startTit">投票规则</view>
				<view class="">每人{{this.data.voteMoreTxt}}</view>
			</view>
		</view>

		<view class="hd_rule">
			<view class=""><u-tag text="投票详情" type="warning" mode="dark" /></view>
			<view class="item_rule"><view>{{this.data.voteIntroduce}}</view></view>
		</view>

		<view class="hdOption" v-for="item,index in this.data.voteItemlist">
			<view class="imgOption"><image  @click="selectImage(item.imgList)" :src="item.imgList[0]" style="width:110rpx;height:110rpx;overflow:hidden;border-radius: 10rpx;"></image></view>
			<view :class="activeItem==index?'hdOptionBtn active-bgc':'hdOptionBtn'" @click="selectItme(index)"><text>{{item.content}}</text></view>
		</view>
		
		<view class="zwf_"></view>
		<view class="content_1"><u-button shape="circle" class="custom-style" @click="submitData" :ripple="true">投票</u-button></view>
		
		<!-- <view class="cu-form-group">
		  <view
		    class="bg-img"
		  >
		    <image
		      :src="activeImage"
		      style="width: 100%; height: 100%"
		      mode="aspectFill"
		    >
		    </image>
		    <view
		      class="cu-tag bg-red"
		    >
		      <text class="cuIcon-close"></text>
		 </view> 
		 </view>
		 </view> -->
		
	</view>
</template>

<script>
export default {
	data() {
		return {
			src:"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-84c56d78-5a05-4cb3-aa50-401bca700f78/9b8c64ca-2238-4a03-88b0-5ca141e183fe.jpg",
			data:"",
			activeItem:"*"
		};
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
		this.getDetail();
	},
	methods: {
		getDetail() {
			let app=this;
			uni.showLoading({
				title: '加载中...',
				mask: true
			});
			let that = this;
			uniCloud.callFunction({
				name: 'getDetail',
				data: {
					type: 'ImageTextVote',
					_id: that.banner._id
				},
				success(res) {
					uni.hideLoading();
					console.log(res);
					if (res.result.data) {
						app.data=res.result.data[0];
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
		selectItme(index){
			this.activeItem=index;
			console.log(index);
		},
		selectImage(url){
			uni.previewImage({
			  urls: url,
			   current:0
			});
		},
		 submitData() {
			 console.log(this.data)
		 }
	}
};
</script>

<style lang="scss">
page {
	background: #ffffff;
}
.initiatorInfo {
	background: #ffffff;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 30rpx;
	.Info1 {
		display: flex;
		align-items: center;
		.uavatar {
			margin-right: 20rpx;
		}
	}
	.name,
	.tp_status {
		line-height: 60rpx;
	}
	.tp_status {
		text-align: right;
	}
	.fqr_txt,
	.enddate {
		color: #bababa;
		// line-height: 40rpx;
	}
}
.tit {
	// text-align: center;
	text-indent: 30rpx;
	font-size: 36rpx;
	margin-top: 60rpx;
}
.hd_rule {
	padding: 30rpx;
	font-size: 32rpx;
	.item_rule {
		margin: 36rpx 0;
		display: flex;
		.startTit {
			width: 200rpx;
			font-weight: 600;
		}
	}
}
.hdOption {
	margin-bottom: 60rpx;
	display: flex;
	padding: 0 15px;
	.imgOption {
		width: 110rpx;
		height: 110rpx;
		flex-grow: 0;
		felx-shrink: 0;
	}
	.hdOptionBtn {
		border: 1px solid #dcdcdc;
		padding: 36rpx;
		margin-left: 40rpx;
		width: 100%;
		border-radius: 10rpx;
	}
}
.content_1 {
	width:100%;
	position: fixed;
	bottom: 0;
	padding: 30rpx;
	.custom-style {
		background: #f16131 !important;
		color: #ffffff !important;
		/deep/ .u-btn--default {
			background: #f16131 !important;
			color: #ffffff !important;
		}
	}
}
.zwf_{
	height: 140rpx;
}
.active-bgc{
	border-color:#f16131 !important;
	background-color:#fbeadc;
}
</style>
