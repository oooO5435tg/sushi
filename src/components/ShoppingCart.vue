<template>
  <div v-if="cartItems.length > 0">
    <h1>Корзина</h1>
    <div id="products">
      <div class="product_item" v-for="item in cartItems" :key="item.id">
        <h2>{{ item.name }}</h2>
        <p>{{ item.price }} руб.</p>
        <button class="quantity_btn" @click="decreaseQuantity(item)">-</button>
        <span class="quantity">{{ item.quantity }}</span>
        <button class="quantity_btn" @click="increaseQuantity(item)">+</button>
        <button class="remove_btn" @click="removeFromCart(item)">Удалить</button>
      </div>
    </div>
    <button class="order_btn" @click="clearCart">Оформить заказ</button>
  </div>
  <div v-else>
    <h1>Корзина пуста</h1>
  </div>
</template>

<script>
export default {
  props: {
    cart: {
      type: Object,
      required: true,
    },
  },
  computed: {
    cartItems() {
      return Object.values(this.cart).map(item => ({...item, quantity: 1}));
    },
  },
  methods: {
    increaseQuantity(item) {
      this.$emit('update:cart', {
        ...this.cart,
        [item.id]: {...item, quantity: (this.cart[item.id].quantity || 0) + 1},
      });
    },
    decreaseQuantity(item) {
      if (this.cart[item.id].quantity > 1) {
        this.$emit('update:cart', {
          ...this.cart,
          [item.id]: {...item, quantity: (this.cart[item.id].quantity || 0) - 1},
        });
      }
    },
    removeFromCart(item) {
      const newCart = {...this.cart};
      delete newCart[item.id];
      this.$emit('update:cart', newCart);
    },
    clearCart() {
      this.$emit('update:cart', {});
    },
  },
};
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