<template>
   <div class="comment-header-title">

    <h1 class="question-title">Vad tyckte du om receptet?</h1>

    <div class="comment-header-undertitle">
    <p> Lämna en kommentar nedan!</p>
    </div>

   <div class="comment-header-stars">
          <div class="stars" @mouseleave="hoveredRating = 0">
            <span 
              v-for="star in 5" 
              :key="star"
              class="star"
              :class="{ 
                'filled': star <= (hoveredRating || newComment.rating),
                'hovered': star <= hoveredRating
              }"
              @click="newComment.rating = star"
              @mouseover="hoveredRating = star"
            >★</span>

          </div>
          <p v-if="newComment.rating" class="rating-text">{{ newComment.rating }} av 5</p>
          </div>

        <br>

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
        :disabled="newComment.text.trim() === '' || newComment.name.trim() === ''"
        class="submit-btn">

        Skicka kommentar

        </button>

    </div>

    <div class="commentBox">

    <div class="comments-list" v-if="comments.length > 0">
      <div class="comment-item" v-for="(comment, index) in comments" :key="index">
        <div class="comment-header">
          <p class="comment-name">{{ comment.name }} - {{ comment.date }}</p>
          <div class="comment-rating">
            <span v-for="star in 5" :key="star" class="comment-star" :class="{ 'filled': star <= comment.rating }">★</span>
          </div>
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
export default {
  data() {
    return {
      newComment: {
        text: '',
        name: '',
        rating: 0
      },
      comments: [],
      hoveredRating: 0
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
          name: this.newComment.name.toUpperCase(),
          rating: this.newComment.rating,
          date: new Date().toLocaleDateString('sv-SE')
        });
        this.newComment.text = '';
        this.newComment.name = '';
        this.newComment.rating = 0;
      }
    }
  }
}
</script>

<style>

.comment-header-title {
  text-align: center;
  margin-bottom: 20px;
  background-color: white;  
  color: black;
}
.star {
  font-size: 50px;
  color: #ccc;
  margin: 0 2px;
  cursor: pointer;
  transition: color 0.2s ease;
}

.star.filled {
  color: gold;
}

.star.hovered {
  color: gold;
}

.comment-section {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  color: black;
}

.qesution-title {
  font-weight: bold;
}

.commentForm{
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.nameInput, .commentArea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  font-family: Arial, Helvetica, sans-serif;
}

.submit-btn {
  padding: 10px 20px;
  background-color: #000000;
  color: rgb(255, 255, 255);
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 25px;
}


.commentBox{
  margin-top: 30px;
  color: black;

}

.comment-item, comment-name, comment-text {
  background-color: rgb(201, 201, 201);
  border-bottom: 10px solid #eee;
  padding: 10px 0;
  
}

.comment-text{
  font-family: Arial, Helvetica, sans-serif;
  font-weight: normal;
 
}

.comment-name{
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
 
}
.comment-list {
  margin-bottom: 20px;
  
  
}

.rating-text {
  margin-top: 10px;
  font-size: 0.9rem;
  color: #666;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.comment-rating {
  display: flex;
  gap: 2px;
  white-space: nowrap;
}

.comment-star {
  font-size: 18px;
  color: #ccc;
}

.comment-star.filled {
  color: gold;
}



</style>