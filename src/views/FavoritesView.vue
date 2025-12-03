<script>
import Favorites from '@/components/Favorites.vue';
import Favoritesheader from '@/components/Favoritesheader.vue';
import RecipeService from '@/services/RecipeService'


export default {
  name: 'LatestProductsView',
  components: {
    Favorites,
    Favoritesheader
    
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
          slug: recipe.slug,
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


    <Favoritesheader 
    header="Våra Favoriter"
    minitext="Checka in våra personliga favoriter"

    
    />

    <div class="fastsnackscards">
         <Favorites
      v-if="!loading && recipes.length > 0"
      title="Snabba Fastsnacks"
      :cards="mappedRecipes"
      :visibleCount="3"
    />

     <Favorites
      v-if="!loading && recipes.length > 0"
      title="Snabba Fastsnacks"
      :cards="mappedRecipes"
      :visibleCount="3"
      
    />

    <Favorites
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
