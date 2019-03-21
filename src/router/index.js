import Vue from 'vue'
import Router from 'vue-router'
import Distribute from '@/components/Distribute'
import Games from '@/components/games'
import List from '@/components/list'

Vue.use(Router)

export default new Router({
  //mode:'history',
  routes: [
    {
      path: '/',
      name: 'distribute',
      component: Distribute,
      redirect:'/list',
      children:[
        {
          path: '/list',
          name: 'list',
          component: List,
        },
        {
          path: '/games',
          name: 'Games',
          component: Games,
        }
      
      ]
    }
   
  ],
})
