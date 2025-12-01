<script>
    export default {
        props: {
            header: String,
            minitext: String

            
        }
        
    }
</script>


    <template>
  <div class="Newproductsheader">
    <div class="header-box">
      <h1>{{ header }}</h1>
      <p>{{ minitext }}</p>
    </div>
  </div>
</template>





<style scoped>


.Newproductsheader {
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('./public/NyaProdukter.webp');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  height: 24rem;
  margin-bottom: 5rem;
  border-bottom: 8px solid #f1d0a1;
  overflow: hidden;
}

.Newproductsheader::before {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 1;
}

.header-box {
  z-index: 2;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(15px);
  padding: 2rem 3rem;
  border-radius: 10px;
  text-align: center;
}

.header-box h1 {
  font-family: "Poppins", sans-serif;
  font-size: 3.5rem;
  font-weight: 600;
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