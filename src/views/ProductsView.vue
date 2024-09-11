<template>
  <div class="products-page">
    <h1>Our Products</h1>
    <div class="search-bar">
      <input v-model="searchQuery" type="text" placeholder="Search products...">
    </div>
    
    <!-- Sort by Dropdown -->
    <div class="sort-bar">
      <label for="sortBy">Sort by:</label>
      <select v-model="sortBy" id="sortBy">
        <option value="price">Price</option>
        <option value="category">Category</option>
        <option value="quantity">Quantity</option>
      </select>
    </div>

    <div v-if="isLoading" class="spinner">
      <div class="bounce1"></div>
      <div class="bounce2"></div>
      <div class="bounce3"></div>   
    </div>
    
    <div v-else-if="filteredAndSortedProducts.length > 0" class="products-grid">
      <div v-for="product in filteredAndSortedProducts" :key="product.prodID" class="product-card">
        <img v-if="product.prodUrl" :src="product.prodUrl" :alt="product.prodName" class="product-image">
        <div class="product-info">
          <h3>{{ product.prodName }}</h3>
          <p><strong>Price:</strong> $ {{ product.amount }}</p>
          <p><strong>Category:</strong> {{ product.category }}</p>
          <p><strong>Quantity:</strong> {{ product.quantity }}</p>
          <button @click="viewProduct(product.prodID)">View Details</button><br><br>
          <button v-if="$cookies.get('token')" @click="addToCart(product.prodID)">Purchase : {{ product.prodName }}</button>
        </div>
      </div>
    </div>
    
    <div v-else>
      <p>No products found.</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ProductsPage',
  data() {
    return {
      searchQuery: '',
      sortBy: 'price', // Default sort by price
      isLoading: true,
    };
  },
  computed: {
    ...mapState(['products']), // Maps the products state from Vuex
    
    // Filter and sort products
    filteredAndSortedProducts() {
      // Filter products by search query
      let filteredProducts = this.products.filter((product) => {
        return product.prodName.toLowerCase().includes(this.searchQuery.toLowerCase());
      });

      // Sort products based on the selected sort option
      return filteredProducts.sort((a, b) => {
        if (this.sortBy === 'price') {
          return a.amount - b.amount;
        } else if (this.sortBy === 'category') {
          return a.category.localeCompare(b.category);
        } else if (this.sortBy === 'quantity') {
          return a.quantity - b.quantity;
        }
      });
    },
  },
  methods: {
    viewProduct(prodID) {
      this.$router.push({ name: 'ProductView', params: { id: prodID } });
    },
    addToCart(prodID) {
      this.$store.dispatch('addToCart', prodID);
    },
  },
  async created() {
    try {
      if (!this.products || this.products.length === 0) {
        await this.$store.dispatch('getProducts');
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      this.isLoading = false;
    }
  }
};
</script>

<style scoped>
.products-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.search-bar, .sort-bar {
  margin-bottom: 20px;
}

.search-bar input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.sort-bar select {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.product-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  transition: box-shadow 0.3s ease;
}

.product-card:hover {
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.product-info {
  padding: 15px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #45a049;
}

.spinner {
  display: flex;
  justify-content: center;
  margin-top: 50px;
}

.bounce1, .bounce2, .bounce3 {
  width: 18px;
  height: 18px;
  background-color: #333;
  border-radius: 100%;
  display: inline-block;
  animation: sk-bouncedelay 1.4s infinite ease-in-out both;
}

.bounce1 {
  animation-delay: -0.32s;
}

.bounce2 {
  animation-delay: -0.16s;
}

@keyframes sk-bouncedelay {
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1.0); }
}
</style>
