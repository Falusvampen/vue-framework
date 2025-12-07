<script>
// Här definieras komponentens logik
export default {
  // Props = data som skickas in från en förälder-komponent
  props: {
    title: String,   // Rubrik för kortet (t.ex. "Gör så här")
    steps: Array,    // En lista med steg (ex. [{ number: 1, tutorial: "Skala bananen" }])
  },
}
</script>

<template>
  <!-- Yttre container för kortet -->
  <div class="görsåhär-card">

    <!-- Rubrik -->
    <div class="görsåhär-heading">
      <!-- Visar rubriken som skickas in via props -->
      <h2>{{ title }}</h2>
    </div>

    <!-- Loopar igenom varje steg i props.steps -->
    <div class="step" v-for="(step, index) in steps" :key="index">
      <!-- Visar stegets nummer -->
      <div class="step-number">{{ step.number }}</div>

      <!-- Visar själva instruktionen -->
      <div class="step-text">{{ step.tutorial }}</div>
    </div>
  </div>
</template>

<style scoped>
/* Kortets grundstil */
.görsåhär-card {
  border-radius: 16px;                        /* Rundade hörn */
  padding: 20px 24px;                         /* Inre marginaler */
  width: 40rem;                               /* Bredd på kortet */
  height: auto;                               /* Höjd anpassas automatiskt */
  display: flex;                              /* Flexbox för layout */
  flex-direction: column;                     /* Stapla innehåll vertikalt */
  gap: 1rem;                                  /* Avstånd mellan elementen */
  box-shadow: 0 1px 26px rgba(0, 0, 0, 0.1);  /* Skugga för djup */
}

/* Rubrik-container */
.görsåhär-heading {
  margin-bottom: 0.5rem;                      /* Lite luft under rubriken */
}

/* Rubrikens stil */
.görsåhär-heading h2 {
  font-size: 1.5rem;                          /* Storlek på texten */
  font-weight: 600;                           /* Fet text */
  color: #333;                                /* Mörkgrå färg */
  margin: 0;                                  /* Ingen extra marginal */
}

/* Varje steg-container */
.step {
  display: flex;                              /* Flexbox för nummer + text */
  align-items: flex-start;                    /* Justera innehållet till toppen */
  background: #fff;                           /* Vit bakgrund */
  border-radius: 12px;                        /* Rundade hörn */
  padding: 10px 10px;                         /* Inre marginaler */
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);  /* Lätt skugga */
}

/* Stegnummer (den lilla cirkeln) */
.step-number {
  background-color: #f1d0a1;                  /* Beige bakgrund */
  color: #333;                                /* Mörk text */
  font-weight: bold;                          /* Fet text */
  border-radius: 50%;                         /* Gör den rund */
  width: 1.6rem;                              /* Bredd */
  height: 1.6rem;                             /* Höjd */
  display: flex;                              /* Flexbox för centrering */
  align-items: center;                        /* Vertikal centrering */
  justify-content: center;                    /* Horisontell centrering */
  flex-shrink: 0;                             /* Krymp inte cirkeln */
  margin-right: 10px;                         /* Avstånd till texten */
}

/* Stegtexten */
.step-text {
  flex: 1;                                    /* Tar upp resterande utrymme */
  font-family: Verdana, Geneva, Tahoma, sans-serif; /* Typsnitt */
  font-size: 0.9rem;                          /* Lite mindre text */
  color: #444;                                /* Mörkgrå färg */
  line-height: 1.5;                           /* Radavstånd för läsbarhet */
}
</style>