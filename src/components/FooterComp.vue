<template>
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-section about">
          <h2>Aurelia Veloce</h2>
          <p>Experience the luxury and performance of Aurelia Veloce, where we cater to the most elite car enthusiasts. Our selection of sports cars combines elegance and speed for the ultimate driving experience.</p>
        </div>
  
        <div class="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/products">Shop</router-link></li>
            <li><router-link to="/about">About Us</router-link></li>
            <li><router-link to="/contact">Contact</router-link></li>
          </ul>
        </div>
  
        <div class="footer-section contact">
          <h3>Contact Us</h3>
          <p><i class="las la-phone"></i> +123 456 7890</p>
          <p><i class="las la-envelope"></i> support@aureliaveloce.com</p>
          <p><i class="las la-map-marker-alt"></i> 123 Luxury Ave, High End District, City</p>
        </div>
  
        <div class="footer-section social">
          <h3>Follow Us</h3>
          <div class="social-icons">
            <a href="#"><i class="lab la-facebook"></i></a>
            <a href="#"><i class="lab la-twitter"></i></a>
            <a href="#"><i class="lab la-instagram"></i></a>
            <a href="#"><i class="lab la-linkedin"></i></a>
          </div>
        </div>
      </div>
  
      <div class="footer-bottom">
        <p>&copy; 2024 Aurelia Veloce. All Rights Reserved.</p>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'FooterComponent',
  };
  </script>
  
  <style scoped>
  .footer {
    background-color: black;
    color: white;
    padding: 0  !important;
    text-align: center;
  }
  
  .footer-content {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .footer-section {
    flex: 1;
    margin: 20px;
  }
  
  .footer-section h2, .footer-section h3 {
    color: gold;
    margin-bottom: 20px;
  }
  
  .footer-section p, .footer-section ul {
    color: white;
  }
  
  .footer-section ul {
    list-style-type: none;
    padding: 0;
  }
  
  .footer-section ul li {
    margin: 10px 0;
  }
  
  .footer-section ul li a {
    color: white;
    text-decoration: none;
  }
  
  .footer-section ul li a:hover {
    color: gold;
  }
  
  .social-icons a {
    color: white;
    margin: 0 10px;
    font-size: 20px;
  }
  
  .social-icons a:hover {
    color: gold;
  }
  
  .footer-bottom {
    margin-top: 30px;
    border-top: 1px solid gold;
    padding-top: 20px;
  }
  
  .footer-bottom p {
    margin: 0;
    color: white;
    font-size: 14px;
  }
  </style>
  