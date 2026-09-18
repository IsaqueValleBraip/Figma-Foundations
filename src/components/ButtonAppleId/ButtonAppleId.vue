<script setup lang="ts">
/* Espelha o component set "Button-ios" (Braip Components, 1094:10676).
 * O set so tem o eixo State (Default | Hover | Pressed) — tudo vira CSS.
 * O icone entra por slot; overline e label sao texto do proprio Figma. */
withDefaults(defineProps<{
  overline?: string
  label?: string
  href?: string
  disabled?: boolean
}>(), { overline: 'Disponível na', label: 'App Store', disabled: false })
</script>

<template>
  <component
    :is="href ? 'a' : 'button'"
    class="braip-button-apple-id"
    :href="href"
    :disabled="href ? undefined : disabled"
  >
    <span class="braip-button-apple-id__icon"><slot /></span>
    <span class="braip-button-apple-id__text">
      <span class="braip-button-apple-id__overline">{{ overline }}</span>
      <span class="braip-button-apple-id__label">{{ label }}</span>
    </span>
  </component>
</template>

<style scoped>
.braip-button-apple-id {
  display: inline-flex;
  align-items: center;
  gap: var(--braip-space-base-xs);
  block-size: var(--braip-value-space-48);
  padding-block: var(--braip-value-space-4);
  padding-inline: var(--braip-space-base-xs);
  border: 1px solid var(--braip-store-bd);
  border-radius: var(--braip-space-radius-sm);
  background: var(--braip-store-bg);
  color: var(--braip-store-fg);
  font-family: var(--braip-type-font-family-text);
  text-decoration: none;
  cursor: pointer;
}

.braip-button-apple-id__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  inline-size: var(--braip-value-space-24);
  block-size: var(--braip-value-space-24);
  color: currentColor;
}

.braip-button-apple-id__text {
  display: inline-flex;
  flex-direction: column;
}

.braip-button-apple-id__overline {
  font-size: var(--braip-type-size-text-p7);
  line-height: var(--braip-type-line-height-text-p7);
  font-weight: var(--braip-type-weight-medium);
}

.braip-button-apple-id__label {
  font-size: var(--braip-type-size-text-p5);
  line-height: var(--braip-type-line-height-text-p5);
  font-weight: var(--braip-type-weight-semi-bold);
}

/* State=Default */
.braip-button-apple-id {
  --braip-store-bg: var(--braip-color-global-surfaces-bg-aside);
  --braip-store-bd: var(--braip-color-aux-grey-stroke-ghost);
  --braip-store-fg: var(--braip-color-global-surfaces-text-secondary);
}

/* State=Hover */
.braip-button-apple-id:hover:not(:disabled) {
  --braip-store-bg: var(--braip-color-brand-core-surface-ghost);
  --braip-store-bd: var(--braip-color-brand-core-stroke-ghost);
  --braip-store-fg: var(--braip-color-brand-core-text-primary);
}

/* State=Pressed */
.braip-button-apple-id:active:not(:disabled) {
  --braip-store-bg: var(--braip-color-brand-core-states-primary);
  --braip-store-bd: var(--braip-color-brand-core-stroke-primary);
  --braip-store-fg: var(--braip-color-brand-core-text-primary);
}

.braip-button-apple-id:disabled {
  --braip-store-bg: var(--braip-alias-neutral-primary);
  --braip-store-bd: transparent;
  --braip-store-fg: var(--braip-alias-neutral-text);
  cursor: not-allowed;
}
</style>
