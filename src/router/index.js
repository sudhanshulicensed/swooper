import Vue from 'vue'
import VueRouter from 'vue-router'
import BoardView from '../views/BoardView.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'board',
      component: BoardView
    },
  ]
})

export default router
