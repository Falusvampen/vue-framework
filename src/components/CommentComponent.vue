<template>
   <div class="comment-header-title">

    <h1 class="question-title">Vad tyckte du om receptet?</h1>

    <div class="comment-header-undertitle">
    <p> Lämna en kommentar nedan!</p>
    </div>

   <div class="comment-header-stars">
          <div class="stars">
            <span class="star">★</span>
            <span class="star">★</span>
            <span class="star">★</span>
            <span class="star">★</span>
            <span class="star">★</span>

          </div>

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
        :disabled="!isFormValid"
        class="submit-btn">

        Skicka kommentar

        </button>

    </div>

    <div class="commentBox">

    <div class="comments-list" v-if="comments.length > 0">
      <div class="comment-item" v-for="(comment, index) in comments" :key="index">
        <p class="comment-name">{{ comment.name }} - {{ comment.date }}</p>
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

<style>

.comment-header-title {
  text-align: center;
  margin-bottom: 20px;
  background-color: white;  
  color: black;
}
.star {
  font-size: 50px;
  color: gold;
  margin: 0 2px;
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



</style>