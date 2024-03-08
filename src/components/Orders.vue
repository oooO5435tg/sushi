<script>
import store from "@/store";

export default {
  computed: {
    store() {
      return store
    }
  },
  methods: {

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

</style>