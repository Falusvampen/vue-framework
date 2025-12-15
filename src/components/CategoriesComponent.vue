<script>
export default {
  name: 'CategoriesComponent',
  props: {
    categories: {
      type: Array,
      default: () => [],
    },
    categoryCounts: {
      type: Object,
      default: () => ({}),
    },
    activeCategory: {
      type: String,
      default: null,
    },
  },
  emits: ['category-select'],
  data() {
    return {
      showAllCategories: false,
    }
  },
  computed: {
    // Spread Syntax är ... grejerna vi använder för att "sprida ut" en array eller ett objekt. Och sprida ut betyder att vi skapar en kopia och inte en referens.
    // Vi skapar en sorterad kopia av prop-listan utan att ändra originalet.
    sortedCategories() {
      // Skydd om listan inte är laddad än
      if (!this.categories) return []
      // Vi gör en kopia och sorterar den alfabetiskt, det här ändrar inte originalet i props vilket är viktigt!
      return [...this.categories].sort((a, b) => a.name.localeCompare(b.name))
    },
    visibleCategories() {
      return this.showAllCategories ? this.sortedCategories : this.sortedCategories.slice(0, 3)
    },
  },
  methods: {
    handleCategoryClick(category) {
      if (this.activeCategory === category.name) {
        this.$emit('category-select', null)
      } else {
        this.$emit('category-select', category.name)
      }
    },
  },
}
</script>

<template>
  <div class="category-container">
    <transition-group name="fade" tag="ol">
      <li v-for="category in visibleCategories" :key="category.name">
        <button
          @click="handleCategoryClick(category)"
          :class="{ active: activeCategory === category.name }"
        >
          {{ category.name }}
          <span class="count">({{ categoryCounts?.[category.name] || 0 }})</span>
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
</template>

<style scoped>
.category-container {
  display: flex;
  justify-content: center;
  width: 100%;
  flex-wrap: wrap;
  min-height: 50px;
  margin-top: 1rem;
}

ol {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  justify-content: center;
}

li {
  margin: 5px;
  display: flex;
  justify-content: center;
}

button {
  background-color: rgba(255, 255, 255, 0.8);
  border: none;
  padding: 10px 20px;
  border-radius: 999px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease;
  white-space: nowrap;
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
  box-shadow: 2px 0px 3px rgb(234 217 184 / 80%);
}

.count {
  margin-left: 8px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.8);
}

.toggle-button {
  background-color: #ffffff;
}

.toggle-button:hover {
  background-color: #666666;
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
</style>
