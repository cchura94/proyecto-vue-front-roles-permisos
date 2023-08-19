import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/auth/Login.vue'
import Admin from '../views/admin/Admin.vue'
import Perfil from '../views/admin/Perfil.vue'
import AppLayout from "../layout/AppLayout.vue"
import Inicio from "../views/Inicio.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'inicio',
      component: Inicio
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        redirectIfAuth: true
      }
    },
    {
      path: '/admin',
      component: AppLayout,
      meta: { requireAuth: true},
      children: [
        {
          path: '',
          name: 'admin',
          component: Admin,
          meta: { requireAuth: true},
        },
        {
          path: 'perfil',
          name: 'perfil',
          component: Perfil,
          meta: { requireAuth: true},
        },
        {
          path: 'usuario',
          name: 'usuario',
          component: () => import('../views/admin/usuario/Usuario.vue'),
          meta: { requireAuth: true},
        },
        {
          path: 'role',
          name: 'role',
          component: () => import('../views/admin/role/Role.vue'),
          meta: { requireAuth: true},
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/errors/NotFound.vue'),
    }
  ]
})

router.beforeEach((to, from, next) => {
  let token = localStorage.getItem("token")

  if(to.meta.requireAuth) {
    if(!token)
      return next({name: 'Login'});
    return next()
  }

  if(to.meta.redirectIfAuth && token){
    return next({name: 'admin'})
  }

  return next();

})
export default router
