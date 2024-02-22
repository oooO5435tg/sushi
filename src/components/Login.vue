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
 <h1>Вход в систему</h1>
 <div class="login-page">
   <form class="login" @submit.prevent="store.commit('login')">
     <label>Email</label>
     <input required v-model="store.state.email" type="email" placeholder="Email" class="form-control">
     <label>Password</label>
     <input required v-model="store.state.password" type="password" placeholder="Password" class="form-control">
     <button type="submit" class="btn btn-primary">Login</button>
   </form>
 </div>
 <router-link to="/">Вернуться на главную</router-link>
</template>

<style scoped>
.login-page {
 max-width: 400px;
 margin: 3% auto;
 padding: 20px;
 border: 1px solid #ccc;
 border-radius: 5px;
 box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
 background-color: #e1e1e1;
}

.login {
 margin-top: 50px;
}

.login h1 {
 text-align: center;
 margin-bottom: 30px;
}

.login label {
 display: block;
 margin-bottom: 5px;
}

.form-control {
 width: 100%;
 padding: 5px;
 border: 1px solid #ccc;
 border-radius: 5px;
}

.login button {
 width: 100%;
 padding: 5px;
 background-color: #4CAF50;
 color: white;
 border: none;
 border-radius: 5px;
 cursor: pointer;
 margin-top: 20px;
}

.login button:hover {
 background-color: #3e8e41;
}
</style>