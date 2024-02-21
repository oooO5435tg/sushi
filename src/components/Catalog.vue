<script>
// import store from "@/store";
// export default {
//   computed: {
//     store() {
//       return store
//     }
//   },
//   methods:{
//
//   },
//   mounted() {
//     this.$store.commit('getProducts');
//   }
// }
import axios from "axios";
export default {
  data() {
    return {
      catalog: [],
      cart: {},
    };
  },
  async mounted() {
    try{
      const response = await axios.get("https://jurapro.bhuser.ru/api-shop/products");
      this.catalog = response.data.data;
      console.log(this.catalog);
    }
    catch (error) {
      console.error("Error fetching products:", error);
    }
  },
  methods: {
    addToCart(item) {
      if (this.cart[item.id]) {
        this.cart[item.id].quantity++;
      } else {
        this.cart[item.id] = { ...item, quantity: 1 };
      }
      this.$emit('update:cart', this.cart);
    },
  }
};
</script>

<template>
  <h1>Каталог товаров</h1>
  <div id="catalog">
    <div class="products">
      <div class="product_item" v-for="item in this.catalog">
        <h2>{{ item.name }}</h2>
        <p>{{ item.description }}</p>
        <p>{{ item.price }} руб.</p>
        <button class="add_btn" @click="addToCart(item)">В корзину</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
#catalog{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.products{
  display: grid;
  grid-template-columns: repeat(5, 200px);
  gap: 90px;
}
.product_item{
  width: 220px;
  background-color: #f2f2f2;
  border-radius: 5px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}
.product_item:hover{
  transform: translateY(-5px);
}
.product_item h2{
  margin: 0 0 10px;
}
.product_item p{
  margin: 5px 0;
}
.add_btn{
  width: 200px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
}
.product_item button:hover{
  background-color: #37a073;
}
</style>