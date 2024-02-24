<template>
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
    <button class="order_btn" @click="store.commit('createOrder')" :disabled="store.state.cartList.length === 0">
      Оформить заказ
    </button>
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
    },
    totalPrice() {
      if (!Array.isArray(this.store.state.cartList)) {
        return 0;
      }
      return this.store.state.cart.reduce((total, product) => {
        return total + product.price;
      }, 0);
    }
  },
  mounted() {
    this.$store.commit('getCart');
  },
  methods:{
    removeProductFromCart(productId) {
      this.$store.commit('removeProductFromCart', productId);
    },
  }
}
</script>

<style>
#products {
  display: grid;
  grid-template-columns: repeat(5, 200px);
  gap: 90px;
  margin-left: 100px;
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

.quantity_btn {
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 20px;
  margin: 0 10px;
}

.quantity_btn:hover {
  color: #f00;
}

.remove_btn {
  background-color: #f00;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 14px;
  margin: 0 10px;
}

.remove_btn:hover {
  background-color: #800;
}

.order_btn {
  background-color: #48b632;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 14px;
  margin: 0 10px;
}

.order_btn:hover {
  background-color: #369620;
}
</style>