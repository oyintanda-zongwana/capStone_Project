<template>
  <nav class="navbar">
    <div class="container">
      <!-- Navigation links on the left -->
      <div class="navbar-collapse" :class="{ 'open': isMenuOpen }">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item" v-for="(item, index) in navItems" :key="index">
            <router-link class="nav-link" :to="item.link" @click="closeMenu">{{ item.label }}</router-link>
          </li>
        </ul>
      </div>

      <!-- Logo on the right -->
      <div class="navbar-brand">
        <router-link to="/">
          <img src="https://oyintanda-zongwana.github.io/hosted-pics/pics%20folder/brand.png" class="logo" alt="Logo" width="50" height="50">
        </router-link>
      </div>

      <!-- Hamburger toggle button for mobile -->
      <button class="navbar-toggler" type="button" @click="toggleMenu">
        <span class="navbar-toggler-icon"></span>
      </button>
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
      ],
      isMenuOpen: false // Track whether the menu is open or closed
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen; // Toggle the menu visibility
    },
    closeMenu() {
      this.isMenuOpen = false; // Close the menu after selecting an item
    }
  }
};
</script>

<style scoped>
/* Navbar styling */
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #333;
  padding: 1rem;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Logo Styling */
.navbar-brand {
  display: flex;
  align-items: center;
  margin-left: auto;
}

.logo {
  background: #ffffff;
  border-radius: 35%;
  transition: transform 0.3s ease-in-out;
}

.logo:hover {
  transform: scale(1.1);
}

/* Navigation links */
.navbar-nav {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-item {
  margin-right: 1rem;
}

.nav-link {
  color: #fff;
  text-decoration: none;
  padding: 0.5rem 1rem;
  transition: color 0.3s ease-in-out;
}

.nav-link:hover {
  color: #ccc;
}

/* Hamburger Menu */
.navbar-toggler {
  background-color: #fff;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
}

.navbar-toggler-icon {
  width: 25px;
  height: 3px;
  background-color: #000;
  margin: 5px 0;
  transition: 0.4s;
}

/* Collapse Menu */
.navbar-collapse {
  display: flex;
}

.navbar-collapse.open {
  display: block;
}

/* Media Queries */
@media (max-width: 768px) {
  .navbar-collapse {
    display: none;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    padding: 0;
  }

  .navbar-collapse.open {
    display: flex;
    background-color: #333;
  }

  .navbar-nav {
    flex-direction: column;
    width: 100%;
  }

  .nav-item {
    margin-right: 0;
  }

  .nav-link {
    padding: 1rem;
    width: 100%;
  }

  .navbar-toggler {
    display: block;
  }
}

@media (min-width: 769px) {
  .navbar-collapse {
    justify-content: flex-start;
  }

  .ml-auto {
    margin-left: 0;
  }

  .navbar-toggler {
    display: none;
  }
}
</style>
