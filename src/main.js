import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import http from '@/api/request.js'
import config from '@/api/config.js'
import tf from '@/api/tool.js'

Vue.prototype.$config = config
Vue.prototype.$tf = tf

Vue.prototype.$http = http

Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
export default {}
router.beforeEach((to, from, next) => {
  console.log('to', to)
  console.log('from', from)
  if (to.name != 'Login' && localStorage.getItem('token') == null) {
    next('/login')
  } else {
    next()
  }
})
