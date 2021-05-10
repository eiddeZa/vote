'use strict';
const db = uniCloud.database();
const dbCmd = db.command;
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const hotlist = db.collection('hot_list')
	const imageTextVote = db.collection('imageTextVote_list')
	const videoTextVote = db.collection('videoTextVote_list')
	const textVote = db.collection('textVote_list')
	// 查询
	let res1 = await hotlist.get();
	let res2 = await imageTextVote.get();
	let res3 = await videoTextVote.get();
	let res4 = await textVote.get();
	
	for (let i = 0; i < res1.data.length; i++) {
		if(res1.data[i].status==2 && res1.data[i].voteMoreTxt.substring(0,2)=="每天"){
			await hotlist.doc(res1.data[i]._id).update({
				updateInfo: dbCmd.remove()
			})
		}
	}
	for (let i = 0; i < res2.data.length; i++) {
		if(res2.data[i].status==2 && res2.data[i].voteMoreTxt.substring(0,2)=="每天"){
			await imageTextVote.doc(res2.data[i]._id).update({
				updateInfo: dbCmd.remove()
			})
		}
	}
	for (let i = 0; i < res3.data.length; i++) {
		if(res3.data[i].status==2 && res3.data[i].voteMoreTxt.substring(0,2)=="每天"){
			await videoTextVote.doc(res3.data[i]._id).update({
				updateInfo: dbCmd.remove()
			})
		}
	}
	for (let i = 0; i < res4.data.length; i++) {
		if(res4.data[i].status==2 && res4.data[i].voteMoreTxt.substring(0,2)=="每天"){
			await textVote.doc(res4.data[i]._id).update({
				updateInfo: dbCmd.remove()
			})
		}
	}
	return res1;
};