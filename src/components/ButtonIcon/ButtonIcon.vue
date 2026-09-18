<script setup lang="ts">
/* Espelha o component set "Icon" (Button Icon) — mesma matriz Type/State/Size/Mode
 * do Common, sem rotulo: a area e quadrada e o unico conteudo e o icone. */
withDefaults(defineProps<{
  type?: 'primary' | 'secondary' | 'outline' | 'only'
  size?: 'xl' | 'lg' | 'md' | 'sm' | 'xs'
  mode?: 'normal' | 'destructive' | 'success'
  disabled?: boolean
  loading?: boolean
  label: string
}>(), { type: 'primary', size: 'xl', mode: 'normal', disabled: false, loading: false })
</script>

<template>
  <button
    class="braip-button-icon"
    :class="[`is-${type}`, `is-${size}`, `mode-${mode}`, { 'is-loading': loading }]"
    :disabled="disabled || loading"
    :aria-label="label"
  >
    <slot />
  </button>
</template>

<style scoped>
.braip-button-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--braip-button-icon-bd, transparent);
  background: var(--braip-button-icon-bg, transparent);
  color: var(--braip-button-icon-fg);
  cursor: pointer;
}

/* Size — quadrado: largura acompanha a altura do Common no mesmo size */
.braip-button-icon.is-xl {
  inline-size: var(--braip-value-space-72);
  block-size: var(--braip-value-space-72);
  border-radius: var(--braip-space-radius-md);
}

.braip-button-icon.is-lg {
  inline-size: var(--braip-value-space-56);
  block-size: var(--braip-value-space-56);
  border-radius: var(--braip-space-radius-sm);
}

.braip-button-icon.is-md {
  inline-size: var(--braip-value-space-48);
  block-size: var(--braip-value-space-48);
  border-radius: var(--braip-space-radius-sm);
}

.braip-button-icon.is-sm {
  inline-size: var(--braip-value-space-40);
  block-size: var(--braip-value-space-40);
  border-radius: var(--braip-space-radius-sm);
}

.braip-button-icon.is-xs {
  inline-size: var(--braip-value-space-32);
  block-size: var(--braip-value-space-32);
  border-radius: var(--braip-space-radius-xs);
}

/* Type x Mode — State=Default */
.braip-button-icon.is-primary.mode-normal {
  --braip-button-icon-bg: var(--braip-alias-brand-core-primary);
  --braip-button-icon-fg: var(--braip-alias-on-active);
}

.braip-button-icon.is-primary.mode-destructive {
  --braip-button-icon-bg: var(--braip-alias-red-quaternary);
  --braip-button-icon-fg: var(--braip-alias-on-active);
}

.braip-button-icon.is-primary.mode-success {
  --braip-button-icon-bg: var(--braip-alias-green-quaternary);
  --braip-button-icon-fg: var(--braip-alias-on-active);
}

.braip-button-icon.is-secondary.mode-normal {
  --braip-button-icon-bg: var(--braip-alias-purple-primary);
  --braip-button-icon-fg: var(--braip-alias-bg-branding-aside);
}

.braip-button-icon.is-secondary.mode-destructive {
  --braip-button-icon-bg: var(--braip-alias-red-primary);
  --braip-button-icon-fg: var(--braip-alias-red-text);
}

.braip-button-icon.is-secondary.mode-success {
  --braip-button-icon-bg: var(--braip-alias-green-primary);
  --braip-button-icon-fg: var(--braip-alias-green-text);
}

.braip-button-icon.is-outline {
  --braip-button-icon-bd: var(--braip-alias-neutral-secondary);
}

.braip-button-icon.is-outline.mode-normal {
  --braip-button-icon-fg: var(--braip-alias-purple-text);
}

.braip-button-icon.is-outline.mode-destructive {
  --braip-button-icon-fg: var(--braip-alias-red-text);
}

.braip-button-icon.is-outline.mode-success {
  --braip-button-icon-fg: var(--braip-alias-green-text);
}

.braip-button-icon.is-only.mode-normal {
  --braip-button-icon-fg: var(--braip-alias-purple-text);
}

.braip-button-icon.is-only.mode-destructive {
  --braip-button-icon-fg: var(--braip-alias-red-text);
}

.braip-button-icon.is-only.mode-success {
  --braip-button-icon-fg: var(--braip-alias-green-text);
}

/* State=Hover */
.braip-button-icon.is-secondary.mode-normal:hover:not(:disabled) {
  --braip-button-icon-bg: var(--braip-alias-purple-secondary);
}

.braip-button-icon.is-secondary.mode-destructive:hover:not(:disabled) {
  --braip-button-icon-bg: var(--braip-alias-red-secondary);
}

.braip-button-icon.is-secondary.mode-success:hover:not(:disabled) {
  --braip-button-icon-bg: var(--braip-alias-green-secondary);
}

.braip-button-icon.is-outline:hover:not(:disabled),
.braip-button-icon.is-only:hover:not(:disabled) {
  --braip-button-icon-bg: var(--braip-alias-overlay-hover);
}

.braip-button-icon.is-outline.mode-normal:hover:not(:disabled) {
  --braip-button-icon-bd: var(--braip-alias-purple-text);
}

.braip-button-icon.is-outline.mode-destructive:hover:not(:disabled) {
  --braip-button-icon-bd: var(--braip-alias-red-text);
}

.braip-button-icon.is-outline.mode-success:hover:not(:disabled) {
  --braip-button-icon-bd: var(--braip-alias-green-text);
}

/* State=Pressed */
.braip-button-icon.is-secondary.mode-normal:active:not(:disabled) {
  --braip-button-icon-bg: var(--braip-alias-purple-primary);
}

.braip-button-icon.is-secondary.mode-destructive:active:not(:disabled) {
  --braip-button-icon-bg: var(--braip-alias-red-secondary);
}

.braip-button-icon.is-secondary.mode-success:active:not(:disabled) {
  --braip-button-icon-bg: var(--braip-alias-green-primary);
}

.braip-button-icon.is-outline.mode-normal:active:not(:disabled) {
  --braip-button-icon-bg: var(--braip-alias-purple-primary);
  --braip-button-icon-bd: var(--braip-alias-purple-text);
}

.braip-button-icon.is-outline.mode-destructive:active:not(:disabled) {
  --braip-button-icon-bg: var(--braip-alias-red-primary);
  --braip-button-icon-bd: var(--braip-alias-red-text);
}

.braip-button-icon.is-outline.mode-success:active:not(:disabled) {
  --braip-button-icon-bg: var(--braip-alias-green-primary);
  --braip-button-icon-bd: var(--braip-alias-green-text);
}

.braip-button-icon.is-only.mode-normal:active:not(:disabled) {
  --braip-button-icon-bg: var(--braip-alias-purple-secondary);
}

.braip-button-icon.is-only.mode-destructive:active:not(:disabled) {
  --braip-button-icon-bg: var(--braip-alias-red-secondary);
}

.braip-button-icon.is-only.mode-success:active:not(:disabled) {
  --braip-button-icon-bg: var(--braip-alias-green-secondary);
}

/* State=Disabled */
.braip-button-icon:disabled {
  --braip-button-icon-bg: var(--braip-alias-neutral-primary);
  --braip-button-icon-fg: var(--braip-alias-neutral-text);
  --braip-button-icon-bd: transparent;
  cursor: not-allowed;
}

.braip-button-icon.is-loading {
  cursor: progress;
}
</style>
