<template>
  <main>
    <div class="Text-image-Split">
      <div class="text-section">
        <h3>{{ subtitle }}</h3>
        <h1>{{ title }}</h1>
      </div>
      <div class="image-section">
        <img :src="imageSrc" :alt="imageAlt" />
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "Text-Image-Split",
  props: {
    title: String,
    subtitle: String,
    buttonText: String,
    imageSrc: String,
    imageSrc1: String,
    imageAlt: {
      type: String,
      default: "Bild"
    },
    link: {
      type: String,
      required: false,
    }
  }
}
</script>

<style scoped>
.Text-image-Split {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100vh;
  background-color: #1e1e1e;
  color: white;
  margin-top: 5rem;
}

.text-section {
  flex: 1.1;
  padding: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #2c2c2c;
}

.text-section h3 {
  font-size: 1rem;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.text-section h1 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  font-weight: bold;
}

.image-section {
  flex: 2;
  overflow: hidden;
}

.image-section img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (max-width: 870px) {
  .text-section h3 {
  font-size: 0.8rem;
  margin-bottom: 0.7rem;
}

.text-section h1 {
  font-size: 2rem;
  margin-bottom: 2rem;
  font-weight: bold;
  width: 80%s;
}
}

@media (max-width: 600px) {
  .Text-image-Split {
  display: flex;
  flex-direction: column-reverse;
  width: 100%;
  height: 100vh;
  background-color: #1e1e1e;
  color: white;
  margin-top: 5rem;
  border-top: 10px solid #c0ab8e;
}
}
</style>
