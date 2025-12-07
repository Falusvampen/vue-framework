<script>
export default {
  props: {
    title: String,
    description: String,
    imageSrc: String,
    altText: String,
    ingredients: String,
    time: String,
    rating: String
  }
}
</script>

<template>
  <div class="card">
    <img :src="imageSrc" :alt="altText">

    <div class="card-content">
      <h2>{{ title }}</h2>
      <p>{{ description }}</p>
    </div>

    <div class="card-footer">
      <span>{{ ingredients }} | {{ time }}</span>
      <span class="stars">{{ rating }}</span>
    </div>
  </div>
</template>


<style scoped>
.card {
    background: #fff;
    border-radius: 16px;
    width: 30rem;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    display: flex;
    flex-direction: column;
  }

  a:hover {
  opacity: 1;
}



  .card img {
    width: 100%;
    height: auto;
    display: block;
    border-bottom: 1px solid #eee;
  }

  .card:hover {
    transform: scale(1.04);
  }

  .card-content {
    padding: 16px 20px 20px;
  }



  .card h2 {
    margin: 0;
    font-size: 20px;
    font-weight: 600;
    color: #222;
  }

  .card p {
    margin-top: 5%;
    color: #444;
    font-size: 14px;
    line-height: 1.5;
  }

  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff9e6;
    padding: 10px 16px;
    font-size: 13px;
    color: #555;
    border-top: 1px solid #eee;
  }

  .stars {
    color: #f5c04f;
    font-size: 1.6rem;
  }
</style>

<script></script>
