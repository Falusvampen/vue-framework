<script>
export default {
  name: 'SearchBarComponent',
  props: {
    search: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: 'Sök...',
    },
  },
  data() {
    return {
      inputValue: this.search || '',
    }
  },
  watch: {
    search(newVal) {
      this.inputValue = newVal
    },
  },
  methods: {
    updateValue(event) {
      this.inputValue = event.target.value
      this.$emit('update:search', this.inputValue) // skickar upp värdet till parent
    },
  },
}
</script>

<template>
  <div class="searchbar">
    <input
      type="text"
      :placeholder="placeholder"
      class="search-input"
      v-model="inputValue"
      @input="updateValue"
    />
    <img src="/icon.png" alt="Search icon" class="search-icon" />
  </div>
</template>

<style scoped>
.searchbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2rem auto;
  width: 80%;
  max-width: 30rem;
  padding: 2px 10px;
  border: 1px solid #ccc;
  border-radius: 3vh;
  background-color: white;
}

.search-input {
  border: none;
  outline: none;
  font-size: 1rem;
  width: 100%;
  background: transparent;
}

.search-icon {
  width: 2rem;
  height: 2em;
}
</style>
