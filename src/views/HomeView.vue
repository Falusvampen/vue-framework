 <template>
    <div>
        <div class="recipe-row">
          <Ingredienser title="Ingredienser" :ingredients="ingredients" />
          <StepComponent title="Gör så här" :steps="steps" />
        </div>
    </div>
</template>

<script>

import Ingredienser from '../components/Ingredienser.vue';
import StepComponent from '../components/StepComponent.vue';

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

<style  scoped>

</style>