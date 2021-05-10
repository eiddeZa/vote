'use strict';
const db = uniCloud.database();
const dbCmd = db.command;
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	let res ;
	if (event.name == "hotList" && event._id) {
		const collection = db.collection('hot_list');
		event.hot_id=event._id;
		if(event.switchVal==true&&event.voteType=="ImageTextVote"){
			const imagelist = db.collection('imageTextVote_list');
			await imagelist.where({hot_id:event.hot_id}).update({
				pageview: dbCmd.inc(1)
			})
		}else if(event.switchVal==true&&event.voteType=="videoTextVote"){
			const videoTextVote = db.collection('videoTextVote_list');
			await videoTextVote.where({hot_id:event.hot_id}).update({
				pageview: dbCmd.inc(1)
			})
		}else if(event.switchVal==true&&event.voteType=="textVote"){
			const textVote = db.collection('textVote_list');
			await textVote.where({hot_id:event.hot_id}).update({
				pageview: dbCmd.inc(1)
			})
		}
		res = await collection.doc(event._id).update({
		    pageview: dbCmd.inc(1)
		})
	} else if (event.name == "ImageTextVote" && event._id) {
		const collection = db.collection('imageTextVote_list');
		if(event.switchVal==true){
			const hotlist = db.collection('hot_list');
			await hotlist.doc(event.hot_id).update({
				pageview: dbCmd.inc(1)
			})
		}
		res = await collection.doc(event._id).update({
		    pageview: dbCmd.inc(1)
		})
	} else if (event.name == "textVote" && event._id) {
		const collection = db.collection('textVote_list');
		if(event.switchVal==true){
			const hotlist = db.collection('hot_list');
			await hotlist.doc(event.hot_id).update({
				pageview: dbCmd.inc(1)
			})
		}
		res = await collection.doc(event._id).update({
		    pageview: dbCmd.inc(1)
		})
	}else if (event.name == "videoTextVote" && event._id) {
		const collection = db.collection('videoTextVote_list');
		if(event.switchVal==true){
			const hotlist = db.collection('hot_list');
			await hotlist.doc(event.hot_id).update({
				pageview: dbCmd.inc(1)
			})
		}
		res = await collection.doc(event._id).update({
		    pageview: dbCmd.inc(1)
		})
	} else {
		return {
			code: -1,
			msg: '参数错误',
		}
	}
	//返回数据给客户端
	return res;
};
