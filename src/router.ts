import {
  createRouter,
  createWebHistory
} from 'vue-router'

import Home  from '@/views/Home.vue'
import NewPost  from '@/views/NewPost.vue'
import ShowPost  from '@/views/ShowPost.vue'
import EditPost  from '@/views/EditPost.vue'
import {Store} from './store'

export function routerWithStore(store: Store) {

  const router = createRouter({
    history: createWebHistory(process.env.NODE_ENV === 'production' ? '/vue3-js-composition-api' : undefined),
    routes: [
      {
        path: '/',
        component: Home
      },
      {
        path: '/posts/new',
        component: NewPost,
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/posts/:id',
        component: ShowPost
      },
      {
        path: '/posts/:id/edit',
        component: EditPost,
        meta: {
          requireAuth: true
        }
      },
    ]
  })

  router.beforeEach((to, from, next) => {
    const auth = !!store.getState().authors.currentUserId

    if(!to.meta.requireAuth) {
      next()
      return
    }

    if(to.meta.requireAuth && auth) {
      next()
    } else {
      next({
        path: '/'
      })
    }
  })

  return router
}