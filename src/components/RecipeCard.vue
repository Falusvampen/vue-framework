<script>
export default {
  name: 'RecipeCard',
  props: {
    card: {
      type: Object,
      required: true
    }
  }
}
</script>

<template>
  <RouterLink
    class="card"
    :to="`/recept/${card.id}/${card.slug}`"
  >
    <img :src="card.imageSrc" :alt="card.altText" />

    <div class="card-content">
      <h2>{{ card.title }}</h2>
      <p>{{ card.description }}</p>
    </div>

    <div class="card-footer">
      <span>{{ card.ingredients }} | {{ card.time }}</span>
      <span class="stars">{{ card.rating }}</span>
    </div>
  </RouterLink>
</template>

<style scoped>

.card-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
    padding: 2rem;
  }

  .card {
    background: #D9D9D9;
    border-radius: 16px;
    width: 95%;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    transition: transform 0.3s ease;
  }

  a:hover {
  opacity: 1;
}


  .card img {
    width: 100%;
    height: 12rem;
    object-fit: cover;
    display: block;
    border-bottom: 1px solid #eee;
    border-radius: 2vh;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }

  .card:hover {
    transform: scale(1.04);
  }

  .card-content {
    padding: 16px 20px 20px;
    flex-grow:1;
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
    max-height: 4rem;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #b3b3b1;
    padding: 10px 16px;
    margin-top:0;
    font-size: 13px;
    color: #555;
    border-top: 1px solid #eee;
  }

  .stars {
    color: #f5c04f;
    font-size: 1.6rem;
  }

</style>
