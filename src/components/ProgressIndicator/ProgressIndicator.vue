<script setup lang="ts">
/* Espelha o component set "Progress" (Braip Components, 1422:20655).
 * Eixos do Figma: Type (Default|Current Step|Success|Disabled) e Color (Purple|Green).
 * Type=Disabled vira prop `disabled`; o resto vira o eixo `state`.
 * O valor `Sucess` foi renomeado para `Success` na padronizacao EN de 2026-09-17. */
withDefaults(defineProps<{
  state?: 'default' | 'current' | 'success'
  color?: 'purple' | 'green'
  disabled?: boolean
  step?: number
  total?: number
  label?: string
}>(), { state: 'default', color: 'purple', disabled: false, step: 0, total: 1, label: '' })
</script>

<template>
  <span
    class="braip-progress-indicator"
    :class="[`is-${state}`, `color-${color}`, { 'is-disabled': disabled }]"
    role="progressbar"
    :aria-valuenow="step"
    aria-valuemin="0"
    :aria-valuemax="total"
    :aria-label="label || undefined"
    :aria-disabled="disabled || undefined"
  >
    <svg class="braip-progress-indicator__ring" viewBox="0 0 24 24" focusable="false" aria-hidden="true">
      <circle class="braip-progress-indicator__track" cx="12" cy="12" r="11" />
      <circle v-if="state === 'current'" class="braip-progress-indicator__dot" cx="12" cy="12" r="6" />
      <path v-if="state === 'success'" class="braip-progress-indicator__check" d="M7 12.2l3.2 3.2 6.2-6.6" />
    </svg>
  </span>
</template>

<style scoped>
.braip-progress-indicator {
  display: inline-flex;
  inline-size: var(--braip-value-space-24);
  block-size: var(--braip-value-space-24);
}

.braip-progress-indicator__ring {
  inline-size: 100%;
  block-size: 100%;
}

/* Anel: stroke de 1.2px no Figma — sem token equivalente, derivado de space-base-offset */
.braip-progress-indicator__track {
  fill: none;
  stroke: var(--braip-progress-track, var(--braip-alias-neutral-tertiary));
  stroke-width: calc(var(--braip-space-base-offset) * 0.6);
}

.braip-progress-indicator__dot {
  fill: var(--braip-progress-accent);
}

.braip-progress-indicator__check {
  fill: none;
  stroke: var(--braip-color-global-base-white);
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* Color */
.braip-progress-indicator.color-purple { --braip-progress-accent: var(--braip-alias-purple-tertiary); }
.braip-progress-indicator.color-green { --braip-progress-accent: var(--braip-alias-green-tertiary); }

/* Type=Current Step — anel na cor do passo */
.braip-progress-indicator.is-current { --braip-progress-track: var(--braip-progress-accent); }

/* Type=Success — circulo preenchido com o check branco */
.braip-progress-indicator.is-success .braip-progress-indicator__track {
  fill: var(--braip-progress-accent);
  stroke: var(--braip-progress-accent);
}

/* Type=Disabled — anel fantasma neutro */
.braip-progress-indicator.is-disabled .braip-progress-indicator__track {
  fill: none;
  stroke: var(--braip-color-aux-grey-stroke-ghost);
}

.braip-progress-indicator.is-disabled .braip-progress-indicator__dot,
.braip-progress-indicator.is-disabled .braip-progress-indicator__check {
  display: none;
}
</style>
