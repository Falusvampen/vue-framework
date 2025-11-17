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
</style>