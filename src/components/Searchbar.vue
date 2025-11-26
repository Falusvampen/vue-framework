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
    <img src="/icon.png" alt="Search icon" class="search-icon" />
  </div>
</template>



<style scoped>
.searchbar {
  display: flex;
  justify-content: space-between; 
  align-items: center;
  margin-top: 5%;
  width: 30rem;
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



