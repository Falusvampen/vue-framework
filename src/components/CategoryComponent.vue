<script>
import RecipeData from '@/recipes.json';

console.log(RecipeData);

export default {
  name: 'CategoryComponent',

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
      if (!this.recipes || !Array.isArray(this.recipes)) {
        console.error("Recipe data is missing or not an array. Cannot extract categories.");
        return;
      }
      const allCategories = this.recipes.map(recipe => recipe.category);
      this.categories = [...new Set(allCategories)];
      console.log(this.categories);
    }
  }

}

</script>

<template>
  <nav>
    <h2>Kategorier</h2>
    <ol>
      <li v-for="category in categories" :key="category">
        {{ category }}
      </li>
    </ol>
  </nav>
</template>

<style scoped>
nav {
  display: flex;
  flex-direction: column;
  background-color: rgb(189, 187, 187);
  color: black;
  padding: 10px;
}

h2 {
  font-weight: bold;
}

ol {
  list-style-type: none;
}

li:hover {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
}
</style>
