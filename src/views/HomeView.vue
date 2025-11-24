<script setup>
import StepComponent from '../components/StepComponent.vue';
import Gebetyg from '@/components/Gebetyg.vue';

</script>

<template>
  <main>

    <StepComponent title="Så här fungerar det" :steps="[
      { number: 1, tutorial: 'Bläddra igenom våra recept och välj din favorit.' },
      { number: 2, tutorial: 'Lägg till receptet i din veckomeny med ett klick.' },
      { number: 3, tutorial: 'Få en inköpslista baserad på dina val.' }
    ]"
    />

    

    <Gebetyg title="Vad tycker du om vår app?" />


    
    
  </main>
</template>
