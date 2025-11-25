
<script setup>
    import StepComponent from '../components/StepComponent.vue';
</script>

<template>
    <div>
        <StepComponent title="Gör så här" :steps="[
            { number: 1, tutorial: 'Skiva halloumin och stek den gyllenbrun.' },
            { number: 2, tutorial: 'Hacka grönsakerna och blanda i en skål.' },
            { number: 3, tutorial: 'Toppa med halloumi och servera.' }
        ]" 
        
        />

    </div>
</template>



<style scoped>

</style>