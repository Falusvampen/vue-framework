<script>
import apiService from '@/services/RecipeService'
import BaseHero from '@/components/BaseHero.vue'
import IngredientComponent from '@/components/IngredientComponent.vue'
import StepComponent from '@/components/StepComponent.vue'
import StatBar from '@/components/StatBar.vue'
import StarRating from '@/components/StarRating.vue'
import CommentComponent from '@/components/CommentComponent.vue'
import RecipeRatingComponent from '@/components/RecipeRatingComponent.vue'
import GymSpinner from '@/components/GymSpinner.vue'

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
    GymSpinner,
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
        this.recipe = await apiService.getRecipe(this.$route.params.id)
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
  <main class="recipe-container" id="main-content">
    <div v-if="loading" class="state-container">
      <GymSpinner />
    </div>

    <div v-else>
      <div class="hero-wrapper">
        <BaseHero
          :title="recipe.title"
          :background-image="recipe.imageUrl"
          height="60vh"
          :overlay-opacity="0.3"
        >
          <p class="recipe-description">{{ recipe.description }}</p>
        </BaseHero>

        <button
          class="img-bottom-left-btn"
          @click="$router.back()"
          aria-label="Gå tillbaka till föregående sida"
        >
          Tillbaka
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

      <div class="recipe-row">
        <section aria-label="Ingredienser">
          <IngredientComponent title="Ingredienser" :ingredients="recipe.ingredients" />
        </section>

        <section aria-label="Instruktioner">
          <StepComponent title="Gör så här" :steps="recipe.instructions" />
        </section>
      </div>

      <section aria-label="Betygsätt receptet">
        <RecipeRatingComponent :recipeId="recipe.id" @rating-submitted="fetchRecipeData" />
      </section>

      <section aria-label="Kommentarer">
        <CommentComponent :recipeId="recipe.id" />
      </section>
    </div>
  </main>
</template>

<style scoped>
.state-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
  width: 100%;
}

.error-msg {
  color: #e74c3c;
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.retry-btn {
  padding: 0.5rem 1rem;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.recipe-description {
  font-size: 1.15rem;
  line-height: 1.6;
  color: #f0f0f0;
  max-width: 700px;
  margin-top: 10px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
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

.hero-wrapper {
  position: relative;
}

.img-bottom-left-btn {
  position: absolute;
  bottom: 1rem;
  left: 3rem;
  padding: 10px 20px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  z-index: 2;
}

.img-bottom-left-btn:hover {
  background-color: rgba(255, 255, 255, 0.9);
  color: black;
}

.img-bottom-left-btn:focus {
  outline: 2px solid white;
  outline-offset: 2px;
}
</style>
