import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import $ from 'jquery'
import 'assets/css/global.css'

// 将全局的echarts挂载到Vue的原型对象上
// 在别的组件中，用this.$echarts
Vue.prototype.$echarts = window.echarts

// 将axios挂载到Vue原型对象上  在别的组件中，用this.$http
Vue.prototype.$http = axios
// Vue.prototype.HOME = '/api'
axios.defaults.baseURL = '/api'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
