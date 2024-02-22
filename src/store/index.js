// import { createStore } from 'vuex'

// export default createStore({
//   state: {
//   },
//   getters: {
//   },
//   mutations: {
//   },
//   actions: {
//   },
//   modules: {
//   }
// })


import { createStore } from 'vuex'
import axios from "axios";

export default createStore({
  state: {
    products: [],
    fio: '',
    email: '',
    password: '',
    user_token: null,
    user_auth: false,
  },
  getters: {

  },
  mutations: {
    async getProducts(state){
      const {data} = await axios.get('https://jurapro.bhuser.ru/api-shop/products')
          .then(response => state.products = response.data)
          .catch(error =>{console.log(error)})
      state.products = data;
    },
    async login(state){
      let userInfo = {
        email: state.email,
        password: state.password
      }
      const data = await axios.post('https://jurapro.bhuser.ru/api-shop/login', userInfo)
      .then(function(response){
        state.user_token = response.data.data.user_token;
        localStorage.token = state.user_token;
      })
      .catch(error =>{console.log(error)})

      console.log(data);
      console.log(state.user_token);

      if(localStorage.token !== undefined && localStorage.token !== null){
        window.location.href = "/";
      }
    },
    async registration(state){
      let userInfo = {
        fio: state.fio,
        email: state.email,
        password: state.password
      }
      const data = await axios.post('https://jurapro.bhuser.ru/api-shop/signup', userInfo)
      .then(function(response){
        console.log(response);
        state.user_token = response.data.data.user_token;
        localStorage.token = state.user_token;
      })
      .catch(error =>{console.log(error)})

      console.log(data);
      console.log(state.user_token);

      if(localStorage.token !== undefined && localStorage.token !== null){
        window.location.href = "/login";
      }
    },
    logout(state){
      state.user_token = null;
      localStorage.clear();
    }
  },
  actions: {

  },
  modules: {

  },
})