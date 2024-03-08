<template>
  <div style="display: flex; flex-direction: column; align-items: center">
    <h1>Корзина</h1>
    <div v-if="store.state.cartList.length > 0">
      <div id="products">
        <div class="product_item" v-for="item in store.state.cartList" :key="item.id">
          <div>
            <h2>{{ item.name }}</h2>
            <p>{{ item.price }} руб.</p>
            <button class="quantity_btn">-</button>
            <span class="quantity">Кол-во: {{ item.quantity }}</span>
            <button class="quantity_btn">+</button>
            <button class="remove_btn" @click="removeProductFromCart(item.id)">Удалить из корзины</button>
          </div>
        </div>
      </div>
      <h4 class="totalPrice">Итого: {{ totalPrice }} руб.</h4>
      <button class="order_btn" @click="store.commit('createOrder')" :disabled="store.state.cartList.length === 0">Оформить заказ</button>
    </div>
    <div v-else>
      <h3>Ваша корзина пуста</h3>
    </div>
  </div>
</template>

<script>
import store from "@/store";

export default {
  computed: {
    store() {
      return store
    },
  },
  methods:{

  }
}
</script>

<style>

</style>