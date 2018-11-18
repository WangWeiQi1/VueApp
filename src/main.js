// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import VueLazyLoad from 'vue-lazyload' //vue懒加载插件
import store from './store'

fastclick.attach(document.body) //解决移动端点击延迟300ms问题

Vue.config.productionTip = false

/* eslint-disable no-new */
import './common/stylus/index.styl'

Vue.use(VueLazyLoad,{
  loading: require('./common/image/default.png')
})

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
