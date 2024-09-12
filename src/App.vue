<template>
  <div>
    <NavBar /><br><br><br><br>
    <router-view/>
    <Footer />
  </div>
</template>

<script>
import NavBar from './components/NavBarComp.vue'
import Footer from './components/FooterComp.vue'

export default {
  components: {
    NavBar,
    Footer
  }
}
</script>

<style>
/* Import Google Font (Playfair Display) */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;700&display=swap');

/* Define your color scheme using CSS variables for reusability */
:root {
  --primary-color: gold;      /* Gold */
  --secondary-color: black;   /* Black */
  --accent-color: white;      /* White */
}



/* Global App styling */
#app {
  font-family: 'Playfair Display', serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--secondary-color);
  background-color: var(--accent-color);
  padding: 0 !important;

}

/* Navigation bar styling */
nav a {
  font-weight: bold;
  color: var(--primary-color);
  text-decoration: none;
  font-size: 18px;
}

nav a.router-link-exact-active {
  color: var(--secondary-color);
  background-color: var(--primary-color);
  padding: 5px 10px;
  border-radius: 5px;
}

/* Button styling (global buttons) */
button {
  background-color: var(--primary-color);
  color: var(--secondary-color);
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-family: 'Playfair Display', serif;
}

button:hover {
  background-color: var(--secondary-color);
  color: var(--primary-color);
}

/* Global heading styling */
h1, h2, h3, h4, h5, h6 {
  font-family: 'Playfair Display', serif;
  color: var(--secondary-color);
}

p {
  font-size: 16px;
  line-height: 1.5;
  color: var(--secondary-color);
}
</style>
