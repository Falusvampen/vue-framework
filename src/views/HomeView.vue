<script setup>
import CardCarousel from '../components/CardCarousel.vue'
import Textimagesplit from '@/components/Textimagesplit.vue'
import Textimagesplit1 from '@/components/Textimagesplit1.vue'
</script>

<template>
  <main>
    <CardCarousel { title="Favoriter" }, :cards="[
      {
        title: 'Pasta',
        description: 'Krämig pastasallad med pesto och kyckling.',
        imageSrc: 'berry.png',
        altText: 'Pastasallad',
        ingredients: '5 ingredienser',
        time: '30 minuter',
        rating: '★★★☆☆'


      },
      {
        title: 'Pizza',
        description: 'Krämig pastasallad med pesto och kyckling.',
        imageSrc: 'berry.png',
        altText: 'Pastasallad',
        ingredients: '5 ingredienser',
        time: '30 minuter',
        rating: '★★★☆☆'


      },
      {
        title: 'Pastasallad',
        description: 'Krämig pastasallad med pesto och kyckling.',
        imageSrc: 'berry.png',
        altText: 'Pastasallad',
        ingredients: '5 ingredienser',
        time: '30 minuter',
        rating: '★★★☆☆'


      },
      {
        title: 'Halloumi sallad',
        description: 'En fräsch sallad med grillad halloumi.',
        imageSrc: 'berry.png',
        altText: 'Halloumi sallad',
        ingredients: '6 ingredienser',
        time: '74 minuter',
        rating: '★★★★★'
      },
      {
        title: 'Halloumi sallad',
        description: 'En fräsch sallad med grillad halloumi.',
        imageSrc: 'berry.png',
        altText: 'Halloumi sallad',
        ingredients: '6 ingredienser',
        time: '74 minuter',
        rating: '★★★★★'
      }
    ]" :visibleCount="3" />


    <CardCarousel { title="Senaste Nytt" }, :cards="[
      {
        title: 'Pasta',
        description: 'Krämig pastasallad med pesto och kyckling.',
        imageSrc: 'berry.png',
        altText: 'Pastasallad',
        ingredients: '5 ingredienser',
        time: '30 minuter',
        rating: '★★★☆☆'


      },
      {
        title: 'Pizza',
        description: 'Krämig pastasallad med pesto och kyckling.',
        imageSrc: 'berry.png',
        altText: 'Pastasallad',
        ingredients: '5 ingredienser',
        time: '30 minuter',
        rating: '★★★☆☆'


      },
      {
        title: 'Pastasallad',
        description: 'Krämig pastasallad med pesto och kyckling.',
        imageSrc: 'berry.png',
        altText: 'Pastasallad',
        ingredients: '5 ingredienser',
        time: '30 minuter',
        rating: '★★★☆☆'


      },
      {
        title: 'Halloumi sallad',
        description: 'En fräsch sallad med grillad halloumi.',
        imageSrc: 'berry.png',
        altText: 'Halloumi sallad',
        ingredients: '6 ingredienser',
        time: '74 minuter',
        rating: '★★★★★'
      },
      {
        title: 'Halloumi sallad',
        description: 'En fräsch sallad med grillad halloumi.',
        imageSrc: 'berry.png',
        altText: 'Halloumi sallad',
        ingredients: '6 ingredienser',
        time: '74 minuter',
        rating: '★★★★★'
      }
    ]" :visibleCount="3" />


   <Textimagesplit
    title="ENKELT, SNABBT OCH SUPERGOTT."
    subtitle="Recept och tips"
    buttonText="Läs mer"
    imageSrc="Hallumisallad.jpg"
    
  />

  <Textimagesplit1
    title="Nya Produkter på ingång!"
    subtitle="Recept och inspiration"
    buttonText="Utforska"
    imageSrc="Colaburkar.png"

    />
  </main>
</template>
