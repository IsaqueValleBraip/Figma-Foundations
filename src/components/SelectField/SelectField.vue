<script setup lang="ts">
/* Espelha o component set "❖ Select-Field" (Braip Components, 866:9458).
 * Cada variante = ❖ Select - Text field (gatilho) + ❖ Dropdown-Menu (lista).
 * Eixos: Type (Phone | None | Icon | Checkbox | Radio)
 * x State (Default/Disabled/Filled/Pressed/Error/Active) = 30 variantes.
 * Modelado por eixo: Type define o adorno da opcao (bandeira/telefone, icone,
 * caixa de marcacao, radio) e o modo de selecao; State=Pressed/Active abre a
 * lista (visibilidade de ❖ Dropdown-Menu), Filled sai do valor,
 * Disabled e Error sao prop.
 * Acessibilidade: combobox + listbox com aria-activedescendant, navegacao por
 * setas/Home/End, Enter/Espaco seleciona, Esc fecha. */
import { computed, ref, useId } from 'vue'
import SelectTextField from '../SelectTextField/SelectTextField.vue'

type Option = { label: string; value: string; description?: string; disabled?: boolean }

const props = withDefaults(defineProps<{
  /** Figma: Type */
  type?: 'phone' | 'none' | 'icon' | 'checkbox' | 'radio'
  /** Figma: Title-Select-* */
  label: string
  options?: Option[]
  /** string em selecao unica; string[] quando Type=Checkbox */
  modelValue?: string | string[]
  placeholder?: string
  /** Figma: Text-Message */
  message?: string
  showMessage?: boolean
  showIcon?: boolean
  /** Figma: Type=Phone -> prefixo do gatilho */
  phonePrefix?: string
  /** Figma: State=Disabled */
  disabled?: boolean
  /** Figma: State=Error */
  error?: boolean
}>(), {
  type: 'none',
  options: () => [],
  modelValue: '',
  placeholder: '',
  message: '',
  showMessage: true,
  showIcon: true,
  phonePrefix: '',
  disabled: false,
  error: false,
})

const emit = defineEmits<{ 'update:modelValue': [value: string | string[]] }>()

const uid = useId()
const listId = `braip-select-field-${uid}-list`
const optionId = (index: number) => `${listId}-opt-${index}`

const multiple = computed(() => props.type === 'checkbox')
const selectedValues = computed(() =>
  Array.isArray(props.modelValue) ? props.modelValue : props.modelValue ? [props.modelValue] : [])

const open = ref(false)
const activeIndex = ref(-1)
const root = ref<HTMLElement | null>(null)

const displayText = computed(() =>
  props.options
    .filter(option => selectedValues.value.includes(option.value))
    .map(option => option.label)
    .join(', '))

const triggerType = computed(() => (props.type === 'phone' ? 'phone' : 'none'))

function openList() {
  if (props.disabled) return
  open.value = true
  if (activeIndex.value < 0)
    activeIndex.value = props.options.findIndex(option => selectedValues.value.includes(option.value))
  if (activeIndex.value < 0) activeIndex.value = 0
}

function closeList() {
  open.value = false
}

function isSelected(option: Option) {
  return selectedValues.value.includes(option.value)
}

function toggle(option: Option) {
  if (props.disabled || option.disabled) return
  if (multiple.value) {
    const next = isSelected(option)
      ? selectedValues.value.filter(value => value !== option.value)
      : [...selectedValues.value, option.value]
    emit('update:modelValue', next)
    return
  }
  emit('update:modelValue', option.value)
  closeList()
}

function move(delta: number) {
  const total = props.options.length
  if (!total) return
  let next = activeIndex.value
  for (let step = 0; step < total; step += 1) {
    next = (next + delta + total) % total
    if (!props.options[next].disabled) break
  }
  activeIndex.value = next
}

function onKeydown(event: KeyboardEvent) {
  if (props.disabled) return
  switch (event.key) {
    case 'ArrowDown': open.value ? move(1) : openList(); break
    case 'ArrowUp': open.value ? move(-1) : openList(); break
    case 'Home': openList(); activeIndex.value = 0; break
    case 'End': openList(); activeIndex.value = props.options.length - 1; break
    case 'Enter':
    case ' ':
      if (!open.value) openList()
      else if (props.options[activeIndex.value]) toggle(props.options[activeIndex.value])
      break
    case 'Escape': closeList(); break
    case 'Tab': closeList(); return
    default: return
  }
  event.preventDefault()
}

function onFocusout(event: FocusEvent) {
  if (!root.value?.contains(event.relatedTarget as Node)) closeList()
}
</script>

