<template>
  <main>
    <div class="Text-image-Split">
      <div class="text-section">
        <h1>{{ title }}</h1>
        <h3>{{ subtitle }}</h3>
        <router-link :to="link" class="button-link">
          {{ buttonText }}
        </router-link>
      </div>
      <div class="image-section">
        <img :src="imageSrc" :alt="imageAlt" />
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "TextImageSplit1",
  props: {
    title: String,
    subtitle: String,
    buttonText: String,
    imageSrc: String,
    imageAlt: { type: String, default: "Bild" },
    link: { type: String, required: true }
  }
}
</script>

<style scoped>
.Text-image-Split {
  display: flex;
  flex-direction: row-reverse;
  width: 100%;
  height: 70vh;
  background-color: #e7c5bc;
}
.text-section {
  flex: 1;
  padding: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.text-section h1 {
  font-size: 2.5rem;
  font-family: "Holtwood One SC";
  margin-bottom: 1rem;
  color: #4A4040;
}
.text-section h3 {
  font-size: 1rem;
  margin-bottom: 1.7rem;
  color: #2c2c2c;
}
.button-link {
  background-color: rgb(53 53 53);
  color: white ;
  border: none;
  border-radius: 16vh;
  padding: 0.7rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  width: fit-content;
  transition: background-color 0.3s;
  text-decoration: none;
  display: inline-block;
}
.button-link:hover {
  background-color: rgb(58, 58, 58);
}
.image-section {
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: center;
}
.image-section img {
  max-width: 70%;
  max-height: 70%;
  object-fit: contain;
}

@media (max-width: 800px) {

  
.text-section h1 {
  font-size: 2.0rem;
  font-family: "Holtwood One SC";
  margin-bottom: 1rem;
  color: #4A4040;
}
.text-section h3 {
  font-size: 0.8rem;
  margin-bottom: 1.7rem;
  color: #2c2c2c;
}

.image-section img {
  max-width: 86%;
  max-height: 70%;
  object-fit: contain;
}
  


   
  

  
}

@media (max-width: 600px) {

  .image-section img {
  max-width: 50%;
  max-height: 70%;
  object-fit: contain;
  margin:auto;
  top:2rem;
}

.text-section {
  flex: 1;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.Text-image-Split {
  display: flex;
  flex-direction: column-reverse;
  width: 100%;
  height: 70vh;
  background-color: #D9D9D9;
}
.text-section h3 {
  font-size: 1rem;
  margin-bottom: 1.7rem;
  color: #2c2c2c;
}


}

@media (max-width: 450px) {

  .image-section img {
  max-width: 50%;
  max-height: 70%;
  object-fit: contain;
  align-items: center;
}

.text-section {
  flex: 1;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}


}
</style>