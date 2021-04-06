'use strict';

const db = uniCloud.database();

const collection = db.collection('userInfo') // 获取表'unicloud-test'的集合对象

exports.main = async (event, context) => {
	//event为客户端上传的参数
	// const res = await collection.limit(10).get() // 获取表中的10条数据，结果为json格式

	let {
		name,
		passWord,
		userName
	} = event;
		
		console.log("测试");
	let res = await collection.add({
		name,
		passWord,
		userName
	});
	return res; // 返回json给客户端
};
