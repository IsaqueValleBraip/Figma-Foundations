<script setup lang="ts">
/* Espelha o component set "❖ Select - Text field" (Braip Components, 866:11448).
 * Eixos: Type (Select-Phone | Select-None | Select-Tags | Select-text icon)
 * x State (Default/Filled/Disabled/Pressed/Active/Error) = 24 variantes.
 * Modelado por eixo: Type define os adornos do campo (prefixo de telefone,
 * chips de tags, icone a esquerda) e State vira CSS (:focus-within/:active)
 * salvo Disabled e Error, que sao prop. Filled sai do valor (.has-value).
 * Apenas o campo — a lista do dropdown vive em SelectField (866:9458). */
import { computed, useId } from 'vue'

const props = withDefaults(defineProps<{
  /** Figma: Type */
  type?: 'phone' | 'none' | 'tags' | 'text-icon'
  /** Figma: Title-Select-* */
  label: string
  /** Figma: Text-Select-* */
  modelValue?: string
  placeholder?: string
  /** Figma: Text-Message */
  message?: string
  /** Figma: Message text#1122:14 */
  showMessage?: boolean
  /** Figma: Icon#1147:0 */
  showIcon?: boolean
  /** Figma: Label do bloco de titulo */
  showLabel?: boolean
  /** Figma: Type=Select-Phone -> prefixo internacional (ex.: "+55") */
  phonePrefix?: string
  /** Figma: Type=Select-Tags -> chips ja escolhidos */
  tags?: { label: string; value: string }[]
  /** Figma: State=Disabled */
  disabled?: boolean
  /** Figma: State=Error */
  error?: boolean
  /** Expoe o combobox quando usado dentro de SelectField. */
  expanded?: boolean
  controls?: string
}>(), {
  type: 'none',
  modelValue: '',
  placeholder: '',
  message: '',
  showMessage: true,
  showIcon: true,
  showLabel: true,
  phonePrefix: '',
  tags: () => [],
  disabled: false,
  error: false,
  expanded: undefined,
  controls: undefined,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'remove-tag': [value: string]
}>()

const uid = useId()
const inputId = `braip-select-text-field-${uid}`
const messageId = `${inputId}-message`

const hasValue = computed(() => Boolean(props.modelValue) || props.tags.length > 0)
const isCombobox = computed(() => props.expanded !== undefined)
</script>

<template>
  <div
    class="braip-select-text-field"
    :class="[`is-${type}`, { 'has-value': hasValue, 'is-disabled': disabled, 'is-error': error }]"
  >
    <label v-if="showLabel" class="braip-select-text-field__label" :for="inputId">{{ label }}</label>

    <!-- Figma: Box-text -->
    <div class="braip-select-text-field__box">
      <span v-if="type === 'phone' && phonePrefix" class="braip-select-text-field__prefix">
        {{ phonePrefix }}
      </span>
      <span v-if="type === 'text-icon' && showIcon" class="braip-select-text-field__icon" aria-hidden="true">
        <slot name="iconLeft" />
      </span>

      <!-- Figma: Type=Select-Tags -->
      <ul v-if="type === 'tags' && tags.length" class="braip-select-text-field__tags">
        <li v-for="tag in tags" :key="tag.value" class="braip-select-text-field__tag">
          {{ tag.label }}
          <button
            class="braip-select-text-field__tag-remove"
            type="button"
            :disabled="disabled"
            :aria-label="`Remover ${tag.label}`"
            @click="emit('remove-tag', tag.value)"
          >
            <slot name="tagRemoveIcon">×</slot>
          </button>
        </li>
      </ul>

      <input
        :id="inputId"
        class="braip-select-text-field__input"
        type="text"
        :inputmode="type === 'phone' ? 'tel' : undefined"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :aria-invalid="error || undefined"
        :aria-describedby="showMessage && message ? messageId : undefined"
        :role="isCombobox ? 'combobox' : undefined"
        :aria-expanded="isCombobox ? expanded : undefined"
        :aria-controls="controls"
        :aria-autocomplete="isCombobox ? 'list' : undefined"
        @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      >

      <span v-if="type !== 'text-icon' && showIcon" class="braip-select-text-field__icon" aria-hidden="true">
        <slot name="icon" />
      </span>
    </div>

    <!-- Figma: Message-text -->
    <p
      v-if="showMessage && message"
      :id="messageId"
      class="braip-select-text-field__message"
    >{{ message }}</p>
  </div>
</template>

<style scoped>
.braip-select-text-field {
  display: flex;
  flex-direction: column;
  gap: var(--braip-space-base-xxs);
  font-family: var(--braip-type-font-family-text);
}

.braip-select-text-field__label {
  color: var(--braip-alias-text-secondary);
  font-size: var(--braip-type-size-text-p6);
  line-height: var(--braip-type-line-height-text-p6);
  font-weight: var(--braip-type-weight-medium);
}

/* Figma: Box-text */
.braip-select-text-field__box {
  display: flex;
  align-items: center;
  gap: var(--braip-space-base-xxs);
  min-block-size: var(--braip-value-space-48);
  padding-inline: var(--braip-space-base-sm);
  border: 1px solid var(--braip-select-text-field-bd, var(--braip-alias-stroke-primary));
  border-radius: var(--braip-space-radius-sm);
  background: var(--braip-alias-bg-surface-primary);
  transition: border-color var(--braip-motion-duration-fast) var(--braip-motion-easing-standard);
}

.braip-select-text-field__input {
  inline-size: 100%;
  min-inline-size: var(--braip-value-space-32);
  border: none;
  outline: none;
  background: transparent;
  color: var(--braip-alias-text-surface-primary);
  font-family: inherit;
  font-size: var(--braip-type-size-text-p5);
  line-height: var(--braip-type-line-height-text-p5);
}

.braip-select-text-field__input::placeholder {
  color: var(--braip-alias-text-surface-tertiary);
}

.braip-select-text-field__prefix {
  display: inline-flex;
  align-items: center;
  padding-inline-end: var(--braip-space-base-xxs);
  border-inline-end: 1px solid var(--braip-alias-stroke-primary);
  color: var(--braip-alias-text-surface-secondary);
  font-size: var(--braip-type-size-text-p5);
  line-height: var(--braip-type-line-height-text-p5);
  white-space: nowrap;
}

.braip-select-text-field__icon {
  display: inline-flex;
  align-items: center;
  color: var(--braip-alias-text-surface-tertiary);
}

/* Figma: Type=Select-Tags */
.braip-select-text-field__tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--braip-space-base-micro);
  margin: var(--braip-space-base-none);
  padding: var(--braip-space-base-none);
  list-style: none;
}

