<template>
    <div class="contact">
      <h1>Contact Us</h1>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="name" required>
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required>
        </div>
        <div class="form-group">
          <label for="message">Message:</label>
          <textarea id="message" v-model="message" required></textarea>
        </div>
        <button type="submit">Send Message</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ContactPage',
    data() {
      return {
        name: '',
        email: '',
        message: ''
      }
    },
    methods: {
      submitForm() {
        // Here you would typically send the form data to a server
        console.log('Form submitted:', { name: this.name, email: this.email, message: this.message })
        // Reset form after submission
        this.name = ''
        this.email = ''
        this.message = ''
      }
    }
  }
  </script>
  
  <style scoped>
  .contact {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input, textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  textarea {
    height: 150px;
  }
  
  button {
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #45a049;
  }
  </style>