import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'; // element
import 'element-ui/lib/theme-chalk/index.css'; // element css
import '@/styles/index.scss' // global css
// 引入bmob
import Bmob from 'hydrogen-js-sdk'
Vue.config.productionTip = false
Bmob.initialize("0a289fb6fba678e1", "abc123","7630703ed2320ccd54a16d3340f86732");// 初始化

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'
Vue.config.productionTip = false

Vue.use(ElementUI);

new Vue({
  components: {
    App
  },
  router,
  store,
  template: '<App/>'
}).$mount('#app')