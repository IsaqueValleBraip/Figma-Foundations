<script setup lang="ts">
import Button from './components/Button.vue'

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
  </main>
</template>

<style>
body { margin: 0; font-family: system-ui, sans-serif; }
.playground { max-width: 60rem; margin: 0 auto; padding: 2rem 1.5rem 4rem; }
.playground h1 { font-size: 1.5rem; margin: 0 0 .25rem; }
.playground p { margin: 0 0 2rem; color: #666; }
.playground h2 { font-size: .8rem; text-transform: uppercase; letter-spacing: .06em; color: #888; margin: 2rem 0 .75rem; }
.row { display: flex; flex-wrap: wrap; gap: .75rem; align-items: center; }
</style>
