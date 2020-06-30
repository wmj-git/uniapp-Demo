import Vue from 'vue'
import App from './App'

import pageHead from './components/page-head.vue'
import store from './store'
Vue.config.productionTip = false


Vue.component('page-head', pageHead)
App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
