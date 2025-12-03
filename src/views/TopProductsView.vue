<template>
  <main class="dashboard">
    <div v-if="loading" style="color: white; padding: 2rem">Laddar recept...</div>
    <div v-if="error" style="color: red; padding: 2rem">{{ error }}</div>
    <Newproductsheader
      header="Topp rankade produkter"
      minitext="Kolla in våra bäst rankade produkter "
    />

    <div class="Newproductcards">
      <Newproducts
        v-if="!loading && recipes.length > 0"
        title="Snabba Fastsnacks"
        :cards="mappedRecipes"
        :visibleCount="3"
      />
      <Newproducts
        v-if="!loading && recipes.length > 0"
        title="Snabba Fastsnacks"
        :cards="mappedRecipes"
        :visibleCount="3"
      />
      <Newproducts
        v-if="!loading && recipes.length > 0"
        title="Snabba Fastsnacks"
        :cards="mappedRecipes"
        :visibleCount="3"
      />
    </div>
  </main>
</template>

<script>
import Newproducts from '@/components/TopProducts.vue'
import Newproductsheader from '@/components/TopProductsheader.vue'
import RecipeService from '@/services/RecipeService'

export default {
  name: 'NewProductsView',
  components: { Newproducts, Newproductsheader },
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
          description: recipe.description,
          ingredients: ingredientText,
          time: recipe.time,
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
      this.hydrateAllRecipes()
    } catch (err) {
      console.error(err)
      this.error = 'Kunde inte hämta recepten.'
      this.loading = false
    }
  },
  methods: {
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
      const recipesToHydrate = [...this.recipes]

      for (const simpleRecipe of recipesToHydrate) {
        try {
          const detailedRecipe = await RecipeService.getCompleteRecipe(simpleRecipe.id)
          const index = this.recipes.findIndex((r) => r.id === simpleRecipe.id)

          if (index !== -1) {
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
