// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'

Vue.use(Vuetify)
Vue.config.productionTip = false

window.$state = new Vue()

/* eslint-disable no-new */
window.$vm = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
