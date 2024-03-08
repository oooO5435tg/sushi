<script>
import store from "@/store";
export default {
  computed:{
    store(){
      return store
    }
  }
}
</script>

<template>
  <div style="display: flex; flex-direction: column; align-items: center; padding: 2%">
    <div style="width: 20%; height: 5%; background: rgba(97, 10, 5, 1); border: none; border-radius: 15px; display: flex; justify-content: center; margin-bottom: 2%">
      <h1 style="color: rgba(255, 234, 182, 1);">Вход в систему</h1>
    </div>
    <form class="login" @submit.prevent="store.commit('login')" style="width: 30%; padding: 2%; display: flex; flex-direction: column; align-items: center; background: rgba(97, 10, 5, 1);">
      <input required v-model="store.state.email" type="email" placeholder="Почта" class="form-control">
      <input required v-model="store.state.password" type="password" placeholder="Пароль" class="form-control">
      <button type="submit">Войти</button>
    </form>
  </div>
</template>

<style scoped>
.login input{
  width: 100%;
  height: 30px;
  font-size: 16px;
  padding: 5px;
  border: none;
  border-radius: 5px;
  margin-bottom: 5%;
}
.login button{
  width: 50%;
  height: 30px;
  border: 3px solid rgba(255, 234, 182, 1);
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: rgba(255, 234, 182, 1);
  padding: 4%;
}
.login button:hover{
  background: rgba(255, 234, 182, 1);
  color: rgba(97, 10, 5, 1);
}
</style>