<script setup lang="ts">
/* Espelha o component set "❖ Text field - Text" (Braip Components, 668:51081).
 * Eixos: Type (Description/Common/Comment) x State (Default/Filled/Disabled/Pressed/Active/Error).
 * State=Pressed/Active vira :focus-within, Filled vira .has-value derivada do valor,
 * Disabled e Error viram prop. Input nativo com label associado e aria-describedby. */
import { computed, useId } from 'vue'

const props = withDefaults(defineProps<{
  /** Figma: Type */
  type?: 'common' | 'description' | 'comment'
  /** Figma: ↳ Text-Label */
  label: string
  /** Figma: Text */
  modelValue?: string
  placeholder?: string
  /** Figma: Message Text */
  message?: string
  /** Figma: Info */
  info?: string
  /** Figma: State=Disabled */
  disabled?: boolean
  /** Figma: State=Error */
  error?: boolean
  /** Figma: Label (visibilidade do rotulo) */
  showLabel?: boolean
}>(), {
  type: 'common',
  modelValue: '',
  placeholder: '',
  disabled: false,
  error: false,
  showLabel: true,
})

defineEmits<{ 'update:modelValue': [value: string] }>()

const uid = useId()
const inputId = `braip-text-field-${uid}`
const messageId = `${inputId}-message`
const hasMessage = computed(() => Boolean(props.message || props.info))
</script>

<template>
  <div
    class="braip-text-field"
    :class="[`is-${type}`, { 'has-value': Boolean(modelValue), 'is-disabled': disabled, 'is-error': error }]"
  >
    <label v-if="showLabel" class="braip-text-field__label" :for="inputId">{{ label }}</label>

    <div class="braip-text-field__control">
      <textarea
        v-if="type === 'comment'"
        :id="inputId"
        class="braip-text-field__input braip-text-field__input--area"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :aria-invalid="error || undefined"
        :aria-describedby="hasMessage ? messageId : undefined"
        @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
      />
      <input
        v-else
        :id="inputId"
        class="braip-text-field__input"
        type="text"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :aria-invalid="error || undefined"
        :aria-describedby="hasMessage ? messageId : undefined"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      >
      <span v-if="$slots.suffix" class="braip-text-field__suffix"><slot name="suffix" /></span>
    </div>

    <p v-if="hasMessage" :id="messageId" class="braip-text-field__message">
      {{ message || info }}
    </p>
  </div>
</template>

<style scoped>
.braip-text-field {
  display: flex;
  flex-direction: column;
  gap: var(--braip-space-base-xxs);
  font-family: var(--braip-type-font-family-text);
}

.braip-text-field__label {
  color: var(--braip-alias-text-secondary);
  font-size: var(--braip-type-size-text-p6);
  line-height: var(--braip-type-line-height-text-p6);
  font-weight: var(--braip-type-weight-medium);
}

.braip-text-field__control {
  display: flex;
  align-items: center;
  gap: var(--braip-space-base-xxs);
  padding-inline: var(--braip-space-base-sm);
  border: 1px solid var(--braip-text-field-bd, var(--braip-alias-stroke-primary));
  border-radius: var(--braip-space-radius-sm);
  background: var(--braip-alias-bg-surface-primary);
}

.braip-text-field.is-common .braip-text-field__control,
.braip-text-field.is-description .braip-text-field__control {
  block-size: var(--braip-value-space-48);
}

.braip-text-field.is-comment .braip-text-field__control {
  align-items: flex-start;
  padding-block: var(--braip-space-base-xs);
}

.braip-text-field__input {
  inline-size: 100%;
  border: none;
  outline: none;
  background: transparent;
  color: var(--braip-alias-text-surface-primary);
  font-family: inherit;
  font-size: var(--braip-type-size-text-p5);
  line-height: var(--braip-type-line-height-text-p5);
}

.braip-text-field__input--area {
  min-block-size: var(--braip-value-space-96);
  resize: vertical;
}

.braip-text-field__input::placeholder {
  color: var(--braip-alias-text-surface-tertiary);
}

.braip-text-field__suffix {
  display: inline-flex;
  align-items: center;
  color: var(--braip-alias-text-surface-tertiary);
}

.braip-text-field__message {
  margin: var(--braip-space-base-none);
  color: var(--braip-alias-text-tertiary);
  font-size: var(--braip-type-size-text-p7);
  line-height: var(--braip-type-line-height-text-p7);
}

/* State=Filled */
.braip-text-field.has-value .braip-text-field__control {
  --braip-text-field-bd: var(--braip-alias-stroke-secondary);
}

/* State=Pressed / Active */
.braip-text-field__control:focus-within {
  --braip-text-field-bd: var(--braip-alias-brand-core-primary);
}

/* State=Error */
.braip-text-field.is-error .braip-text-field__control {
  --braip-text-field-bd: var(--braip-alias-red-quaternary);
}

.braip-text-field.is-error .braip-text-field__message {
  color: var(--braip-alias-red-text);
}

/* State=Disabled */
.braip-text-field.is-disabled .braip-text-field__control {
  --braip-text-field-bd: var(--braip-alias-neutral-secondary);
  background: var(--braip-alias-neutral-primary);
}

.braip-text-field.is-disabled .braip-text-field__input {
  color: var(--braip-alias-neutral-text);
  cursor: not-allowed;
}
</style>
