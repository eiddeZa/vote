'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	let res ;
	if (event.name == "hot_list" && event._id) {
		const collection = db.collection('hot_list');
		res = await collection.doc(event._id).update({
			pageview: event.pageview
		})
	} else if (event.name == "imageTextVote_list" && event._id) {
		const collection = db.collection('imageTextVote_list');
		res = await collection.doc(event._id).update({
			pageview: event.pageview
		})
	} else if (event.name == "vote_list" && event._id) {
		const collection = db.collection('vote_list');
		res = await collection.doc(event._id).update({
			pageview: event.pageview
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
