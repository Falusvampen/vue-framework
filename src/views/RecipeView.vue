<script>
import Ingredienser from '../components/Ingredienser.vue'
import StepComponent from '../components/StepComponent.vue'
import Gebetyg from '../components/Gebetyg.vue'
import apiService from '../services/RecipeService'
import RecipeDescription from '@/components/RecipeDescription.vue'
import CommentComponent from '@/components/CommentComponent.vue'

export default {
  name: 'RecipeView',
  components: {
    RecipeDescription,
    Ingredienser,
    StepComponent,
    Gebetyg,
    CommentComponent,
  },
  data() {
    return {
      recipe: null,
      loading: true,
      error: null,
      teamId: import.meta.env.VITE_TEAM_ID,
    }
  },
  async created() {
    await this.fetchRecipeData()
  },
  computed: {
    formattedIngredients() {
      if (!this.recipe || !this.recipe.ingredients) return []
      return this.recipe.ingredients.map((ingredient) => ingredient.display)
    },
    formattedSteps() {
      if (!this.recipe || !this.recipe.instructions) return []

      return this.recipe.instructions.map((stepText, index) => ({
        number: index + 1,
        tutorial: stepText,
      }))
    },
  },
  methods: {
    async fetchRecipeData() {
      this.loading = true
      this.error = null

      try {
        const completeRecipe = await apiService.getCompleteRecipe(
          this.teamId,
          this.$route.params.id,
        )

        this.recipe = completeRecipe
      } catch (err) {
        console.error(err)
        this.error = 'Kunde inte hitta receptet. Kontrollera stavningen eller att det finns.'
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<template>
  <div class="recipe-container">
    <div v-if="loading">Laddar recept...</div>
    <div v-else-if="error">{{ error }}</div>

    <div v-else>
      <h1 id="recipeTitle">{{ recipe.title }}</h1>
      <p class="desc">{{ recipe.description }}</p>
      <RecipeDescription :description="recipe.description" />


      <img v-if="recipe.imageUrl" :src="recipe.imageUrl" alt="Receptbild" class="recipe-img" />
      

      <div class="recipe-row">
        <Ingredienser title="Ingredienser" :ingredients="formattedIngredients" />
        <StepComponent title="Gör så här" :steps="formattedSteps" />
      </div>

      

      <CommentComponent :recipeId="recipe.id" />
    </div>
  </div>
</template>

<style >
#app{
  grid-template-columns: auto;
}


#stars{
  color: gold;
  font-size: 1.5rem;
  

}

#recipeTitle {
  text-align: center;
  margin-top: 2rem;
  font-weight: bold;
}

.recipe-container {
  padding: 1.5rem;
  
}

.desc {
  text-align: center;
  font-style: italic;
}

.recipe-img {
  width: 100%;
  max-width: 600px;
  height: auto;
  display: block;
  margin: 0 auto 2rem auto;
  border-radius: 8px;
}

.recipe-row {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
