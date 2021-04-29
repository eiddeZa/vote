'use strict';
const db = uniCloud.database();
const dbCmd = db.command;
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	let res ;
	if (event.name == "hotList" && event._id) {
		const collection = db.collection('hot_list');
		res = await collection.doc(event._id).update({
		    pageview: dbCmd.inc(1)
		})
	} else if (event.name == "ImageTextVote" && event._id) {
		const collection = db.collection('imageTextVote_list');
		res = await collection.doc(event._id).update({
		    pageview: dbCmd.inc(1)
		})
	} else if (event.name == "textVote" && event._id) {
		const collection = db.collection('textVote_list');
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
