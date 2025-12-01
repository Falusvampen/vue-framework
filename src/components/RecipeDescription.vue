<script>
export default {
  name: "RecipeDescription",
  props: {
    recipe: {
      type: Object,
      required: true,
      default: () => ({
        title: '',
        description: '',
        prepTime: '',
        image: ''
      })
    }
  },
  computed: {
    imageSrc () {
      if (this.recipe && this.recipe.image) return this.recipe.image
      const title = (this.recipe && this.recipe.title) ? this.recipe.title.toLowerCase() : ''
      if (title.includes('halloumi')) return '/image.png'
      if (title.includes('pasta')) return '/pasta.png'
      if (title.includes('salad') || title.includes('sallad')) return '/salad.png'
      return '/placeholder.png'
    }
  }
}
</script>

<template>
  
  <div class="recipe-page-wrapper">
  <div class="recipe-container">
    <div class="recipe-grid">

    
  
  
  <div class="recipe-left">

  
  <div class="recipe-header">
    <h1 class="recipe-title">
      Halloumi Airfryer
      {{ recipe.title }}
    </h1>
    <p class="recipe-description">
      Krispig halloumi från airfryern passar utmärkt med en fräsch sallad på tomater, svarta bönor, rödlök och basilika. En enkel och smakrik rätt som fungerar lika bra som tillbehör som en lättare middag.
      {{ recipe.description }}
    </p>
  </div>

  <div class="recipe-footer">
    <div class="stars">
      <span class="star">★</span>
      <span class="star">★</span>
      <span class="star">★</span>
      <span class="star">★</span>
      <span class="star">★</span>
    </div>
    <div class="cooking-time">
      <span class="time-text">{{ recipe.prepTime }} 15 minuter⏱️</span>
    </div>
  </div>
  </div>
  </div>
  
  <div class="recipe-right">
  <div class="recipe-image">
   <img :src="imageSrc":alt="recipe.title || 'Recipe image'" width="600" height="400"/>


  </div>
  </div>
  </div>
  </div>
  
</template>

<style>

#app{
  grid-template-columns: auto;
}
 body{
  background-color: white;
  
 }

 .recipe-page-wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
}
 

 .recipe-container {
  display: flex;
    max-width: 1100px;
    width: 100%;
  margin: 40px auto;
  background: #F7F7F7;
  padding: 40px;
  border-radius: 20px;
  

}

.recipe-grid {
  display: grid;
  grid-template-columns: auto;
  align-items: center;
  gap: 40px;
  
}

.recipe-left {
 text-align: center;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
}

.recipe-right {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 40px;
  
}

.recipe-image {
  width: 100%;
  max-width: 450px;
  border-radius: 16px;
  opacity: 0;
  animation: fadeIn 0.6s ease forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

.recipe-title {
  font-size: 3rem;
  font-weight: 700;
  color: #000;
  margin-bottom: 20px;
  line-height: 1.1;
}

.recipe-description {
  font-size: 1.1rem;
  color: #222;
  margin-bottom: 10px;
  line-height: 1.5;
}

.recipe-footer {
  box-sizing: border-box;
  align-items: center;
  
}

.stars {
  color: gold;
  font-size: 1.8rem;
  gap: 20px;
}

.cooking-time {
  font-size: 1rem;
  color: #000;
}



</style>