<template>
  <div id="app">
    <div id="nav" style="position: fixed; top: 0; left: 0; width: 100%; z-index: 1000;">
      <div class="icon-block">
        <img src="../public/favicon.png" style="width: 40px; height: 40px" />
        <h2 style="color: #b9533c; font-family: cursive; font-weight: 600; font-size: 18px; margin-left: 5%">ARIGATO</h2>
      </div>
      <div class="nav-left-block">
        <router-link to="/">КАТАЛОГ</router-link>
        <router-link to="/cart">КОРЗИНА</router-link>
      </div>
      <div class="nav-right-block">
        <router-link to="/login">ВХОД</router-link>
        <router-link to="/registration">РЕГИСТРАЦИЯ</router-link>
        <router-link to="/" style="display: none">ВЫХОД</router-link>
      </div>
    </div>
    <div id="nav-spacer" style="height: 60px;"></div>
    <router-view />
    <div id="footer">
      <p>&copy; 2024 Arigato. All rights reserved.</p>
    </div>
  </div>
</template>

<style>
body{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#nav{
  height: 60px;
  padding: 0 0 0 10%;
  background: rgba(18, 18, 18, 1);
  display: flex;
  align-items: center;
}
#nav a{
  font-family: system-ui;
  font-weight: 600;
  font-size: 16px;
  color: white;
  margin-right: 30%;
  text-decoration: none;
}
#nav a:hover{
  text-decoration: underline;
}
.nav-left-block{
  margin-right: 30%;
}
.icon-block{
  display: flex;
  align-items: center;
  margin-right: 30%;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: rgba(255, 234, 182, 1);
}

#footer {
  background: rgba(18, 18, 18, 1);
  color: white;
  padding: 20px;
  text-align: center;
  margin-top: auto;
}
</style>

<script>
import store from "@/store";
export default {
  computed:{
    store(){
      return store
    },
  },
}
</script>