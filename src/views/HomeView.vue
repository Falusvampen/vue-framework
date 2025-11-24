<script>
import CardCarousel from '@/components/CardCarousel.vue'
import RecipeService from '@/services/RecipeService'

export default {
  name: 'HomeView',
  components: {
    CardCarousel,
  },
  data() {
    return {
      recipes: [],
      loading: false,
      error: null,
      teamId: import.meta.env.VITE_TEAM_ID,
    }
  },
  computed: {
    mappedRecipes() {
      return this.recipes.map((recipe) => {
        return {
          id: recipe.id,
          imageSrc: recipe.imageUrl,
          altText: recipe.title,
          title: recipe.title,
          // description: this.truncateText(recipe.description, 80),
          description: recipe.description,
          ingredients: `${recipe.ingredients.length} ingredienser`,
          time: recipe.time,
          // rating: recipe.averageRating,
          rating: this.convertToStars(recipe.averageRating),
        }
      })
    },
  },
  async created() {
    this.loading = true
    try {
      this.recipes = await RecipeService.getAllRecipes(this.teamId)
    } catch (err) {
      console.error(err)
      this.error = 'Kunde inte hämta recepten.'
    } finally {
      console.log('Recept laddade:', this.recipes)
      this.loading = false
    }
  },
  methods: {
    // Hjälpfunktion för att korta ner text
    truncateText(text, length) {
      if (!text) return ''
      if (text.length <= length) return text
      return text.substring(0, length) + '...'
    },

    // Ful funktion för att konvertera betyg till stjärnor, måste förbättras senare
    convertToStars(rating) {
      if (!rating) return '☆☆☆☆☆'
      const score = Math.round(parseFloat(rating))
      return '★'.repeat(score) + '☆'.repeat(5 - score)
    },
  },
}
</script>

<template>
  <main class="dashboard">
    <div v-if="loading" style="color: white; padding: 2rem">Laddar recept...</div>
    <div v-if="error" style="color: red; padding: 2rem">{{ error }}</div>

    <CardCarousel
      v-if="!loading && recipes.length > 0"
      title="Senaste Recepten"
      :cards="mappedRecipes"
      :visibleCount="3"
    />
  </main>
</template>

<style scoped>
.dashboard {
  /* En mörk bakgrund så din vita text "Senaste Recepten" syns */
  background-color: #bd4848;
  min-height: 100vh;
  padding-top: 2rem;
}
</style>
