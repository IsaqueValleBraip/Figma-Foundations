<script setup lang="ts">
/* Espelha o component set "Loading Circular" (Braip Components, 672:58334).
 * DIVERGENCIA: a property `Type` do Figma carrega TAMANHOS
 * (Extra Large|Large|Medium|Small|Extra Small) — no Vue ela se chama `size`.
 * O eixo `Position` (01..04|None) sao os quadros do giro no Figma e nao vira prop:
 * em codigo o giro e uma animacao CSS continua. */
withDefaults(defineProps<{
  size?: 'xl' | 'lg' | 'md' | 'sm' | 'xs'
  color?: 'purple' | 'white' | 'red' | 'green'
  state?: 'flip' | 'success'
  label?: string
}>(), { size: 'md', color: 'purple', state: 'flip', label: 'Carregando' })
</script>

<template>
  <span
    class="braip-loading-circular"
    :class="[`is-${size}`, `color-${color}`, `state-${state}`]"
    role="status"
    aria-live="polite"
  >
    <svg class="braip-loading-circular__svg" viewBox="0 0 24 24" focusable="false" aria-hidden="true">
      <circle class="braip-loading-circular__track" cx="12" cy="12" r="10" />
      <circle v-if="state === 'flip'" class="braip-loading-circular__indicator" cx="12" cy="12" r="10" />
      <path v-else class="braip-loading-circular__check" d="M7 12.2l3.2 3.2 6.2-6.6" />
    </svg>
    <span class="braip-loading-circular__label">{{ label }}</span>
  </span>
</template>

<style scoped>
.braip-loading-circular {
  display: inline-flex;
}

.braip-loading-circular__svg {
  inline-size: 100%;
  block-size: 100%;
}

.braip-loading-circular__label {
  position: absolute;
  inline-size: var(--braip-value-space-0);
  block-size: var(--braip-value-space-0);
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

.braip-loading-circular__track,
.braip-loading-circular__indicator {
  fill: none;
  stroke-width: 3;
  stroke-linecap: round;
}

.braip-loading-circular__track {
  stroke: var(--braip-color-global-surfaces-bg-secondary);
}

.braip-loading-circular__indicator {
  stroke: var(--braip-loading-accent);
  stroke-dasharray: 63 63;
  stroke-dashoffset: 47;
  transform-origin: center;
  animation: braip-loading-circular-spin var(--braip-motion-duration-slower) linear infinite;
}

.braip-loading-circular__check {
  fill: none;
  stroke: var(--braip-loading-accent);
  stroke-width: 2.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

@keyframes braip-loading-circular-spin {
  to { transform: rotate(360deg); }
}

@media (prefers-reduced-motion: reduce) {
  .braip-loading-circular__indicator { animation: none; }
}

/* Size (property `Type` no Figma) — 28 / 24 / 20 / 18 / 16.
 * Sem token para 28, 20 e 18: compostos a partir dos primitivos existentes. */
.braip-loading-circular.is-xl {
  inline-size: calc(var(--braip-value-space-24) + var(--braip-value-space-4));
  block-size: calc(var(--braip-value-space-24) + var(--braip-value-space-4));
}
.braip-loading-circular.is-lg { inline-size: var(--braip-value-space-24); block-size: var(--braip-value-space-24); }
.braip-loading-circular.is-md {
  inline-size: calc(var(--braip-value-space-16) + var(--braip-value-space-4));
  block-size: calc(var(--braip-value-space-16) + var(--braip-value-space-4));
}
.braip-loading-circular.is-sm {
  inline-size: calc(var(--braip-value-space-16) + var(--braip-value-space-2));
  block-size: calc(var(--braip-value-space-16) + var(--braip-value-space-2));
}
.braip-loading-circular.is-xs { inline-size: var(--braip-value-space-16); block-size: var(--braip-value-space-16); }

/* Color */
.braip-loading-circular.color-purple { --braip-loading-accent: var(--braip-alias-purple-tertiary); }
.braip-loading-circular.color-white { --braip-loading-accent: var(--braip-color-global-base-white); }
.braip-loading-circular.color-red { --braip-loading-accent: var(--braip-alias-red-tertiary); }
.braip-loading-circular.color-green { --braip-loading-accent: var(--braip-alias-green-tertiary); }
</style>
