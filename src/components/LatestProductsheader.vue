<script>
    export default {
        props: {
            header: String,
            minitext: String

            
        }
        
    }
</script>


    <template>
  <div class="LatestProductheader">
    <div class="header-box">
      <h1>{{ header }}</h1>
      <p>{{ minitext }}</p>
    </div>
  </div>
</template>





<style scoped>


.LatestProductheader {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 20rem;
  margin-bottom: 3rem;
 
}



.header-box {
  z-index: 2;
  padding: 2rem 3rem;
  border-radius: 10px;
  text-align: center;
}

.header-box h1 {
  font-size: 3.5rem;
  font-weight: 700;
  color: white;
  margin: 0 0 1rem 0;
  border-bottom: 1px solid white;
  padding-bottom: 0.5rem;
}


.header-box p {
  color: white;
  font-size: 1.2rem;
  margin: 0;
}



</style>