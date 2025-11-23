<template>
   
    <div class="comment-section">
            <h2>Kommentarer</h2>
   

    <div class="commentForm">
        <textarea 
        v-model="newComment.text"
        placeholder="skriv din kommentar..."
        class="commentArea"
        rows="4"
        
        
        ></textarea>

        <input 
        v-model="newComment.name"
        type="text"
        placeholder="ditt namn..."
        class="nameInput"
        />

        <button
        @click="submitComment"
        :disabled="!isFormValid"
        class="submit-btn">

        Skicka kommentar

        </button>

    </div>

    <div class="comments-list" v-if="comments.length > 0">
      <div class="comment-item" v-for="(comment, index) in comments" :key="index">
        <p class="comment-name"><strong>{{ comment.name }}</strong> - {{ comment.date }}</p>
        <p class="comment-text">{{ comment.text }}</p>
      </div>
    </div>

    <div v-else class="no-comments">
      <p>Inga kommentarer ännu. Var den första att kommentera!</p>
    </div>
    
 </div>


</template>

<script>
export default {
  data() {
    return {
      newComment: {
        text: '',
        name: ''
      },
      comments: []
    }
  },
  computed: {
    isFormValid() {
      return this.newComment.text.trim() !== '' && this.newComment.name.trim() !== '';
    }
  },
  methods: {
    submitComment() {
      if (this.isFormValid) {
        this.comments.push({
          text: this.newComment.text,
          name: this.newComment.name,
          date: new Date().toLocaleDateString('sv-SE')
        });
        this.newComment.text = '';
        this.newComment.name = '';
      }
    }
  }
}
</script>