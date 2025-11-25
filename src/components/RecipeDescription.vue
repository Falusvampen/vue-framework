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
  <div class="recipe-card">
  </div>

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

  <div class="recipeimg">
    <img :src="imageSrc" :alt="recipe.title || 'Recipe image'" width="400" height="300"/>
  </div>
</template>

<style>
 *{
  background-color: white;
  
 }

 .recipe-footer{
   display: flex;
   align-items: center;
   justify-content: center;
   gap: 1.5rem;
   margin-top: 20px;
 }

 .recipe-title{
   padding-top: 50px;
  
   font-size: 3em;
   margin-bottom: 10px;
   font-weight: bold;
   font-family: Arial, Helvetica, sans-serif;
   color: black;
   text-align: center;
 }

 .recipe-description{
   font-size:1em;
   margin-bottom: 20px;
   font-family: Arial, Helvetica, sans-serif;
   color: black; 
   text-align: center;
 }

 .stars{
   font-size: 2em;
   color: gold;
   margin: 0;
 }

 .cooking-time{
   font-size: 1em;
   color: black;
   margin: 0;
 }

  .recipeimg{
    display: grid;
    
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    border-radius: 25px;
   
  }



</style>