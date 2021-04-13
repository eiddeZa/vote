import Vue from 'vue'
import App from './App'
import store from './store'

import operate from "common/operate.js" //全局js
Vue.prototype.$operate = operate

Vue.config.productionTip = false
App.mpType = 'app'

import uView from "uview-ui";
Vue.use(uView);

const app = new Vue({
	store,
    ...App
})
app.$mount()
