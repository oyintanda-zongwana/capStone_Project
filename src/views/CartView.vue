<template>
    <div class="cart-container">
      <h1>Your Cart</h1>
      <div v-if="cartItems.length === 0" class="empty-cart">
        <p>Your cart is currently empty.</p>
      </div>
      <div v-else>
        <div class="cart-items">
          <div v-for="(item, index) in cartItems" :key="index" class="cart-item">
            <img :src="item.image" alt="Car Image" class="item-image">
            <div class="item-details">
              <h2>{{ item.name }}</h2>
              <p>{{ item.description }}</p>
              <p><strong>Price:</strong> ${{ item.price.toLocaleString() }}</p>
              <p><strong>Quantity:</strong> {{ item.quantity }}</p>
              <button @click="removeItem(index)" class="remove-btn">Remove</button>
            </div>
          </div>
        </div>
        <div class="cart-summary">
          <h3>Total: ${{ totalPrice.toLocaleString() }}</h3>
          <button class="checkout-btn">Proceed to Checkout</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        cartItems: [
          {
            name: "Aurelia Veloce GT",
            description: "A high-performance luxury sports car with cutting-edge technology.",
            price: 250000,
            quantity: 1,
            image: "https://oyintanda-zongwana.github.io/hosted-pics/pics%20folder/brand.png"
          },
          {
            name: "Aurelia Veloce SuperSport",
            description: "Experience the ultimate in speed and luxury.",
            price: 320000,
            quantity: 1,
            image: "https://oyintanda-zongwana.github.io/hosted-pics/pics%20folder/brand.png"
          }
        ]
      };
    },
    computed: {
      totalPrice() {
        return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
      }
    },
    methods: {
      removeItem(index) {
        this.cartItems.splice(index, 1);
      }
    }
  };
  </script>
  
  <style scoped>
  .cart-container {
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  h1 {
    text-align: center;
    margin-bottom: 2rem;
    color: #333;
  }
  
  .empty-cart {
    text-align: center;
    color: #555;
  }
  
  .cart-items {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin-bottom: 2rem;
  }
  
  .cart-item {
    display: flex;
    gap: 1rem;
    padding: 1rem;
    background-color: #f9f9f9;
    border-radius: 8px;
  }
  
  .item-image {
    width: 150px;
    height: 100px;
    object-fit: cover;
    border-radius: 8px;
  }
  
  .item-details {
    flex-grow: 1;
  }
  
  h2 {
    margin: 0;
    color: #333;
  }
  
  p {
    margin: 0.5rem 0;
    color: #555;
  }
  
  .remove-btn {
    background-color: #e74c3c;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.3s ease-in-out;
  }
  
  .remove-btn:hover {
    background-color: #c0392b;
  }
  
  .cart-summary {
    text-align: right;
    font-size: 1.5rem;
    color: #333;
  }
  
  .checkout-btn {
    padding: 1rem 2rem;
    background-color: #333;
    color: white;
    border: none;
    cursor: pointer;
    font-weight: bold;
    border-radius: 4px;
    transition: background-color 0.3s ease-in-out;
  }
  
  .checkout-btn:hover {
    background-color: #555;
  }
  </style>
    