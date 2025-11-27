<script>
import RecipeData from '@/recipes.json';
import Searchbar from '@/components/Searchbar.vue';

export default {
  name: 'TitleAndDescriptionComponent',

  components: {
    Searchbar
  },

  props: {

    title: {
      type: String,
      default: 'Recept proteinrika snacks'
    },
    description: {
      type: String,
      default: 'Upptäck våra läckra och näringsrika proteinrika snacksrecept, perfekta för att hålla energinivån uppe under dagen!'
    },
    category: {
      type: String,
      default: ''
    },
  },

  data() {
    return {
      recipies: RecipeData,
      categories: [],
      showAllCategories: false,
      selectedCategory: null
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

      this.categories = Array.from(categorySet).sort();
    },

    switchCategory(category) {
      this.selectedCategory = category;
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
    <div class="title-and-description-div">
      <h1>{{ title }}</h1>
      <p>{{ description }}</p>
    </div>

    <div class="searchbar">
      <Searchbar />
    </div>

    <transition-group name="fade" tag="ol">
      <li v-for="category in visibleCategories" :key="category">
        <button @click="switchCategory(category)" :class="{ active: selectedCategory === category }">
          {{ category }}
        </button>
      </li>

      <li v-if="categories.length > 3" key="toggle-btn">
        <button class="toggle-button" @click="showAllCategories = !showAllCategories">
          {{ showAllCategories ? 'Visa färre' : 'Visa alla' }}<span class="icon">{{ showAllCategories ? ' −' : ' +' }}</span>
        </button>
      </li>
    </transition-group>
  </div>

</template>

<style scoped>
#title-and-description {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    url('https://cdn.prod.website-files.com/6361dc271a3e49d685fe418b/64b69c1d8fc68c419373a2bb_Untitled%20design%20-%202023-07-18T100512.462.png');
  background-size: cover;
  padding: 0px;
  color: white;
  text-align: center;
  max-width: 100%;
  height: 30em;
  margin-bottom: 2rem;
}

.searchbar {
  margin-bottom: 1rem;
}

h1 {
  font-size: 48px;
  margin-bottom: 10px;
  font-weight: 600;
}

p {
  font-size: 20px;
  margin-bottom: 20px;
  font-weight: 400;
}

ol {
  list-style-type: none;
  padding: 0;
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 70%;
  min-height: 50px;
  transition: height 0.3s ease;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}

.fade-move {
  transition: transform 0.3s ease;
}

li {
  margin: 5px;
  position: relative;
}

button {
  background-color: rgba(255, 255, 255, 0.8);
  border: none;
  padding: 10px 20px;
  border-radius: 999px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease;
}

button:hover {
  background-color: rgba(255, 255, 255, 1);
  transform: translateY(-2px);
}

button.active {
  background-color: #ffdd57;
  color: #333;
  font-weight: 600;
  border: 2px solid white;
}

.toggle-button {
  background-color: #888888;
  color: white;
  border-radius: 999px;
  padding: 10px 20px;
  border: none;
  align-items: center;
}

.toggle-button:hover {
  background-color: #666666; /* slightly darker grey on hover */
}

.toggle-button .icon {
  font-size: 18px; /* size of the + sign */
  line-height: 1;
}
</style>
