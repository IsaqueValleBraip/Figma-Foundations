<script setup lang="ts">
/* Espelha o component set "Checkbox" (Braip Components, 668:55384).
 * Eixos: Size x State x Color (210 variantes no Figma = 5 x 6 x 7).
 * Modelado por eixo, nao por variante: Size define a caixa, Color define os slots
 * de cor, State=Hover/Pressed vira CSS e Selected/Indeterminate/Disabled viram prop.
 * Input real para manter foco, teclado e leitor de tela. */
import { ref, watchEffect } from 'vue'

const props = withDefaults(defineProps<{
  size?: 'xl' | 'lg' | 'md' | 'sm' | 'xs'
  color?: 'purple' | 'red' | 'orange' | 'blue' | 'pink' | 'grey' | 'green'
  /** Figma: State=Selected */
  checked?: boolean
  /** Figma: State=Indeterminate */
  indeterminate?: boolean
  disabled?: boolean
  label: string
}>(), { size: 'xl', color: 'purple', checked: false, indeterminate: false, disabled: false })

defineEmits<{ 'update:checked': [value: boolean] }>()

const input = ref<HTMLInputElement | null>(null)
watchEffect(() => {
  if (input.value) input.value.indeterminate = props.indeterminate
})
</script>

<template>
  <label
    class="braip-checkbox"
    :class="[`is-${size}`, `color-${color}`, { 'is-disabled': disabled }]"
  >
    <input
      ref="input"
      class="braip-checkbox__input"
      type="checkbox"
      :checked="checked"
      :disabled="disabled"
      :aria-label="label"
      @change="$emit('update:checked', ($event.target as HTMLInputElement).checked)"
    >
    <span class="braip-checkbox__box">
      <span class="braip-checkbox__mark"><slot name="icon" /></span>
    </span>
  </label>
</template>

<style scoped>
.braip-checkbox {
  display: inline-flex;
  position: relative;
  cursor: pointer;
}

.braip-checkbox.is-disabled {
  cursor: not-allowed;
}

.braip-checkbox__input {
  position: absolute;
  inset: 0;
  margin: var(--braip-space-base-none);
  opacity: 0;
  cursor: inherit;
}

.braip-checkbox__box {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  inline-size: var(--braip-checkbox-size);
  block-size: var(--braip-checkbox-size);
  border: 1px solid var(--braip-checkbox-bd, var(--braip-alias-neutral-tertiary));
  border-radius: var(--braip-space-radius-xs);
  background: var(--braip-checkbox-bg, transparent);
  color: var(--braip-alias-on-active);
}

.braip-checkbox__mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  inline-size: 100%;
  block-size: 100%;
  color: currentColor;
}

/* Size — 28/20/18px nao tem token proprio: compostos a partir de value-space */
.braip-checkbox.is-xl {
  --braip-checkbox-size: calc(var(--braip-value-space-24) + var(--braip-value-space-4));
}

.braip-checkbox.is-lg {
  --braip-checkbox-size: var(--braip-value-space-24);
}

.braip-checkbox.is-md {
  --braip-checkbox-size: calc(var(--braip-value-space-16) + var(--braip-value-space-4));
}

.braip-checkbox.is-sm {
  --braip-checkbox-size: calc(var(--braip-value-space-16) + var(--braip-value-space-2));
}

.braip-checkbox.is-xs {
  --braip-checkbox-size: var(--braip-value-space-16);
}

/* Color — slots por familia */
.braip-checkbox.color-purple {
  --braip-checkbox-fill: var(--braip-color-brand-core-icons-primary);
  --braip-checkbox-pressed: var(--braip-color-brand-core-icons-secundary);
  --braip-checkbox-edge: var(--braip-alias-purple-tertiary);
}

.braip-checkbox.color-red {
  --braip-checkbox-fill: var(--braip-alias-red-quaternary);
  --braip-checkbox-pressed: var(--braip-alias-red-quaternary);
  --braip-checkbox-edge: var(--braip-alias-red-tertiary);
}

.braip-checkbox.color-orange {
  --braip-checkbox-fill: var(--braip-alias-orange-quaternary);
  --braip-checkbox-pressed: var(--braip-alias-orange-quaternary);
  --braip-checkbox-edge: var(--braip-alias-orange-tertiary);
}

.braip-checkbox.color-blue {
  --braip-checkbox-fill: var(--braip-alias-blue-quaternary);
  --braip-checkbox-pressed: var(--braip-alias-blue-quaternary);
  --braip-checkbox-edge: var(--braip-alias-blue-tertiary);
}

.braip-checkbox.color-pink {
  --braip-checkbox-fill: var(--braip-alias-pink-quaternary);
  --braip-checkbox-pressed: var(--braip-alias-pink-quaternary);
  --braip-checkbox-edge: var(--braip-alias-pink-tertiary);
}

.braip-checkbox.color-green {
  --braip-checkbox-fill: var(--braip-alias-green-quaternary);
  --braip-checkbox-pressed: var(--braip-alias-green-quaternary);
  --braip-checkbox-edge: var(--braip-alias-green-tertiary);
}

.braip-checkbox.color-grey {
  --braip-checkbox-fill: var(--braip-alias-neutral-tertiary);
  --braip-checkbox-pressed: var(--braip-alias-neutral-tertiary);
  --braip-checkbox-edge: var(--braip-alias-neutral-tertiary);
}

/* State=Hover — apenas a borda muda enquanto nao esta marcado */
.braip-checkbox:hover .braip-checkbox__input:not(:disabled) ~ .braip-checkbox__box {
  --braip-checkbox-bd: var(--braip-checkbox-edge);
}

/* State=Selected / Indeterminate */
.braip-checkbox__input:checked ~ .braip-checkbox__box,
.braip-checkbox__input:indeterminate ~ .braip-checkbox__box {
  --braip-checkbox-bg: var(--braip-checkbox-fill);
  --braip-checkbox-bd: var(--braip-checkbox-fill);
}

/* State=Pressed */
.braip-checkbox:active .braip-checkbox__input:checked:not(:disabled) ~ .braip-checkbox__box {
  --braip-checkbox-bg: var(--braip-checkbox-pressed);
  --braip-checkbox-bd: var(--braip-checkbox-pressed);
}

/* State=Disabled */
.braip-checkbox__input:disabled ~ .braip-checkbox__box {
  --braip-checkbox-bg: transparent;
  --braip-checkbox-bd: var(--braip-alias-neutral-tertiary);
  color: var(--braip-alias-neutral-tertiary);
}
</style>
