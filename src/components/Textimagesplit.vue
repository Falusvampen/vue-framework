<template>
  <main>
    <div class="Text-image-Split">
      <div class="text-section">
        <h3>{{ subtitle }}</h3>
        <h1>{{ title }}</h1>
        <button>{{ buttonText }}</button>
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
  flex: 1;
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

.text-section button {
  background-color: white;
  color: #2c2c2c;
  border: none;
  border-radius: 16vh;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  width: fit-content;
  transition: background-color 0.3s;
}

.text-section button:hover {
  background-color: #ddd;
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


</style>