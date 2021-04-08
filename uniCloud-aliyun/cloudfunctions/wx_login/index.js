'use strict';

//node 自带模块
const crypto = require('crypto')
//引入jwt-simple中的
const jwt = require('./jwt.js')

const loginConfig = {
	AppId: 'wx4920937850a307e6', // 小程序AppId,
	AppSecret: 'f80f7efec3729093e48b9f5e922a6317' //微信小程序AppSecret
}
//用于用户数据库密码加密的密钥，使用一个比较长的随机字符串即可
const passSecret = 'qwertyuiop'
const tokenExp = 8000000
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)

	let data = {
		appid: loginConfig.AppId,
		secret: loginConfig.AppSecret,
		js_code: event.code,
		grant_type: 'authorization_code'
	}
	console.log(data);
	//向微信发送请求获取用户openId
	const res = await uniCloud.httpclient.request('https://api.weixin.qq.com/sns/jscode2session', {
		method: 'GET',
		data,
		dataType: 'json'
	})
	const success = res.status === 200 && res.data && res.data.openid
	if (!success) {
		return {
			status: -2,
			msg: '微信登录信息获取失败'
		}
	}
	const {
		openid
	} = res.data
	let openidObj = {
		openid
	}
	
	console.log("--------------------");
	console.log(await db.collection('wx_user'));
	console.log("--------------------");
	console.log(openid);
	console.log("--------------------");
	
	const userInfo = event.userInfo
	let tokenSecret = crypto.randomBytes(16).toString('hex'),
		token = jwt.encode(openidObj, tokenSecret)
	const userInDB = await db.collection('wx_user').where({
		openid
	}).get()
	
	console.log("-------------")
	let userUpdateResult
	if (userInDB.data && userInDB.data.length === 0) {
		//没有该用户就新增
		userUpdateResult = await db.collection('wx_user').add({
			...openidObj,
			...userInfo,
			tokenSecret,
			exp: Date.now() + tokenExp
		})
	} else {
		//有该用户就修改
		userUpdateResult = await db.collection('wx_user').doc(userInDB.data[0]._id).set({
			...openidObj,
			...userInfo,
			tokenSecret,
			exp: Date.now() + tokenExp
		})
	}

	if (userUpdateResult.id || userUpdateResult.updated === 1) {
		const userVal = await db.collection('wx_user').where({
			openid
		}).get()
		return {
			status: 1,
			token,
			//该用户的信息
			userInfo: userVal.data[0],
			msg: '登录成功'
		}
	}

	return {
		status: -1,
		msg: '微信登录'
	}
};
