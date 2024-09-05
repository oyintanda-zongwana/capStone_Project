<template>
  <nav class="navbar">
    <div class="container">
      <div>
        <router-link class="navbar-brand" to="/">
          <img src="https://oyintanda-zongwana.github.io/hosted-pics/pics%20folder/brand.png" class="logo" alt="Logo" width="50" height="50">
        </router-link>
      </div>
      <div>
        <ul class="navbar-nav">
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
    }
  }
}
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  width: 210vh;
  background-color: #333;
  padding: 1rem;
  z-index: 1000; 
}

.logo {
  background: #ffffff;
  border-radius: 35%;
  transition: transform 0.3s ease-in-out;
}

.logo:hover {
  transform: scale(1.1);
}

.navbar-nav {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-item {
  margin-left: 1rem;
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

.container{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
