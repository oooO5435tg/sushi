import { createStore } from 'vuex'
import axios from "axios";

export default createStore({
  state: {
    fio: '',
    email: '',
    password: '',
    user_token: null,
    products: [],
    cartList: [],
    orderList: [],
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
    async registration(state){
      const data = await axios.post('https://jurapro.bhuser.ru/api-shop/signup', {
        fio: state.fio,
        email: state.email,
        password: state.password
      })
      .then(function(response){
        state.user_token = response.data.data.user_token;
        localStorage.token = state.user_token;
        alert('Регистрация прошла успешно');
        if(localStorage.token !== null && localStorage.token !== undefined){
          window.location.href = "/login";
        }
      })
      .catch(error =>{console.log(error)
        alert('Регистрация провалена. Попробуйте еще раз');
      })
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
          .catch(error =>{console.log(error)
            alert('Авторизация провалена. Попробуйте еще раз');
          })
      if(localStorage.token !== undefined && localStorage.token !== null){
        window.location.href = "/";
      }
    },
    async logout(state) {
      const token = state.user_token;
      const response = await axios.get(`https://jurapro.bhuser.ru/api-shop/logout`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
          .then(response => {
            if (response.status === 200 && response.data.data.message === 'logout') {
            }
          })
          .catch(error => {console.log(error);
          });
      state.user_token = null;
    },
    addProductToCart(state, product) {
      const token = state.user_token;
      if (token) {
        axios.post(`https://jurapro.bhuser.ru/api-shop/cart/${product.id}`, {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
            .then(response => {
              response.data.data.quantity = 1;
              state.cartList.push(response.data.data);
            })
            .catch(error => {console.log(error);
            });
      }
    },
    getCart(state) {
      const token = state.user_token;
      if (token) {
        axios.get(`https://jurapro.bhuser.ru/api-shop/cart`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
            .then(response => {
              if(state.cartList.length === 0){
                console.log("error", { code: "402", message: "Cart is empty" });
              }
              state.cartList = response.data.data;
            })
            .catch(error => {console.log(error);
            });
      }
    },
    removeProductFromCart(state, productId) {
      const token = state.user_token;
      if (token) {
        axios.delete(`https://jurapro.bhuser.ru/api-shop/cart/${productId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
            .then(response => {
              const index = state.cartList.findIndex(product => product.id === productId);
              if (index !== -1) {
                state.cartList.splice(index, 1);
              }
            })
            .catch(error => {
              if (error.response && error.response.data && error.response.data.error && error.response.data.error.code === 403) {
                
              }
            });
      }
    },

    async createOrder(state) {
      const token = state.user_token;
      let newOrder = state.cartList.map(item => ({...item}))
      if (token) {
        axios.post(`https://jurapro.bhuser.ru/api-shop/order`, newOrder, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
          .then(response => {
            if (response.status === 201) {
              state.cartList.splice(0, state.cartList.length);
            }
          })
          .catch(error => {
            if (error.response && error.response.status === 422) {
              
            }
          });
      }
    },
    async getOrders(state){
      const token = state.user_token;
      if (token) {
        const {data} = await axios.get('https://jurapro.bhuser.ru/api-shop/order',{
        headers:{
          Authorization: `Bearer ${token}`
        }
        })
          .then(response => state.orderList = response.data)
          .catch(error =>{console.log(error)})
        state.orderList = data;
      }
    },
  },
  actions: {

  },
  modules: {

  },
})