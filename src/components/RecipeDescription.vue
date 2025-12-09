<script>
export default {
  name: 'RecipeDescription',
  props: {
    recipe: {
      type: Object,
      required: true,
      default: () => ({
        title: '',
        description: '',
        time: '',
        imageUrl: '',
      }),
    },
  },
  computed: {},
}
</script>

<template>
  <div class="recipe-page-wrapper">
    <div class="recipe-container">
      <div class="recipe-grid">
        <div class="recipe-header">
          <h1 class="recipe-title">
            {{ recipe.title }}
          </h1>
          <p class="recipe-description">
            {{ recipe.description }}
          </p>
        </div>

        <div class="recipe-footer">
          <div class="cooking-time">
            <span class="time-badge">⏱️ {{ recipe.time }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="recipe-image">
      <img v-if="recipe.imageUrl" :src="recipe.imageUrl" alt="Receptbild" class="recipe-img" />
    </div>
  </div>
</template>

<style>
.recipe-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0 20px 0;
}

.time-badge {
  display: inline-block;
  padding: 8px 12px;
  border-radius: 999px;
  background: linear-gradient(135deg, #222 0%, #444 100%);
  color: #fff;
  font-weight: 600;
  letter-spacing: 0.2px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
  transform: translateY(6px);
  opacity: 0;
  animation: timeAppear 600ms ease-out forwards;
}

@keyframes timeAppear {
  0% {
    opacity: 0;
    transform: translateY(6px) scale(0.98);
  }
  60% {
    opacity: 1;
    transform: translateY(0) scale(1.03);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.recipe-title {
  text-align: center;
  margin-top: 1rem;
  .recipe-header {
    text-align: center;
    padding: 8px 12px;
  }

  .recipe-title {
    margin: 0.75rem 0 0.25rem 0;
    font-size: clamp(1.6rem, 3.5vw, 2.4rem);
    font-weight: 800;
    letter-spacing: 0.5px;
    background: linear-gradient(135deg, #111 0%, #444 50%, #111 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    animation: titleReveal 500ms ease-out both;
  }

  @keyframes titleReveal {
    from {
      opacity: 0;
      filter: blur(4px);
      transform: translateY(-6px);
    }
    to {
      opacity: 1;
      filter: blur(0);
      transform: translateY(0);
    }
  }

  .recipe-description {
    margin: 0 auto;
    max-width: 60ch;
    color: #555;
    font-size: clamp(0.95rem, 2.5vw, 1.1rem);
    line-height: 1.6;
    padding: 0 12px;
    animation: descFade 500ms ease-out 120ms both;
  }

  @keyframes descFade {
    from {
      opacity: 0;
      transform: translateY(6px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  animation: titleDrop 500ms ease-out;
}

@keyframes titleDrop {
  from {
    opacity: 0;
    transform: translateY(-6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.recipe-description {
  text-align: center;
  color: #444;
}
</style>
