export default {

	//跳转页面
	redirect: function(url) {
		uni.navigateTo({
			url: url,
			animationType: 'pop-in',
			animationDuration: 300
		})
	},

	//吐司
	toast: function(options) {
		let {
			title,
			duration,
			icon
		} = options;
		uni.showToast({
			title: title,
			duration: 2000,
			icon: icon || "none"
		});
	},

	//隐藏手机号中间位
	hidePhone: function(number) {
		let newStr = '';
		newStr = number.slice(0, 3) + '****' + number.slice(7);
		return newStr;
	},

	// 云函数请求
	uniCloud: async (name, data) => {
		uni.showLoading({
			title: '加载中...',
			mask: true
		})
		try {
			let res = await uniCloud.callFunction({
				name, // 云函数名字
				data // 传输数据
			})
			return res
		} catch (e) {
			return e
		} finally {
			uni.hideLoading()
		}
	}

}
