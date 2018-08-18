// import 'babel-polyfill'
import Vue from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'
import VueLazyLoad from 'vue-lazyload'
import axios from 'axios'

import '@/common/stylus/index.styl'

const isDev = process.env.NODE_ENV === 'production' ? false : true
if (isDev) {
  axios.defaults.baseURL = "/api"
}

Vue.use(VueLazyLoad, {
  loading: require('common/image/default.png')
})

Vue.config.productionTip = false
/* eslint-disable */
router.beforeEach((to, from, next) => {
  console.log(to, from)
  next()
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')