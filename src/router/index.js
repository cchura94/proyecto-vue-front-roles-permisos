import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/auth/Login.vue'
import Admin from '../views/admin/Admin.vue'
import Perfil from '../views/admin/Perfil.vue'
import AppLayout from "../layout/AppLayout.vue"
import Inicio from "../views/Inicio.vue"
import { canNavigate } from '../casl/routeProtection'

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
        redirectIfAuth: true,
        resource: 'auth',
        action: 'show'
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
          meta: {
            requireAuth: true,
            resource: 'auth',
            action: 'show'
          },
        },
        {
          path: 'perfil',
          name: 'perfil',
          component: Perfil,
          meta: {
            requireAuth: true,
            resource: 'perfil',
            action: 'index'
          },
        },
        {
          path: 'usuario',
          name: 'usuario',
          component: () => import('../views/admin/usuario/Usuario.vue'),
          meta: { 
            requireAuth: true,
            resource: 'user',
            action: 'index'
          },
        },
        {
          path: 'role',
          name: 'role',
          component: () => import('../views/admin/role/Role.vue'),
          meta: { 
            requireAuth: true,
            resource: 'role',
            action: 'index'
          },
        },
        {
          path: 'role/:id',
          name: 'roleEdit',
          component: () => import('../views/admin/role/RoleEdit.vue'),
          meta: { 
            requireAuth: true,
            resource: 'role',
            action: 'update'
          },
        },
        {
          path: 'permiso',
          name: 'Permiso',
          component: () => import('../views/admin/role/Permiso.vue'),
          meta: { 
            requireAuth: true,
            resource: 'auth',
            action: 'show'
          },
        }
      ]
    },
    {
      path: '/recuperar-password',
      name: 'RecuperarPassword',
      component: () => import('../views/auth/RecuperarPassword.vue'),
    },
    {
      path: '/reset-password',
      name: 'ResetPassword',
      component: () => import('../views/auth/ResetPassword.vue'),
    },
    {
      path: '/no-autorizado',
      name: 'NoAutorizado',
      component: () => import('../views/errors/NoAutorizado.vue'),
      meta: {
        resource: 'auth'
      }
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

  if(!canNavigate(to)){
    console.log("NO TENGO PERMISOS");
    if(!token){
      return next({name: 'Login'})
    }
    // si NO tengo permisos
    return next({name: 'NoAutorizado'});

  }

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
