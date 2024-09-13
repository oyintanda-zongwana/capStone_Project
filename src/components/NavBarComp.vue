<template>
  <nav class="navbar fixed-top">
    <div class="container d-flex justify-content-between">
      <router-link to="/" class="navbar-brand">
        <img src="https://oyintanda-zongwana.github.io/hosted-pics/pics%20folder/brand.png" alt="Logo" class="logo">
      </router-link>

      <button class="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        <span class="navbar-toggler-icon"></span>
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarToggler">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item" v-for="(item, index) in filteredNavItems" :key="index">
            <router-link class="nav-link" :to="item.link">{{ item.label }}</router-link>
          </li>
          <li class="nav-item" v-if="$cookies.get('token')">
            <router-link class="nav-link" to="/userProfile">Profile</router-link>
          </li>
          <li class="nav-item" v-if="$cookies.get('token')">
            <button @click="logout" class="nav-link logout-btn">Logout</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      navItems: [
        { label: 'Home', link: '/' },
        { label: 'About', link: '/about' },
        { label: 'Shop', link: '/products' },
        { label: 'Admin', link: '/admin' },  // Conditionally displayed for admins
        { label: 'Login', link: '/login' },
        { label: 'Contact', link: '/contact' },
        { label: 'Cart', link: '/cart' }
      ],
      isAdmin: false  // Initialize as false
    };
  },
  computed: {
    filteredNavItems() {
      return this.navItems.filter(item => item.label !== 'Admin' || this.isAdmin);
    }
  },
  methods: {
    checkUserRole() {
      const token = this.$cookies.get('token');
      if (token) {
        // Fetch the role from token or an API if necessary
        const userRole = this.$cookies.get('userRole');  // Assuming userRole is stored in cookies
        this.isAdmin = userRole === 'admin';
      }
    },
    logout() {
      this.$cookies.remove('token');
      this.$cookies.remove('userRole');  // Also remove the user role
      this.$cookies.remove('userID');  // Also remove the userID
      this.$router.push('/login');  // Redirect to login page after logout
      // location.reload()
    }
  },
  created() {
    this.checkUserRole();  // Check user role on component creation
  },
};
</script>

<style scoped>
/* Basic Navbar styling */
.navbar {
  background-color: black;
  padding: 1rem;
}

.logo {
  background-color: whitesmoke;
  width: 50px;
  height: 50px;
  border-radius: 35%;
  transition: transform 0.3s ease;
}

.logo:hover {
  transform: scale(1.1);
}

/* Navigation links */
.nav-link {
  color: white;
  padding: 0.5rem 1rem;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #ccc;
}

.logout-btn {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.5rem 1rem;
  text-align: left;
}

.logout-btn:hover {
  color: #ccc;
}

/* Toggler Icon */
.navbar-toggler-icon {
  background-color: white;
  width: 25px;
  height: 3px;
  display: block;
  margin: 0.2rem 0;
}

/* Media Queries for smaller screens */
@media (max-width: 768px) {
  .navbar-collapse {
    text-align: center;
  }

  .navbar-nav {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .nav-item {
    margin-bottom: 0.5rem;
  }
}
</style>