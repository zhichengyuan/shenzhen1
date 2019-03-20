// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import axios from "axios";
import PubSub from "pubsub-js";
import 'element-ui/lib/theme-chalk/index.css';
import '../static/css/reset.css' /*引入公共样式*/
import Vuex from 'vuex';
import store from '@/stort/index.js';
import {mapState,mapGetters,mapActions}	from 'vuex';

Vue.prototype.$axios = axios;
Vue.use(ElementUI);
Vue.use(Vuex);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
