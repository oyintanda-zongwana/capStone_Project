<template>
  <div class="home">
    <h1>Welcome to Our Store</h1>
    <div v-if="products" class="products-grid">
      <div v-for="product in products" :key="product.prodID" class="product-card">
        <h3>{{ product.prodName }}</h3>
        <p>Price: ${{ product.amount }}</p>
        <p>Category: {{ product.catergory }}</p>
        <p>Quantity: {{ product.quantity }}</p>
        <button @click="viewProduct(product.prodID)">View</button>
      </div>
    </div>
    <div v-else>Loading products...</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'HomePage',
  computed: {
    ...mapState(['products'])
  },
  methods: {
    viewProduct(productId) {
      this.$router.push(`/product/${productId}`)
    }
  },
  created() {
    this.$store.dispatch('getProducts')
  }
}
</script>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.product-card {
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 8px;
  transition: box-shadow 0.3s ease;
}

.product-card:hover {
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

button {
  padding: 8px 16px;
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