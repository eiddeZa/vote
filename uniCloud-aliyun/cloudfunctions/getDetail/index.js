'use strict';
const db = uniCloud.database();
const votelist = db.collection('vote_list');
const ImageTextVote = db.collection('imageTextVote_list');
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	let res;
	if(event.type=="votelist"){
		// 查询
		res = await votelist.where({
			_id: event._id
		}).get();
	}else if(event.type=="ImageTextVote"){
		res = await ImageTextVote.where({
			_id: event._id
		}).get();
	}else{
		return {
			code: -1,
			msg: '参数错误',
		}
	}
	//返回数据给客户端
	return res;
};
