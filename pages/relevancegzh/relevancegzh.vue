<template>
	<view>
		<view class="content">
			关联公众号：
		</view>
		<view class="content_i">
			如何添加到公众号菜单栏中：
		</view>
		<view class="content_i">
			第一步：公众号申请关联我的小程序
			登录微信公众平台 - 点击小程序管理 - 添加 - 关联小程序 - 搜索小程序appID：wx4920937850a307e6 - 点击搜索 -
			发送关联请求（注：点击进入“我的”页面，客服消息，快速获取小程序appID）
		</view>
		<view class="content_i">
			第二步：获取路径（点击客服，回复路径即可）
		</view>
		<view class="content_i">
			第三步：在公众号底部菜单上添加活动入口
			点击功能 - 点击自定义菜单栏 - 添加菜单 - 选择小程序：迅投 - 填写小程序路径
		</view>
		<view class="content">
			如何添加投票入口到公众号文章中：
		</view>
		<view class="content_i">
			第一步：首先打开正在编辑的文章，在文章合适的位置选择添加小程序
		</view>
		<view class="content_i">
			第二步：搜索需要添加的小程序名称：迅投。搜索选中后点击下一步
		</view>
		<view class="content_i">
			第三步：填入小程序路径路径，选择展现形式，点击确认即可。
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style>
	page {
		background: #FFFFFF;
		padding: 30rpx;
	}

	.content {
		font-size: 35rpx;
		line-height: 60rpx;
		margin: 20rpx 0;
		color: red;
	}

	.content_i {
		font-size: 30rpx;
		margin: 10rpx 0;
	}
</style>
