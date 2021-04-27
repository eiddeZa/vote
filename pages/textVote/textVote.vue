<template>
	<view>
		<view class="content_1">
			<u-form label-position="top">
				<u-form-item left-icon="pushpin-fill" :left-icon-style="{fontSize:'16px',color:'#f16131'}" label="活动标题"
					:label-style="{fontSize:'16px',fontWeight:'bold'}">
					<u-input v-model="obj.activityTitle" maxlength="5000" placeholder="请输入活动标题" />
				</u-form-item>
				<u-form-item left-icon="edit-pen-fill" :left-icon-style="{fontSize:'16px',color:'#f16131'}" label="投票介绍"
					:label-style="{fontSize:'16px',fontWeight:'bold'}">
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
					:left-icon-style="{fontSize:'16px',color:'#f16131'}" label="投票选项"
					:label-style="{fontSize:'16px',fontWeight:'bold'}">
				</u-form-item>
				<u-form-item v-for="item,index in obj.voteItemlist" :key="index">
					<view style="display: flex;width: 100%;">
						<u-icon name="minus-circle" color="#f16131" size="32" @click="deleteItem(index)"></u-icon>
						<u-input class="u-input" v-model="item.content" maxlength="5000" placeholder="请输入投票选项" />
					</view>
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
				<u-form-item left-icon="clock-fill" :left-icon-style="{fontSize:'16px',color:'#f16131'}" label="投票开始时间"
					:label-style="{fontSize:'16px',fontWeight:'bold'}">
					<view style="width:100%;text-align: end;" @click="ShowStart()">
						<text>{{obj.startTime}}</text>
					</view>
				</u-form-item>
				<u-form-item left-icon="clock-fill" :left-icon-style="{fontSize:'16px',color:'#f16131'}" label="投票结束时间"
					:label-style="{fontSize:'16px',fontWeight:'bold'}">
					<view style="width:100%;text-align: end;" @click="ShowEnd()">
						<text>{{obj.endTime}}</text>
					</view>
				</u-form-item>
				<u-form-item left-icon="grid-fill" :left-icon-style="{fontSize:'16px',color:'#f16131'}" label="投票次数"
					:label-style="{fontSize:'16px',fontWeight:'bold'}">
					<view style="width:100%;text-align: end;" @click="ShowNun()">
						<text>{{obj.voteMoreTxt}}</text>
						<u-icon name="arrow-right" color="#f16131" size="32"></u-icon>
					</view>
				</u-form-item>
				<u-form-item left-icon="home-fill" :left-icon-style="{fontSize:'16px',color:'#f16131'}" label="是否在首页展示"
					:label-style="{fontSize:'16px',fontWeight:'bold'}">
					<u-switch slot="right" v-model="obj.switchVal"></u-switch>
				</u-form-item>
			</u-form>
		</view>
		<view class="content_1" style="padding: 20rpx 0;">
			<u-button shape="circle" class="custom-style" @click="submitData" :ripple="true">发布投票</u-button>
		</view>

		<!-- 弹窗 -->
		<u-toast ref="uToast" class="uToast" />
		<!-- 时间选择弹窗 -->
		<u-picker v-model="startTimeShow" mode="time" :params="params" @confirm="confirmStartTime"></u-picker>
		<!-- 时间选择弹窗 -->
		<u-picker v-model="endTimeShow" mode="time" :params="params" @confirm="confirmEndTime"></u-picker>
		<!-- 投票次数选择 -->
		<u-select v-model="nunShow" mode="mutil-column-auto" :list="numlist" @confirm="confirmNum"></u-select>

	</view>
</template>

