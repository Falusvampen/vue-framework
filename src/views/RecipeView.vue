<script>
import recipeService from '../services/RecipeService'
import InfoList from '@/components/InfoList.vue'
import BaseHero from '@/components/BaseHero.vue'
import StatBar from '@/components/StatBar.vue'
import AsyncHandler from '@/components/AsyncHandler.vue'
import BaseCommentSection from '@/components/BaseCommentSection.vue'
import StarRating from '@/components/StarRating.vue'

export default {
  name: 'RecipeView',
  components: {
    InfoList,
    BaseHero,
    StatBar,
    AsyncHandler,
    BaseCommentSection,
    StarRating,
  },
  data() {
    return {
      recipe: null,
      loading: true,
      error: null,

      submittingComment: false,
      commentError: null,

      userRating: 0,
      isRatingSubmitting: false,
    }
  },
  async created() {
    await this.fetchRecipeData()
  },
  watch: {
    '$route.params.id': 'fetchRecipeData',
  },
  computed: {
    formattedIngredients() {
      if (!this.recipe?.ingredients) return []
      return this.recipe.ingredients.map((i) => i.display)
    },
    formattedSteps() {
      return this.recipe?.instructions || []
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
      const recipeId = this.$route.params.id
      if (!recipeId) return

      try {
        this.recipe = await recipeService.getCompleteRecipe(recipeId)
      } catch (err) {
        this.error = err.message || 'Kunde inte hämta receptet.'
      } finally {
        this.loading = false
      }
    },

    async handlePostComment(formData) {
      this.submittingComment = true
      this.commentError = null
      const payload = { name: formData.name, comment: formData.text }

      try {
        const newComment = await recipeService.addComment(this.recipe.id, payload)

        if (this.recipe.comments) {
          this.recipe.comments.push(newComment)
        } else {
          this.recipe.comments = [newComment]
        }
        this.$refs.commentSection.resetForm()
      } catch (err) {
        console.error(err)
        this.commentError = 'Kunde inte skicka kommentaren.'
      } finally {
        this.submittingComment = false
      }
    },

    async handleRate(rating) {
      if (this.isRatingSubmitting) return
      this.isRatingSubmitting = true

      try {
        const ratingValue = Array.isArray(rating) ? rating[0] : rating

        await recipeService.addRating(this.recipe.id, ratingValue)

        alert(`Tack! Du gav receptet ${ratingValue} stjärnor.`)
        await this.fetchRecipeData()
        this.userRating = 0
      } catch (err) {
        console.error(err)
        const msg = err.response ? err.response.data.message : 'Kunde inte spara betyget.'
        alert(msg)
      } finally {
        this.isRatingSubmitting = false
      }
    },
  },
}
</script>

<template>
  <div class="recipe-view">
    <AsyncHandler :loading="loading" :error="error">
      <div v-if="recipe">
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

        <div class="recipe-details-grid">
          <div class="ingredients-column">
            <InfoList title="Ingredienser" :items="formattedIngredients" variant="bullet" />
          </div>
          <div class="steps-column">
            <InfoList title="Gör så här" :items="formattedSteps" variant="ordered" />
          </div>
        </div>

        <div class="rating-section-wrapper">
          <h3>Har du lagat maten?</h3>
          <p>Sätt ett betyg och hjälp andra att hitta rätt!</p>
          <StarRating
            v-model="userRating"
            :readonly="isRatingSubmitting"
            :show-label="true"
            class="big-rating"
            @rate="handleRate"
          />
        </div>

        <BaseCommentSection
          ref="commentSection"
          title="Vad tycker du?"
          :comments="recipe.comments || []"
          :is-submitting="submittingComment"
          :error="commentError"
          button-text="Publicera kommentar"
          @submit="handlePostComment"
        />

        <div class="spacer"></div>
      </div>
    </AsyncHandler>
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
.recipe-details-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 50px;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 20px 40px 20px;
}
@media (min-width: 900px) {
  .recipe-details-grid {
    grid-template-columns: 1fr 2fr;
    align-items: start;
  }
}
.rating-section-wrapper {
  text-align: center;
  padding: 50px 20px;
  background-color: #f9f9f9;
  margin: 40px auto;
  max-width: 600px;
  border-radius: 16px;
  border: 1px dashed #ddd;
}
.rating-section-wrapper h3 {
  margin: 0 0 8px 0;
  color: #333;
}
.rating-section-wrapper p {
  color: #666;
  margin-bottom: 24px;
}
.big-rating {
  justify-content: center;
}
.big-rating :deep(.star-icon) {
  width: 42px;
  height: 42px;
}
.spacer {
  height: 60px;
}
</style>
