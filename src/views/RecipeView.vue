<script>
import apiService from '@/services/RecipeService'
import BaseHero from '@/components/BaseHero.vue'
import IngredientComponent from '@/components/IngredientComponent.vue'
import StepComponent from '@/components/StepComponent.vue'
import StatBar from '@/components/StatBar.vue'
import StarRating from '@/components/StarRating.vue'
import CommentComponent from '@/components/CommentComponent.vue'
import RecipeRatingComponent from '@/components/RecipeRatingComponent.vue'

export default {
  name: 'RecipeView',
  components: {
    BaseHero,
    IngredientComponent,
    StepComponent,
    StatBar,
    StarRating,
    CommentComponent,
    RecipeRatingComponent,
  },
  data() {
    return {
      recipe: null,
      loading: true, // Vi startar som true, så slipper vi kolla !recipe i metoderna
      error: null,
    }
  },
  async created() {
    await this.fetchRecipeData()
  },

  computed: {
    statsItems() {
      if (!this.recipe) return []

      const count = this.recipe.ingredients?.length || 0
      const level = count > 12 ? 'Avancerad' : count > 6 ? 'Medel' : 'Enkel'

      return [
        { label: 'TID', value: `${this.recipe.time}` },
        { label: 'BETYG', value: this.recipe.averageRating, isRating: true },
        { label: 'NIVÅ', value: level },
      ]
    },
  },
  methods: {
    async fetchRecipeData() {
      // Vi sätter bara loading om vi inte redan har data (snyggare UX)
      if (!this.recipe) this.loading = true
      this.error = null

      try {
        this.recipe = await apiService.getCompleteRecipe(this.$route.params.id)
      } catch (err) {
        console.error(err)
        this.error = 'Kunde inte hitta receptet.'
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<template>
  <div class="recipe-container">
    <div v-if="loading" class="state-msg">Laddar recept...</div>
    <div v-else-if="error" class="state-msg error">{{ error }}</div>

    <div v-else>
      <BaseHero :title="recipe.title" :background-image="recipe.imageUrl" height="60vh">
        <p class="recipe-description">{{ recipe.description }}</p>
      </BaseHero>

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

      <div class="recipe-row">
        <IngredientComponent title="Ingredienser" :ingredients="recipe.ingredients" />

        <StepComponent title="Gör så här" :steps="recipe.instructions" />
      </div>

      <RecipeRatingComponent :recipeId="recipe.id" @rating-submitted="fetchRecipeData" />

      <CommentComponent :recipeId="recipe.id" />
    </div>
  </div>
</template>

<style scoped>
.state-msg {
  text-align: center;
  padding: 4rem;
  font-size: 1.2rem;
  color: #666;
}
.state-msg.error {
  color: #e74c3c;
}

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

.recipe-row {
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 2rem;
  margin-bottom: 2rem;
}
</style>
