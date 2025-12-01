<script>
import recipeService from '@/services/RecipeService'

import BaseCarousel from '@/components/BaseCarousel.vue'
import BaseHero from '@/components/BaseHero.vue'
import RecipeCard from '@/components/RecipeCard.vue'
import SearchBar from '@/components/SearchBar.vue'
import AsyncHandler from '@/components/AsyncHandler.vue'

export default {
  name: 'HomeView',
  components: {
    BaseCarousel,
    BaseHero,
    RecipeCard,
    SearchBar,
    AsyncHandler,
  },
  data() {
    return {
      recipes: [],
      loading: false,
      error: null,
      searchQuery: '',
      selectedCategory: '',

      heroImage:
        'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3ltfGVufDB8fDB8fHww',
    }
  },
  computed: {
    uniqueCategories() {
      if (!this.recipes.length) return []
      const allCategories = this.recipes.flatMap((r) => r.categories || [])
      return [...new Set(allCategories)].sort()
    },
    filteredRecipes() {
      return this.recipes.filter((recipe) => {
        const matchSearch = recipe.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        const matchCategory = this.selectedCategory
          ? recipe.categories && recipe.categories.includes(this.selectedCategory)
          : true
        return matchSearch && matchCategory
      })
    },
    emptyStateDescription() {
      if (this.searchQuery && this.selectedCategory) {
        return `Inga recept matchade "${this.searchQuery}" i kategorin ${this.selectedCategory}.`
      } else if (this.searchQuery) {
        return `Vi hittade inget som matchade "${this.searchQuery}".`
      }
      return 'Inga recept hittades just nu.'
    },
  },
  async created() {
    this.loading = true
    this.error = null
    try {
      this.recipes = await recipeService.getAllRecipes()
    } catch (err) {
      console.error(err)
      this.error = 'Kunde inte hämta recepten. Kontrollera din anslutning.'
    } finally {
      this.loading = false
    }
  },
  methods: {
    resetFilters() {
      this.searchQuery = ''
      this.selectedCategory = ''
    },
  },
}
</script>

<template>
  <div class="home-view">
    <BaseHero title="Vad är du sugen på idag?" :background-image="heroImage" height="60vh">
      <SearchBar
        v-model="searchQuery"
        v-model:active-filter="selectedCategory"
        :filters="uniqueCategories"
        placeholder="Sök på maträtt..."
        all-label="Alla recept"
      />
    </BaseHero>

    <div class="content-wrapper">
      <AsyncHandler
        :loading="loading"
        :error="error"
        :is-empty="filteredRecipes.length === 0"
        empty-title="Inga träffar"
        :empty-description="emptyStateDescription"
        empty-icon="🥗"
      >
        <BaseCarousel
          :title="searchQuery || selectedCategory ? 'Sökresultat' : 'Senaste Recepten'"
          :items="filteredRecipes"
        >
          <template #default="{ item: recipe }">
            <RecipeCard
              :id="recipe.id"
              :slug="recipe.slug"
              :image-url="recipe.imageUrl"
              :title="recipe.title"
              :description="recipe.description"
              :ingredient-count="recipe.ingredients ? recipe.ingredients.length : 0"
              :time-in-minutes="recipe.time"
              :rating="recipe.averageRating"
            />
          </template>
        </BaseCarousel>

        <template #emptyAction>
          <button @click="resetFilters" class="reset-btn">Rensa filter</button>
        </template>
      </AsyncHandler>
    </div>
  </div>
</template>

<style scoped>
.home-view {
  width: 100%;
}

.content-wrapper {
  padding: 40px 0;
  min-height: 400px;
}

.reset-btn {
  padding: 12px 24px;
  background-color: #1a1a1a;
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-weight: 600;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.reset-btn:hover {
  background-color: #333;
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}
</style>
