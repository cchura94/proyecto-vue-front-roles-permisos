import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/auth/Login.vue'
import Admin from '../views/admin/Admin.vue'
import Perfil from '../views/admin/Perfil.vue'
import AppLayout from "../layout/AppLayout.vue"
import Inicio from "../views/Inicio.vue"
import { canNavigate } from '../casl/routeProtection'

import { getUserData, redireccionPorRol } from './../casl/utils'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'inicio',
      component: Inicio,
      meta: {
        resource: 'auth',
        action: 'show'
      }
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
      meta: { 
        requireAuth: true,
        resource: 'admin',
        action: 'index'
      },
      children: [
        {
          path: '',
          name: 'admin',
          component: Admin,
          meta: {
            requireAuth: true,
            resource: 'admin',
            action: 'index'
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
            resource: 'permiso',
            action: 'index'
          },
        }
      ]
    },
    {
      path: '/recuperar-password',
      name: 'RecuperarPassword',
      component: () => import('../views/auth/RecuperarPassword.vue'),
      meta: {
        resource: 'auth',
        action: 'show'
      }
    },
    {
      path: '/reset-password',
      name: 'ResetPassword',
      component: () => import('../views/auth/ResetPassword.vue'),
      meta: {
        resource: 'auth',
        action: 'show'
      }
    },
    {
      path: '/google-auth/callback',
      name: 'Google',
      component: () => import('../views/auth/Google.vue'),
      meta: {
        resource: 'auth',
        action: 'show'
      }
    },
    {
      path: '/no-autorizado',
      name: 'NoAutorizado',
      component: () => import('../views/errors/NoAutorizado.vue'),
      meta: {
        resource: 'auth',
        action: 'show'
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/errors/NotFound.vue'),
    }
  ]
})
/*
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

      // obtener datos usuario
    const userData = getUserData()
    console.log(userData.roles[0].nombre)
    // redireccionar dependiendo del rol
    return next(redireccionPorRol(userData?userData.roles[0].nombre:null))
    // return next() // DEJA PASAR
  }

  // redireccionar si ya esta autenticado
  if(to.meta.redirectIfAuth && token){
    // obtener datos usuario
    const userData = getUserData()
    console.log(userData.roles[0].nombre)
    // redireccionar dependiendo del rol
    return next(redireccionPorRol(userData?userData.roles[0].nombre:null))
    // return next({name: 'admin'})
  }

  return next();

})
*/

router.beforeEach((to, from, next) => {
  let token = localStorage.getItem("token")

  console.log(to)

  if(!canNavigate(to)){
    console.log("NO TENGO PERMISOS");
    if(!token){
      return next({name: 'Login'})
    }
    // si NO tengo permisos
    return next({name: 'NoAutorizado'});
  }

  if(to.meta.redirectIfAuth && token){
    const userData = getUserData();
    console.log(userData.roles[0].nombre);
    return next(redireccionPorRol(userData?userData.roles[0].nombre:null))
  }
  return next();

});
export default router
