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
     
      {{ recipe.title }}
    </h1>
    <p class="recipe-description">
     
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

      <div class="recipe-footer">
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
        </div>
      

    <div class="recipeimg">

    <img src="C:\Users\rowno\Desktop\receptprojekt\image.png" alt="recipe.title" />
    </div>
  </div>
  </div>
  </div>
  
  <div class="recipe-right">
  <div class="recipe-image">
   <img :src="imageSrc" :alt="recipe.title || 'Recipe image'" width="600" height="400"/>
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

@media (max-width: 480px) {
  .recipe-container {
    max-width: 100%;
    margin: 15px auto;
    padding: 15px;
    border-radius: 12px;
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

  .recipe-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .recipe-left {
    text-align: center;
    padding: 10px;
    gap: 12px;
  }

  .recipe-right {
    padding-left: 0;
    justify-content: center;
  }

  .recipe-image {
    max-width: 100%;
    width: 100%;
  }

  .recipe-image img {
    width: 100%;
    height: auto;
    max-width: 280px;
  }

  .recipe-title {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }

  .recipe-description {
    font-size: 0.9rem;
    margin-bottom: 8px;
  }

  .recipe-footer {
    flex-direction: column;
    gap: 10px;
    justify-content: center;
  }

  .stars {
    font-size: 1.3rem;
    gap: 5px;
  }

  .cooking-time {
    font-size: 0.9rem;
  }

  .time-text {
    font-size: 0.85rem;
  }



@media (min-width: 481px) and (max-width: 768px) {
  .recipe-container {
    max-width: 95%;
    margin: 25px auto;
    padding: 25px;
    border-radius: 16px;
  }

  .recipe-grid {
    grid-template-columns: 1fr;
    gap: 25px;
  }

  .recipe-left {
    text-align: center;
    padding: 12px;
    gap: 15px;
  }

  .recipe-right {
    padding-left: 0;
    justify-content: center;
  }

  .recipe-image {
    max-width: 100%;
    width: 100%;
  }

  .recipe-image img {
    width: 100%;
    height: auto;
    max-width: 350px;
  }

  .recipe-title {
    font-size: 2rem;
    margin-bottom: 15px;
  }

  .recipe-description {
    font-size: 0.95rem;
    margin-bottom: 10px;
  }

  .recipe-footer {
    flex-direction: column;
    gap: 12px;
    justify-content: center;
  }

  .stars {
    font-size: 1.5rem;
    gap: 8px;
  }

  .cooking-time {
    font-size: 0.95rem;
  }

  .time-text {
    font-size: 0.9rem;
  }
}


@media (min-width: 769px) {
  .recipe-container {
    max-width: 1100px;
    margin: 40px auto;
    padding: 40px;
    border-radius: 20px;
  }

  .recipe-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    gap: 40px;
  }

  .recipe-left {
    text-align: center;
    padding: 20px;
    gap: 20px;
  }

  .recipe-right {
    padding-left: 40px;
    justify-content: center;
    align-items: center;
  }

  .recipe-image {
    max-width: 450px;
    width: 100%;
  }

  .recipe-image img {
    width: 100%;
    height: auto;
  }

  .recipe-title {
    font-size: 3rem;
    margin-bottom: 20px;
  }

  .recipe-description {
    font-size: 1.1rem;
    margin-bottom: 10px;
  }

  .recipe-footer {
    display: flex;
    flex-direction: row;
    gap: 20px;
    justify-content: center;
  }

  .stars {
    font-size: 1.8rem;
    gap: 20px;
    display: flex;
  }

  .cooking-time {
    font-size: 1rem;
  }

  .time-text {
    font-size: 1rem;
  }
}

</style>