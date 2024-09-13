<template>
  <div class="contact-container">
    <div class="contact-info">
      <img class="about-image" src="https://oyintanda-zongwana.github.io/hosted-pics/pics%20folder/Aurelia%20Veloce.png" alt="Luxury Car" />
      <p><i class="las la-phone"></i> +123 456 7890</p>
      <p><i class="las la-envelope"></i> support@aureliaveloce.com</p>
      <p><i class="las la-map-marker-alt"></i> 123 Luxury Ave, High End District, City</p>
    </div>

    <div class="contact-form">
      <h1>Contact Us</h1>
      <form @submit.prevent="submitForm"  action="https://formspree.io/f/xdknvzjz" method="POST">
        <div class="form-group">
          <label for="name">Name:</label>
          <input 
            type="text" 
            id="name" 
            v-model="name" 
            required 
            aria-label="Name"
            :class="{ 'invalid': !nameValid && submitted }" />
          <p v-if="!nameValid && submitted" class="error-msg">Please enter your name.</p>
        </div>

        <div class="form-group">
          <label for="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            v-model="email" 
            required 
            aria-label="Email"
            :class="{ 'invalid': !emailValid && submitted }" />
          <p v-if="!emailValid && submitted" class="error-msg">Please enter a valid email address.</p>
        </div>

        <div class="form-group">
          <label for="message">Message:</label>
          <textarea 
            id="message" 
            v-model="message" 
            required 
            aria-label="Message"
            :class="{ 'invalid': !messageValid && submitted }"></textarea>
          <p v-if="!messageValid && submitted" class="error-msg">Please enter your message.</p>
        </div>

        <button type="submit" class="submit-btn">Send Message</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactPage',
  data() {
    return {
      name: '',
      email: '',
      message: '',
      submitted: false
    }
  },
  computed: {
    nameValid() {
      return this.name.trim().length > 0;
    },
    emailValid() {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(this.email);
    },
    messageValid() {
      return this.message.trim().length > 0;
    }
  },
  methods: {
    submitForm() {
      this.submitted = true;
      if (this.nameValid && this.emailValid && this.messageValid) {
        console.log('Form submitted:', { name: this.name, email: this.email, message: this.message });
        this.resetForm();
      } else {
        console.log('Form contains errors');
      }
    },
    resetForm() {
      this.name = '';
      this.email = '';
      this.message = '';
      this.submitted = false;
    }
  }
}
</script>

<style scoped>
.contact-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #000;
  color: #fff;
  padding: 40px;
}

.contact-info, .contact-form {
  flex: 1;
}

.contact-info {
  font-size: 1.2em;
  color: #fff;
  margin-right: 20px;
}

.contact-info p {
  margin: 10px 0;
  color: whitesmoke;
}

.contact-info img {
  width: 100%;
  max-width: 400px;
  height: auto;
}

.contact-form {
  max-width: 600px;
  padding: 20px;
  background-color: #111;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

h1 {
  color: #FFD700;
  margin-bottom: 20px;
  font-size: 2em;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #FFD700;
}

input, textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #FFD700;
  border-radius: 4px;
  background-color: #222;
  color: #fff;
}

textarea {
  height: 150px;
}

.error-msg {
  color: red;
  font-size: 14px;
}

.invalid {
  border-color: red;
}

.submit-btn {
  background-color: #FFD700;
  color: #000;
  border: none;
  padding: 10px 20px;
  font-size: 1.1em;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-btn:hover {
  background-color: #e6b800;
}

@media (max-width: 768px) {
  .contact-container {
    flex-direction: column;
    padding: 20px;
  }

  .contact-info, .contact-form {
    width: 100%;
    margin-right: 0;
    margin-bottom: 20px;
  }

  .contact-info img {
    max-width: 100%;
  }

  h1 {
    font-size: 1.5em;
  }

  .contact-form {
    padding: 15px;
  }

  input, textarea, .submit-btn {
    font-size: 1em;
  }
}

@media (max-width: 480px) {
  .contact-container {
    padding: 10px;
  }

  .contact-info {
    font-size: 1em;
  }

  h1 {
    font-size: 1.2em;
  }

  .contact-form {
    padding: 10px;
  }

  input, textarea, .submit-btn {
    padding: 8px;
  }
}
</style>