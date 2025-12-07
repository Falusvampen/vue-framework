<template>
  <div class="comment-wrapper">
    <div class="comment-section">
      <h2 class="comment-title-h2">
        Kommentarer <span class="count">({{ comments.length }})</span>
      </h2>
      <hr>

      <div class="commentForm">
        <h4>Lämna en kommentar</h4>

        <form @submit.prevent="handleSubmit">
          <input 
            v-model="formData.name"
            type="text"
            placeholder="Ditt namn (valfritt)..."
            class="nameInput"
            :disabled="isSubmitting"
          />

          <textarea 
            v-model="formData.text"
            placeholder="Skriv din kommentar..."
            class="commentArea"
            rows="4"
            :disabled="isSubmitting"
            required
          ></textarea>

          <div v-if="error" class="error-msg">{{ error }}</div>

          <button
            type="submit"
            :disabled="isSubmitting"
            class="submit-btn">
            {{ isSubmitting ? 'Skickar...' : 'Skicka kommentar' }}
          </button>
        </form>
      </div>

      <hr>

      <div class="commentBox">
        <div class="comments-list" v-if="comments.length > 0">
          <div class="comment-item" v-for="comment in comments" :key="comment.id">
            <div class="comment-header">
              <p class="comment-name">{{ comment.author }} - {{ comment.date }}</p>
            </div>
            <p class="comment-text">{{ comment.text }}</p>
          </div>
        </div>

        <div v-else class="no-comments">
          <p>Inga kommentarer ännu. Var den första att kommentera!</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import recipeService from '../services/RecipeService'

export default {
  name: 'CommentComponent',
  props: {
    recipeId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      teamId: import.meta.env.VITE_TEAM_ID,
      comments: [],
      formData: {
        name: '',
        text: '',
      },
      isSubmitting: false,
      error: null,
      loading: true,
    }
  },
  async mounted() {
    await this.fetchComments()
  },
  methods: {
    async fetchComments() {
      this.loading = true
      try {
        this.comments = await recipeService.getRecipeComments(this.recipeId)
      } catch (err) {
        console.error('Error fetching comments:', err)
      } finally {
        this.loading = false
      }
    },
    async handleSubmit() {
      if (!this.formData.text.trim()) {
        return
      }

      this.isSubmitting = true
      this.error = null

      const payload = { 
        name: this.formData.name.trim() || 'Anonymous', 
        comment: this.formData.text 
      }

      try {
        console.log('Submitting comment:', payload)
        const newComment = await recipeService.addComment(this.recipeId, payload)
        console.log('Comment submitted successfully:', newComment)
        this.comments.push(newComment)
        this.resetForm()
      } catch (err) {
        console.error('Full error object:', err)
        console.error('Error response:', err.response?.data)
        console.error('Error status:', err.response?.status)
        
        const errorMsg = err.response?.data?.message || err.message || 'Kunde inte skicka kommentaren. Försök igen.'
        this.error = errorMsg
      } finally {
        this.isSubmitting = false
      }
    },
    resetForm() {
      this.formData.name = ''
      this.formData.text = ''
    },
  }
}
</script>

<style>

.comment-wrapper {
  position: relative;
  background: transparent;
  overflow: hidden;
}

.comment-section {
  max-width: 600px;
  margin: 0 auto;
  padding: 16px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  color: #222;
  border: 2px solid #333;
  position: relative;
  overflow: hidden;
  animation: fadeIn 0.6s ease-out;
}



.comment-title-h2 {
  font-size: 1.6rem;
  margin-bottom: 8px;
  color: #222;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-shadow: none;
  display: flex;
  align-items: center;
  gap: 8px;
  animation: slideDown 0.5s ease-out;
}



.count {
  color: #555;
  font-weight: 600;
  font-size: 1rem;
  background: #f0f0f0;
  border-radius: 8px;
  padding: 2px 8px;
  box-shadow: none;
}



.commentForm {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 16px;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: none;
  padding: 12px;
  animation: slideUp 0.6s ease-out 0.2s both;
}



.nameInput, .commentArea {
  width: 100%;
  padding: 10px;
  border: 1.5px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  font-family: 'Segoe UI', Arial, Helvetica, sans-serif;
  background: #fff;
  color: #222;
  transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease;
  box-shadow: none;
}
.nameInput:focus, .commentArea:focus {
  border-color: #333;
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.05);
  outline: none;
  transform: translateY(-1px);
}



