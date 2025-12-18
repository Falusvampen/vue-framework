<script>
import CardCarousel from '@/components/CardCarousel.vue'
import recipeService from '@/services/RecipeService'
import Textimagesplit1 from '@/components/Textimagesplit1.vue'
import Textimagesplit from '@/components/Textimagesplit.vue'
import Searchbar from '@/components/Searchbar.vue'
import RecipeCard from '@/components/RecipeCard.vue'
import BaseHero from '@/components/BaseHero.vue'
import CategoriesComponent from '@/components/CategoriesComponent.vue'
import GymSpinner from '@/components/GymSpinner.vue'

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
    GymSpinner,
  },
  // Det här är grejer vi kommer åt i template:en och metoderna
  data() {
    return {
      recipes: [],
      loading: false,
      error: null,
      categories: [],
      searchQuery: '', // Kommer åt från Searchbar via emit/v-model
      selectedCategory: null, // Kommer åt från CategoriesComponent via emit
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

        let matchesCategory = true

        if (this.selectedCategory) {
          if (Array.isArray(recipe.categories)) {
            matchesCategory = recipe.categories.includes(this.selectedCategory)
          } else {
            matchesCategory = recipe.category === this.selectedCategory
          }
        }

        return matchesSearch && matchesCategory
      })
    },

    categoryCounts() {
      const counts = {}
      for (const recipe of this.recipes) {
        const increment = (catName) => {
          const name = catName
          counts[name] = (counts[name] || 0) + 1
        }

        if (Array.isArray(recipe.categories)) {
          for (const c of recipe.categories) {
            increment(c)
          }
        } else if (recipe.category) {
          increment(recipe.category)
        }
      }
      return counts
    },
  },
  async created() {
    this.loading = true
    try {
      const [allRecipes, allCategories] = await Promise.all([
        recipeService.getAllRecipes(),
        recipeService.getCategories(),
      ])

      this.recipes = allRecipes
      this.categories = allCategories // Spara kategorierna i data

      // Släpp laddnings-spinnern så användaren ser sidan
      this.loading = false
    } catch (err) {
      // dubbel error men aja
      console.error(err)
      this.loading = false
    }
  },
  methods: {
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
  <main class="dashboard" id="main-content">
    <BaseHero :title="heroTitle" :description="displayDescription" :overlay-opacity="0">
      <Searchbar v-model="searchQuery" placeholder="Sök recept..." />
      <CategoriesComponent
        :categories="categories"
        :category-counts="categoryCounts"
        :active-category="selectedCategory"
        @category-select="handleCategorySelect"
      />
    </BaseHero>

    <div class="status-container">
      <GymSpinner v-if="loading" />
    </div>

    <section
      class="Cards"
      v-if="!selectedCategory && !searchQuery"
      aria-label="Utvalda receptsamlingar"
    >
      <CardCarousel
        v-if="!loading && recipes.length > 0"
        title="Alla recept"
        link="/all-recipes"
        :cards="filteredRecipes"
        :visibleCount="3"
      />

      <CardCarousel
        v-if="!loading && recipes.length > 0"
        title="Våra 20 favoriter"
        link="/favorites"
        :cards="filteredRecipes"
        :visibleCount="3"
      />
    </section>

    <section v-else class="recipe-grid-container" aria-label="Sökresultat">
      <div class="recipe-grid">
        <RecipeCard v-for="recipe in filteredRecipes" :key="recipe.id" :card="recipe" />
      </div>

      <div v-if="filteredRecipes.length === 0 && !loading" class="no-results" role="status">
        Inga recept hittades som matchar dina val.
      </div>
    </section>

    <Textimagesplit
      title="ENKELT, SNABBT OCH SUPERGOTT."
      imageSrc="berry.png"
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

.status-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  width: 100%;
}

.error-msg {
  background-color: rgba(255, 200, 200, 0.95);
  color: #8b0000;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: bold;
  margin-top: 1rem;
  border: 1px solid #8b0000;
}

.recipe-grid-container {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto 4rem auto;
  display: flex;
  flex-direction: column;
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
