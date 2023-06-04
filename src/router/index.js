import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'board',
      component: () => import('../views/BoardView.vue'),
      children: [
        {
          path: 'task/:id',
          name: 'task',
          component: () => import('../views/TaskView.vue'),
        }
      ]
    },
  ]
})

export default router