.submit-btn {
  padding: 10px 24px;
  background: linear-gradient(135deg, #333 0%, #555 100%);
  color: #fff;
  border: none;
  border-radius: 20px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}
.submit-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #222 0%, #444 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}
.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}



.error-msg {
  color: #d32f2f;
  font-size: 0.9rem;
  margin: 5px 0;
  background: rgba(211, 47, 47, 0.1);
  border-radius: 6px;
  padding: 6px 10px;
  box-shadow: none;
}



.commentBox {
  margin-top: 16px;
  color: #222;
  animation: fadeIn 0.6s ease-out 0.4s both;
}



.comments-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}



.comment-item {
  background: #fafafa;
  border: 1.5px solid #e0e0e0;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
  padding: 12px;
  border-radius: 10px;
  transition: all 0.3s ease;
  position: relative;
  animation: slideIn 0.5s ease-out both;
}
.comment-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-color: #333;
}



.comment-header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  margin-bottom: 4px;
}



.comment-name {
  font-family: 'Segoe UI', Arial, Helvetica, sans-serif;
  font-weight: bold;
  color: #333;
  margin: 0;
  font-size: 0.95rem;
  letter-spacing: 0.3px;
}



.comment-text {
  font-family: 'Segoe UI', Arial, Helvetica, sans-serif;
  font-weight: 400;
  color: #444;
  margin: 6px 0 0 0;
  font-size: 0.95rem;
}



.no-comments {
  text-align: center;
  color: #666;
  padding: 16px;
  font-size: 0.95rem;
  background: #f5f5f5;
  border-radius: 8px;
  box-shadow: none;
  animation: fadeIn 0.6s ease-out;
}


@media (max-width: 480px) {
  .comment-section {
    max-width: 100%;
    margin: 0;
    padding: 10px;
    margin-bottom: 8px;
  }
  .comment-title-h2 {
    font-size: 1.2rem;
    margin: 8px 0;
  }
  .commentForm {
    gap: 7px;
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 10px 8px;
  }
  .submit-btn {
    padding: 8px 12px;
    font-size: 0.9rem;
  }
  .commentBox {
    margin-top: 10px;
  }
  .comment-item {
    padding: 8px 10px;
    border-radius: 8px;
  }
  .comment-name {
    font-size: 0.9rem;
  }
  .comment-text {
    font-size: 0.9rem;
    margin-top: 5px;
  }
  .no-comments {
    padding: 10px;
    text-align: center;
    font-size: 0.9rem;
  }
}


@media (min-width: 481px) and (max-width: 768px) {
  .comment-section {
    max-width: 95%;
    margin: 0 auto;
    padding: 14px;
    margin-bottom: 10px;
  }
  .comment-title-h2 {
    font-size: 1.3rem;
    margin: 10px 0;
  }
  .commentForm {
    gap: 8px;
    margin-top: 14px;
    margin-bottom: 12px;
    padding: 12px 10px;
  }
  .nameInput, .commentArea {
    padding: 10px;
    font-size: 0.98rem;
  }
  .submit-btn {
    padding: 10px 16px;
    font-size: 0.95rem;
  }
  .commentBox {
    margin-top: 14px;
  }
  .comments-list {
    gap: 12px;
  }
  .comment-item {
    padding: 10px 12px;
    border-radius: 10px;
  }
  .comment-name {
    font-size: 0.95rem;
  }
  .comment-text {
    font-size: 0.95rem;
    margin-top: 6px;
  }
  .no-comments {
    padding: 12px;
    text-align: center;
    font-size: 0.95rem;
  }
}


@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@media (min-width: 769px) {
  .comment-section {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    margin-bottom: 20px;
  }
  .comment-title-h2 {
    font-size: 1.5rem;
    margin: 15px 0;
  }
  .commentForm {
    gap: 10px;
    margin-top: 30px;
    margin-bottom: 20px;
    padding: 18px 16px;
  }
  .nameInput, .commentArea {
    padding: 12px;
    font-size: 1rem;
  }
  .submit-btn {
    padding: 12px 28px;
    font-size: 1rem;
  }
  .commentBox {
    margin-top: 30px;
  }
  .comments-list {
    gap: 18px;
  }
  .comment-item {
    padding: 16px 18px;
    border-radius: 14px;
  }
  .comment-name {
    font-size: 1rem;
  }
  .comment-text {
    font-size: 1rem;
    margin-top: 8px;
  }
  .no-comments {
    padding: 20px;
    text-align: center;
    font-size: 1rem;
  }
}
</style>
