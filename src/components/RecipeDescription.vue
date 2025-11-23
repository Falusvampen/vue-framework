<script>
export default{
    name:"RecipeDescription",
    props:{
        recipe:{
            type:Object,
            required:true,
            default:()=>({
                title:'',
                description:'',
                prepTime: '',
                image:''

            })  
        }
    }
}
</script>

<template>
    
    <div class="recipe-card">
    </div>

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
            <span class="time-text">{{ recipe.prepTime }} minuter</span>
          </div>
        </div>
      

    <div class="recipeimg">

    <img src="C:\Users\rowno\Desktop\receptprojekt\image.png" alt="recipe.title" />
    </div>
</template>


<style>
.recipe-card {
  max-width: 964px;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: #333;
  background: white;
  padding: 20px;
}

.recipe-content {
  display: flex;
  gap: 40px;
  align-items: flex-start;
}
.text-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 400px;
}

.recipe-header {
  margin-bottom: 30px;
}

.recipe-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 20px 0;
  line-height: 1.2;
  color: #1a1a1a;
}
.recipe-description {
  font-size: 1.1rem;
  line-height: 1.6;
  margin: 0;
  color: #666;
  white-space: pre-line;
}

.recipe-footer {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: auto;
}

.stars {
  display: flex;
  gap: 4px;
}

.star {
  color: #FFD700;
  font-size: 1.5rem;
}.recipe-description {
  font-size: 1.1rem;
  line-height: 1.6;
  margin: 0;
  color: #666;
  white-space: pre-line;
}

.recipe-footer {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: auto;
}

.stars {
  display: flex;
  gap: 4px;
}

.star {
  color: #FFD700;
  font-size: 1.5rem;
}.recipe-description {
  font-size: 1.1rem;
  line-height: 1.6;
  margin: 0;
  color: #666;
  white-space: pre-line;
}

.recipe-footer {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: auto;
}

.stars {
  display: flex;
  gap: 4px;
}

.star {
  color: #FFD700;
  font-size: 1.5rem;
}
.cooking-time {
  background: #f8f9fa;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 600;
  border: 1px solid #e9ecef;
}

.time-text {
  font-size: 1rem;
  color: #495057;
}

.image-section {
  flex: 0 0 320px;
}
.recipe-img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

</style>