<script setup lang="ts">
/* Espelha os dois component sets privados de item de paginacao:
 * ".Item Number" (741:17485 — State x Size, com Text) e ".Item Arrow" (741:17460 — State x Size, com Icon).
 * Um unico componente Vue cobre os dois: a prop `variant` escolhe o eixo de conteudo.
 * State=Hover/Pressed vira CSS; State=Active e State=Disabled viram prop. */
withDefaults(defineProps<{
  /** ".Item Number" | ".Item Arrow" */
  variant?: 'number' | 'arrow'
  size?: 'lg' | 'md' | 'sm'
  /** Figma: State=Active (so existe em .Item Number) */
  active?: boolean
  disabled?: boolean
  /** Rotulo acessivel; em variant=number cai no conteudo visivel */
  label?: string
  href?: string
}>(), { variant: 'number', size: 'sm', active: false, disabled: false })

defineEmits<{ select: [] }>()
</script>

<template>
  <component
    :is="href && !disabled ? 'a' : 'button'"
    class="braip-pagination-item"
    :class="[`is-${variant}`, `is-${size}`, { 'is-active': active }]"
    :href="href && !disabled ? href : undefined"
    :type="href ? undefined : 'button'"
    :disabled="href ? undefined : disabled"
    :aria-disabled="href && disabled ? 'true' : undefined"
    :aria-current="active ? 'page' : undefined"
    :aria-label="label"
    @click="!disabled && $emit('select')"
  >
    <slot>{{ variant === 'number' ? label : '' }}</slot>
  </component>
</template>

<style scoped>
.braip-pagination-item {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border: 1px solid var(--braip-pagination-item-bd, transparent);
  border-radius: var(--braip-space-radius-md);
  background: var(--braip-pagination-item-bg, transparent);
  color: var(--braip-pagination-item-fg, var(--braip-alias-text-secondary));
  font-family: var(--braip-type-font-family-text);
  font-weight: var(--braip-type-weight-semi-bold);
  text-decoration: none;
  cursor: pointer;
}

/* Size — altura/largura quadrada, alinhada a escala de altura dos controles */
.braip-pagination-item.is-sm {
  min-inline-size: var(--braip-value-space-32);
  block-size: var(--braip-value-space-32);
  padding-inline: var(--braip-space-base-xxs);
  font-size: var(--braip-type-size-text-p7);
  line-height: var(--braip-type-line-height-text-p7);
}

.braip-pagination-item.is-md {
  min-inline-size: var(--braip-value-space-40);
  block-size: var(--braip-value-space-40);
  padding-inline: var(--braip-space-base-xxs);
  font-size: var(--braip-type-size-text-p6);
  line-height: var(--braip-type-line-height-text-p6);
}

.braip-pagination-item.is-lg {
  min-inline-size: var(--braip-value-space-48);
  block-size: var(--braip-value-space-48);
  padding-inline: var(--braip-space-base-xs);
  font-size: var(--braip-type-size-text-p5);
  line-height: var(--braip-type-line-height-text-p5);
}

/* State=Hover */
.braip-pagination-item:hover:not(:disabled):not([aria-disabled='true']):not(.is-active) {
  --braip-pagination-item-bg: var(--braip-alias-overlay-hover);
  --braip-pagination-item-fg: var(--braip-alias-purple-text);
}

/* State=Pressed */
.braip-pagination-item:active:not(:disabled):not([aria-disabled='true']) {
  --braip-pagination-item-bg: var(--braip-alias-overlay-pressed);
}

/* State=Active — so aplicavel ao item numerico */
.braip-pagination-item.is-active {
  --braip-pagination-item-bg: var(--braip-alias-brand-core-primary);
  --braip-pagination-item-fg: var(--braip-alias-on-active);
  cursor: default;
}

/* State=Disabled */
.braip-pagination-item:disabled,
.braip-pagination-item[aria-disabled='true'] {
  --braip-pagination-item-bg: transparent;
  --braip-pagination-item-fg: var(--braip-alias-neutral-text);
  cursor: not-allowed;
}

.braip-pagination-item.is-arrow {
  color: var(--braip-pagination-item-fg, var(--braip-alias-text-tertiary));
}
</style>
