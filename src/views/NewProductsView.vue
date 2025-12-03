<template>
  <main class="dashboard">
    <div v-if="loading" style="color: white; padding: 2rem">Laddar recept...</div>
    <div v-if="error" style="color: red; padding: 2rem">{{ error }}</div>
    <Newproductsheader
      header="Nya Produkter"
      minitext="Kolla in våra  allra nyaste produkter innan det är försent!"
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
import Newproducts from '@/components/Newproducts.vue'
import Newproductsheader from '@/components/Newproductsheader.vue'
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
      }))
    },
  },
  async created() {
    this.loading = true
    try {
      this.recipes = await RecipeService.getAllRecipes()
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