.braip-select-text-field__tag {
  display: inline-flex;
  align-items: center;
  gap: var(--braip-space-base-micro);
  padding: var(--braip-space-base-micro) var(--braip-space-base-xxs);
  border-radius: var(--braip-space-radius-full);
  background: var(--braip-alias-bg-surface-secondary);
  color: var(--braip-alias-text-surface-secondary);
  font-size: var(--braip-type-size-text-p7);
  line-height: var(--braip-type-line-height-text-p7);
}

.braip-select-text-field__tag-remove {
  display: inline-flex;
  align-items: center;
  padding: var(--braip-space-base-none);
  border: none;
  background: transparent;
  color: inherit;
  cursor: pointer;
  font: inherit;
}

/* State=Hover */
.braip-select-text-field:not(.is-disabled):hover .braip-select-text-field__box {
  --braip-select-text-field-bd: var(--braip-alias-stroke-secondary);
}

/* State=Pressed / Active */
.braip-select-text-field__box:active,
.braip-select-text-field__box:focus-within {
  --braip-select-text-field-bd: var(--braip-alias-brand-core-primary);
}

/* State=Filled */
.braip-select-text-field.has-value .braip-select-text-field__box {
  --braip-select-text-field-bd: var(--braip-alias-stroke-secondary);
}

/* State=Error */
.braip-select-text-field.is-error .braip-select-text-field__box {
  --braip-select-text-field-bd: var(--braip-alias-red-quaternary);
}

.braip-select-text-field.is-error .braip-select-text-field__message {
  color: var(--braip-alias-red-text);
}

/* State=Disabled */
.braip-select-text-field.is-disabled .braip-select-text-field__box {
  --braip-select-text-field-bd: var(--braip-alias-neutral-secondary);
  background: var(--braip-alias-neutral-primary);
}

.braip-select-text-field.is-disabled .braip-select-text-field__input {
  color: var(--braip-alias-neutral-text);
  cursor: not-allowed;
}

.braip-select-text-field__message {
  margin: var(--braip-space-base-none);
  color: var(--braip-alias-text-surface-tertiary);
  font-size: var(--braip-type-size-text-p7);
  line-height: var(--braip-type-line-height-text-p7);
}
</style>
