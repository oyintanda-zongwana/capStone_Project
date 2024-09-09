<template>
  <div class="auth-container">
    <div class="form-container">
      <h2>{{ isLogin ? 'Login' : 'Sign Up' }}</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group" v-if="!isLogin">
          <label for="name">Name</label>
          <input type="text" id="name" v-model="form.name" required>
        </div>
        <div class="form-group" v-if="!isLogin">
          <label for="surname">Surname</label>
          <input type="text" id="surname" v-model="form.surname" required>
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="form.email" required>
        </div>
        <div class="form-group password-group">
          <label for="password">Password: </label>
          <input :type="eye ? 'text' : 'password'" id="password" v-model="form.password" required>
          <button type="button" class="toggle-password" @click="eye = !eye">
            {{ eye ? 'Hide' : 'Show' }}
          </button>
        </div>

        <div class="form-group" v-if="!isLogin">
          <label for="confirmPassword">Confirm Password</label>
          <input :type="eye ? 'text' : 'password'" id="confirmPassword" v-model="form.confirmPassword">
        </div>
        <button type="submit" class="btn">{{ isLogin ? 'Login' : 'Sign Up' }}</button>
      </form>
      <p @click="toggleMode" class="toggle-mode">
        {{ isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login' }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLogin: true,
      form: {
        name: '',
        surname: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      eye: false // Default password is hidden
    };
  },
  methods: {
    toggleMode() {
      this.isLogin = !this.isLogin;
      this.form = {
        name: '',
        surname: '',
        email: '',
        password: '',
        confirmPassword: ''
      };
    },
    handleSubmit() {
      if (!this.isLogin && this.form.password !== this.form.confirmPassword) {
        alert('Passwords do not match!');
        return;
      }

      if (this.isLogin) {
        this.loginUser();
      } else {
        this.addUser();
      }
    },
    addUser() {
      this.$store.dispatch('addUser', this.form);
      alert('Sign Up successful!');
    },
    loginUser() {
      this.$store.dispatch('loginUser', this.form);
      alert('Login successful!');
      location.reload();
    }
  }
};
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.form-container {
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
}

.form-group {
  margin-bottom: 1rem;
  position: relative;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.password-group {
  display: flex;
  align-items: center;
}

.toggle-password {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #333;
  cursor: pointer;
}

.btn {
  width: 100%;
  padding: 0.75rem;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease-in-out;
}

.btn:hover {
  background-color: #555;
}

.toggle-mode {
  margin-top: 1rem;
  text-align: center;
  color: #333;
  cursor: pointer;
  text-decoration: underline;
}

.toggle-mode:hover {
  color: #555;
}
</style>
