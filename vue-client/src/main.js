import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/elementui.js'
import axios from './plugins/axios/request'

Vue.config.productionTip = false
Vue.prototype.$axios=axios


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
