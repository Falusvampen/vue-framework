<script>
export default {
  props: {
    title: String,
    description: String,
  }
}
</script>

<template>
    <div>
        <h1>Gym-snacks</h1>
        <p>Välkommen till denna recept sida med gym snacks för alla tillfällen! </p>
        <ol>
          <li>
            <button>

            </button>
          </li>
        </ol>
    </div>
</template>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
  background-image: url('https://cdn.prod.website-files.com/6361dc271a3e49d685fe418b/64b69c1d8fc68c419373a2bb_Untitled%20design%20-%202023-07-18T100512.462.png');
  background-size: cover;
  padding: 30px;
  color: white;
  text-align: center;
  max-width: 100%;
}

h1 {
  font-size: 48px;
  margin-bottom: 20px;
}

</style>
