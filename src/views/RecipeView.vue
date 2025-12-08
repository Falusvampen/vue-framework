<script>
import Ingredienser from '../components/Ingredienser.vue'
import StepComponent from '../components/StepComponent.vue'
import Gebetyg from '../components/Gebetyg.vue'
import apiService from '../services/RecipeService'
import BaseHero from '../components/BaseHero.vue'
import StatBar from '../components/StatBar.vue'
import StarRating from '../components/StarRating.vue'
import RecipeDescription from '@/components/RecipeDescription.vue'
import CommentComponent from '@/components/CommentComponent.vue'

export default {
  name: 'RecipeView',
  components: {
    RecipeDescription,
    CommentComponent,
    Ingredienser,
    StepComponent,
    Gebetyg,
    BaseHero,
    StatBar,
    StarRating,
  },
  data() {
    return {
      recipe: null,
      loading: true,
      error: null,
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
    statsItems() {
      if (!this.recipe) return []

      const count = this.recipe.ingredients?.length || 0
      let level = 'Enkel'
      if (count > 6) level = 'Medel'
      if (count > 12) level = 'Avancerad'

      return [
        { label: 'TID', value: `${this.recipe.time}` },
        { label: 'BETYG', value: this.recipe.averageRating, isRating: true },
        { label: 'NIVÅ', value: level },
      ]
    },
  },
  methods: {
    async fetchRecipeData() {
      this.loading = true
      this.error = null

      try {
        const completeRecipe = await apiService.getCompleteRecipe(this.$route.params.id)

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
      <div class="hero-wrapper">
        <BaseHero :title="recipe.title" :background-image="recipe.imageUrl" height="60vh">
          <p class="recipe-description">{{ recipe.description }}</p>
        </BaseHero>
    
        <button class="img-bottom-left-btn" @click="$router.back()">Tillbaka
</button>
      </div>

      
      

    


      <div class="floating-stats-container">
        <StatBar :items="statsItems">
          <template #icon="{ item }">
            <StarRating
              v-if="item.isRating"
              :model-value="item.value"
              readonly
              class="mini-stars"
            />
          </template>
        </StatBar>
      </div>

      <img v-if="false" :src="recipe.imageUrl" alt="Receptbild" class="recipe-img" />
      
      <div class="recipe-row">
        <Ingredienser title="Ingredienser" :ingredients="formattedIngredients" />
        <StepComponent title="Gör så här" :steps="formattedSteps" />
      </div>
      <Gebetyg :recipeId="recipe.id" />
      <CommentComponent :recipeId="recipe.id" />
    </div>
  </div>
</template>

<style scoped>


.recipe-description {
  font-size: 1.15rem;
  line-height: 1.6;
  color: #f0f0f0;
  max-width: 700px;
  margin-top: 10px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
}
.floating-stats-container {
  padding: 0 20px;
  margin-top: -50px;
  position: relative;
  z-index: 10;
  margin-bottom: 50px;
}
.mini-stars {
  transform: scale(0.85);
  margin-right: -4px;
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
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  gap:2rem;
}

.hero-wrapper {
position: relative;
}


.img-bottom-left-btn {
position: absolute;
bottom: 1rem;
left: 3rem;
padding: 10px 20px;
background-color: #707070;
color: white;
border: none;
border-radius: 6px;
cursor: pointer;
font-size: 1rem;
box-shadow: 0 2px 6px rgba(0,0,0,0.3);
transition: background 0.3s ease;
z-index: 2;
}


.img-bottom-left-btn:hover {
background-color: #9c9c9c;
}





</style>
