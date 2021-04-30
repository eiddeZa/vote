'use strict';
const db = uniCloud.database();
const dbCmd = db.command;
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	let res;
	event.userInfo.updatetime=Date.now();
	let index=event.voteData.index-1;
	/* 
	 //creattime
	 // updatetime
	 // 每天多少次
	 //总共多少次
	  其他表改变--热门表也要改变
	 */
	// 热门表改变--其他关联表数据也要改变
	if (event.name == "hotList" && event._id) {
		const collection = db.collection('hot_list');
		if(event.switchVal==true&&event.voteData.imgList){
			const imagelist = db.collection('imageTextVote_list');
			await imagelist.doc(event._id).update({
				  ['voteItemlist.'+index]: {
				    vote: dbCmd.inc(1),
					updateInfo: dbCmd.set({
							...event.userInfo
						  })
				  }
			})
		}else if(event.switchVal==true&&event.voteData.video){
			const videoTextVote = db.collection('videoTextVote_list');
			await videoTextVote.doc(event._id).update({
				  ['voteItemlist.'+index]: {
				    vote: dbCmd.inc(1),
					updateInfo: dbCmd.set({
							...event.userInfo
						  })
				  }
			})
		}else if(event.switchVal==true){
			const textVote = db.collection('textVote_list');
			await textVote.doc(event._id).update({
				  ['voteItemlist.'+index]: {
				    vote: dbCmd.inc(1),
					updateInfo: dbCmd.set({
							...event.userInfo
						  })
				  }
			})
		}
		res = await collection.doc(event._id).update({
			  ['voteItemlist.'+index]: {
			    vote: dbCmd.inc(1),
				updateInfo: dbCmd.set({
						...event.userInfo
					  })
			  },
		})
	} else if (event.name == "ImageTextVote" && event._id) {
		const collection = db.collection('imageTextVote_list');
		if(event.switchVal==true){
			const hotlist = db.collection('hot_list');
			await hotlist.doc(event._id).update({
				  ['voteItemlist.'+index]: {
				    vote: dbCmd.inc(1),
					updateInfo: dbCmd.set({
							...event.userInfo
						  })
				  }
			})
		}
		res = await collection.doc(event._id).update({
			['voteItemlist.'+index]: {
			  vote: dbCmd.inc(1),
			  updateInfo: dbCmd.set({
					  ...event.userInfo
					})
			},
	  })
	} else if (event.name == "textVote" && event._id) {
		const collection = db.collection('textVote_list');
		if(event.switchVal==true){
			const hotlist = db.collection('hot_list');
			await hotlist.doc(event._id).update({
				  ['voteItemlist.'+index]: {
				    vote: dbCmd.inc(1),
					updateInfo: dbCmd.set({
							...event.userInfo
						  })
				  }
			})
		}
		res = await collection.doc(event._id).update({
			['voteItemlist.'+index]: {
			  vote: dbCmd.inc(1),
			  updateInfo: dbCmd.set({
					  ...event.userInfo
					})
			},
	  })
	}  else if (event.name == "videoTextVote" && event._id) {
		const collection = db.collection('videoTextVote_list');
		if(event.switchVal==true){
			const hotlist = db.collection('hot_list');
			await hotlist.doc(event._id).update({
				  ['voteItemlist.'+index]: {
				    vote: dbCmd.inc(1),
					updateInfo: dbCmd.set({
							...event.userInfo
						  })
				  }
			})
		}
		res = await collection.doc(event._id).update({
			['voteItemlist.'+index]: {
			  vote: dbCmd.inc(1),
			  updateInfo: dbCmd.set({
					  ...event.userInfo
					})
			},
	  })
	}else {
		return {
			code: -1,
			msg: '参数错误',
		}
	}
	//返回数据给客户端
	return res;
};
