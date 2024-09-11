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
    products: null,
    users: null,
    cart: [] 
  },
  mutations: {
    setProducts(state, payload) {
      state.products = payload;
      console.log('Products state updated:', state.products);
    },
    setUsers(state, users) {
      state.users = users;
    },
    addProduct(state, product) {
      state.products.push(product);
    },
    updateProduct(state, updatedProduct) {
      const index = state.products.findIndex(p => p.id === updatedProduct.id);
      if (index !== -1) {
        state.products.splice(index, 1, updatedProduct);
      }
    },
    deleteProduct(state, productId) {
      state.products = state.products.filter(p => p.id !== productId);
    },
    addUser(state, user) {
      state.users.push(user);
    },
    updateUser(state, updatedUser) {
      const index = state.users.findIndex(u => u.id === updatedUser.id);
      if (index !== -1) {
        state.users.splice(index, 1, updatedUser);
      }
    },
    deleteUser(state, userId) {
      state.users = state.users.filter(u => u.id !== userId);
    },
    setProducts(state, payload) {
      state.products = payload;
    },
    setUsers(state, users) {
      state.users = users;
    },
    addToCart(state, product) {
      const itemInCart = state.cart.find(item => item.id === product.id);
      if (itemInCart) {
        itemInCart.quantity += 1;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }
    },
    removeFromCart(state, productId) {
      state.cart = state.cart.filter(item => item.id !== productId);
    }
  },
  actions: {
    async getProducts({ commit }) {
      try {
        let { data } = await axios.get(`${apiUrl}products`);
        commit('setProducts', Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('Failed to fetch products');
      }
    },
    async getUsers({ commit }) {
      try {
        let { data } = await axios.get(`${apiUrl}users`);
        commit('setUsers', Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching users:', error);
        toast.error('Failed to fetch users');
      }
    },
    async addProduct({ commit }, productData) {
      try {
        const { data } = await axios.post(`${apiUrl}products/addProduct`, productData);
        commit('addProduct', data);
        toast.success('Product added successfully');
      } catch (error) {
        console.error('Error adding product:', error);
        toast.error('Failed to add product');
      }
    },
    async editProduct({ commit }, productData) {
      try {
        const { data } = await axios.put(`${apiUrl}products/update/${productData.id}`, productData);
        commit('updateProduct', data);
        toast.success('Product updated successfully');
      } catch (error) {
        console.error('Error updating product:', error);
        toast.error('Failed to update product');
      }
    },
    async deleteProduct({ commit }, productId) {
      try {
        await axios.delete(`${apiUrl}products/delete/${productId}`);
        commit('deleteProduct', productId);
        toast.success('Product deleted successfully');
      } catch (error) {
        console.error('Error deleting product:', error);
        toast.error('Failed to delete product');
      }
    },
    async addUser({ commit }, userData) {
      try {
        const { data } = await axios.post(`${apiUrl}users/register`, userData);
        commit('addUser', data);
        toast.success('User added successfully');
      } catch (error) {
        console.error('Error adding user:', error);
        toast.error('Failed to add user');
      }
    },
    async editUser({ commit }, userData) {
      try {
        const { data } = await axios.put(`${apiUrl}users/update/${userData.id}`, userData);
        commit('updateUser', data);
        toast.success('User updated successfully');
      } catch (error) {
        console.error('Error updating user:', error);
        toast.error('Failed to update user');
      }
    },
    async deleteUser({ commit }, userId) {
      try {
        await axios.delete(`${apiUrl}users/delete/${userId}`);
        commit('deleteUser', userId);
        toast.success('User deleted successfully');
      } catch (error) {
        console.error('Error deleting user:', error);
        toast.error('Failed to delete user');
      }
    },
    async loginUser({commit}, info) {
      try {
        let {data} = await axios.post(`${apiUrl}users/login`, info);
        $cookies.set('token', data.token);
        if (data.message) {
          toast.success("Login is successful", {
            theme: "dark",
            position: "top-center",
            transition: "zoom",
          });
        }
        await router.push('/');
        location.reload();
      } catch (error) {
        console.error('Error logging in:', error);
        toast.error('Failed to log in');
      }
    },
    async addToCart ({ commit }, prodID) {
      try {
        let { data } = await axios.post(`${apiUrl}products/cart`, { id: prodID });
        console.log("Response from API:", data); // Add this line to log the response
        toast.success('Product added to cart');
      } catch (error) {
        console.error('Error adding to cart:', error.response?.data || error.message); // Log full error details
        toast.error('Failed to add product to cart');
      }
    },
    removeFromCart({ commit }, productId) {
      commit('removeFromCart', productId);
      toast.success('Product removed from cart');
    }
  },
  getters: {
    products: (state) => state.products,
    users: (state) => state.users,
    cartItems: (state) => state.cart 
  }
});