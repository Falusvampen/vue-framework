<script>
import StarRating from './StarRating.vue'
import apiService from '../services/RecipeService'

export default {
  name: 'RecipeRatingComponent',
  components: {
    StarRating,
  },
  props: {
    recipeId: {
      type: [String, Number],
      required: true,
    },
  },
  data() {
    return {
      userRating: 0,
      isSubmitting: false,
      success: false,
      error: null,
    }
  },
  methods: {
    async handleRating(ratingValue) {
      if (this.isSubmitting) return

      this.isSubmitting = true
      this.error = null

      try {
        await apiService.addRating(this.recipeId, ratingValue)

        this.success = true
        this.userRating = ratingValue // Lås stjärnorna visuellt

        // Berätta för föräldern att det är klart, så den kan hämta om snittbetyget
        this.$emit('rating-submitted')
      } catch (err) {
        console.error('Rating failed:', err)
        if (err.response?.data) {
          this.error = `Kunde inte spara: ${JSON.stringify(err.response.data)}`
        } else {
          this.error = 'Ett fel uppstod. Kontrollera din anslutning.'
        }
        this.userRating = 0 // Nollställ vid fel
      } finally {
        this.isSubmitting = false
      }
    },
  },
}
</script>

<template>
  <div class="rating-wrapper">
    <h3>Vad tyckte du om receptet?</h3>

    <div v-if="success" class="thank-you-message">
      <p>🌟 Tack för ditt betyg!</p>
    </div>

    <div v-else class="rate-container">
      <p class="rate-instruction">Klicka på stjärnorna för att ge ditt betyg</p>

      <StarRating
        v-model="userRating"
        :readonly="isSubmitting"
        :show-label="true"
        @rate="handleRating"
        class="interactive-stars"
        :class="{ processing: isSubmitting }"
      />

      <p v-if="error" class="error-text">{{ error }}</p>
    </div>
  </div>
</template>

<style scoped>
.rating-wrapper {
  text-align: center;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 12px;
  max-width: 600px;
  margin: 3rem auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.rating-wrapper h3 {
  margin-bottom: 0.5rem;
  color: #333;
  font-size:1.5rem;
}

.rate-instruction {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 1rem;
}

.interactive-stars {
  justify-content: center;
  transform: scale(1.5);
  margin: 15px 0;
  transition: opacity 0.3s;
}

.interactive-stars.processing {
  opacity: 0.6;
  pointer-events: none; /* Lås klick medan vi väntar på svar */
}

.thank-you-message {
  font-size: 1.2rem;
  font-weight: bold;
  color: #27ae60;
  animation: fadeIn 0.5s ease-in;
  padding: 1rem 0;
}

.error-text {
  color: #e74c3c;
  margin-top: 10px;
  font-size: 0.9rem;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
