<script setup lang="ts">
withDefaults(defineProps<{
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
}>(), { variant: 'primary', size: 'md', disabled: false })
</script>

<template>
  <button class="braip-button" :class="[`is-${variant}`, `is-${size}`]" :disabled="disabled">
    <slot />
  </button>
</template>

<style scoped>
/* Sem valores literais: tudo vem das foundations.
 * Grafias como `secundary` seguem o caminho do Figma de proposito — corrigir
 * exige migracao com alias de compatibilidade, nao um rename silencioso. */
.braip-button {
  border: 1px solid transparent;
  border-radius: var(--braip-space-radius-sm);
  font-family: var(--braip-type-font-family-text);
  font-weight: var(--braip-type-weight-semi-bold);
  cursor: pointer;
}

.braip-button:disabled {
  background: var(--braip-color-brand-core-states-disable);
  color: var(--braip-color-global-surfaces-text-aux-disable);
  border-color: transparent;
  cursor: not-allowed;
}

.braip-button.is-sm {
  padding: var(--braip-space-component-xs) var(--braip-space-component-sm);
  font-size: var(--braip-type-size-text-p6);
  line-height: var(--braip-type-line-height-text-p6);
}

.braip-button.is-md {
  padding: var(--braip-space-component-sm) var(--braip-space-component-md);
  font-size: var(--braip-type-size-text-p5);
  line-height: var(--braip-type-line-height-text-p5);
}

.braip-button.is-lg {
  padding: var(--braip-space-component-md) var(--braip-space-component-lg);
  font-size: var(--braip-type-size-text-p4);
  line-height: var(--braip-type-line-height-text-p4);
}

.braip-button.is-primary {
  background: var(--braip-color-brand-core-surface-primary);
  color: var(--braip-color-brand-core-text-on-surface);
}

.braip-button.is-secondary {
  background: var(--braip-color-brand-core-surface-tertiary);
  color: var(--braip-color-brand-core-text-primary);
  border-color: var(--braip-color-brand-core-stroke-secundary);
}

.braip-button.is-ghost {
  background: var(--braip-color-brand-core-surface-ghost);
  color: var(--braip-color-brand-core-text-primary);
}
</style>
