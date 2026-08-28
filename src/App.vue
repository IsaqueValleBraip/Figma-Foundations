<script setup lang="ts">
import Button from './components/Button.vue'
import { color, spacing, typography } from './tokens'

const variants = ['primary', 'secondary', 'ghost'] as const
const sizes = ['sm', 'md', 'lg'] as const
</script>

<template>
  <main class="playground">
    <h1>Figma Foundations — playground</h1>
    <p>Preview local dos componentes conectados ao Figma via Code Connect.</p>

    <section v-for="variant in variants" :key="variant">
      <h2>{{ variant }}</h2>
      <div class="row">
        <Button v-for="size in sizes" :key="size" :variant="variant" :size="size">
          {{ size }}
        </Button>
        <Button :variant="variant" disabled>disabled</Button>
      </div>
    </section>

    <h2>Design tokens</h2>
    <div class="row">
      <span
        v-for="(hex, name) in color.light.brand.primary"
        :key="name"
        class="swatch"
        :title="`${name}: ${hex}`"
        :style="{ background: hex }"
      />
    </div>
    <p class="hint">
      {{ Object.keys(spacing.base).length }} tokens de spacing base ·
      {{ Object.keys(typography.size).length }} tamanhos de tipografia ·
      variaveis CSS disponiveis como <code>--braip-*</code>
    </p>
  </main>
</template>

<style>
body { margin: 0; font-family: system-ui, sans-serif; }
.playground { max-width: 60rem; margin: 0 auto; padding: 2rem 1.5rem 4rem; }
.playground h1 { font-size: 1.5rem; margin: 0 0 .25rem; }
.playground p { margin: 0 0 2rem; color: #666; }
.playground h2 { font-size: .8rem; text-transform: uppercase; letter-spacing: .06em; color: #888; margin: 2rem 0 .75rem; }
.swatch { width: 2.5rem; height: 2.5rem; border-radius: 6px; border: 1px solid rgba(0,0,0,.1); }
.hint { margin-top: 1rem; font-size: .8125rem; color: #888; }
.row { display: flex; flex-wrap: wrap; gap: .75rem; align-items: center; }
</style>
