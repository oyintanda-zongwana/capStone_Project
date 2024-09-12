<template>
  <div class="contact">
    <h1>Contact Us</h1>
    <form @submit.prevent="submitForm">
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
      message: '',
      submitted: false
    }
  },
  computed: {
    nameValid() {
      return this.name.trim().length > 0;
    },
    emailValid() {
      // Simple email validation using regex
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

.error-msg {
  color: red;
  font-size: 14px;
}

.invalid {
  border-color: red;
}
</style>
