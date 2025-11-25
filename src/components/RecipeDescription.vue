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
    imageSrc() {
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
  <div class="recipe-container">
    
    <div class="recipe-content">
      <header class="recipe-header">
        <h1 class="recipe-title">{{ recipe.title }}</h1>
      </header>

      <section class="recipe-body">
        <p class="recipe-description">{{ recipe.description }}</p>
      </section>

      <footer class="recipe-footer">
        <div class="stars">
          <span class="star">★</span>
          <span class="star">★</span>
          <span class="star">★</span>
          <span class="star">★</span>
          <span class="star">★</span>
        </div>
        <div class="cooking-time">
          <span class="time-text">{{ recipe.prepTime }} minuter</span>
        </div>
      </footer>
    </div>

    
    <div class="recipe-image-column">
      <img :src="imageSrc" :alt="recipe.title || 'Recipe image'" class="recipe-image" />
    </div>
  </div>
</template>


<style >
* {
  background-color: white;
}

.recipe-container {
  display: flex;
  gap: 3rem;
  align-items: flex-start;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.recipe-content {
  flex: 1;
  min-width: 0;
}

.recipe-header {
  margin-bottom: 1.5rem;
}

.recipe-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
  line-height: 1.2;
  color: #1a1a1a;
  font-family: Arial, Helvetica, sans-serif;
}

.recipe-body {
  margin-bottom: 2rem;
}

.recipe-description {
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
  color: #333;
  font-family: Arial, Helvetica, sans-serif;
}

.recipe-footer {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-top: 2rem;
}

.stars {
  display: flex;
  gap: 0.25rem;
  margin: 0;
}

.star {
  color: #ffd700;
  font-size: 1.5rem;
}

.cooking-time {
  margin: 0;
}

.time-text {
  font-size: 1rem;
  color: #333;
  font-family: Arial, Helvetica, sans-serif;
}

.recipe-image-column {
  flex: 0 0 320px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.recipe-image {
  width: 100%;
  height: auto;
  max-width: 400px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  object-fit: cover;
}



</style>