<script setup lang="ts">
/* Espelha o component set "Loading Linear" (Braip Components, 672:58787).
 * Eixos: Mode (Default|Information|Warning|Error|Success) e State (0%..100%).
 * State e discreto no Figma; em codigo vira `value` continuo (0-100). */
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  mode?: 'default' | 'information' | 'warning' | 'error' | 'success'
  value?: number
  label?: string
}>(), { mode: 'default', value: 0, label: 'Carregando' })

const clamped = computed(() => Math.min(100, Math.max(0, Number(props.value) || 0)))
</script>

<template>
  <div
    class="braip-loading-linear"
    :class="`mode-${mode}`"
    role="status"
    aria-live="polite"
    :aria-label="label"
  >
    <span class="braip-loading-linear__fill" :style="{ inlineSize: `${clamped}%` }" />
  </div>
</template>

<style scoped>
.braip-loading-linear {
  display: block;
  inline-size: 100%;
  block-size: var(--braip-value-space-4);
  border-radius: var(--braip-space-radius-sm);
  background: var(--braip-color-global-surfaces-bg-secondary);
  overflow: hidden;
}

.braip-loading-linear__fill {
  display: block;
  block-size: 100%;
  border-radius: var(--braip-space-radius-sm);
  background: var(--braip-loading-linear-accent);
  transition: inline-size var(--braip-motion-duration-base) var(--braip-motion-easing-standard);
}

@media (prefers-reduced-motion: reduce) {
  .braip-loading-linear__fill { transition: none; }
}

/* Mode */
.braip-loading-linear.mode-default { --braip-loading-linear-accent: var(--braip-color-brand-core-surface-primary); }
.braip-loading-linear.mode-information { --braip-loading-linear-accent: var(--braip-color-aux-blue-surface-primary); }
.braip-loading-linear.mode-warning { --braip-loading-linear-accent: var(--braip-color-aux-orange-surface-primary); }
.braip-loading-linear.mode-error { --braip-loading-linear-accent: var(--braip-color-aux-red-surface-primary); }
.braip-loading-linear.mode-success { --braip-loading-linear-accent: var(--braip-color-aux-green-surface-primary); }
</style>
