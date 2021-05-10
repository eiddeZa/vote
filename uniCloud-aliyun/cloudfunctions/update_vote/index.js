'use strict';
const db = uniCloud.database();
const dbCmd = db.command;
exports.main = async (event, context) => {
	if(!event.userInfo){
		return {
			code: -1,
			msg: '请先登陆！',
		}
	}
	//event为客户端上传的参数
	event.userInfo.updatetime = Date.now();
	let res, collection, gl_collection;
	let index = event.voteData.index - 1;

	if (event.name == "hotList" && event._id) {
		collection = db.collection('hot_list');
		event.hot_id=event._id;
		if (event.switchVal == true && event.voteType == "ImageTextVote") {
			gl_collection = db.collection('imageTextVote_list');
		} else if (event.switchVal == true && event.voteType == "videoTextVote") {
			gl_collection = db.collection('videoTextVote_list');
		} else if (event.switchVal == true && event.voteType == "textVote") {
			gl_collection = db.collection('textVote_list');
		}
	} else if (event.name == "ImageTextVote" && event._id) {
		collection = db.collection('imageTextVote_list');
		if (event.switchVal == true) {
			gl_collection = db.collection('hot_list');
		}
	} else if (event.name == "textVote" && event._id) {
		collection = db.collection('textVote_list');
		if (event.switchVal == true) {
			gl_collection = db.collection('hot_list');
		}
	} else if (event.name == "videoTextVote" && event._id) {
		collection = db.collection('videoTextVote_list');
		if (event.switchVal == true) {
			gl_collection = db.collection('hot_list');
		}
	}

	if (event._id && event.userInfo) {
		let dataInfo = await collection.where({
			_id: event._id
		}).get();
		let arr_ = [];
		let updateInfo
		if(dataInfo.data[0].status==3){
			return {
				code: -1,
				msg: '投票已结束',
			}
		}
		if(dataInfo.data[0].updateInfo==undefined){
			 updateInfo = [];
		}else{
			 updateInfo = dataInfo.data[0].updateInfo;
		}
		for (let i = 0; i < updateInfo.length; i++) {
			if (updateInfo[i].openid == event.userInfo.openid) {
				arr_.push(updateInfo[i])
			}
		}
		if (arr_.length == parseInt(event.vcs.voteMore)) {
			return {
				code: -1,
				msg: '投票已达上限',
			}
		} else {
			if (gl_collection) {
				await gl_collection.where({hot_id:event.hot_id}).update({
					updateInfo: dbCmd.push(event.userInfo), //先查询用户，无在插入
					['voteItemlist.' + index]: {
						vote: dbCmd.inc(1),
					}
				});
			}
			res = await collection.doc(event._id).update({
				updateInfo: dbCmd.push(event.userInfo), //先查询用户，无在插入
				['voteItemlist.' + index]: {
					vote: dbCmd.inc(1),
				}
			})
		}
	} else {
		return {
			code: -1,
			msg: '参数错误',
		}
	}








	/* 
	 //creattime
	 // updatetime
	 // 每天多少次
	 //总共多少次
	  其他表改变--热门表也要改变
	 */
	// 热门表改变--其他关联表数据也要改变
	// if (event.name == "hotList" && event._id) {
	// 	const collection = db.collection('hot_list');
	// 	res = await collection.doc(event._id).update({
	// 			updateInfo:dbCmd.push(	//先查询用户，无在插入
	// 				event.userInfo),
	// 			// ['voteItemlist.' + index]: {
	// 			// 	vote: dbCmd.inc(1),
	// 			// }
	// 	})
	// 	if (event.switchVal == true && event.voteData.imgList) {
	// 		const imagelist = db.collection('imageTextVote_list');
	// 		await imagelist.doc(event._id).update({
	// 			updateInfo:dbCmd.set({
	// 				...event.userInfo
	// 			}),
	// 			['voteItemlist.' + index]: {
	// 				vote: dbCmd.inc(1),
	// 			}
	// 		})
	// 	} else if (event.switchVal == true && event.voteData.video) {
	// 		const videoTextVote = db.collection('videoTextVote_list');
	// 		await videoTextVote.doc(event._id).update({
	// 			['voteItemlist.' + index]: {
	// 				vote: dbCmd.inc(1),
	// 				updateInfo: dbCmd.set({
	// 					...event.userInfo
	// 				})
	// 			}
	// 		})
	// 	} else if (event.switchVal == true) {
	// 		const textVote = db.collection('textVote_list');
	// 		await textVote.doc(event._id).update({
	// 			['voteItemlist.' + index]: {
	// 				vote: dbCmd.inc(1),
	// 				updateInfo: dbCmd.set({
	// 					...event.userInfo
	// 				})
	// 			}
	// 		})
	// 	}
	// 	res = await collection.doc(event._id).update({
	// 		['voteItemlist.' + index]: {
	// 			vote: dbCmd.inc(1),
	// 			updateInfo: dbCmd.set({
	// 				...event.userInfo
	// 			})
	// 		},
	// 	})
	// } else if (event.name == "ImageTextVote" && event._id) {
	// 	const collection = db.collection('imageTextVote_list');
	// 	if (event.switchVal == true) {
	// 		const hotlist = db.collection('hot_list');
	// 		await hotlist.doc(event._id).update({
	// 			['voteItemlist.' + index]: {
	// 				vote: dbCmd.inc(1),
	// 				updateInfo: dbCmd.set({
	// 					...event.userInfo
	// 				})
	// 			}
	// 		})
	// 	}

	// } else if (event.name == "textVote" && event._id) {
	// 	const collection = db.collection('textVote_list');
	// 	if (event.switchVal == true) {
	// 		const hotlist = db.collection('hot_list');
	// 		await hotlist.doc(event._id).update({
	// 			['voteItemlist.' + index]: {
	// 				vote: dbCmd.inc(1),
	// 				updateInfo: dbCmd.set({
	// 					...event.userInfo
	// 				})
	// 			}
	// 		})
	// 	}
	// 	res = await collection.doc(event._id).update({
	// 		['voteItemlist.' + index]: {
	// 			vote: dbCmd.inc(1),
	// 			updateInfo: dbCmd.set({
	// 				...event.userInfo
	// 			})
	// 		},
	// 	})
	// } else if (event.name == "videoTextVote" && event._id) {
	// 	const collection = db.collection('videoTextVote_list');
	// 	if (event.switchVal == true) {
	// 		const hotlist = db.collection('hot_list');
	// 		await hotlist.doc(event._id).update({
	// 			['voteItemlist.' + index]: {
	// 				vote: dbCmd.inc(1),
	// 				updateInfo: dbCmd.set({
	// 					...event.userInfo
	// 				})
	// 			}
	// 		})
	// 	}
	// 	res = await collection.doc(event._id).update({
	// 		['voteItemlist.' + index]: {
	// 			vote: dbCmd.inc(1),
	// 			updateInfo: dbCmd.set({
	// 				...event.userInfo
	// 			})
	// 		},
	// 	})
	// } else {
	// 	return {
	// 		code: -1,
	// 		msg: '参数错误',
	// 	}
	// }
	//返回数据给客户端
	return res;
};
