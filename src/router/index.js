import { createRouter, createWebHistory } from 'vue-router'
import Catalog from '../components/Catalog.vue'
import ShoppingCart from '../components/ShoppingCart.vue'
import Orders from '../components/Orders.vue'

const routes = [
  {
    path: '/',
    name: 'catalog',
    component: Catalog
  },
  {
    path: '/cart',
    name: 'cart',
    component: ShoppingCart
  },
  {
    path: '/orders',
    name:'orders',
    component: Orders
  },
  // {
  //   path: '/login',
  //   name: 'login',
  //   component: LoginView
  // },
  // {
  //   path: '/registration',
  //   name:'registration',
  //   component: RegistrationView
  // },
  // {
  //   path: '/logout',
  //   name:'logout',
  //   component: Catalog
  // },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
