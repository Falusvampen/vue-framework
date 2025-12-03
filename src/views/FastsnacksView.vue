<script>
import Fastsnacks from '@/components/Fastsnacks.vue'
import RecipeService from '@/services/RecipeService'
import Fastsnacksheader from '@/components/Fastsnacksheader.vue'

export default {
  name: 'FastsnacksView',
  components: {
    Fastsnacks,
    Fastsnacksheader,
  },
  data() {
    return {
      recipes: [],
      loading: false,
      error: null,
    }
  },
  computed: {
    mappedRecipes() {
      return this.recipes.map((recipe) => {
        // Logik för texten: Visa "Hämtar info..." tills vi fått datan
        let ingredientText = ''

        // Om vi har ingredienser = Visa antalet
        if (recipe.ingredients && recipe.ingredients.length > 0) {
          ingredientText = `${recipe.ingredients.length} ingredienser`
        } else {
          // Annars antar vi att den laddas i bakgrunden just nu
          ingredientText = 'Hämtar info...'
        }

        return {
          id: recipe.id,
          imageSrc: recipe.imageUrl,
          altText: recipe.title,
          title: recipe.title,
          slug: recipe.slug,
          // description: this.truncateText(recipe.description, 80),
          description: recipe.description,
          ingredients: ingredientText,
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
      // 1. Hämta listan som saknar detaljer
      this.recipes = await RecipeService.getAllRecipes()

      // 2. Släpp laddnings-spinnern så användaren ser sidan
      this.loading = false

      // 3. Starta processen att ladda detaljer i bakgrunden
      // Vi använder inte 'await' här eftersom vi vill att UI:t ska vara levande under tiden.
      this.hydrateAllRecipes()
    } catch (err) {
      console.error(err)
      this.error = 'Kunde inte hämta recepten.'
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

    /**
     * Går igenom hela listan och hämtar detaljer (ingredienser/betyg)
     * för ett recept i taget.
     */
    async hydrateAllRecipes() {
      // Vi kopierar referensen till listan för att loopa säkert
      const recipesToHydrate = [...this.recipes]

      for (const simpleRecipe of recipesToHydrate) {
        try {
          // Hämta detaljerad data för detta recept
          const detailedRecipe = await RecipeService.getCompleteRecipe(simpleRecipe.id)

          // Hitta var receptet ligger i den aktuella listan (ifall sortering ändrats etc)
          const index = this.recipes.findIndex((r) => r.id === simpleRecipe.id)

          if (index !== -1) {
            // VIKTIGT: Använd splice för att Vue ska reagera direkt och uppdatera kortet
            this.recipes.splice(index, 1, detailedRecipe)
          }
        } catch (e) {
          console.warn(`Kunde inte ladda detaljer för ${simpleRecipe.title}`, e)
        }
      }
    },
  },
}
</script>

<template>
  <main class="dashboard">
    <div v-if="loading" style="color: white; padding: 2rem">Laddar recept...</div>
    <div v-if="error" style="color: red; padding: 2rem">{{ error }}</div>

    <Fastsnacksheader header="Snabba Mellanmål" minitext="Checka in våra snabbaste recept" />

    <div class="fastsnackscards">
      <Fastsnacks
        v-if="!loading && recipes.length > 0"
        title="Snabba Fastsnacks"
        :cards="mappedRecipes"
        :visibleCount="3"
      />

      <Fastsnacks
        v-if="!loading && recipes.length > 0"
        title="Snabba Fastsnacks"
        :cards="mappedRecipes"
        :visibleCount="3"
      />

      <Fastsnacks
        v-if="!loading && recipes.length > 0"
        title="Snabba Fastsnacks"
        :cards="mappedRecipes"
        :visibleCount="3"
      />
    </div>
  </main>
</template>

<style scoped>
.dashboard {
  background-image: url('../assets/modernGym.webp');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-color: #1a1a1a;
  min-height: 100vh;
  width: 100%;
  justify-content: center;
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.6);
  background-blend-mode: darken;
}
</style>
