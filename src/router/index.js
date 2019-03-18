import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Distribute'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Distribute',
      component: Home
    }
  ]
})
