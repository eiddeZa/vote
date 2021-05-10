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
	},
	// 获取当前时间
	getTime() {
		let date = new Date();
		let y = date.getFullYear();
		let m = date.getMonth() + 1;
		let d = date.getDate();
		let h = date.getHours();
		let min = date.getMinutes();
		// let s = date.getSeconds()
		if (m >= 1 && m <= 9) {
			m = `0${m}`;
		}
		if (d >= 1 && d <= 9) {
			d = `0${d}`;
		}
		if (h >= 0 && h <= 9) {
			h = `0${h}`;
		}
		if (min >= 0 && min <= 9) {
			min = `0${min}`;
		}
		// if (s >= 0 && s <= 9) { min = `0${s}` }
		return `${y}-${m}-${d} ${h}:${min}`;
	},
	// 获取当前时间的明天
	getTomorrow() {
		let date = new Date();
		let y = date.getFullYear();
		let m = date.getMonth() + 1;
		let d = date.getDate()+1;
		let h = date.getHours();
		let min = date.getMinutes();
		// let s = date.getSeconds()
		if (m >= 1 && m <= 9) {
			m = `0${m}`;
		}
		if (d >= 1 && d <= 9) {
			d = `0${d}`;
		}
		if (h >= 0 && h <= 9) {
			h = `0${h}`;
		}
		if (min >= 0 && min <= 9) {
			min = `0${min}`;
		}
		// if (s >= 0 && s <= 9) { min = `0${s}` }
		return `${y}-${m}-${d} ${h}:${min}`;
	}
}
