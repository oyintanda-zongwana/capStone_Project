import { createStore } from 'vuex'
import axios from "axios"
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

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
    }
  },
  getters: {
    products: (state) => state.products
  }
})