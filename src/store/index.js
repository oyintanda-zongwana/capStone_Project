import { createStore } from 'vuex'
import axios from "axios"
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import {useCookies} from 'vue-cookies'
import router from '@/router';

axios.defaults.withCredentials = true
axios.defaults.headers = $cookies.get('token')


const apiUrl = 'https://capstone-project-fhbp.onrender.com/'

export default createStore({
  state: {
    products: null,  // Ensure initialization
    users: null
  },
  mutations: {
    setProducts(state, payload) {
      state.products = payload;
      console.log('Products state updated:', state.products); // Ensure correct update
    },
    setUsers(state, users) {
      state.users = users;
    }
  },
  actions: {
    async getProducts({ commit }) {
      try {
        let { data } = await axios.get(`${apiUrl}products`);
        console.log('API response data:', data); // Ensure API response is correct
        commit('setProducts', Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
    async getUsers({ commit }) {
      try {
        let { data } = await axios.get(`${apiUrl}users`);
        console.log('API response data:', data); // Ensure API response is correct
        commit('setUsers', Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    async loginUser({commit},info){
      let {data} =  await axios.post(`${apiUrl}user/login`,info);
      console.log(data);
      $cookies.set('token', data.token)
      if(data.message){
        toast("Login is successful",{
          "theme": "dark",
          "type": "default",
          "position": "top-center",
          "transition": "zoom",
          "dangerouslyHTMLString": true
        })
      }
      await router.push('/')
      location.reload()
    },
    async addUser({commit},info){
      let data = await axios.post(`${apiUrl}users/register`,info);
      console.log(data);
    },
    async addToCart ({commit}, prodID){
      let {data} = await axios.post(`${apiUrl}products/cart`, {id:prodID})
      console.log(data);
    }
  },
  getters: {
    products: (state) => state.products
  }
})


