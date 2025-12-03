<script>
import RecipeService from '@/services/RecipeService';

export default {
  name: 'TitleAndDescriptionComponent',

  props: {
    title: {
      type: String,
      default: 'Gymsnacks för alla tillfällen'
    },
    description: {
      type: String,
      default: 'Upptäck våra läckra, näringsrika och proteinrika snacksrecept, perfekta för att hålla energinivån uppe under dagen!'
    },
    backgroundImage: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      categories: [],
      showAllCategories: false,
      selectedCategoryObj: null,
      teamId: import.meta.env.VITE_TEAM_ID
    };
  },

  async created() {
    await this.loadCategories();
  },

  computed: {
    visibleCategories() {
      return this.showAllCategories ? this.categories : this.categories.slice(0, 3);
    },

    displayTitle() {
      if (this.selectedCategoryObj) {
        return this.selectedCategoryObj.name;
      }
      return this.title;
    },

    displayDescription() {
      if (this.selectedCategoryObj) {
        return null;
      }
      return this.description;
    }
  },

  methods: {
    async loadCategories() {
      try {
        const apiCategories = await RecipeService.getCategories(this.teamId);

        if (Array.isArray(apiCategories)) {
          this.categories = [...apiCategories].sort((a, b) => a.name.localeCompare(b.name));
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    },

    switchCategory(categoryObj) {
      if (this.selectedCategoryObj && this.selectedCategoryObj.name === categoryObj.name) {
        this.selectedCategoryObj = null;
        this.$emit('categorySelected', null);
      } else {
        this.selectedCategoryObj = categoryObj;
        this.$emit('categorySelected', categoryObj.name);
      }
    }
  }
}
</script>

<template>
  <div id="title-and-description" :style="{ backgroundImage: `url(${backgroundImage})` }">
    <div class="title-and-description-div">
      <h1>{{ displayTitle }}</h1>
      <p v-if="displayDescription">{{ displayDescription }}</p>
    </div>

    <slot></slot>

    <div class="category-container">
      <transition-group name="fade" tag="ol">
        <li v-for="category in visibleCategories" :key="category.name">
          <button
            @click="switchCategory(category)"
            :class="{ active: selectedCategoryObj && selectedCategoryObj.name === category.name }"
          >
            {{ category.name }}
          </button>
        </li>

        <li v-if="categories.length > 3" key="toggle-btn">
          <button class="toggle-button" @click="showAllCategories = !showAllCategories">
            {{ showAllCategories ? 'Visa färre' : 'Visa alla' }}
            <span class="icon">{{ showAllCategories ? ' −' : ' +' }}</span>
          </button>
        </li>
      </transition-group>
    </div>
  </div>
</template>

<style scoped>
#title-and-description {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  max-width: 100%;
  height: 33em;
  margin-bottom: 2rem;
  background-size: cover;
  background-position: center;
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

.category-container {
  display: flex;
  justify-content: center;
  width: 100%;
  flex-wrap: wrap;
  min-height: 50px;
  max-height: 120px;
  transition: max-height 0.3s ease;
  overflow: hidden;
  overflow-y: visible;
}

.category-container ol {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  justify-content: center;
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
  background-color: #fff8e1;
  color: #3e3e3e;
  border: 2px solid #fff8e1;
  transform: scale(1.03);
  box-shadow: 0 0 15px rgba(255, 230, 180, 0.6);
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
  background-color: #666666;
}

.toggle-button .icon {
  font-size: 18px;
}
</style>
