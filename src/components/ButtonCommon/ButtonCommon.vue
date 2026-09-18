<script setup lang="ts">
/* Espelha o component set "Common" (Braip Components).
 * Type/Size/Mode mapeiam 1:1 as variantes do Figma; State=Hover/Pressed vira CSS,
 * State=Disabled/Loading vira prop. Grafias alinhadas ao Figma apos a padronizacao EN de 2026-09-17
 * (Secundary->Secondary, Sucess->Success). */
withDefaults(defineProps<{
  type?: 'primary' | 'secondary' | 'outline' | 'only'
  size?: 'xl' | 'lg' | 'md' | 'sm' | 'xs'
  mode?: 'normal' | 'destructive' | 'success'
  disabled?: boolean
  loading?: boolean
}>(), { type: 'primary', size: 'xl', mode: 'normal', disabled: false, loading: false })
</script>

<template>
  <button
    class="braip-common"
    :class="[`is-${type}`, `is-${size}`, `mode-${mode}`, { 'is-loading': loading }]"
    :disabled="disabled || loading"
  >
    <span v-if="$slots.iconLeft" class="braip-common__icon"><slot name="iconLeft" /></span>
    <slot />
    <span v-if="$slots.iconRight" class="braip-common__icon"><slot name="iconRight" /></span>
  </button>
</template>

<style scoped>
/* Sem valores literais: superficie, texto e borda saem da camada alias; altura,
 * padding, raio e gap saem de space/value. */
.braip-common {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--braip-space-base-xxs);
  border: 1px solid var(--braip-common-bd, transparent);
  background: var(--braip-common-bg, transparent);
  color: var(--braip-common-fg);
  font-family: var(--braip-type-font-family-text);
  font-weight: var(--braip-type-weight-semi-bold);
  cursor: pointer;
}

.braip-common__icon {
  display: inline-flex;
  align-items: center;
  color: currentColor;
}

/* Size — altura e raio do Figma, via primitivos */
.braip-common.is-xl {
  height: var(--braip-value-space-72);
  padding-inline: var(--braip-space-base-md);
  border-radius: var(--braip-space-radius-md);
  font-size: var(--braip-type-size-text-p3);
  line-height: var(--braip-type-line-height-text-p3);
}

.braip-common.is-lg {
  height: var(--braip-value-space-56);
  padding-inline: var(--braip-space-base-sm);
  border-radius: var(--braip-space-radius-sm);
  font-size: var(--braip-type-size-text-p4);
  line-height: var(--braip-type-line-height-text-p4);
}

.braip-common.is-md {
  height: var(--braip-value-space-48);
  padding-inline: var(--braip-space-base-sm);
  border-radius: var(--braip-space-radius-sm);
  font-size: var(--braip-type-size-text-p5);
  line-height: var(--braip-type-line-height-text-p5);
}

.braip-common.is-sm {
  height: var(--braip-value-space-40);
  padding-inline: var(--braip-space-base-sm);
  border-radius: var(--braip-space-radius-sm);
  font-size: var(--braip-type-size-text-p6);
  line-height: var(--braip-type-line-height-text-p6);
}

.braip-common.is-xs {
  height: var(--braip-value-space-32);
  padding-inline: var(--braip-space-base-xs);
  border-radius: var(--braip-space-radius-xs);
  font-size: var(--braip-type-size-text-p7);
  line-height: var(--braip-type-line-height-text-p7);
}

/* Type x Mode — State=Default */
.braip-common.is-primary.mode-normal {
  --braip-common-bg: var(--braip-alias-brand-core-primary);
  --braip-common-fg: var(--braip-alias-on-active);
}

.braip-common.is-primary.mode-destructive {
  --braip-common-bg: var(--braip-alias-red-quaternary);
  --braip-common-fg: var(--braip-alias-on-active);
}

.braip-common.is-primary.mode-success {
  --braip-common-bg: var(--braip-alias-green-quaternary);
  --braip-common-fg: var(--braip-alias-on-active);
}

.braip-common.is-secondary.mode-normal {
  --braip-common-bg: var(--braip-alias-purple-primary);
  --braip-common-fg: var(--braip-alias-bg-branding-aside);
}