<script>
	var moment = require('moment');
	export default {
		data() {
			return {
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
					pageview:0,
					activityTitle: "",
					voteIntroduce: "",
					voteItemlist: [{
							index: 1,
							vote:0,	//票数
							content: ""
						},
						{
							index: 2,
							vote:0,	//票数
							content: ""
						}
					],
					startTime: moment().format('YYYY-MM-DD HH:mm'),
					endTime: moment().add({
						y: 0,
						M: 0,
						d: 1,
						h: 0,
						m: 0
					}).format('YYYY-MM-DD HH:mm'),
					voteMoreTxt: "总共1次",
					voteMore: "1",
					switchVal: true,
					status: 1,
					openid: "",
					creatUserInfo:"",
					creatUserInfo: "",
					voteType: "textVote"
				},
			}
		},
		onLoad() {},
		methods: {
			addItem() {
				this.obj.voteItemlist.push({
					index: this.obj.voteItemlist.length + 1,
					vote:0,
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
				this.obj.startTime = `${obj.year}-${obj.month}-${obj.day} ${obj.hour}:${obj.minute}`;
			},
			confirmEndTime(obj) {
				this.obj.endTime = `${obj.year}-${obj.month}-${obj.day} ${obj.hour}:${obj.minute}`;
			},
			confirmNum(obj) {
				this.obj.voteMoreTxt = `${obj[0].label}${obj[1].label}`;
				this.obj.voteMore = obj[1].value;
			},
			submitData() {
				uni.showLoading({
					title: '发布中'
				});
				if (this.formVerify()) {
					this.obj.creatUserInfo = uni.getStorageSync('userInfo');
					this.obj.openid = uni.getStorageSync('userInfo').openid;
					let app=this;
					uniCloud.callFunction({
						name: "add_votelist",
						data: this.obj,
						success(res) {
							uni.hideLoading();
							if (res.result.code == 200) {
								uni.showToast({
									title: res.result.msg,
									duration: 2000
								});
								setTimeout(() => {
									app.clearData();
									// app.onNavigateBack();
									uni.switchTab({
										url: '/pages/index/index'
									});
								}, 500);
							} else {
								app.$refs.uToast.show({
									title: res.result.msg,
									type: 'error',
									position: 'top'
								});
							}
						},
						fail(error) {
							uni.hideLoading();
							app.$refs.uToast.show({
								title: '发布失败,请稍后重试！',
								type: 'error',
								position: 'top'
							});
							console.log(error)
						}
					})
				} else {
					uni.hideLoading();
				}
			},
			formVerify() {
				for (let i = 0; i < this.obj.voteItemlist.length; i++) {
					if (this.obj.voteItemlist[i].content == "") {
						this.$refs.uToast.show({
							title: `请填写第${i+1}个投票选项`,
							type: 'error',
							position: 'top'
						});
						return false;
					}
				}
				if (this.obj.activityTitle == "") {
					this.$refs.uToast.show({
						title: `请填写活动标题`,
						type: 'error',
						position: 'top'
					});
					return false;
				} else if (this.obj.voteIntroduce == "") {
					this.$refs.uToast.show({
						title: `请填写投票介绍`,
						type: 'error',
						position: 'top'
					});
					return false;
				} else if (this.compare(this.obj.startTime, this.obj.endTime) == false) {
					this.$refs.uToast.show({
						title: `投票开始时间不能大于结束时间`,
						type: 'error',
						position: 'top'
					});
					return false;
				}
				return true;
			},
			compare(date1, date2) {
				var oDate1 = new Date(date1);
				var oDate2 = new Date(date2);
				if (oDate1.getTime() > oDate2.getTime()) {
					return false;
				}
			},
			clearData() {
				this.obj = {
					pageview:0,
					activityTitle: "",
					voteIntroduce: "",
					voteItemlist: [{
							index: 1,
							vote:0,	//票数
							content: ""
						},
						{
							index: 2,
							vote:0,	//票数
							content: ""
						}
					],
					startTime: moment().format('YYYY-MM-DD HH:mm'),
					endTime: moment().add({
						y: 0,
						M: 0,
						d: 1,
						h: 0,
						m: 0
					}).format('YYYY-MM-DD HH:mm'),
					voteMoreTxt: "总共1次",
					voteMore: "1",
					switchVal: true,
					status: 1,
					openid: "",
					creatUserInfo:"",
					creatUserInfo: "",
					voteType: "textVote"
				}
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
		font-size: 34rpx;
		text-shadow: 0px 0px 2px #000;
		margin: 14rpx 20rpx;
	}

	.voteOptionContent {
		.voteOptionContentTit {
			padding: 0;
		}

		.u-input {
			margin-left: 10rpx;
		}

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

	.custom-style {
		background: #f16131 !important;
		color: #ffffff !important;

		/deep/ .u-btn--default {
			background: #f16131 !important;
			color: #ffffff !important;
		}
	}
</style>
