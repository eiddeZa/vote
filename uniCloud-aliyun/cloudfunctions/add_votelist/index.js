'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)

	const collection = db.collection('code_list')

	// 判断手机号 
	var myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/
	if (!myreg.test(event.phone)) {
		return {
			code: 0,
			msg: '手机号格式不正确'
		}
	}
	
	if(event.img_arr == ''){
		return {
			code: 0,
			msg: '图片上传失败'
		}
	}
	// 添加数据
	let data = {
		testId:1,
		contacts: event.contacts, //	（联系人）
		phone: event.phone, //（电话）
		address: event.address, //（地址）
		visiting_time: event.visiting_time, //	（上门时间）
		description: event.description, //（描述）
		img_arr: event.img_arr,
		edttime: Date.now()
	}

	let res = await collection.add(data)
	//返回数据给客户端
	return {
		code: 200,
		msg: '添加成功',
		data: res
	}
};
