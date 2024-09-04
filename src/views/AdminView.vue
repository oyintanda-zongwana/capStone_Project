<template>
    <div class="admin">
      <h1>Admin Dashboard</h1>
      <h2>Products</h2>
      <table v-if="products">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td>{{ product.prodName }}</td>
            <td>${{ product.amount }}</td>
            <td>{{ product.catergory }}</td>
            <td>{{ product.quantity }}</td>
            <td>
              <button @click="editProduct(product)">Edit</button>
              <button @click="deleteProduct(product.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else>Loading products...</div>
  
      <h2>Users</h2>
      <table v-if="users">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>
              <button @click="editUser(user)">Edit</button>
              <button @click="deleteUser(user.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else>Loading users...</div>
    </div>
  </template>
  
  <script>
  import { mapState } from 'vuex'
  
  export default {
    name: 'AdminPage',
    computed: {
      ...mapState(['products', 'users'])
    },
    created() {
      this.$store.dispatch('getProducts')
      // this.$store.dispatch('getUsers')
    },
    methods: {
      editProduct(product) {
        console.log('Edit product:', product)
        // Implement edit functionality
      },
      deleteProduct(productId) {
        console.log('Delete product:', productId)
        // Implement delete functionality
      },
      editUser(user) {
        console.log('Edit user:', user)
        // Implement edit functionality
      },
      deleteUser(userId) {
        console.log('Delete user:', userId)
        // Implement delete functionality
      }
    }
  }
  </script>
  
  <style scoped>
  .admin {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
  }
  
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  
  th {
    background-color: #f2f2f2;
  }
  
  button {
    margin-right: 5px;
    padding: 5px 10px;
    cursor: pointer;
  }
  </style>