<template>
  <div
    class="base-hero"
    :style="{
      backgroundImage: `url(${backgroundImage})`,
      height: height,
    }"
  >
    <div class="overlay" :style="{ opacity: overlayOpacity }"></div>

    <div class="content-container">
      <h1 v-if="title" class="hero-title">{{ title }}</h1>

      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseHero',
  props: {
    backgroundImage: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: '',
    },
    height: {
      type: String,
      default: '450px',
    },
    overlayOpacity: {
      type: Number,
      default: 0.5,
    },
  },
}
</script>

<style scoped>
.base-hero {
  position: relative;
  width: 100%;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0 0 16px 16px;
  margin-bottom: 40px;
  overflow: hidden;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: black;
  z-index: 1;
}

.content-container {
  position: relative;
  z-index: 2;
  text-align: center;
  color: white;
  width: 100%;
  max-width: 800px;
  padding: 20px;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 20px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }
}
</style>
