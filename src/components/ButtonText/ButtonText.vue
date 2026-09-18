<script setup lang="ts">
/* Espelha o component set "Button-Text" (Braip Components, 668:52224).
 * Eixos: Type x Size x Color. State=Hover/Pressed vira CSS; State=Disabled vira prop.
 * Type=Link => rotulo sublinhado com setas opcionais.
 * Type=Select => rotulo auxiliar (Label) + valor + chevron, sem sublinhado. */
withDefaults(defineProps<{
  type?: 'link' | 'select'
  size?: 'xl' | 'lg' | 'md' | 'sm' | 'xs'
  color?: 'purple' | 'grey'
  disabled?: boolean
  /** Figma: Underline — so vale para Type=Link. */
  underline?: boolean
  /** Figma: Label — rotulo auxiliar do Type=Select. */
  showLabel?: boolean
}>(), {
  type: 'link',
  size: 'xl',
  color: 'purple',
  disabled: false,
  underline: true,
  showLabel: true,
})
</script>

<template>
  <button
    class="braip-button-text"
    :class="[`is-${type}`, `is-${size}`, `color-${color}`, { 'is-underline': underline && type === 'link' }]"
    :disabled="disabled"
  >
    <span v-if="type === 'select' && showLabel && $slots.label" class="braip-button-text__label">
      <slot name="label" />
    </span>
    <span v-if="$slots.iconLeft" class="braip-button-text__icon"><slot name="iconLeft" /></span>
    <span class="braip-button-text__text"><slot /></span>
    <span v-if="$slots.iconRight" class="braip-button-text__icon"><slot name="iconRight" /></span>
  </button>
</template>

<style scoped>
/* Sem valores literais: cor sai da camada alias, medidas saem de space/value/type.
 * Os passos 28/20/18px do Figma nao tem token proprio — sao compostos a partir
 * de --braip-value-space-* (ver relatorio de gaps). */
.braip-button-text {
  display: inline-flex;
  align-items: center;
  gap: var(--braip-space-base-xxs);
  padding: var(--braip-space-base-none);
  border: none;
  background: transparent;
  color: var(--braip-button-text-fg);
  font-family: var(--braip-type-font-family-text);
  font-weight: var(--braip-type-weight-semi-bold);
  cursor: pointer;
}

.braip-button-text__text {
  display: inline-flex;
  align-items: center;
  border-bottom: 0 solid var(--braip-button-text-line, currentColor);
}

.braip-button-text.is-underline .braip-button-text__text {
  border-bottom-width: 1px;
}

.braip-button-text.is-underline:hover:not(:disabled) .braip-button-text__text,
.braip-button-text.is-underline:active:not(:disabled) .braip-button-text__text {
  border-bottom-width: var(--braip-space-base-offset);
}

.braip-button-text__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  inline-size: var(--braip-button-text-icon);
  block-size: var(--braip-button-text-icon);
  color: currentColor;
}

.braip-button-text__label {
  color: var(--braip-alias-neutral-quaternary);
  font-weight: var(--braip-type-weight-regular);
}

/* Size — tipografia do Figma (p3..p7) e caixa do icone */
.braip-button-text.is-xl {
  font-size: var(--braip-type-size-text-p3);
  line-height: var(--braip-type-line-height-text-p3);
  --braip-button-text-icon: calc(var(--braip-value-space-24) + var(--braip-value-space-4));
}

.braip-button-text.is-lg {
  font-size: var(--braip-type-size-text-p4);
  line-height: var(--braip-type-line-height-text-p4);
  --braip-button-text-icon: var(--braip-value-space-24);
}

.braip-button-text.is-md {
  font-size: var(--braip-type-size-text-p5);
  line-height: var(--braip-type-line-height-text-p5);
  --braip-button-text-icon: calc(var(--braip-value-space-16) + var(--braip-value-space-4));
}

.braip-button-text.is-sm {
  font-size: var(--braip-type-size-text-p6);
  line-height: var(--braip-type-line-height-text-p6);
  --braip-button-text-icon: calc(var(--braip-value-space-16) + var(--braip-value-space-2));
}

.braip-button-text.is-xs {
  font-size: var(--braip-type-size-text-p7);
  line-height: var(--braip-type-line-height-text-p7);
  --braip-button-text-icon: var(--braip-value-space-16);
}

/* Color x State */
.braip-button-text.color-purple {
  --braip-button-text-fg: var(--braip-alias-surface-brand-core-default);
  --braip-button-text-line: var(--braip-alias-brand-core-primary);
}

.braip-button-text.color-purple:hover:not(:disabled) {
  --braip-button-text-fg: var(--braip-alias-surface-brand-core-hover);
  --braip-button-text-line: var(--braip-alias-surface-brand-core-hover);
}

.braip-button-text.color-purple:active:not(:disabled) {
  --braip-button-text-fg: var(--braip-alias-surface-brand-core-active);
  --braip-button-text-line: var(--braip-alias-surface-brand-core-active);
}

.braip-button-text.color-grey {
  --braip-button-text-fg: var(--braip-alias-neutral-text);
  --braip-button-text-line: var(--braip-alias-neutral-tertiary);
}

.braip-button-text.color-grey:hover:not(:disabled) {
  --braip-button-text-fg: var(--braip-alias-text-surface-secondary);
  --braip-button-text-line: var(--braip-alias-text-surface-secondary);
}

.braip-button-text.color-grey:active:not(:disabled) {
  --braip-button-text-fg: var(--braip-alias-text-surface-primary);
  --braip-button-text-line: var(--braip-alias-text-surface-primary);
}

/* Type=Select — chevron neutro e sem sublinhado */
.braip-button-text.is-select .braip-button-text__icon {
  color: var(--braip-alias-neutral-tertiary);
}

/* State=Disabled */
.braip-button-text:disabled {
  --braip-button-text-fg: var(--braip-alias-neutral-text);
  --braip-button-text-line: var(--braip-color-aux-grey-icons-tertiary);
  cursor: not-allowed;
}

.braip-button-text:disabled .braip-button-text__icon {
  color: var(--braip-color-aux-grey-icons-tertiary);
}
</style>
