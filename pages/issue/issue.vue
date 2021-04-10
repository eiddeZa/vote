<template>
	<view>
		<view class="content_1">
			<u-form label-position="top">
				<u-form-item left-icon="pushpin-fill" :left-icon-style="{fontSize:'18px',color:'#f16131'}" label="活动标题"
					:label-style="{fontSize:'18px',fontWeight:'bold'}">
					<u-input v-model="obj.activityTitle" maxlength="5000" placeholder="请输入活动标题" />
				</u-form-item>
				<u-form-item left-icon="edit-pen-fill" :left-icon-style="{fontSize:'18px',color:'#f16131'}" label="投票介绍"
					:label-style="{fontSize:'18px',fontWeight:'bold'}">
					<u-input v-model="obj.voteIntroduce" maxlength="5000" placeholder="请输入投票介绍" />
				</u-form-item>
			</u-form>
		</view>
		<view class="titleOption">
			选项管理
		</view>
		<view class="content_1 voteOptionContent">
			<u-form label-position="top">
				<u-form-item class="voteOptionContentTit" left-icon="grid-fill"
					:left-icon-style="{fontSize:'18px',color:'#f16131'}" label="投票选项"
					:label-style="{fontSize:'18px',fontWeight:'bold'}">
				</u-form-item>
				<u-form-item v-for="item,index in obj.voteItemlist" :key="index">
					<u-icon name="minus-circle" color="#f16131" size="32" @click="deleteItem(index)"></u-icon>
					<u-input class="u-input" v-model="item.content" maxlength="5000" placeholder="请输入投票选项" />
				</u-form-item>
				<u-form-item>
					<view @click="addItem()" style="width:100%;">
						<u-icon name="plus-circle" color="#f16131" size="32"></u-icon>
						<text class="addItem">添加选项</text>
					</view>
				</u-form-item>
			</u-form>
		</view>
		<view class="titleOption">
			投票规则
		</view>
		<view class="content_1">
			<u-form class="voteRule">
				<u-form-item left-icon="pushpin-fill" :left-icon-style="{fontSize:'18px',color:'#f16131'}"
					label="投票开始时间" :label-style="{fontSize:'18px',fontWeight:'bold'}">
					<view style="width:100%;text-align: end;" @click="ShowStart()">
						<text>{{obj.startTime}}</text>
					</view>
				</u-form-item>
				<u-form-item left-icon="edit-pen-fill" :left-icon-style="{fontSize:'18px',color:'#f16131'}"
					label="投票结束时间" :label-style="{fontSize:'18px',fontWeight:'bold'}">
					<view style="width:100%;text-align: end;" @click="ShowEnd()">
						<text>{{obj.endTime}}</text>
					</view>
				</u-form-item>
				<u-form-item left-icon="edit-pen-fill" :left-icon-style="{fontSize:'18px',color:'#f16131'}" label="投票次数"
					:label-style="{fontSize:'18px',fontWeight:'bold'}">
					<view style="width:100%;text-align: end;" @click="ShowNun()">
						<text>{{obj.voteMoreTxt}}</text>
						<u-icon name="arrow-right" color="#f16131" size="32"></u-icon>
					</view>
				</u-form-item>
			</u-form>
		</view>
		<view class="content_1" style="padding: 20rpx 0;">
			<u-button shape="circle" :custom-style="{
			background:'#f16131', // 注意驼峰命名，并且值必须用引号包括，因为这是对象
			color: '#ffffff'
		}" :ripple="true">发布投票</u-button>
		</view>

		<!-- 弹窗 -->
		<u-toast ref="uToast" class="uToast" />
		<!-- 时间选择弹窗 -->
		<u-picker v-model="startTimeShow" mode="time" :params="params" @confirm="confirmStartTime"></u-picker>
		<!-- 时间选择弹窗 -->
		<u-picker v-model="endTimeShow" mode="time" :params="params" @confirm="confirmEndTime"></u-picker>
		<!-- 投票次数选择 -->
		<u-select v-model="nunShow" mode="mutil-column-auto" :list="numlist" @confirm="confirmNum"></u-select>

		<u-tabbar :list="tabs" :mid-button="true" active-color="#f47347"></u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabs: '',
				params: {
					year: true,
					month: true,
					day: true,
					hour: true,
					minute: true
				},
				startTimeShow: false,
				endTimeShow: false,
				nunShow: false, //投票次数配置
				numlist: [{
						value: 1,
						label: '每天',
						children: [{
								value: 1,
								label: '1次'
							},
							{
								value: 2,
								label: '2次',
							},
							{
								value: 3,
								label: '3次',
							},
							{
								value: 4,
								label: '4次',
							},
							{
								value: 5,
								label: '5次',
							},
							{
								value: 6,
								label: '6次',
							},
							{
								value: 7,
								label: '7次',
							},
							{
								value: 8,
								label: '8次',
							},
							{
								value: 9,
								label: '9次',
							},
							{
								value: 10,
								label: '10次',
							},
							{
								value: 11,
								label: '11次',
							},
							{
								value: 12,
								label: '12次',
							},
							{
								value: 13,
								label: '13次',
							},
							{
								value: 14,
								label: '14次',
							},
							{
								value: 15,
								label: '15次',
							},
							{
								value: 16,
								label: '16次',
							},
							{
								value: 17,
								label: '17次',
							},
							{
								value: 18,
								label: '18次',
							},
							{
								value: 19,
								label: '19次',
							},
							{
								value: 20,
								label: '20次',
							}
						]
					},
					{
						value: 2,
						label: '总共',
						children: [{
								value: 1,
								label: '1次'
							},
							{
								value: 2,
								label: '2次',
							},
							{
								value: 3,
								label: '3次',
							},
							{
								value: 4,
								label: '4次',
							},
							{
								value: 5,
								label: '5次',
							},
							{
								value: 6,
								label: '6次',
							},
							{
								value: 7,
								label: '7次',
							},
							{
								value: 8,
								label: '8次',
							},
							{
								value: 9,
								label: '9次',
							},
							{
								value: 10,
								label: '10次',
							},
							{
								value: 11,
								label: '11次',
							},
							{
								value: 12,
								label: '12次',
							},
							{
								value: 13,
								label: '13次',
							},
							{
								value: 14,
								label: '14次',
							},
							{
								value: 15,
								label: '15次',
							},
							{
								value: 16,
								label: '16次',
							},
							{
								value: 17,
								label: '17次',
							},
							{
								value: 18,
								label: '18次',
							},
							{
								value: 19,
								label: '19次',
							},
							{
								value: 20,
								label: '20次',
							}
						]
					}
				],
				obj: {
					activityTitle: "",
					voteIntroduce: "",
					voteItemlist: [{
							index: 1,
							content: ""
						},
						{
							index: 2,
							content: ""
						}
					],
					startTime: "2020-04-11 12:00",
					endTime: "2020-04-11 12:00",
					voteMoreTxt: "总共1次",
					voteMore: "1"
				}
			};
		},
		onLoad() {
			this.tabs = this.$store.state.tabbarList;
			console.log(this.obj)
		},
		methods: {
			addItem() {
				this.obj.voteItemlist.push({
					index: this.obj.voteItemlist + 1,
					content: ""
				});
				console.log(this.obj.voteItemlist)
			},
			deleteItem(index) {
				if (this.obj.voteItemlist.length == 2) {
					this.$refs.uToast.show({
						title: '至少要有两个投票选项',
						type: 'error',
						position: 'top'
					});
					return false;
				}
				this.obj.voteItemlist.splice(index, 1);
			},
			ShowStart() {
				this.startTimeShow = true;
			},
			ShowEnd() {
				this.endTimeShow = true;
			},
			ShowNun() {
				this.nunShow = true;
			},
			confirmStartTime(obj) {
				this.obj.startTime=`${obj.year}-${obj.month}-${obj.day} ${obj.hour}:${obj.minute}`;
				console.log(obj)
			},
			confirmEndTime(obj) {
				this.obj.endTime=`${obj.year}-${obj.month}-${obj.day} ${obj.hour}:${obj.minute}`;
				console.log(obj)
			},
			confirmNum(obj) {
				this.obj.voteMoreTxt=`${obj[0].label}${obj[1].label}`;
				this.obj.voteMore=obj[1].value;
				console.log(obj)
			}
		}
	};
</script>

<style lang="scss">
	page {
		background: #f8f6f7;
	}

	.content_1 {
		margin: 20rpx;
		background: #FFFFFF;
		padding: 10rpx;
	}

	.titleOption {
		font-weight: 300;
		color: #FFFFFF;
		font-size: 36rpx;
		text-shadow: 0px 0px 5px #000;
		margin: 20rpx;
	}

	.voteOptionContent {
		.voteOptionContentTit {
			padding: 0;
		}

		.u-input,
		.addItem {
			margin-left: 20rpx;
		}
	}

	.uToast {
		/deep/.u-text {
			min-width: 300rpx;
		}
	}

	.voteRule {
		/deep/.u-form-item--left {
			width: auto !important;
			flex: none !important;
		}
	}
</style>
