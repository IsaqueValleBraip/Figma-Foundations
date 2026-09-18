<script setup lang="ts">
/* Espelha o component set "❖ Search" (Braip Components, 731:15277).
 * Eixos: Size (Extra Small/Small/Medium/Large) x Status
 * (Default/Pressed/Active/Filled/Disabled) — o eixo chama State.
 * Pressed/Active viram :focus-within, Filled sai do valor, Disabled vira prop.
 * Input nativo type=search com label associado. */
import { useId } from 'vue'

withDefaults(defineProps<{
  size?: 'xs' | 'sm' | 'md' | 'lg'
  /** Figma: Label */
  label: string
  modelValue?: string
  placeholder?: string
  /** Figma: Status=Disabled */
  disabled?: boolean
  /** Rotulo visivel ou apenas acessivel */
  showLabel?: boolean
}>(), {
  size: 'md',
  modelValue: '',
  placeholder: '',
  disabled: false,
  showLabel: false,
})

defineEmits<{
  'update:modelValue': [value: string]
  search: [value: string]
}>()

const uid = useId()
const inputId = `braip-search-field-${uid}`
</script>

<template>
  <div
    class="braip-search-field"
    :class="[`is-${size}`, { 'has-value': Boolean(modelValue), 'is-disabled': disabled }]"
  >
    <label
      class="braip-search-field__label"
      :class="{ 'is-visually-hidden': !showLabel }"
      :for="inputId"
    >{{ label }}</label>

    <div class="braip-search-field__control">
      <span class="braip-search-field__icon" aria-hidden="true"><slot name="icon" /></span>
      <input
        :id="inputId"
        class="braip-search-field__input"
        type="search"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        @keydown.enter="$emit('search', ($event.target as HTMLInputElement).value)"
      >
    </div>
  </div>
</template>

<style scoped>
.braip-search-field {
  display: flex;
  flex-direction: column;
  gap: var(--braip-space-base-xxs);
  font-family: var(--braip-type-font-family-text);
}

.braip-search-field__label {
  color: var(--braip-alias-text-secondary);
  font-size: var(--braip-type-size-text-p6);
  line-height: var(--braip-type-line-height-text-p6);
  font-weight: var(--braip-type-weight-medium);
}

.braip-search-field__label.is-visually-hidden {
  position: absolute;
  inline-size: 1px;
  block-size: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

.braip-search-field__control {
  display: flex;
  align-items: center;
  gap: var(--braip-space-base-xxs);
  padding-inline: var(--braip-space-base-sm);
  border: 1px solid var(--braip-search-field-bd, var(--braip-alias-stroke-primary));
  border-radius: var(--braip-space-radius-sm);
  background: var(--braip-alias-bg-surface-primary);
}

.braip-search-field__icon {
  display: inline-flex;
  align-items: center;
  color: var(--braip-alias-text-surface-tertiary);
}

.braip-search-field__input {
  inline-size: 100%;
  border: none;
  outline: none;
  background: transparent;
  color: var(--braip-alias-text-surface-primary);
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
}

.braip-search-field__input::placeholder {
  color: var(--braip-alias-text-surface-tertiary);
}

/* Size */
.braip-search-field.is-lg .braip-search-field__control {
  block-size: var(--braip-value-space-56);
  font-size: var(--braip-type-size-text-p4);
  line-height: var(--braip-type-line-height-text-p4);
}

.braip-search-field.is-md .braip-search-field__control {
  block-size: var(--braip-value-space-48);
  font-size: var(--braip-type-size-text-p5);
  line-height: var(--braip-type-line-height-text-p5);
}

.braip-search-field.is-sm .braip-search-field__control {
  block-size: var(--braip-value-space-40);
  font-size: var(--braip-type-size-text-p6);
  line-height: var(--braip-type-line-height-text-p6);
}

.braip-search-field.is-xs .braip-search-field__control {
  block-size: var(--braip-value-space-32);
  padding-inline: var(--braip-space-base-xs);
  border-radius: var(--braip-space-radius-xs);
  font-size: var(--braip-type-size-text-p7);
  line-height: var(--braip-type-line-height-text-p7);
}

/* Status=Filled */
.braip-search-field.has-value .braip-search-field__control {
  --braip-search-field-bd: var(--braip-alias-stroke-secondary);
}

/* State=Pressed / Active */
.braip-search-field__control:focus-within {
  --braip-search-field-bd: var(--braip-alias-brand-core-primary);
}

/* Status=Disabled */
.braip-search-field.is-disabled .braip-search-field__control {
  --braip-search-field-bd: var(--braip-alias-neutral-secondary);
  background: var(--braip-alias-neutral-primary);
}

.braip-search-field.is-disabled .braip-search-field__input {
  color: var(--braip-alias-neutral-text);
  cursor: not-allowed;
}
</style>
