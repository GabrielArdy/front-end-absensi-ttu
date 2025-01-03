import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  Router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('authToken') // Mengambil token dari localStorage
    const isLoginPage = to.path === '/' // Cek apakah pengguna mencoba mengakses halaman login

    if (isLoginPage && token) {
      // Jika pengguna mencoba mengakses halaman login dan sudah memiliki token,
      // arahkan langsung ke halaman home
      next('/home')
    } else if (!isLoginPage && !token) {
      // Jika pengguna mencoba mengakses halaman selain login, namun tidak ada token,
      // arahkan mereka ke halaman login
      next('/')
    } else {
      // Jika tidak ada masalah, lanjutkan ke halaman yang diminta
      next()
    }
  })

  return Router
}
