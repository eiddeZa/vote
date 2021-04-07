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
					
					hasLogin: false,
					user: null,
					code:'',
					
	},
	mutations: {
		login(state, user) {
			state.hasLogin = true;
			state.user = user;
		},
		logout(state) {
			state.hasLogin = false;
			state.user = user;
		},
		setCode(state,code){
			state.code = code;
		}
	},
	actions: {

	}
})

export default store;