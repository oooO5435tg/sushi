<script>
import axios from "axios";
export default {
  data() {
    return {
      catalog: []
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
        <button class="add_btn">В корзину</button>
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
</style>