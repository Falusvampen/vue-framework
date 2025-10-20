<template>
  <div>
    <h1>Användarprofil</h1>
    <p>
      Nice hej hå falukorv <strong>{{ id }}</strong>
    </p>
  </div>
</template>

<script setup>
const route = useRoute();

const id = route.params.id;
</script>
