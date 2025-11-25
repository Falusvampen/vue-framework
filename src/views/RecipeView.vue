
<script>
    import Ingredienser from '../components/Ingredienser.vue';
    import StepComponent from '../components/StepComponent.vue';
    import Gebetyg from '../components/Gebetyg.vue';

    export default {
        name: 'RecipeView',
        components: {
            Ingredienser,
            StepComponent
        },
        data(){
          return  {
            ingredients: [
              '200g halloumi',
              '1 rödlök',
              '2 tomater',
              '1 avokado',
              'Olivolja',
              'Balsamvinäger',
              'Chili flakes',
              'Flingsalt',
              'Svartpeppar',
              'Färska basilikablad'
            ],
            steps: [
                { number: 1, tutorial: 'Skiva halloumin och stek den gyllenbrun.' },
                { number: 2, tutorial: 'Hacka grönsakerna och blanda i en skål.' },
                { number: 3, tutorial: 'Toppa med halloumi och servera.' }
            ]
          }
        },
        computed: {
          totalIngredients() {
            return this.ingredients.length;
          }
        }
    }
</script>

<template>
    <div>
    <div>
        <StepComponent title="Gör så här" :steps="[
            { number: 1, tutorial: 'Skiva halloumin och stek den gyllenbrun.' },
            { number: 2, tutorial: 'Hacka grönsakerna och blanda i en skål.' },
            { number: 3, tutorial: 'Toppa med halloumi och servera.' }
        ]" 
        
        />

        

    </div>

    <div>
        <div class="recipe-row">
          <Ingredienser title="Ingredienser" :ingredients="ingredients" />
          <StepComponent title="Gör så här" :steps="steps" />
        </div>
    </div>

    <Gebetyg title="Betygsätt receptet" />
</div>
</template>



<style scoped>

.recipe-row {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-direction: row;
}

</style>