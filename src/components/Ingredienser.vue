<script>
export default {
  props: {
    title: String,
    ingredients: String,
    Antal: String
    
  }
}
</script>

<template>
  <div class="Ingredienser-card">

    <div class="ingredienser-heading">
      <h2>{{ title }}</h2>
      <p>{{ Antal }}</p>

    </div>

    <div class="ingredienser-content">
      <p>{{ ingredients }}</p>
    </div>

  </div>
</template>


<style scoped>

.Ingredienser-card {
    background-color:#ECEBEB;
    width: 20rem;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    display: flex;
    flex-direction: column;
    margin-top: 5%;
  }

  .ingredienser-heading {
    padding: 16px 27px 5px;
    display: flex;
    justify-content: space-between;
  }

  .ingredienser-heading h2 {
    margin-bottom: 3%;
    font-size: 1.5rem;
    color: black;
  }

  .ingredienser-heading p {
    margin: 0;
    font-size: 1.3rem;
    color: black;
    align-self: center;
  }

  .ingredienser-content {
    background-color: white;
    padding: 10px 20px 20px;
    Height:30rem;
    width: 18em;
    margin: auto;
    border-radius: 8px;
    margin-bottom: 2%;
  }

  .ingredienser-content p {
    margin: 0;
    color: #444;
    font-size: 14px;
    line-height: 1.5;
  }

</style>

<script></script>
