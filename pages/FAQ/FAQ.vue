<template>
	<view>
		<u-collapse>
				<u-collapse-item :title="index+1+'. '+item.head" v-for="(item, index) in itemList" :key="index">
					<view class="collapse-item">
					{{item.body}}
					</view>
				</u-collapse-item>
			</u-collapse>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				itemList:[{
					head: "每次投票次数是什么？",
					body: "答：分为每天和总共，如设置总共3票就是本场活动，到结束为止，一人总共可投3票，如设置每天3票就是本场活动，每天都会有3票。	",
					open: true,
					disabled: true
				},{
					head: "如何关联公众号?",
					body: "答：公众号绑定迅投小程序APP，ID输入为wx4920937850a307e6即可发布文章插入投票小助手以及所举办的活动路径。",
					open: false,
				}
				,{
					head: "小程序是否收费？",
					body: "答：迅投是一款完全免费的创建活动的一款软件，不会以任何形式强制向用户收取一分一毫的。",
					open: false,
				}	,{
					head: "是否可以进行视频投票？",
					body: "答：可以进行视频投票，所上传的视频时长60s以内。",
					open: false,
				},
				{
					head: "可以添加多张图片吗？",
					body: "答：每个投票选项最多可以添加3张图片，每张图片大小不超过10M。",
					open: false,
				},
				{
					head: "创建投票成功后还可以重新修改吗？",
					body: "答：投票创建成功后，投票未开始，可以进行二次修改。",
					open: false,
				},
				{
					head: "是否在首页展示是什么意思？",
					body: "答：创建发布投票时，如果选择在首页展示，则表示本活动将在小程序首页热门活动列表展示，所有进入到小程序的用户都可以浏览您本次创建的活动。",
					open: false,
				},
				{
					head: "如何删除已发布的投票？",
					body: "答：正在进行中的投票不支持删除，可以在投票中心提前结束投票，然后再删除(删除后的投票数据无法再次恢复)。",
					open: false,
				},
				{
					head: "如何分享投票给他人？",
					body: "答：点击投票详情页右上角，页面底部弹出分享到微信好友或朋友圈信息框，可选择将投票转发给好友、朋友圈或者转发到群，也可以生成分享海报图片，将图片发送给好友或者发到朋友圈进行拉票，进入对应的投票活动进行投票。",
					open: false,
				},
				{
					head: "后台可以修改票数吗？",
					body: "答：每一票都是有效票数，都会自动统计到结果中，即使是发起者，也没有权限在后台随意修改票数，也无法对投票选项标题进行修改，保证每一位评选者公平公正票选。",
					open: false,
				},
				{
					head: "创建的投票可以删除吗？",
					body: "答：可以，创建的投票可以活动状态的详情页删除。",
					open: false,
				}
				],
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	page{
		background: #FFFFFF;
		padding:30rpx;
	}
	.collapse-item {
		color: red;
		padding-bottom: 10px;
	}
</style>
