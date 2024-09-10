<template>
    <div class="product-view" v-if="product">
      <h1>{{ product.prodName }}</h1>
      <div class="product-details">
        <p><strong>Price:</strong> ${{ product.amount }}</p>
        <p><strong>Category:</strong> {{ product.catergory }}</p>
        <p><strong>Quantity:</strong> {{ product.quantity }}</p>
        <p><strong>Description:</strong> {{ product.prodDescription }}</p>
      </div>
      <img v-if="product.prodUrl" :src="product.prodUrl" :alt="product.prodName" class="product-image">
      <button @click="goBack">Back to Products</button> <button v-if="$cookies.get('token')" @click="addToCart(product.prodID)">Purchase : {{ product.prodName }}</button>
    </div>
    <div v-else>Loading product...</div>
  </template>
  
  <script>
  import { mapState } from 'vuex'
  
  export default {
    name: 'ProductView',
    computed: {
  ...mapState(['products']),
  product() {
    const productId = this.$route.params.id;
    return this.products ? this.products.find(p => p.prodID == productId) : null; // Ensure prodID comparison is not strict, as params are strings
  }
},
    methods: {
      goBack() {
        this.$router.push('/products')
      }
    },
    created() {
      if (!this.products) {
        this.$store.dispatch('getProducts')
      }
    }
  }
  </script>
  
  <style scoped>
  .product-view {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .product-details {
    margin-bottom: 20px;
  }
  
  .product-image {
    max-width: 100%;
    height: auto;
    margin-bottom: 20px;
  }
  
  button {
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #45a049;
  }
  </style>