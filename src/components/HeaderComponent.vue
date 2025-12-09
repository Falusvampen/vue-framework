<template>
  <RouterLink to="/" class="nav-btn">
    Hem
  </RouterLink>
</template>

<script setup>



</script>

<style scoped>
.nav-btn {
  position: fixed;    
  top: 1rem;             
  left: 1rem;          
  background-color: transparent; 
  color: white;      
  text-decoration: none;
  font-weight: 500; 
  padding: 0.65rem 1.6rem; 
  border: 2px solid rgb(186, 186, 186); 
  border-radius: 26px;   
  cursor: pointer;  
  font-size: 1.2rem;    
  z-index: 1000;   
  transition: all 0.3s ease;
  mix-blend-mode:difference;

}

.nav-btn:hover {
  background-color: rgba(255, 255, 255, 0.1); 
  border-color: #ddd; 
}
</style>