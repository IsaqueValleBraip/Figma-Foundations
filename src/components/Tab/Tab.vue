<script setup lang="ts">
/* Espelha o component set "❖ Tabs Item" (Braip Components, 765:19669).
 * Eixos: Type (Fixed | Container) x Size (Small/Medium/Large) x State (5) = 30 variantes.
 * Modelado por eixo: State=Hover/Pressed vira CSS, State=Active e Disabled viram prop.
 * Renderiza role="tab" para compor com Tabs/TabsFixed (roving tabindex vem do pai). */
withDefaults(defineProps<{
  /** Figma: Type */
  type?: 'container' | 'fixed'
  size?: 'lg' | 'md' | 'sm'
  /** Figma: State=Active */
  active?: boolean
  disabled?: boolean
  /** Figma: property Badge */
  badge?: boolean
  label?: string
  /** id do painel controlado por esta aba */
  controls?: string
}>(), { type: 'container', size: 'sm', active: false, disabled: false, badge: false })

defineEmits<{ select: [] }>()
</script>

<template>
  <button
    class="braip-tab"
    :class="[`is-${type}`, `is-${size}`, { 'is-active': active }]"
    type="button"
    role="tab"
    :aria-selected="active ? 'true' : 'false'"
    :aria-controls="controls"
    :disabled="disabled"
    :tabindex="active ? 0 : -1"
    @click="$emit('select')"
  >
    <span class="braip-tab__label"><slot>{{ label }}</slot></span>
    <span v-if="badge" class="braip-tab__badge"><slot name="badge" /></span>
  </button>
</template>

<style scoped>
.braip-tab {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--braip-space-base-xxs);
  box-sizing: border-box;
  border: 0;
  border-radius: var(--braip-space-radius-md);
  background: var(--braip-tab-bg, transparent);
  color: var(--braip-tab-fg, var(--braip-alias-text-secondary));
  font-family: var(--braip-type-font-family-text);
  font-weight: var(--braip-type-weight-semi-bold);
  cursor: pointer;
}

.braip-tab__label {
  display: inline-flex;
  align-items: center;
}

.braip-tab__badge {
  display: inline-flex;
  align-items: center;
}

/* Size */
.braip-tab.is-sm {
  block-size: var(--braip-value-space-32);
  padding-inline: var(--braip-space-base-xxs);
  font-size: var(--braip-type-size-text-p7);
  line-height: var(--braip-type-line-height-text-p7);
}

.braip-tab.is-md {
  block-size: var(--braip-value-space-40);
  padding-inline: var(--braip-space-base-xs);
  font-size: var(--braip-type-size-text-p6);
  line-height: var(--braip-type-line-height-text-p6);
}

.braip-tab.is-lg {
  block-size: var(--braip-value-space-48);
  padding-inline: var(--braip-space-base-xs);
  font-size: var(--braip-type-size-text-p5);
  line-height: var(--braip-type-line-height-text-p5);
}

/* Type=Fixed — a aba ocupa fracao igual da faixa e marca o selecionado por sublinhado */
.braip-tab.is-fixed {
  flex: 1 1 0;
  border-radius: var(--braip-space-radius-none);
  border-block-end: var(--braip-space-base-offset) solid var(--braip-tab-underline, transparent);
}

/* State=Hover */
.braip-tab:hover:not(:disabled):not(.is-active) {
  --braip-tab-bg: var(--braip-alias-overlay-hover);
  --braip-tab-fg: var(--braip-alias-purple-text);
}

/* State=Pressed */
.braip-tab:active:not(:disabled) {
  --braip-tab-bg: var(--braip-alias-overlay-pressed);
}

/* State=Active */
.braip-tab.is-container.is-active {
  --braip-tab-bg: var(--braip-alias-bg-surface-primary);
  --braip-tab-fg: var(--braip-alias-purple-text);
}

.braip-tab.is-fixed.is-active {
  --braip-tab-fg: var(--braip-alias-purple-text);
  --braip-tab-underline: var(--braip-alias-brand-core-primary);
}

/* State=Disabled */
.braip-tab:disabled {
  --braip-tab-bg: transparent;
  --braip-tab-fg: var(--braip-alias-neutral-text);
  cursor: not-allowed;
}
</style>
