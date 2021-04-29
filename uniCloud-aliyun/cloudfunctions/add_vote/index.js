'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const hotlist = db.collection('hot_list')
	event.creatTime=Date.now()
	if(event.switchVal==true){
		hotlist.add({
			...event,
		})
	}
	console.log('event : ', event)
	let res;
	if (event.voteType == "ImageTextVote") {
		const collection = db.collection('imageTextVote_list');
		res = await collection.add({
			...event
		})
	} else if (event.voteType == "textVote") {
		const collection = db.collection('textVote_list');
		res = await collection.add({
			...event
		})
	} else if (event.voteType == "videoTextVote") {
		const collection = db.collection('videoTextVote_list');
		res = await collection.add({
			...event
		})
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
			msg: '发布成功',
			data: res
		}
	}
};
