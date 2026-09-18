<script setup lang="ts">
/* Espelha o component set ".Breadcrumb-Item" (Braip Components, 741:18742).
 * Eixos: State=Default|Hover|Pressed|Active|Disabled x Size=Small|Large.
 * Hover/Pressed viram CSS; Active vira prop `active` (e aria-current="page");
 * Disabled vira prop. O item renderiza <a> quando ha href e <span> quando e o
 * item corrente ou esta desabilitado — link corrente nao deve ser navegavel. */
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  /** Figma: Size */
  size?: 'small' | 'large'
  /** Figma: State=Active — item corrente da trilha */
  active?: boolean
  /** Figma: State=Disabled */
  disabled?: boolean
  /** Figma: property "Label" */
  label: string
  href?: string
}>(), { size: 'small', active: false, disabled: false })

const tag = computed(() => (props.href && !props.active && !props.disabled ? 'a' : 'span'))
</script>

<template>
  <component
    :is="tag"
    class="braip-breadcrumb-item"
    :class="[`is-${size}`, { 'is-active': active, 'is-disabled': disabled }]"
    :href="tag === 'a' ? href : undefined"
    :aria-current="active ? 'page' : undefined"
    :aria-disabled="disabled ? 'true' : undefined"
  >
    {{ label }}
  </component>
</template>

<style scoped>
.braip-breadcrumb-item {
  display: inline-flex;
  align-items: center;
  border-block-end: 1px solid var(--braip-breadcrumb-item-line, transparent);
  color: var(--braip-breadcrumb-item-fg, var(--braip-alias-text-secondary));
  font-family: var(--braip-type-font-family-text);
  font-weight: var(--braip-type-weight-medium);
  text-decoration: none;
  cursor: pointer;
}

/* Size */
.braip-breadcrumb-item.is-small {
  font-size: var(--braip-type-size-text-p6);
  line-height: var(--braip-type-line-height-text-p6);
}

.braip-breadcrumb-item.is-large {
  font-size: var(--braip-type-size-text-p5);
  line-height: var(--braip-type-line-height-text-p5);
}

/* State=Hover */
.braip-breadcrumb-item:hover:not(.is-disabled):not(.is-active) {
  --braip-breadcrumb-item-fg: var(--braip-alias-purple-text);
  --braip-breadcrumb-item-line: var(--braip-alias-purple-text);
}

/* State=Pressed */
.braip-breadcrumb-item:active:not(.is-disabled):not(.is-active) {
  --braip-breadcrumb-item-fg: var(--braip-alias-brand-core-primary);
  --braip-breadcrumb-item-line: var(--braip-alias-brand-core-primary);
}

/* State=Active — item corrente, sem affordance de clique */
.braip-breadcrumb-item.is-active {
  --braip-breadcrumb-item-fg: var(--braip-alias-text-primary);
  font-weight: var(--braip-type-weight-semi-bold);
  cursor: default;
}

/* State=Disabled */
.braip-breadcrumb-item.is-disabled {
  --braip-breadcrumb-item-fg: var(--braip-alias-neutral-text);
  --braip-breadcrumb-item-line: transparent;
  cursor: not-allowed;
}
</style>
