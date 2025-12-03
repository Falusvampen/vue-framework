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

    
  
  
  
  
  <div class="recipe-header">
    <h1 class="recipe-title">
     
      {{ recipe.title }}
    </h1>
    <p class="recipe-description">
     
      {{ recipe.description }}
    </p>
  </div>

  <div class="recipe-footer">
    <div id="stars">
      <span class="star">★</span>
      <span class="star">★</span>
      <span class="star">★</span>
      <span class="star">★</span>
      <span class="star">★</span>
    </div>
    <div class="cooking-time">
      <span class="time-text">{{ recipe.prepTime }} minuter⏱️</span>
    </div>
  
  </div>
  </div>
  </div>
  
  
  <div class="recipe-image">
   <img v-if="recipe.imageUrl" :src="recipe.imageUrl" alt="Receptbild" class="recipe-img" />

  </div>
  </div>
  
 
  
</template>

<style>

.recipe-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  
  padding-bottom: 20px;
}

#stars{
  color: gold;
}

</style>