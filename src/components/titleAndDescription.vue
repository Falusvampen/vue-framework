<script>
import RecipeData from '@/recipes.json';

export default {
  name: 'TitleAndDescriptionComponent',

  data() {
    return {
      recipies: RecipeData,
      categories: []
    };
  },

  created() {
    this.extractUniqueCategories();
  },

  methods: {
    extractUniqueCategories() {
      const categorySet = new Set();

      this.recipies.forEach(recipe => {
        if (recipe.category) {
          categorySet.add(recipe.category);
        }
      });

      this.categories = Array.from(categorySet);
    },

    switchCategory(category) {
      this.$emit('categorySelected', category);
    }
  },

  computed: {
    visibleCategories() {
      return this.showAllCategories
        ? this.categories
        : this.categories.slice(0, 3);
    }
  }
}
</script>

<template>
  <div id="title-and-description">
    <h1>Gym-snacks</h1>
    <p>Välkommen till denna recept sida med gym snacks för alla tillfällen! </p>
    <ol>
      <li v-for="category in categories" :key="category">
        <button @click="switchCategory(category)">
          {{ category }}
        </button>
      </li>
      <li v-if="categories.length > 3 && !showAllCategories">
        <button @click="showAllCategories = true">
          Visa alla
        </button>
      </li>
    </ol>
  </div>
</template>

<style scoped>
#title-and-description {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
  background-image: url('https://cdn.prod.website-files.com/6361dc271a3e49d685fe418b/64b69c1d8fc68c419373a2bb_Untitled%20design%20-%202023-07-18T100512.462.png');
  background-size: cover;
  padding: 0px;
  color: white;
  text-align: center;
  max-width: 100%;
}

h1 {
  font-size: 48px;
  margin-bottom: 10px;
}

ol {
  list-style-type: none;
  padding: 0;
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 70%;
}

li {
  margin: 5px;
}

button {
  background-color: rgba(255, 255, 255, 0.8);
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: rgba(255, 255, 255, 1);
}
</style>
