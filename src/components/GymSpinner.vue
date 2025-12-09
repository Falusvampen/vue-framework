<!-- 100% AI lol -->
<template>
  <div class="spinner-wrapper" role="status">
    <div class="barbell-container">
      <div class="plate left"></div>
      <div class="bar"></div>
      <div class="plate right"></div>
    </div>

    <p class="loading-text">Prepping meals...</p>
    <span class="sr-only">Laddar innehåll...</span>
  </div>
</template>

<script>
export default {
  name: 'GymSpinner',
}
</script>

<style scoped>
.spinner-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.loading-text {
  color: #fff;
  margin-top: 1rem;
  font-family: 'Holtwood One SC', sans-serif;
  font-size: 1.2rem;
  letter-spacing: 1px;
  animation: pulse 1.5s infinite ease-in-out;
}

.barbell-container {
  position: relative;
  width: 100px;
  height: 40px;
  animation: benchPress 1s infinite ease-in-out alternate;
}

.bar {
  width: 100px;
  height: 8px;
  background-color: #c0c0c0;
  border-radius: 4px;
  position: absolute;
  top: 16px;
  z-index: 1;
}

.plate {
  width: 15px;
  height: 40px;
  background-color: #000000;
  border-radius: 4px;
  position: absolute;
  top: 0;
  border: 2px solid #fff;
  z-index: 2;
}

.plate.left {
  left: 0;
}

.plate.right {
  right: 0;
}

@keyframes benchPress {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-20px);
  }
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}

/* Hjälpklass för tillgänglighet */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
</style>
