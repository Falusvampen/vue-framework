<script>
import CardCarousel from '@/components/CardCarousel.vue'
import RecipeService from '@/services/RecipeService'
import Textimagesplit1 from '@/components/Textimagesplit1.vue'
import Textimagesplit from '@/components/Textimagesplit.vue'
import TitleAndDescription from '@/components/titleAndDescription.vue'
import Searchbar from '@/components/Searchbar.vue'

export default {
  name: 'HomeView',
  components: { CardCarousel, Textimagesplit, Textimagesplit1, TitleAndDescription, Searchbar },
  data() {
    return {
      recipes: [],
      loading: false,
      error: null,
      teamId: import.meta.env.VITE_TEAM_ID,
      searchQuery: '',
    }
  },
  computed: {
    mappedRecipes() {
      const filtered = this.recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(this.searchQuery.toLowerCase())
    );

    return filtered.map((recipe) => ({
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

<template>
  <main class="dashboard">
    <div v-if="loading" style="color: white; padding: 2rem">Laddar recept...</div>
    <div v-if="error" style="color: red; padding: 2rem">{{ error }}</div>

    <TitleAndDescription>
      <Searchbar
        v-model:search="searchQuery"
        placeholder="Sök recept..."
      />
    </TitleAndDescription>

    <div class="Cards">
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
        link="/Favorites"
        :cards="mappedRecipes"
        :visibleCount="3"
      />
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
      link="/new-products"
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
</style>
