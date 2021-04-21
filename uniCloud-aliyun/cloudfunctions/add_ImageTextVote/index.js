'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const collection = db.collection('imageTextVote_list')
	const hotlist = db.collection('hot_list')
	event.creatTime=Date.now()
	
	if(event.switchVal==true){
		hotlist.add({
			...event,
		})
	}
	
	let res = await collection.add({
		...event,
	})
	if (res.id) {
		//返回数据给客户端
		return {
			code: 200,
			msg: '发布成功',
			data: res
		}
	}
	//返回数据给客户端
	return {
		code: -1,
		msg: '发布失败',
		data: res
	}
	
};
