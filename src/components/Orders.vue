<script>
import store from "@/store";

export default {
  computed: {
    store() {
      return store
    }
  },
  created() {
    this.$store.dispatch('loadOrders');
  },
  methods: {
    viewOrderDetails(orderId) {
      console.log(`Viewing order details for order ID ${orderId}`);
    },
    getOrderTotalPrice(order) {
      if (!order || !order.products) {
        return 0;
      }
      return order.products.reduce((total, product) => total + product.price * product.quantity, 0);
    },
    async getProductName(productId) {
      const token = store.state.user_token;
      if (token) {
        try {
          const response = await axios.get(`https://jurapro.bhuser.ru/api-shop/products/${productId}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          return response.data.data.name;
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log('User is not authenticated');
      }
    },
  },
}
</script>

<template>
  <h1>Заказы пользователя</h1>
  <div v-if="store.state.orderList.length > 0">
    <div id="orders">
      <div class="order_item" v-for="order in store.state.orderList" :key="order.id">
        <h2>Заказ #{{ order.id }}</h2>
        <p>Товары:</p>
        <ul>
          <li v-for="productId in order.products" :key="productId">
            {{ getProductName(productId) }}
          </li>
        </ul>
        <p>Итого: {{ getOrderTotalPrice(order) }} руб.</p>
        <button class="view_btn" @click="viewOrderDetails(order.id)">Подробнее</button>
      </div>
    </div>
  </div>
  <div v-else>
    <h3>У вас еще нет заказов</h3>
  </div>
  <router-link to="/">Вернуться на главную</router-link>
</template>

<style scoped>

</style>