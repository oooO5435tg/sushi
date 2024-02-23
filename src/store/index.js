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
        console.log(response.data.data);
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
            console.log(response.data.data);
            alert('Авторизация прошла успешно');
          })
          .catch(error =>{console.log(error)
            alert('Авторизация провалена. Попробуйте еще раз');
          })
      if(localStorage.token !== undefined && localStorage.token !== null){
        window.location.href = "/";
      }
    },
    // logout(state){
    //   state.user_token = null;
    //   // localStorage.clear();
    //   // localStorage.removeItem('userOrders');
    // },
    async logout(state) {
      const token = state.user_token;
      const response = await axios.get(`https://jurapro.bhuser.ru/api-shop/logout`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
          .then(response => {
            if (response.status === 200 && response.data.data.message === 'logout') {
              console.log(response.data);
              // localStorage.removeItem('user_token');
            }
          })
          .catch(error => {console.log(error);
          });
      state.user_token = null;
      localStorage.clear();
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
              console.log({ data: { message: 'Product add to cart' } });
              response.data.data.quantity = 1;
              state.cartList.push(response.data.data);
            })
            .catch(error => {console.log(error);
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
              console.log({ data: response.data.data });
              state.cartList = response.data.data;
            })
            .catch(error => {console.log(error);
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
                console.log({ data: { message: 'Item removed from cart' } });
              }
            })
            .catch(error => {
              if (error.response && error.response.data && error.response.data.error && error.response.data.error.code === 403) {
                console.log({ error: { code: error.response.data.error.code, message: error.response.data.error.message } });
              } else {
                console.log(error);
              }
            });
      } else {
        console.log('Пользователь не авторизован');
      }
    },
    updateCartQuantity(state, { productId, newQuantity }) {
      const productToUpdate = state.cartList.find((product) => product.id === productId);
      if (productToUpdate) {
        productToUpdate.quantity = newQuantity;
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
            state.cartList = [];
            console.log({ data: { order_id: response.data.data.id, message: 'Order is processed' } });
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
        console.log({ data: { orders: JSON.parse(storedOrders) } });
      }
    },
  },
  modules: {

  },
})