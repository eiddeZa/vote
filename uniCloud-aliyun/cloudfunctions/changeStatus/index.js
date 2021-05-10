'use strict';
const db = uniCloud.database();
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
		if(res1.data[i].status==1&&new Date(res1.data[i].startTime.replace(/-/g, '/')).getTime()<=Date.now()){
			await hotlist.doc(res1.data[i]._id).update({
				status: 2
			})
		}else if (new Date(res1.data[i].endTime.replace(/-/g, '/')).getTime()<=Date.now()) {
			await hotlist.doc(res1.data[i]._id).update({
				status: 3
			})
		} 
	}
	for (let i = 0; i < res2.data.length; i++) {
		if(res2.data[i].status==1&&new Date(res2.data[i].startTime.replace(/-/g, '/')).getTime()<=Date.now()){
			await imageTextVote.doc(res2.data[i]._id).update({
				status: 2
			})
		}else if (new Date(res2.data[i].endTime.replace(/-/g, '/')).getTime()<=Date.now()) {
			await imageTextVote.doc(res2.data[i]._id).update({
				status: 3
			})
		} 
	}
	for (let i = 0; i < res3.data.length; i++) {
		if(res3.data[i].status==1&&new Date(res3.data[i].startTime.replace(/-/g, '/')).getTime()<=Date.now()){
			await videoTextVote.doc(res3.data[i]._id).update({
				status: 2
			})
		}else if (new Date(res3.data[i].endTime.replace(/-/g, '/')).getTime()<=Date.now()) {
			await videoTextVote.doc(res3.data[i]._id).update({
				status: 3
			})
		} 
	}
	for (let i = 0; i < res4.data.length; i++) {
		if(res4.data[i].status==1&&new Date(res4.data[i].startTime.replace(/-/g, '/')).getTime()<=Date.now()){
			await textVote.doc(res4.data[i]._id).update({
				status: 2
			})
		}else if (new Date(res4.data[i].endTime.replace(/-/g, '/')).getTime()<=Date.now()) {
			await textVote.doc(res4.data[i]._id).update({
				status: 3
			})
		} 
	}
	return res1;
};