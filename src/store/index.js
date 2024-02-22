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
    cartList: [],
    orders: [],
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
      const data = await axios.post('https://jurapro.bhuser.ru/api-shop/login', {
        email: state.email,
        password: state.password
      })
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
      const data = await axios.post('https://jurapro.bhuser.ru/api-shop/signup', {
        fio: state.fio,
        email: state.email,
        password: state.password
      })
      .then(function(response){
        console.log(response);
        state.user_token = response.data.data.user_token;
        localStorage.token = state.user_token;
        alert('Регистрация прошла успешно');
        if(localStorage.token !== undefined && localStorage.token !== null){
          window.location.href = "/login";
        }
      })
      .catch(error =>{console.log(error)
        alert('Регистрация провалена. Попробуйте еще раз');
      })

      console.log(data);
      console.log(state.user_token);

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