'use strict';
const db = uniCloud.database();
const dbCmd = db.command;
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	let res ;
	if (event.name == "ImageTextVote" && event._id) {
		const collection = db.collection('imageTextVote_list');
		if(event.switchVal==true){
			const hotlist = db.collection('hot_list');
			await hotlist.doc(event._id).remove();
		}
		res = await collection.doc(event._id).remove();
	} else if (event.name == "textVote" && event._id) {
		const collection = db.collection('textVote_list');
		if(event.switchVal==true){
			const hotlist = db.collection('hot_list');
			await hotlist.doc(event._id).remove();
		}
		res = await collection.doc(event._id).remove();
	}else if (event.name == "videoTextVote" && event._id) {
		const collection = db.collection('videoTextVote_list');
		if(event.switchVal==true){
			const hotlist = db.collection('hot_list');
			await hotlist.doc(event._id).remove();
		}
		res = await collection.doc(event._id).remove();
	} else {
		return {
			code: -1,
			msg: '参数错误',
		}
	}
	//返回数据给客户端
	if (res.id) {
		//返回数据给客户端
		return {
			code: 200,
			msg: '成功',
			data: res
		}
	}
};
