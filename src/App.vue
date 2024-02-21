<template>
  <nav>
    <router-link to="/">Каталог</router-link>
    <router-link to="/cart">Корзина</router-link>
    <router-link to="/orders">Мои заказы</router-link>
  </nav>
  <router-view/>
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

<script setup>
</script>