<script>
import CardCarousel from '@/components/CardCarousel.vue'
import RecipeService from '@/services/RecipeService'
import Textimagesplit1 from '@/components/Textimagesplit1.vue'
import Textimagesplit from '@/components/Textimagesplit.vue'
import Searchbar from '@/components/Searchbar.vue'
import RecipeCard from '@/components/RecipeCard.vue'
import BaseHero from '@/components/BaseHero.vue'
import CategoriesComponent from '@/components/CategoriesComponent.vue'

export default {
  name: 'HomeView',
  components: {
    CardCarousel,
    Textimagesplit,
    Textimagesplit1,
    BaseHero,
    CategoriesComponent,
    Searchbar,
    RecipeCard,
  },
  // Det här är grejer vi kommer åt i template:en och metoderna
  data() {
    return {
      recipes: [],
      loading: false,
      error: null,
      categories: [],
      searchQuery: '', // Kommer åt från Searchbar via emit/v-model
      selectedCategory: null,
      selectedCategoryDescription: null,
      defaultTitle: 'Gymsnacks för alla tillfällen',
      defaultDescription:
        'Upptäck våra läckra, näringsrika och proteinrika snacksrecept, perfekta för att hålla energinivån uppe under dagen!',
    }
  },
  computed: {
    // Ändrar titeln till kategorins namn
    heroTitle() {
      // return this.modelValue
      return this.selectedCategory ? this.selectedCategory : this.defaultTitle
    },
    // Denna variabel skickar vi nu till BaseHero som "description"
    displayDescription() {
      return this.selectedCategoryDescription
        ? this.selectedCategoryDescription
        : this.defaultDescription
    },
    filteredRecipes() {
      return this.recipes.filter((recipe) => {
        const matchesSearch = recipe.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        const matchesCategory = this.selectedCategory
          ? Array.isArray(recipe.categories)
            ? recipe.categories.includes(this.selectedCategory)
            : recipe.category === this.selectedCategory
          : true

        return matchesSearch && matchesCategory
      })
    },
    mappedRecipes() {
      const filtered = this.filteredRecipes

      return filtered.map((recipe) => {
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

    /**
     * Räkna antal recept per kategori baserat på det vi har i `recipes`.
     * Nycklar är kategorinamn, värden är antal.
     */
    categoryCounts() {
      const counts = {}
      for (const recipe of this.recipes) {
        if (Array.isArray(recipe.categories)) {
          for (const c of recipe.categories) {
            counts[c] = (counts[c] || 0) + 1
          }
        } else if (recipe.category) {
          counts[recipe.category] = (counts[recipe.category] || 0) + 1
        }
      }
      return counts
    },
  },
  async created() {
    this.loading = true
    try {
      // 1. Hämta listan som saknar detaljer
      const [allRecipes, allCategories] = await Promise.all([
        RecipeService.getAllRecipes(),
        RecipeService.getCategories(),
      ])

      this.recipes = allRecipes
      this.categories = allCategories // Spara kategorierna i data

      // 2. Släpp laddnings-spinnern så användaren ser sidan
      this.loading = false

      // 3. Starta processen att ladda
      // Vi använder inte 'await' här eftersom vi vill att UI:t ska vara levande under tiden.
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
    handleCategorySelect(categoryName) {
      if (!categoryName) {
        this.selectedCategory = null
        this.selectedCategoryDescription = null
        return
      }

      this.selectedCategory = categoryName
      const found = Array.isArray(this.categories)
        ? this.categories.find((c) => c.name === categoryName)
        : null
      this.selectedCategoryDescription = found ? found.description : null
    },
  },
}
</script>

<template>
  <main class="dashboard">
    <BaseHero
      :title="heroTitle"
      height="35em"
      :description="displayDescription"
      :overlay-opacity="0"
    >
      <Searchbar v-model="searchQuery" placeholder="Sök recept..." />
      <CategoriesComponent
        :categories="categories"
        :category-counts="categoryCounts"
        :active-category="selectedCategory"
        @category-select="handleCategorySelect"
      />
    </BaseHero>

    <div v-if="loading" style="color: white; padding: 2rem; margin-left: 44%">Laddar recept...</div>
    <div v-if="error" style="color: red; padding: 2rem; margin-left: 44%">{{ error }}</div>

    <div class="Cards" v-if="!selectedCategory && !searchQuery">
      <CardCarousel
        v-if="!loading && recipes.length > 0"
        title="Senaste Recepten"
        link="/latest-products"
        :cards="mappedRecipes"
        :visibleCount="3"
      />

      <CardCarousel
        v-if="!loading && recipes.length > 0"
        title="Våra favoriter"
        link="/favorites"
        :cards="mappedRecipes"
        :visibleCount="3"
      />
    </div>

    <div v-else class="recipe-grid-container">
      <div class="recipe-grid">
        <RecipeCard v-for="card in mappedRecipes" :key="card.id" :card="card" />
      </div>

      <div v-if="mappedRecipes.length === 0" class="no-results">
        Inga recept hittades som matchar dina val.
      </div>
    </div>

    <Textimagesplit
      title="ENKELT, SNABBT OCH SUPERGOTT."
      subtitle="Recept och tips"
      buttonText="Läs mer"
      imageSrc="berry.png"
      imageSrc1="Pasta.jpg"
      link="/fastsnacks"
    />

    <Textimagesplit1
      title="Bäst rankade recepten"
      subtitle="Checka in våra bäst rankade recept!"
      buttonText="Utforska"
      imageSrc="New.png"
      link="/Top-products"
    />
  </main>
</template>

<style scoped>
.dashboard {
  background-image: url('../assets/modernGym.webp');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.6);
  background-blend-mode: darken;
}

.recipe-grid-container {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto 4rem auto;
  display: flex;
  flex-direction: column;
}

.grid-header {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  margin-left: 1rem;
}

.grid-header h1 {
  font-family: 'Holtwood One SC';
  color: white;
  font-size: 1.5rem;
}

.clear-btn {
  background: transparent;
  border: 1px solid white;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  margin-left: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.clear-btn:hover {
  background: white;
  color: black;
}

.recipe-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  justify-items: center;
}

.no-results {
  color: white;
  font-size: 1.2rem;
  text-align: center;
  margin-top: 2rem;
}
</style>
