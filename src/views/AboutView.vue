<template>
  <div class="about-container">
    <div class="about-content">
      <img class="about-image" src="https://oyintanda-zongwana.github.io/hosted-pics/pics%20folder/Aurelia%20Veloce.png" alt="Luxury Car" />
      <div class="about-text">
        <h1>About Aurelia Veloce</h1>
        <p>
          Welcome to <strong>Aurelia Veloce</strong>, where we provide an exclusive selection of the world’s finest sports cars, tailored to meet the refined tastes of our VIP clientele.
        </p>
        <p>
          At Aurelia Veloce, we believe in the thrill of high performance and the luxury of cutting-edge design. Each vehicle in our collection is hand-picked for its elegance, speed, and engineering excellence. Our mission is to offer a bespoke experience for discerning customers who demand the best in luxury and performance.
        </p>
        <p>
          Whether you're looking for a supercar to complement your style or a high-performance machine for the ultimate driving experience, Aurelia Veloce offers unparalleled quality and service.
        </p>
        <p>
          Join the ranks of the elite and experience the power, precision, and luxury of Aurelia Veloce today.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.about-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-color: #f5f5f5;
  height: 100vh;
}

.about-content {
  display: flex;
  max-width: 1200px;
  width: 100%;
}

.about-image {
  width: 50%;
  border-radius: 8px;
  object-fit: cover;
  margin-right: 2rem;
}

.about-text {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #333;
}

p {
  font-size: 1.2rem;
  color: #555;
  line-height: 1.6;
  margin-bottom: 1rem;
}

strong {
  color: #333;
}
</style>
