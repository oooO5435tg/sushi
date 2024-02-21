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
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
