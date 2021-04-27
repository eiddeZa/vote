'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	
	let res;
	
	if (event.type == "hotList" && event._id) {
		const collection = db.collection('hot_list');
		res = await collection.where({
			_id: event._id
		}).get();
	} else if (event.type == "ImageTextVote" && event._id) {
		const collection = db.collection('imageTextVote_list');
		res = await collection.where({
			_id: event._id
		}).get();
	} else if (event.type == "textVote" && event._id) {
		const collection = db.collection('vote_list');
		res = await collection.where({
			_id: event._id
		}).get();
	} else {
		return {
			code: -1,
			msg: '参数错误',
		}
	}
	//返回数据给客户端
	return res;
};
