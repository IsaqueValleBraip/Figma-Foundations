<script setup lang="ts">
/* Espelha o component set "❖ Text field - Date picker" (Braip Components, 823:6562).
 * Eixo unico Type=Date picker x State (Default/Filled/Disabled/Pressed/Active/Error).
 * Somente o campo: o calendario (823:2149) e componente separado e entra pelo slot `calendar`.
 * Pressed/Active vira :focus-within, Filled sai do valor, Disabled e Error viram prop. */
import { useId } from 'vue'

const props = withDefaults(defineProps<{
  /** Figma: ↳ Text-Label */
  label: string
  /** Figma: Text-Date */
  modelValue?: string
  placeholder?: string
  /** Figma: Message Text */
  message?: string
  /** Figma: Icon */
  showIcon?: boolean
  /** Figma: Label */
  showLabel?: boolean
  /** Figma: State=Disabled */
  disabled?: boolean
  /** Figma: State=Error */
  error?: boolean
}>(), {
  modelValue: '',
  placeholder: '',
  showIcon: true,
  showLabel: true,
  disabled: false,
  error: false,
})

defineEmits<{ 'update:modelValue': [value: string] }>()

const uid = useId()
const inputId = `braip-date-picker-field-${uid}`
const messageId = `${inputId}-message`
</script>

<template>
  <div
    class="braip-date-picker-field"
    :class="{ 'has-value': Boolean(props.modelValue), 'is-disabled': disabled, 'is-error': error }"
  >
    <label v-if="showLabel" class="braip-date-picker-field__label" :for="inputId">{{ label }}</label>

    <div class="braip-date-picker-field__control">
      <input
        :id="inputId"
        class="braip-date-picker-field__input"
        type="text"
        inputmode="numeric"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :aria-invalid="error || undefined"
        :aria-describedby="message ? messageId : undefined"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      >
      <span v-if="showIcon" class="braip-date-picker-field__icon" aria-hidden="true">
        <slot name="icon" />
      </span>
    </div>

    <p v-if="message" :id="messageId" class="braip-date-picker-field__message">{{ message }}</p>
  </div>
</template>

<style scoped>
.braip-date-picker-field {
  display: flex;
  flex-direction: column;
  gap: var(--braip-space-base-xxs);
  font-family: var(--braip-type-font-family-text);
}

.braip-date-picker-field__label {
  color: var(--braip-alias-text-secondary);
  font-size: var(--braip-type-size-text-p6);
  line-height: var(--braip-type-line-height-text-p6);
  font-weight: var(--braip-type-weight-medium);
}

.braip-date-picker-field__control {
  display: flex;
  align-items: center;
  gap: var(--braip-space-base-xxs);
  block-size: var(--braip-value-space-48);
  padding-inline: var(--braip-space-base-sm);
  border: 1px solid var(--braip-date-picker-field-bd, var(--braip-alias-stroke-primary));
  border-radius: var(--braip-space-radius-sm);
  background: var(--braip-alias-bg-surface-primary);
}

.braip-date-picker-field__input {
  inline-size: 100%;
  border: none;
  outline: none;
  background: transparent;
  color: var(--braip-alias-text-surface-primary);
  font-family: inherit;
  font-size: var(--braip-type-size-text-p5);
  line-height: var(--braip-type-line-height-text-p5);
}

.braip-date-picker-field__input::placeholder {
  color: var(--braip-alias-text-surface-tertiary);
}

.braip-date-picker-field__icon {
  display: inline-flex;
  align-items: center;
  color: var(--braip-alias-text-surface-tertiary);
}

.braip-date-picker-field__message {
  margin: var(--braip-space-base-none);
  color: var(--braip-alias-text-tertiary);
  font-size: var(--braip-type-size-text-p7);
  line-height: var(--braip-type-line-height-text-p7);
}

/* State=Filled */
.braip-date-picker-field.has-value .braip-date-picker-field__control {
  --braip-date-picker-field-bd: var(--braip-alias-stroke-secondary);
}

/* State=Pressed / Active */
.braip-date-picker-field__control:focus-within {
  --braip-date-picker-field-bd: var(--braip-alias-brand-core-primary);
}

/* State=Error */
.braip-date-picker-field.is-error .braip-date-picker-field__control {
  --braip-date-picker-field-bd: var(--braip-alias-red-quaternary);
}

.braip-date-picker-field.is-error .braip-date-picker-field__message {
  color: var(--braip-alias-red-text);
}

/* State=Disabled */
.braip-date-picker-field.is-disabled .braip-date-picker-field__control {
  --braip-date-picker-field-bd: var(--braip-alias-neutral-secondary);
  background: var(--braip-alias-neutral-primary);
}

.braip-date-picker-field.is-disabled .braip-date-picker-field__input {
  color: var(--braip-alias-neutral-text);
  cursor: not-allowed;
}
</style>
