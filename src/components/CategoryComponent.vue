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
  }
}

</script>

<template>
  <nav class="category-nav">
    <h2>Kategorier</h2>
    <ol>
      <li>
        <button @click="switchCategory(category)" v-for="category in categories" :key="category">
        {{ category }}
        </button>
      </li>
    </ol>
  </nav>
</template>

<style scoped>
.category-nav {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  background-color: rgb(189, 187, 187);
  color: black;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  max-width: 20%;
  min-width: 200px;
  align-self: flex-start;
}

@media (min-width: 1024px) {
    .category-nav {
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
    }
}
/* fungerar inte :( */

h2 {
  font-weight: bold;
}

ol {
  list-style-type: none;
}

li {
  display: flex;
  flex-direction: column;
}

button {
  background: none;
  border: none;
  color: black;
  text-align: left;
  padding: 5px 0;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
  font-weight: bold;
}
</style>
