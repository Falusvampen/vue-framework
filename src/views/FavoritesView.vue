<template>
  <main class="dashboard">
    <Favoritesheader
      header="Våra 20 Favoriter"
      minitext="Checka in våra personliga favoriter"
    />

    <div v-if="loading" style="color: white; padding: 2rem; margin-left:44%">
      Laddar recept...
    </div>
    <div v-if="error" style="color: red; padding: 2rem; margin-left:44%">
      {{ error }}
    </div>

    <div class="fastsnackscards">
      <Favorites
        v-if="!loading && recipes.length > 0"
        title="Snabba Fastsnacks"
        :cards="mappedRecipes"
        :visibleCount="20"
        :limit="20" 
      />
    </div>
  </main>
</template>

<script>
import Favorites from '@/components/Favorites.vue'
import Favoritesheader from '@/components/Favoritesheader.vue'
import RecipeService from '@/services/RecipeService'

export default {
  name: 'FavoritesView',
  components: { Favorites, Favoritesheader },
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
      return this.recipes.map((recipe) => ({
        id: recipe.id,
        imageSrc: recipe.imageUrl,
        altText: recipe.title,
        title: recipe.title,
        slug: recipe.slug,
        description: recipe.description,
        ingredients: `${recipe.ingredients.length} ingredienser`,
        time: recipe.time,
        rating: this.convertToStars(recipe.averageRating),
        averageRating: recipe.averageRating,
      }))
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
      this.loading = false
    }
  },
  methods: {
    convertToStars(rating) {
      if (!rating) return '☆☆☆☆☆'
      const score = Math.round(parseFloat(rating))
      return '★'.repeat(score) + '☆'.repeat(5 - score)
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
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.6);
  background-blend-mode: darken;
}
</style>