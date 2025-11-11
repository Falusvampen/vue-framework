<script>
export default {
  props: {
    placeholder: {
      type: String
    }
  }
}
</script>

<template>
  <div class="searchbar">
    <input type="text" :placeholder="placeholder" class="search-input" />
  </div>
</template>

<style scoped>
.searchbar {
  display: flex;
  justify-content: center;
  margin-top: 5%;
}

.search-input {
  width: 30rem;
  height: 2.3rem;
  border-radius: 3vh;
  border: 1px solid #ccc;
  padding: 0 15px;
  font-size: 1rem;
  outline: none;
}
</style>