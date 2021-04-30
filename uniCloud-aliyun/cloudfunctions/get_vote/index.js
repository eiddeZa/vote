'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	let {
		page,
		limit
	} = event.paging;
	let skip = (page - 1) * limit;
	
	let res;
	if (event.openid && event.voteType == "ImageTextVote") {
		const collection = db.collection('imageTextVote_list');
		res = await collection.where({
			openid: event.openid
		}).skip(skip).limit(limit).orderBy("_id", "desc").get();
	} else if (event.openid && event.voteType == "textVote") {
		const collection = db.collection('textVote_list');
		res = await collection.where({
			openid: event.openid
		}).skip(skip).limit(limit).orderBy("_id", "desc").get();
	} else if (event.openid && event.voteType == "videoTextVote") {
		const collection = db.collection('videoTextVote_list');
		res = await collection.where({
			openid: event.openid
		}).skip(skip).limit(limit).orderBy("_id", "desc").get();
	} else {
		return {
			code: -1,
			msg: '参数错误',
		}
	}
	return res;
};