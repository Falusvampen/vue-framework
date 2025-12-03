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

.card {
  background: #d9d9d9;
  border-radius: 16px;
  width: 100%;
  max-width: 23rem;
  height: fit-content;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease;
  text-decoration: none;
}

.card:hover {
  transform: scale(1.04);
  z-index: 10;
}

.card img {
  width: 100%;
  height: 17rem;
  display: block;
  border-bottom: 1px solid #eee;
  object-fit: cover;
  border-radius: 2vh 2vh 0 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
  max-height: 5rem;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #b3b3b1;
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
