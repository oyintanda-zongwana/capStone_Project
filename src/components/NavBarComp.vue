<template>
  <nav class="navbar fixed-top">
    <div class="container d-flex justify-content-between">
      <!-- Logo on the left -->
      <router-link to="/" class="navbar-brand">
        <img src="https://oyintanda-zongwana.github.io/hosted-pics/pics%20folder/brand.png" alt="Logo" class="logo">
      </router-link>

      <!-- Toggler button on the right -->
      <button class="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        <span class="navbar-toggler-icon"></span>
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Navigation links (collapse) -->
      <div class="collapse navbar-collapse" id="navbarToggler">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item" v-for="(item, index) in navItems" :key="index">
            <router-link class="nav-link" :to="item.link">{{ item.label }}</router-link>
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
        { label: 'Products', link: '/products' },
        { label: 'Admin', link: '/admin' },
        { label: 'Login/Sign Up', link: '/login' },
        { label: 'Cart', link: '/cart' }
      ]
    };
  }
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
