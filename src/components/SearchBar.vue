<template>
  <div class="search-bar-container">
    <div class="input-wrapper">
      <input
        type="text"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :placeholder="placeholder"
        class="search-input"
      />
      <span class="search-icon">
        <slot name="icon">🔍</slot>
      </span>
    </div>

    <div v-if="filters.length > 0" class="filter-row">
      <button class="filter-pill" :class="{ active: !activeFilter }" @click="selectFilter('')">
        {{ allLabel }}
      </button>

      <button
        v-for="filter in filters"
        :key="filter"
        class="filter-pill"
        :class="{ active: activeFilter === filter }"
        @click="selectFilter(filter)"
      >
        {{ filter }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    activeFilter: {
      type: String,
      default: '',
    },
    filters: {
      type: Array,
      default: () => [],
    },
    placeholder: {
      type: String,
      default: 'Sök...',
    },
    allLabel: {
      type: String,
      default: 'Alla',
    },
  },
  emits: ['update:modelValue', 'update:activeFilter'],
  methods: {
    selectFilter(filter) {
      const newValue = this.activeFilter === filter && filter !== '' ? '' : filter
      this.$emit('update:activeFilter', newValue)
    },
  },
}
</script>

<style scoped>
.search-bar-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
  max-width: 700px;
}

.input-wrapper {
  position: relative;
  width: 100%;
  max-width: 500px;
}

.search-input {
  width: 100%;
  padding: 16px 48px 16px 24px;
  border-radius: 50px;
  border: none;
  font-size: 1rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  outline: none;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.search-input:focus {
  transform: scale(1.02);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
}

.search-icon {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.2rem;
  opacity: 0.5;
  pointer-events: none;
}

.filter-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}

.filter-pill {
  padding: 8px 20px;
  border-radius: 25px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background-color: rgba(255, 255, 255, 0.15);
  color: white;
  cursor: pointer;
  backdrop-filter: blur(10px);
  transition: all 0.2s ease;
  font-size: 0.95rem;
  font-weight: 500;
  white-space: nowrap;
}

.filter-pill:hover {
  background-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.filter-pill.active {
  background-color: white;
  color: #1a1a1a;
  font-weight: 700;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}
</style>
