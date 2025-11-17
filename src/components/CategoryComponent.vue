<script>
export default {
    props: {
        catogory: String,
    }
}
</script>

<template>
    <nav>
        <h2>Kategorier</h2>
        <ol>
            <li> Ex {{ category }}</li>
            <li> Ex {{ category }}</li>
            <li> Ex {{ category }}</li>
            <li> Ex {{ category }}</li>
        </ol>
    </nav>

</template>

<style scoped>
  nav {
    display: flex;
    flex-direction: column;
    background-color: rgb(189, 187, 187);
    color: black;
    padding: 10px;
  }

  h2 {
    font-weight: bold;
  }

  ol {
    list-style-type: none;
  }

  li:hover {
    text-shadow: 2px 2px 4px rgba(0,0,0,0.4);
  }
</style>
