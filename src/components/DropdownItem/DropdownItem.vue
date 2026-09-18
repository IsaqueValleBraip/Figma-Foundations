<script setup lang="ts">
/* Espelha o component set "❖ Dropdown-Items" (Braip Components, 731:15617).
 * Eixos: Type (None/Icon/Checkbox/Radio/Avatar/Phone) x State
 * (Default/Hover/Active/Disabled). Hover vira CSS, Active vira prop `selected`
 * e Disabled vira prop. Cada item e uma option do listbox pai (DropdownMenu). */
withDefaults(defineProps<{
  /** Figma: Type — "Phone" apos a padronizacao EN */
  type?: 'none' | 'icon' | 'checkbox' | 'radio' | 'avatar' | 'phone'
  /** Figma: ↳ Text */
  label: string
  /** Figma: Text-Assistant */
  assistant?: string
  /** Figma: State=Active */
  selected?: boolean
  /** Figma: State=Disabled */
  disabled?: boolean
  /** Figma: Close */
  closable?: boolean
  value?: string | number
}>(), {
  type: 'none',
  selected: false,
  disabled: false,
  closable: false,
})

defineEmits<{ select: []; close: [] }>()
</script>

<template>
  <li
    class="braip-dropdown-item"
    :class="[`is-${type}`, { 'is-selected': selected, 'is-disabled': disabled }]"
    role="option"
    :aria-selected="selected"
    :aria-disabled="disabled || undefined"
    :tabindex="disabled ? undefined : -1"
    @click="!disabled && $emit('select')"
  >
    <span v-if="type !== 'none'" class="braip-dropdown-item__lead">
      <slot name="lead" />
    </span>

    <span class="braip-dropdown-item__body">
      <span class="braip-dropdown-item__label">{{ label }}</span>
      <span v-if="assistant" class="braip-dropdown-item__assistant">{{ assistant }}</span>
    </span>

    <button
      v-if="closable"
      class="braip-dropdown-item__close"
      type="button"
      :disabled="disabled"
      aria-label="Remover"
      @click.stop="$emit('close')"
    >
      <slot name="closeIcon" />
    </button>
  </li>
</template>

<style scoped>
.braip-dropdown-item {
  display: flex;
  align-items: center;
  gap: var(--braip-space-base-xs);
  padding-block: var(--braip-space-base-xs);
  padding-inline: var(--braip-space-base-sm);
  border-radius: var(--braip-space-radius-xs);
  background: var(--braip-dropdown-item-bg, transparent);
  color: var(--braip-alias-text-surface-primary);
  font-family: var(--braip-type-font-family-text);
  font-size: var(--braip-type-size-text-p5);
  line-height: var(--braip-type-line-height-text-p5);
  cursor: pointer;
}

.braip-dropdown-item__lead,
.braip-dropdown-item__close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--braip-alias-text-surface-tertiary);
}

.braip-dropdown-item__close {
  margin-inline-start: auto;
  padding: var(--braip-space-base-none);
  border: none;
  background: transparent;
  cursor: pointer;
}

.braip-dropdown-item__body {
  display: flex;
  flex-direction: column;
}

.braip-dropdown-item__assistant {
  color: var(--braip-alias-text-surface-tertiary);
  font-size: var(--braip-type-size-text-p7);
  line-height: var(--braip-type-line-height-text-p7);
}

/* State=Hover (inclui o foco por teclado vindo do DropdownMenu) */
.braip-dropdown-item:hover:not(.is-disabled),
.braip-dropdown-item:focus-visible:not(.is-disabled) {
  --braip-dropdown-item-bg: var(--braip-alias-overlay-hover);
  outline: none;
}

/* State=Active */
.braip-dropdown-item.is-selected {
  --braip-dropdown-item-bg: var(--braip-alias-purple-primary);
  color: var(--braip-alias-purple-text);
}

/* State=Disabled */
.braip-dropdown-item.is-disabled {
  color: var(--braip-alias-neutral-text);
  cursor: not-allowed;
}
</style>
