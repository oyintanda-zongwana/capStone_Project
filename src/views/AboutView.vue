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
  background-color: #000; /* Black background */
  height: 140vh;
}

.about-content {
  display: flex;
  flex-direction: row;
  max-width: 1200px;
  width: 100%;
  background-color: #fff; /* White background */
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
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
  color: #ffd700; /* Gold text */
}

p {
  font-size: 1.2rem;
  color: #333; /* Black text */
  line-height: 1.6;
  margin-bottom: 1rem;
}

strong {
  color: #ffd700; /* Gold for strong text */
}

/* Responsive Design */
@media (max-width: 768px) {
  .about-content {
    flex-direction: column;
    padding: 1rem;
  }

  .about-image {
    width: 100%;
    margin-bottom: 1rem;
  }

  .about-text {
    width: 100%;
  }

  h1 {
    font-size: 2rem;
    text-align: center;
  }

  p {
    font-size: 1.1rem;
    text-align: center;
  }
}
</style>