.braip-common.is-secondary.mode-destructive {
  --braip-common-bg: var(--braip-alias-red-primary);
  --braip-common-fg: var(--braip-alias-red-text);
}

.braip-common.is-secondary.mode-success {
  --braip-common-bg: var(--braip-alias-green-primary);
  --braip-common-fg: var(--braip-alias-green-text);
}

.braip-common.is-outline {
  --braip-common-bd: var(--braip-alias-neutral-secondary);
}

.braip-common.is-outline.mode-normal {
  --braip-common-fg: var(--braip-alias-purple-text);
}

.braip-common.is-outline.mode-destructive {
  --braip-common-fg: var(--braip-alias-red-text);
}

.braip-common.is-outline.mode-success {
  --braip-common-fg: var(--braip-alias-green-text);
}

.braip-common.is-only.mode-normal {
  --braip-common-fg: var(--braip-alias-purple-text);
}

.braip-common.is-only.mode-destructive {
  --braip-common-fg: var(--braip-alias-red-text);
}

.braip-common.is-only.mode-success {
  --braip-common-fg: var(--braip-alias-green-text);
}

/* State=Hover */
.braip-common.is-secondary.mode-normal:hover:not(:disabled) {
  --braip-common-bg: var(--braip-alias-purple-secondary);
}

.braip-common.is-secondary.mode-destructive:hover:not(:disabled) {
  --braip-common-bg: var(--braip-alias-red-secondary);
}

.braip-common.is-secondary.mode-success:hover:not(:disabled) {
  --braip-common-bg: var(--braip-alias-green-secondary);
}

.braip-common.is-outline:hover:not(:disabled),
.braip-common.is-only:hover:not(:disabled) {
  --braip-common-bg: var(--braip-alias-overlay-hover);
}

.braip-common.is-outline.mode-normal:hover:not(:disabled) {
  --braip-common-bd: var(--braip-alias-purple-text);
}

.braip-common.is-outline.mode-destructive:hover:not(:disabled) {
  --braip-common-bd: var(--braip-alias-red-text);
}

.braip-common.is-outline.mode-success:hover:not(:disabled) {
  --braip-common-bd: var(--braip-alias-green-text);
}

/* State=Pressed */
.braip-common.is-secondary.mode-normal:active:not(:disabled) {
  --braip-common-bg: var(--braip-alias-purple-primary);
}

.braip-common.is-secondary.mode-destructive:active:not(:disabled) {
  --braip-common-bg: var(--braip-alias-red-secondary);
}

.braip-common.is-secondary.mode-success:active:not(:disabled) {
  --braip-common-bg: var(--braip-alias-green-primary);
}

.braip-common.is-outline.mode-normal:active:not(:disabled) {
  --braip-common-bg: var(--braip-alias-purple-primary);
  --braip-common-bd: var(--braip-alias-purple-text);
}

.braip-common.is-outline.mode-destructive:active:not(:disabled) {
  --braip-common-bg: var(--braip-alias-red-primary);
  --braip-common-bd: var(--braip-alias-red-text);
}

.braip-common.is-outline.mode-success:active:not(:disabled) {
  --braip-common-bg: var(--braip-alias-green-primary);
  --braip-common-bd: var(--braip-alias-green-text);
}

.braip-common.is-only.mode-normal:active:not(:disabled) {
  --braip-common-bg: var(--braip-alias-purple-secondary);
}

.braip-common.is-only.mode-destructive:active:not(:disabled) {
  --braip-common-bg: var(--braip-alias-red-secondary);
}

.braip-common.is-only.mode-success:active:not(:disabled) {
  --braip-common-bg: var(--braip-alias-green-secondary);
}

/* State=Disabled — mesma superficie neutra em todos os Type/Mode */
.braip-common:disabled {
  --braip-common-bg: var(--braip-alias-neutral-primary);
  --braip-common-fg: var(--braip-alias-neutral-text);
  --braip-common-bd: transparent;
  cursor: not-allowed;
}

.braip-common.is-loading {
  cursor: progress;
}
</style>
