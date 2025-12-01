<template>
  <div class="base-comment-section">
    <h3 class="section-title">
      {{ title }} <span class="count">({{ comments.length }})</span>
    </h3>

    <div class="comments-list" v-if="comments.length > 0">
      <div v-for="comment in comments" :key="comment.id" class="comment-card">
        <div class="avatar-placeholder">
          {{ comment.author ? comment.author.charAt(0).toUpperCase() : '?' }}
        </div>

        <div class="comment-content">
          <div class="comment-header">
            <span class="author">{{ comment.author }}</span>
            <span class="date">{{ comment.date }}</span>
          </div>
          <p class="text">{{ comment.text }}</p>
        </div>
      </div>
    </div>

    <div v-else class="empty-comments">
      <p>{{ emptyText }}</p>
    </div>

    <div class="comment-form-wrapper">
      <h4>Lämna en kommentar</h4>

      <form @submit.prevent="handleSubmit" class="comment-form">
        <div class="form-group">
          <label for="name">Namn</label>
          <input
            type="text"
            id="name"
            v-model="formData.name"
            placeholder="Ditt namn..."
            :disabled="isSubmitting"
            required
          />
        </div>

        <div class="form-group">
          <label for="comment">Kommentar</label>
          <textarea
            id="comment"
            v-model="formData.text"
            placeholder="Skriv något..."
            rows="3"
            :disabled="isSubmitting"
            required
          ></textarea>
        </div>

        <div v-if="error" class="error-msg">{{ error }}</div>

        <button type="submit" class="submit-btn" :disabled="isSubmitting">
          {{ isSubmitting ? 'Skickar...' : buttonText }}
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseCommentSection',
  props: {
    comments: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: 'Kommentarer',
    },
    emptyText: {
      type: String,
      default: 'Inga kommentarer än. Bli den första!',
    },
    buttonText: {
      type: String,
      default: 'Skicka',
    },
    isSubmitting: {
      type: Boolean,
      default: false,
    },
    error: {
      type: String,
      default: null,
    },
  },
  emits: ['submit'],
  data() {
    return {
      formData: {
        name: '',
        text: '',
      },
    }
  },
  methods: {
    handleSubmit() {
      this.$emit('submit', { ...this.formData })
    },
    resetForm() {
      this.formData.name = ''
      this.formData.text = ''
    },
  },
}
</script>

<style scoped>
.base-comment-section {
  max-width: 800px;
  margin: 40px auto 0 auto;
  padding: 0 20px;
  border-top: 1px solid #eee;
  padding-top: 40px;
}

.section-title {
  font-size: 1.5rem;
  margin-bottom: 24px;
  color: #333;
}
.count {
  color: #888;
  font-weight: 400;
  font-size: 1.2rem;
}

.comments-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 40px;
}
.comment-card {
  display: flex;
  gap: 16px;
  background: #f9f9f9;
  padding: 16px;
  border-radius: 12px;
}
.avatar-placeholder {
  width: 40px;
  height: 40px;
  background-color: #333;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  flex-shrink: 0;
}
.comment-content {
  flex: 1;
}
.comment-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
}
.author {
  font-weight: 700;
  color: #333;
}
.date {
  font-size: 0.85rem;
  color: #888;
}
.text {
  color: #555;
  line-height: 1.5;
  margin: 0;
}
.empty-comments {
  text-align: center;
  color: #888;
  margin-bottom: 40px;
  padding: 20px;
  background: #fafafa;
  border-radius: 8px;
}

.comment-form-wrapper {
  background: white;
  border: 1px solid #e0e0e0;
  padding: 24px;
  border-radius: 12px;
}
.comment-form-wrapper h4 {
  margin-top: 0;
  margin-bottom: 16px;
}
.form-group {
  margin-bottom: 16px;
}
.form-group label {
  display: block;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 6px;
  color: #333;
}
.form-group input,
.form-group textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-family: inherit;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;
}
.form-group input:focus,
.form-group textarea:focus {
  border-color: #333;
}
.submit-btn {
  background-color: #1a1a1a;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}
.submit-btn:hover:not(:disabled) {
  background-color: #333;
}
.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
.error-msg {
  color: #d9534f;
  margin-bottom: 16px;
  font-size: 0.9rem;
}
</style>
