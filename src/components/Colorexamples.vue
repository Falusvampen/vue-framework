<template>
  <section class="color-examples" aria-labelledby="color-examples-title">
    <h2 id="color-examples-title">Färgpaletter</h2>
    <div class="palettes">
      <div class="palette">
        <h3>Energi & Passion</h3>
        <ul class="colors">
          <li class="color" style="--c: #ff4500">
            <div class="swatch" :title="'#FF4500'"></div>
            <div class="meta"><strong>#FF4500</strong><span>Orange — energi, aptit</span></div>
          </li>
          <li class="color" style="--c: #e63946">
            <div class="swatch" :title="'#E63946'"></div>
            <div class="meta"><strong>#E63946</strong><span>Röd — styrka, motivation</span></div>
          </li>
          <li class="color" style="--c: #2b2d42">
            <div class="swatch" :title="'#2B2D42'"></div>
            <div class="meta">
              <strong>#2B2D42</strong><span>Mörkgrå — kontrast, seriös känsla</span>
            </div>
          </li>
          <li class="color" style="--c: #f8f9fa">
            <div class="swatch" :title="'#F8F9FA'"></div>
            <div class="meta"><strong>#F8F9FA</strong><span>Vit — ren bakgrund</span></div>
          </li>
        </ul>
      </div>

      <div class="palette">
        <h3>Fräsch & Hälsosam</h3>
        <ul class="colors">
          <li class="color" style="--c: #2e8b57">
            <div class="swatch" :title="'#2E8B57'"></div>
            <div class="meta"><strong>#2E8B57</strong><span>Grön — hälsa, balans</span></div>
          </li>
          <li class="color" style="--c: #ffd700">
            <div class="swatch" :title="'#FFD700'"></div>
            <div class="meta"><strong>#FFD700</strong><span>Gul — positivitet, energi</span></div>
          </li>
          <li class="color" style="--c: #ffffff">
            <div class="swatch" :title="'#FFFFFF'"></div>
            <div class="meta"><strong>#FFFFFF</strong><span>Vit — enkelhet, renhet</span></div>
          </li>
          <li class="color" style="--c: #808080">
            <div class="swatch" :title="'#808080'"></div>
            <div class="meta"><strong>#808080</strong><span>Grå — neutral bas</span></div>
          </li>
        </ul>
      </div>

      <div class="palette">
        <h3>Modern & Sportig</h3>
        <ul class="colors">
          <li class="color" style="--c: #0077b6">
            <div class="swatch" :title="'#0077B6'"></div>
            <div class="meta"><strong>#0077B6</strong><span>Blå — tillit, modern känsla</span></div>
          </li>
          <li class="color" style="--c: #00b4d8">
            <div class="swatch" :title="'#00B4D8'"></div>
            <div class="meta"><strong>#00B4D8</strong><span>Turkos — fräsch, sportig</span></div>
          </li>
          <li class="color" style="--c: #90e0ef">
            <div class="swatch" :title="'#90E0EF'"></div>
            <div class="meta"><strong>#90E0EF</strong><span>Ljusblå — luftig bakgrund</span></div>
          </li>
          <li class="color" style="--c: #333333">
            <div class="swatch" :title="'#333333'"></div>
            <div class="meta"><strong>#333333</strong><span>Mörkgrå — kontrast</span></div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ColorExamples',
}
</script>

<style scoped>
.color-examples {
  font-family:
    system-ui,
    -apple-system,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial;
  color: #222;
  padding: 1rem;
}

.palettes {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  margin-top: 0.75rem;
}

.palette {
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.06);
  padding: 0.75rem;
  border-radius: 8px;
}

.palette h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
}

.colors {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.5rem;
}

.color {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.swatch {
  width: 40px;
  height: 28px;
  border-radius: 4px;
  background: var(--c);
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.2) inset;
}

.meta {
  display: flex;
  flex-direction: column;
  font-size: 0.85rem;
  line-height: 1;
}

.meta strong {
  font-weight: 600;
}

.meta span {
  color: #555;
  font-size: 0.825rem;
}
</style>
