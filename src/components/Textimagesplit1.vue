<template>

    <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Holtwood+One+SC&display=swap" rel="stylesheet">

  <main>
    <div class="Text-image-Split">
      <div class="text-section">
        <h1>{{ title }}</h1>
        <h3>{{ subtitle }}</h3>
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
  height: 70vh;  
  background-color: #D9D9D9;
  color: white;
  flex-direction: row-reverse;
}


.text-section {
  flex: 1;
  padding: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.text-section h3 {
  font-size: 1rem;
  margin-bottom: 1.7rem;
  color: #2c2c2c;
}

.text-section h1 {
  font-size: 2.5rem;
  font-family: "Holtwood One SC";
  margin-bottom: 1rem;
  color: #4A4040;

}

.text-section button {
  padding: 0.7rem;
  width: 8rem;
  font-size: 1rem;
  background-color:#818181;
  color: white;
  border: none;
  border-radius:16vh;
  cursor: pointer;
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
  display: block;
  margin: auto;

}







</style>