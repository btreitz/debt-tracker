import Vue from 'vue'
import Router from 'vue-router'
import LoginRegProcess from '../components/LoginRegProcess'
import MainViews from '../components/MainViews'
import Contact from '../components/Contact'
import ContactError from '../components/ContactError'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'LoginRegProcess',
      component: LoginRegProcess
    },
    {
      path: '/home',
      name: 'MainViews',
      component: MainViews,
    },
    {
      path: '/contact/:id',
      name: 'Contact',
      component: Contact,
    },
    {
      path: '/contact/not-found',
      name: 'ContactError',
      component: ContactError,
    }
  ]
})
