<template>
  <h1>Корзина</h1>
  <div v-if="store.state.cartList.length > 0">
    <div id="products">
      <div class="product_item" v-for="item in store.state.cartList" :key="item.id">
        <h2>{{ item.name }}</h2>
        <p>{{ item.price }} руб.</p>
        <button class="quantity_btn">-</button>
        <span class="quantity">Кол-во: {{ item.quantity }}</span>
        <button class="quantity_btn">+</button>
        <button class="remove_btn" @click="removeProductFromCart(item.id)">Удалить из корзины</button>
      </div>
    </div>
    <button class="order_btn" @click="clearCart">Оформить заказ</button>
  </div>
  <div v-else>
    <h3>Ваша корзина пуста</h3>
  </div>
  <router-link to="/">Вернуться на главную</router-link>
</template>

<script>
import store from "@/store";

export default {
  computed: {
    store() {
      return store
    }
  },
  created() {
    this.$store.commit('getCart');
  },
  methods:{
    removeProductFromCart(productId) {
      this.$store.commit('removeProductFromCart', productId);
    }
  }
}
</script>

<style>
.products {
  display: grid;
  grid-template-columns: repeat(5, 200px);
  gap: 90px;
}

.product_item {
  width: 220px;
  background-color: #f2f2f2;
  border-radius: 5px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  margin-bottom: 50px;
}

.product_item:hover {
  transform: translateY(-5px);
}

.product_item h2 {
  margin: 0 0 10px;
}

.product_item p {
  margin: 5px 0;
}
</style>