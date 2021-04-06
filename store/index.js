import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		hasLogin: false,
		tabbarList: 
		[{
							iconPath: "/static/image/indexIcon.png",
							selectedIconPath: "/static/image/indexSelectedIcon.png",
							text: '首页',
							pagePath: "/pages/index/index"
						},
						{
							iconPath: "/static/image/addIcon.png",
							selectedIconPath: "/static/image/addSelectedIcon.png",
							text: '发布',
							midButton: true,
							pagePath: "/pages/issue/issue"
						},
						{
							iconPath: "/static/image/mineIcon.png",
							selectedIconPath: "/static/image/mineSelectedIcon.png",
							text: '我的',
							pagePath: "/pages/mine/mine"
						},
					],
					
	},
	mutations: {
		 //更新德卡返回code 用于德卡返回code
		        updated_DK_callback(state, DK_callback) {
		            state.DK_callback = DK_callback
		        }
	},
	actions: {

	}
})

export default store;