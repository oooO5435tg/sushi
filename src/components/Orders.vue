<script>
import store from "@/store";

export default {
  computed: {
    store() {
      return store
    }
  },
  mounted() {
    this.$store.commit('getOrders');
  },
  methods: {
    getOrderTotalPrice(order) {
      if (!order || !order.products) {
        return 0;
      }
      return order.products.reduce((total, product) => total + product.price * product.quantity, 0);
    },
  },
}
</script>

<template>
  <h1>Заказы пользователя</h1>
  <div v-if="store.state.orderList.length > 0">
    <div id="orders">
      <div class="order" v-for="order in store.state.orderList" :key="order.id">
        <h2>Заказ #{{ order.id }}</h2>
        <p>Список товаров в заказе:</p>
          <p v-for="item in order.products" :key="item">
          <h4>Товар:</h4>
            <div class="prod_item">
              <p class="item">id товара: {{ item }}</p>
              <p class="item">название товара: {{ this.store.state.products.find(p => p.id === item).name }}</p>
              <p>стоимость: {{ order.order_price }} руб.</p>
            </div>
          </p>
      </div>
    </div>
  </div>
  <div v-else>
    <h3>У вас еще нет заказов</h3>
  </div>
  <router-link to="/">Вернуться на главную</router-link>
</template>

<style scoped>
#orders{
  display: flex;
  flex-direction: column;
  align-items: center;
}

.order {
  width: 20%;
  background-color: #e1e1e1;
  border-radius: 5px;
  padding: 10px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  margin-bottom: 30px;
}

.order:hover {
  transform: translateY(-5px);
}

.prod_item{
  margin-bottom: 30px;
}

.order h2 {
  margin: 0 0 10px;
}

.order p {
  margin: 10px;
}

.view_btn {
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 14px;
  margin: 0 10px;
}

.view_btn:hover {
  color: #f00;
}
</style>