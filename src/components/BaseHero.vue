<script>
export default {
  name: 'BaseHero',
  props: {
    backgroundImage: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    description: {
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

<template>
  <div
    class="base-hero"
    :style="{
      backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none', minHeight: height,
      height: auto,
    }"
  >
    <div class="overlay" :style="{ opacity: overlayOpacity }"></div>

    <div class="content-container">

      <div class="title-and-description-div">
        <h1 v-if="title">{{ title }}</h1>
        <p v-if="description">{{ description }}</p>
      </div>

      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.base-hero {
  position: relative;
  width: 100%;
  background-color: transparent;
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
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title-and-description-div {
  margin-bottom: 2rem;
}

h1 {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 20px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  line-height: 1.2;
}

p {
  font-size: 1.2rem;
  font-weight: 400;
  max-width: 600px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  h1 {
    font-size: 2rem;
  }
}
</style>
