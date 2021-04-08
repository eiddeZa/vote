'use strict';
const db = uniCloud.database();
const contentInfo = db.collection('content');
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	let {
		page,
		limit
	} = event;
	
	let skip = (page - 1) * limit;
	console.log(skip,limit);
	
	const res = await contentInfo.skip(skip).limit(limit).get();

	//返回数据给客户端
	return res;
};
