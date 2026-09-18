<script setup lang="ts">
/* Espelha o component set "❖ Text field - Password" (Braip Components, 668:51277).
 * Eixos: Type (On/Off = senha revelada ou mascarada) x State
 * (Default/Filled/Pressed/Active/Error/Disabled).
 * Pressed/Active vira :focus-within, Filled sai do valor, Disabled e Error viram prop.
 * O indicador de forca e o atom "Password Level" (1422:20714): entra pelo slot `level`. */
import { computed, useId } from 'vue'

const props = withDefaults(defineProps<{
  /** Figma: ↳ Text-Label */
  label: string
  modelValue?: string
  placeholder?: string
  /** Figma: Type=On revela o valor digitado */
  revealed?: boolean
  /** Figma: Message Text */
  message?: string
  /** Figma: Password Level — exibe o slot `level` */
  showLevel?: boolean
  /** Figma: State=Disabled */
  disabled?: boolean
  /** Figma: State=Error */
  error?: boolean
  /** Figma: Label */
  showLabel?: boolean
}>(), {
  modelValue: '',
  placeholder: '',
  revealed: false,
  showLevel: false,
  disabled: false,
  error: false,
  showLabel: true,
})

defineEmits<{
  'update:modelValue': [value: string]
  'update:revealed': [value: boolean]
}>()

const uid = useId()
const inputId = `braip-password-field-${uid}`
const messageId = `${inputId}-message`
const inputType = computed(() => (props.revealed ? 'text' : 'password'))
</script>

<template>
  <div
    class="braip-password-field"
    :class="{ 'has-value': Boolean(modelValue), 'is-disabled': disabled, 'is-error': error }"
  >
    <label v-if="showLabel" class="braip-password-field__label" :for="inputId">{{ label }}</label>

    <div class="braip-password-field__control">
      <input
        :id="inputId"
        class="braip-password-field__input"
        :type="inputType"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :aria-invalid="error || undefined"
        :aria-describedby="message ? messageId : undefined"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      >
      <button
        class="braip-password-field__toggle"
        type="button"
        :disabled="disabled"
        :aria-pressed="revealed"
        :aria-label="revealed ? 'Ocultar senha' : 'Mostrar senha'"
        @click="$emit('update:revealed', !revealed)"
      >
        <slot name="toggleIcon" />
      </button>
    </div>

    <div v-if="showLevel" class="braip-password-field__level">
      <slot name="level" />
    </div>

    <p v-if="message" :id="messageId" class="braip-password-field__message">{{ message }}</p>
  </div>
</template>

<style scoped>
.braip-password-field {
  display: flex;
  flex-direction: column;
  gap: var(--braip-space-base-xxs);
  font-family: var(--braip-type-font-family-text);
}

.braip-password-field__label {
  color: var(--braip-alias-text-secondary);
  font-size: var(--braip-type-size-text-p6);
  line-height: var(--braip-type-line-height-text-p6);
  font-weight: var(--braip-type-weight-medium);
}

.braip-password-field__control {
  display: flex;
  align-items: center;
  gap: var(--braip-space-base-xxs);
  block-size: var(--braip-value-space-48);
  padding-inline: var(--braip-space-base-sm);
  border: 1px solid var(--braip-password-field-bd, var(--braip-alias-stroke-primary));
  border-radius: var(--braip-space-radius-sm);
  background: var(--braip-alias-bg-surface-primary);
}

.braip-password-field__input {
  inline-size: 100%;
  border: none;
  outline: none;
  background: transparent;
  color: var(--braip-alias-text-surface-primary);
  font-family: inherit;
  font-size: var(--braip-type-size-text-p5);
  line-height: var(--braip-type-line-height-text-p5);
}

.braip-password-field__input::placeholder {
  color: var(--braip-alias-text-surface-tertiary);
}

.braip-password-field__toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--braip-space-base-none);
  border: none;
  background: transparent;
  color: var(--braip-alias-text-surface-tertiary);
  cursor: pointer;
}

.braip-password-field__toggle:disabled {
  cursor: not-allowed;
}

.braip-password-field__level {
  display: flex;
  align-items: center;
  gap: var(--braip-space-base-xxs);
}

.braip-password-field__message {
  margin: var(--braip-space-base-none);
  color: var(--braip-alias-text-tertiary);
  font-size: var(--braip-type-size-text-p7);
  line-height: var(--braip-type-line-height-text-p7);
}

/* State=Filled */
.braip-password-field.has-value .braip-password-field__control {
  --braip-password-field-bd: var(--braip-alias-stroke-secondary);
}

/* State=Pressed / Active */
.braip-password-field__control:focus-within {
  --braip-password-field-bd: var(--braip-alias-brand-core-primary);
}

/* State=Error */
.braip-password-field.is-error .braip-password-field__control {
  --braip-password-field-bd: var(--braip-alias-red-quaternary);
}

.braip-password-field.is-error .braip-password-field__message {
  color: var(--braip-alias-red-text);
}

/* State=Disabled */
.braip-password-field.is-disabled .braip-password-field__control {
  --braip-password-field-bd: var(--braip-alias-neutral-secondary);
  background: var(--braip-alias-neutral-primary);
}

.braip-password-field.is-disabled .braip-password-field__input {
  color: var(--braip-alias-neutral-text);
  cursor: not-allowed;
}
</style>
