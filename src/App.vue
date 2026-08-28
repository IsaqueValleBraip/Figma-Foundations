<script setup lang="ts">
import Button from './components/Button.vue'
import { alias, spacing, typography, responsive, theme } from './foundations'

const variants = ['primary', 'secondary', 'ghost'] as const
const sizes = ['sm', 'md', 'lg'] as const
const brandSwatches = Object.entries(theme.light.color.brand.core.surface)
</script>

<template>
  <main class="playground">
    <h1>Figma Foundations — playground</h1>
    <p>Preview local dos componentes e das foundations geradas a partir do Figma.</p>

    <section v-for="variant in variants" :key="variant">
      <h2>{{ variant }}</h2>
      <div class="row">
        <Button v-for="size in sizes" :key="size" :variant="variant" :size="size">
          {{ size }}
        </Button>
        <Button :variant="variant" disabled>disabled</Button>
      </div>
    </section>

    <h2>Foundations</h2>
    <div class="row">
      <span
        v-for="[name, hex] in brandSwatches"
        :key="name"
        class="swatch"
        :title="`brand.core.surface.${name}: ${hex}`"
        :style="{ background: hex }"
      />
    </div>
    <p class="hint">
      {{ Object.keys(alias.light).length }} grupos de alias ·
      {{ Object.keys(spacing.base).length }} tokens de spacing base ·
      {{ Object.keys(typography.size).length }} escalas de tipografia ·
      {{ Object.keys(responsive.tablet).length }} dominios com sobrescrita responsiva
    </p>
  </main>
</template>

<style>
body {
  margin: 0;
  font-family: var(--braip-type-font-family-text);
  background: var(--braip-alias-bg-primary);
  color: var(--braip-alias-text-primary);
}

.playground {
  max-width: 60rem;
  margin: 0 auto;
  padding: var(--braip-space-base-lg) var(--braip-space-base-md) var(--braip-space-macro-md);
}

.playground h1 {
  font-family: var(--braip-type-font-family-title);
  font-size: var(--braip-type-size-title-h5);
  line-height: var(--braip-type-line-height-title-h5);
  margin: 0 0 var(--braip-space-base-xxs);
}

.playground p {
  margin: 0 0 var(--braip-space-base-md);
  color: var(--braip-alias-text-secondary);
}

.playground h2 {
  font-size: var(--braip-type-size-text-p7);
  text-transform: uppercase;
  letter-spacing: .06em;
  color: var(--braip-alias-text-tertiary);
  margin: var(--braip-space-base-md) 0 var(--braip-space-base-xs);
}

.row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--braip-space-base-xs);
  align-items: center;
}

.swatch {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: var(--braip-space-radius-sm);
  border: 1px solid var(--braip-alias-stroke-tertiary);
}

.hint {
  margin-top: var(--braip-space-base-sm);
  font-size: var(--braip-type-size-text-p7);
  color: var(--braip-alias-text-tertiary);
}
</style>
