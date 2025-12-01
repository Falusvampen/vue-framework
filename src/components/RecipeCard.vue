<template>
  <router-link :to="{ name: 'RecipeView', params: { id: id, slug: slug } }" class="recipe-card">
    <div class="image-container">
      <img :src="imageUrl" :alt="title" class="recipe-image" />
    </div>

    <div class="card-content">
      <h3 class="title">{{ title }}</h3>
      <p class="description">{{ description }}</p>

      <hr class="divider" />

      <div class="details">
        <span class="detail-item"> <strong>Ingredienser:</strong> {{ ingredientCount }} st </span>
        <span class="detail-item"> <strong>Tid:</strong> {{ timeInMinutes }} </span>
      </div>

      <div class="rating">
        <StarRating :model-value="rating" :readonly="true" :max-stars="5" />
        <span class="rating-text">({{ rating }}/5)</span>
      </div>
    </div>
  </router-link>
</template>

<script>
import StarRating from './StarRating.vue'

export default {
  name: 'RecipeCard',
  components: {
    StarRating,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    imageUrl: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, default: 'Ingen beskrivning.' },
    ingredientCount: { type: Number, required: true },
    rating: { type: Number, default: 0 },
    timeInMinutes: { type: String, required: true },
  },
}
</script>

<style scoped>
.recipe-card {
  display: block;
  text-decoration: none;
  color: inherit;

  border: 1px solid #e0e0e0;
  border-radius: 8px;
  width: 300px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
  background-color: white;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  cursor: pointer;
}

.recipe-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
}

.image-container {
  height: 200px;
  overflow: hidden;
}
.recipe-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.card-content {
  padding: 16px;
}
.title {
  margin: 0 0 8px 0;
  font-size: 1.25rem;
  color: #333;
}
.description {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 16px;
  line-height: 1.4;
}
.divider {
  border: 0;
  border-top: 1px solid #eee;
  margin: 12px 0;
}
.details {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: #555;
  margin-bottom: 12px;
}

.rating {
  display: flex;
  align-items: center;
  gap: 8px;
}

.rating-text {
  font-size: 0.8rem;
  color: #999;
}
</style>