<template>
  <div
    ref="root"
    class="braip-select-field"
    :class="[
      `is-${type}`,
      { 'is-open': open, 'has-value': selectedValues.length > 0, 'is-disabled': disabled, 'is-error': error },
    ]"
    @keydown="onKeydown"
    @focusout="onFocusout"
  >
    <!-- Figma: ❖ Select - Text field -->
    <SelectTextField
      :type="triggerType"
      :label="label"
      :model-value="displayText"
      :placeholder="placeholder"
      :message="message"
      :show-message="showMessage"
      :show-icon="showIcon"
      :phone-prefix="phonePrefix"
      :disabled="disabled"
      :error="error"
      :expanded="open"
      :controls="listId"
      @click="open ? closeList() : openList()"
    >
      <template #icon><slot name="icon" /></template>
    </SelectTextField>

    <!-- Figma: ❖ Dropdown-Menu (visivel em State=Pressed/Active) -->
    <ul
      v-show="open"
      :id="listId"
      class="braip-select-field__menu"
      role="listbox"
      :aria-label="label"
      :aria-multiselectable="multiple || undefined"
      :aria-activedescendant="activeIndex >= 0 ? optionId(activeIndex) : undefined"
    >
      <li
        v-for="(option, index) in options"
        :id="optionId(index)"
        :key="option.value"
        class="braip-select-field__option"
        :class="{ 'is-active': index === activeIndex, 'is-option-disabled': option.disabled }"
        role="option"
        :aria-selected="isSelected(option)"
        :aria-disabled="option.disabled || undefined"
        @click="toggle(option)"
        @mousemove="activeIndex = index"
      >
        <span
          v-if="type === 'checkbox' || type === 'radio'"
          class="braip-select-field__control"
          :class="`is-${type}`"
          aria-hidden="true"
        />
        <span v-else-if="type === 'icon' || type === 'phone'" class="braip-select-field__adornment" aria-hidden="true">
          <slot name="optionIcon" :option="option" />
        </span>

        <span class="braip-select-field__option-text">
          <span class="braip-select-field__option-label">{{ option.label }}</span>
          <span v-if="option.description" class="braip-select-field__option-description">
            {{ option.description }}
          </span>
        </span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.braip-select-field {
  position: relative;
  display: flex;
  flex-direction: column;
  font-family: var(--braip-type-font-family-text);
}

/* Figma: ❖ Dropdown-Menu */
.braip-select-field__menu {
  position: absolute;
  inset-inline: 0;
  inset-block-start: 100%;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: var(--braip-space-base-micro);
  max-block-size: var(--braip-value-space-240);
  margin: var(--braip-space-base-xxs) var(--braip-space-base-none) var(--braip-space-base-none);
  padding: var(--braip-space-base-xxs);
  overflow-y: auto;
  border: 1px solid var(--braip-alias-stroke-primary);
  border-radius: var(--braip-space-radius-sm);
  background: var(--braip-alias-bg-surface-primary);
  list-style: none;
}

.braip-select-field__option {
  display: flex;
  align-items: center;
  gap: var(--braip-space-base-xxs);
  min-block-size: var(--braip-value-space-40);
  padding: var(--braip-space-base-xxs) var(--braip-space-base-xs);
  border-radius: var(--braip-space-radius-xs);
  background: var(--braip-select-field-option-bg, transparent);
  color: var(--braip-alias-text-surface-primary);
  cursor: pointer;
  transition: background var(--braip-motion-duration-instant) var(--braip-motion-easing-standard);
}

.braip-select-field__option-text {
  display: flex;
  flex-direction: column;
}

.braip-select-field__option-label {
  font-size: var(--braip-type-size-text-p5);
  line-height: var(--braip-type-line-height-text-p5);
}

.braip-select-field__option-description {
  color: var(--braip-alias-text-surface-tertiary);
  font-size: var(--braip-type-size-text-p7);
  line-height: var(--braip-type-line-height-text-p7);
}

/* Figma: Type=Checkbox / Type=Radio — marcador da opcao */
.braip-select-field__control {
  display: inline-block;
  flex: none;
  /* 20px nao tem token proprio: composto a partir de value-space (igual Checkbox) */
  inline-size: calc(var(--braip-value-space-16) + var(--braip-value-space-4));
  block-size: calc(var(--braip-value-space-16) + var(--braip-value-space-4));
  border: 1px solid var(--braip-alias-stroke-secondary);
  background: transparent;
}

.braip-select-field__control.is-checkbox {
  border-radius: var(--braip-space-radius-xs);
}

.braip-select-field__control.is-radio {
  border-radius: var(--braip-space-radius-full);
}

.braip-select-field__adornment {
  display: inline-flex;
  align-items: center;
  color: var(--braip-alias-text-surface-tertiary);
}

/* State=Hover e opcao ativa no teclado */
.braip-select-field__option:hover,
.braip-select-field__option.is-active {
  --braip-select-field-option-bg: var(--braip-alias-bg-surface-secondary);
}

/* State=Pressed */
.braip-select-field__option:active {
  --braip-select-field-option-bg: var(--braip-alias-bg-surface-tertiary);
}

/* State=Selected */
.braip-select-field__option[aria-selected='true'] .braip-select-field__control {
  border-color: var(--braip-alias-brand-core-primary);
  background: var(--braip-alias-brand-core-primary);
}

.braip-select-field__option[aria-selected='true'] .braip-select-field__option-label {
  font-weight: var(--braip-type-weight-semi-bold);
}

/* Opcao desabilitada dentro da lista */
.braip-select-field__option.is-option-disabled {
  color: var(--braip-alias-neutral-text);
  cursor: not-allowed;
}

/* State=Disabled */
.braip-select-field.is-disabled .braip-select-field__menu {
  display: none;
}
</style>
