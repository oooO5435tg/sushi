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
            alert('Авторизация прошла успешно');
          })
          .catch(error =>{console.log(error)
            alert('Авторизация провалена. Попробуйте еще раз');
          })
      if(localStorage.token !== undefined && localStorage.token !== null){
        window.location.href = "/";
      }
    },
    logout(state){
      state.user_token = null;
      // localStorage.clear();
      // localStorage.removeItem('userOrders');
    },
    // logout(state) {
    //   state.user_token = null;
    //   localStorage.removeItem('user_token');
    // },

    // addProductToCart(state, product) {
    //   axios.post(`https://jurapro.bhuser.ru/api-shop/cart/${product.id}`)
    //       .then(response => {
    //         state.cartList.push(response.data.data);
    //       })
    //       .catch(error => {
    //         console.log(error);
    //       });
    // },
    addProductToCart(state, product) {
      const token = state.user_token;
      if (token) {
        axios.post(`https://jurapro.bhuser.ru/api-shop/cart/${product.id}`, {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
            .then(response => {
              state.cartList.push(response.data.data);
            })
            .catch(error => {
              console.log(error);
            });
      } else {
        console.log('Пользователь не авторизован');
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
              state.cartList = response.data.data;
            })
            .catch(error => {
              console.log(error);
            });
      } else {
        console.log('Пользователь не авторизован');
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
                console.log('Попытка удалить товар не из своей корзины');
              } else {
                console.log(error);
              }
            });
      } else {
        console.log('Пользователь не авторизован');
      }
    },
    async placeOrder(state) {
      const token = state.user_token;
      if (token) {
        try {
          const response = await axios.post(
              'https://jurapro.bhuser.ru/api-shop/order',
              {},
              {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              }
          );
          if (response.status === 201) {
            state.orderList.unshift(response.data.data);
            localStorage.setItem('userOrders', JSON.stringify(state.orderList));
            state.cartList = []; // Clear the cart after a successful order
          }
        } catch (error) {
          if (error.response && error.response.status === 422) {
            console.log('Cart is empty');
          } else {
            console.log(error);
          }
        }
      } else {
        console.log('User is not authenticated');
      }
    },
    setOrders(state, orders) {
      state.orderList = orders;
    },
  },
  actions: {
    async loadOrders({ commit }) {
      const storedOrders = localStorage.getItem('userOrders');
      if (storedOrders) {
        commit('setOrders', JSON.parse(storedOrders));
      }
    },
  },
  modules: {

  },
})