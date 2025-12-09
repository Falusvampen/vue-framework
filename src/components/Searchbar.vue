<script>
export default {
  name: 'SearchBarComponent',
  // Props är data som kommer "uppifrån" (från föräldern)
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: 'Sök...',
    },
  },
  // Emits deklarerar vilka event vi skickar ut (bra för dokumentation)
  emits: ['update:modelValue'],

  computed: {
    // En smart variabel som hanterar tvåvägskommunikation
    inputValue: {
      // 1. Hämtar värdet från föräldern
      get() {
        return this.modelValue
      },
      // 2. När användaren skriver, skicka värdet tillbaka till föräldern
      set(value) {
        this.$emit('update:modelValue', value)
      },
    },
  },
}
</script>

<template>
  <div class="searchbar">
    <input type="text" :placeholder="placeholder" class="search-input" v-model="inputValue" />
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="search-icon"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  </div>
</template>

<style scoped>
.searchbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2rem auto;
  width: 100%;
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
