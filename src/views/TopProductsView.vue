<template>
  <main class="dashboard">
    <TopProductsHeader
      header="Topp rankade produkter"
      minitext="Kolla in våra bäst rankade produkter"
    />

    <div v-if="loading" style="color: white; padding: 2rem; margin-left:44%">
      Laddar recept...
    </div>
    <div v-if="error" style="color: red; padding: 2rem; margin-left:44%">
      {{ error }}
    </div>

    <TopProducts
      v-if="!loading && recipes.length > 0"
      title="Topp 5 produkter"
      :cards="mappedRecipes"
      :visibleCount="5"
      :limit="5"
    />
  </main>
</template>

<script>
import TopProducts from '@/components/TopProducts.vue'
import TopProductsHeader from '@/components/TopProductsheader.vue'
import RecipeService from '@/services/RecipeService'

export default {
  name: 'TopProductsView',
  components: { TopProducts, TopProductsHeader },
  data() {
    return { recipes: [], loading: false, error: null }
  },
  computed: {
    mappedRecipes() {
      return this.recipes.map(recipe => ({
        id: recipe.id,
        imageSrc: recipe.imageUrl,
        altText: recipe.title,
        title: recipe.title,
        slug: recipe.slug,
        description: recipe.description,
        ingredients: `${recipe.ingredients.length} ingredienser`,
        time: recipe.time,
        rating: this.convertToStars(recipe.averageRating),
        averageRating: recipe.averageRating
      }))
    }
  },
  async created() {
    this.loading = true
    try {
      this.recipes = await RecipeService.getAllRecipes()
    } catch (err) {
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
    }
  }
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