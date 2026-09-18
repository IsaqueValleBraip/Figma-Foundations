<script setup lang="ts">
/* Espelha o component set "FABs" (Braip Components, 672:57312).
 * Eixos: Type x Size x Color. State=Hover/Pressed vira CSS (o set nao tem Disabled),
 * mas `disabled` fica exposto porque o elemento e um <button> real.
 * Sem rotulo visivel: `label` alimenta o aria-label, como no ButtonIcon. */
withDefaults(defineProps<{
  type?: 'primary' | 'secondary'
  size?: 'lg' | 'md' | 'sm'
  color?: 'purple' | 'red' | 'green'
  disabled?: boolean
  label: string
}>(), { type: 'primary', size: 'lg', color: 'purple', disabled: false })
</script>

<template>
  <button
    class="braip-fab"
    :class="[`is-${type}`, `is-${size}`, `color-${color}`]"
    :disabled="disabled"
    :aria-label="label"
  >
    <slot />
  </button>
</template>

<style scoped>
/* Modelado por eixo: a familia de cor define os slots (surface/states/stroke/icon)
 * e Type/State apenas escolhem qual slot usar. */
.braip-fab {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--braip-fab-bd, transparent);
  border-radius: var(--braip-space-radius-full);
  background: var(--braip-fab-bg);
  color: var(--braip-fab-fg);
  cursor: pointer;
}

/* Size */
.braip-fab.is-lg {
  inline-size: var(--braip-value-space-56);
  block-size: var(--braip-value-space-56);
}

.braip-fab.is-md {
  inline-size: var(--braip-value-space-48);
  block-size: var(--braip-value-space-48);
}

.braip-fab.is-sm {
  inline-size: var(--braip-value-space-40);
  block-size: var(--braip-value-space-40);
}

/* Color — slots por familia */
.braip-fab.color-purple {
  --braip-fab-surface-1: var(--braip-color-brand-core-surface-primary);
  --braip-fab-surface-2: var(--braip-color-brand-core-surface-secundary);
  --braip-fab-surface-3: var(--braip-color-brand-core-surface-tertiary);
  --braip-fab-ghost: var(--braip-color-brand-core-surface-ghost);
  --braip-fab-state-1: var(--braip-color-brand-core-states-primary);
  --braip-fab-state-2: var(--braip-color-brand-core-states-secundary);
  --braip-fab-stroke-ghost: var(--braip-color-brand-core-stroke-ghost);
  --braip-fab-stroke-primary: var(--braip-color-brand-core-stroke-primary);
  --braip-fab-icon: var(--braip-color-brand-core-icons-primary);
}

.braip-fab.color-red {
  --braip-fab-surface-1: var(--braip-color-aux-red-surface-primary);
  --braip-fab-surface-2: var(--braip-color-aux-red-surface-secundary);
  --braip-fab-surface-3: var(--braip-color-aux-red-surface-tertiary);
  --braip-fab-ghost: var(--braip-color-aux-red-surface-ghost);
  --braip-fab-state-1: var(--braip-color-aux-red-states-primary);
  --braip-fab-state-2: var(--braip-color-aux-red-states-secundary);
  --braip-fab-stroke-ghost: var(--braip-color-aux-red-stroke-ghost);
  --braip-fab-stroke-primary: var(--braip-color-aux-red-stroke-primary);
  --braip-fab-icon: var(--braip-color-aux-red-icons-primary);
}

.braip-fab.color-green {
  --braip-fab-surface-1: var(--braip-color-aux-green-surface-primary);
  --braip-fab-surface-2: var(--braip-color-aux-green-surface-secundary);
  --braip-fab-surface-3: var(--braip-color-aux-green-surface-tertiary);
  --braip-fab-ghost: var(--braip-color-aux-green-surface-ghost);
  --braip-fab-state-1: var(--braip-color-aux-green-states-primary);
  --braip-fab-state-2: var(--braip-color-aux-green-states-secundary);
  --braip-fab-stroke-ghost: var(--braip-color-aux-green-stroke-ghost);
  --braip-fab-stroke-primary: var(--braip-color-aux-green-stroke-primary);
  --braip-fab-icon: var(--braip-color-aux-green-icons-primary);
}

/* Type=Primary */
.braip-fab.is-primary {
  --braip-fab-bg: var(--braip-fab-surface-1);
  --braip-fab-fg: var(--braip-color-brand-core-icons-on-surface);
}

.braip-fab.is-primary:hover:not(:disabled) {
  --braip-fab-bg: var(--braip-fab-surface-2);
}

.braip-fab.is-primary:active:not(:disabled) {
  --braip-fab-bg: var(--braip-fab-surface-3);
}

/* Type=Secondary */
.braip-fab.is-secondary {
  --braip-fab-bg: var(--braip-fab-ghost);
  --braip-fab-bd: var(--braip-fab-stroke-ghost);
  --braip-fab-fg: var(--braip-fab-icon);
}

.braip-fab.is-secondary:hover:not(:disabled) {
  --braip-fab-bg: var(--braip-fab-state-1);
}

.braip-fab.is-secondary:active:not(:disabled) {
  --braip-fab-bg: var(--braip-fab-state-2);
  --braip-fab-bd: var(--braip-fab-stroke-primary);
}

.braip-fab:disabled {
  --braip-fab-bg: var(--braip-alias-neutral-primary);
  --braip-fab-fg: var(--braip-alias-neutral-text);
  --braip-fab-bd: transparent;
  cursor: not-allowed;
}
</style>
