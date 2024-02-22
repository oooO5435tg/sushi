<template>
  <nav>
    <router-link to="/">Каталог</router-link>
    <router-link to="/cart">Корзина</router-link>
    <router-link to="/orders">Мои заказы</router-link>
    <router-link to="/registration">Регистрация</router-link>
    <router-link to="/login">Вход</router-link>
    <p v-show="isLoggedIn"><router-link to="/">Выход</router-link></p>
  </nav>
  <router-view :cart="cart" @update:cart="cart = $event" />
  <router-view v-slot="{ ShoppingCart }">
    <component :is="ShoppingCart" v-if="ShoppingCart" />
  </router-view>
</template>

<style>
body{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app{
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
nav{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  background-color: #42b983;
}
nav a{
  color: #fff;
  text-decoration: none;
  margin: 0 10px;
  padding: 10px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}
nav a:hover{
  background-color: #37a073;
}
nav a.router-link-exact-active{
  background-color: #37a073;
}
</style>

<script>
import store from "@/store";
export default {
  computed:{
    isLoggedIn() {
      console.log("isLoggedIn called");
      return this.$store.state.user_token !== null;
    },
    store(){
      return store
    }
  },
  methods: {
    logout() {
      store.commit("logout");
    },
  },
}
</script>