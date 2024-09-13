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
            <i :class="eye ? 'las la-eye-slash' : 'las la-eye'"></i>
          </button>
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
        password: ''
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
        password: ''
      };
    },
    async handleSubmit() {
      if (this.isLogin) {
        await this.loginUser();
      } else {
        await this.addUser();
      }
    },
    async addUser() {
  try {
    await this.$store.dispatch('addUser', {
      name: this.form.name,
      surname: this.form.surname,
      email: this.form.email,
      password: this.form.password
    });
    // If the dispatch is successful, it means the user was added
    alert('Sign Up successful!');
    this.isLogin = true; // Switch to login after successful signup
  } catch (error) {
    console.error('Error during sign up:', error);
    alert('Sign Up failed!');
    }
  },
    async loginUser() {
      try {
        await this.$store.dispatch('loginUser', {
          email: this.form.email,
          password: this.form.password
        });
        alert('Login successful!');
        location.reload();
      } catch (error) {
        console.error('Error during login:', error);
        alert('Login failed!');
      }
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
  background-color: #000; /* Black background */
}

.form-container {
  background-color: #fff; /* White background for the form */
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  border: 2px solid #ffd700; /* Gold border */
}

h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #000; /* Black text */
}

.form-group {
  margin-bottom: 1rem;
  position: relative;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #000; /* Black text */
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
  position: relative;
}

.toggle-password {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #000; /* Black icon color */
  cursor: pointer;
}

.btn {
  width: 100%;
  padding: 0.75rem;
  background-color: #000; /* Black background */
  color: #ffd700; /* Gold text */
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease-in-out;
}

.btn:hover {
  background-color: #333; /* Darker black for hover */
}

.toggle-mode {
  margin-top: 1rem;
  text-align: center;
  color: black; /* Gold text */
  cursor: pointer;
  text-decoration: underline;
}

.toggle-mode:hover {
  color: gold; /* White text on hover */
}

/* Responsive Design */
@media (max-width: 480px) {
  .form-container {
    padding: 1rem;
    border-radius: 4px;
  }
  
  .password-group {
    flex-direction: column;
  }
  
  .toggle-password {
    position: relative;
    margin-top: 0.5rem;
  }
}
</style>
