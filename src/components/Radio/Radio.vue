<script setup lang="ts">
/* Espelha o component set "Radio" (Braip Components, 668:54769).
 * Eixos: Size x State x Color (210 variantes = 5 x 6 x 7), modelado por eixo.
 * State=Hover/Pressed vira CSS; Selected vira `checked`; Disabled e
 * Selected-Disabled viram a combinacao `checked` + `disabled`.
 * Input real (`type=radio`) para agrupamento e navegacao por teclado nativos. */
withDefaults(defineProps<{
  size?: 'xl' | 'lg' | 'md' | 'sm' | 'xs'
  color?: 'purple' | 'red' | 'orange' | 'blue' | 'pink' | 'grey' | 'green'
  /** Figma: State=Selected */
  checked?: boolean
  disabled?: boolean
  label: string
  name?: string
  value?: string | number
}>(), { size: 'xl', color: 'purple', checked: false, disabled: false })

defineEmits<{ 'update:checked': [value: boolean] }>()
</script>

<template>
  <label
    class="braip-radio"
    :class="[`is-${size}`, `color-${color}`, { 'is-disabled': disabled }]"
  >
    <input
      class="braip-radio__input"
      type="radio"
      :name="name"
      :value="value"
      :checked="checked"
      :disabled="disabled"
      :aria-label="label"
      @change="$emit('update:checked', ($event.target as HTMLInputElement).checked)"
    >
    <span class="braip-radio__box">
      <span class="braip-radio__dot" />
    </span>
  </label>
</template>

<style scoped>
.braip-radio {
  display: inline-flex;
  position: relative;
  cursor: pointer;
}

.braip-radio.is-disabled {
  cursor: not-allowed;
}

.braip-radio__input {
  position: absolute;
  inset: 0;
  margin: var(--braip-space-base-none);
  opacity: 0;
  cursor: inherit;
}

.braip-radio__box {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  inline-size: var(--braip-radio-size);
  block-size: var(--braip-radio-size);
  border: 1px solid var(--braip-radio-bd, var(--braip-alias-neutral-tertiary));
  border-radius: var(--braip-space-radius-full);
}

/* O ponto interno do Figma e sempre metade da caixa */
.braip-radio__dot {
  inline-size: 50%;
  block-size: 50%;
  border-radius: var(--braip-space-radius-full);
  background: transparent;
}

/* Size — 28/20/18px nao tem token proprio: compostos a partir de value-space */
.braip-radio.is-xl {
  --braip-radio-size: calc(var(--braip-value-space-24) + var(--braip-value-space-4));
}

.braip-radio.is-lg {
  --braip-radio-size: var(--braip-value-space-24);
}

.braip-radio.is-md {
  --braip-radio-size: calc(var(--braip-value-space-16) + var(--braip-value-space-4));
}

.braip-radio.is-sm {
  --braip-radio-size: calc(var(--braip-value-space-16) + var(--braip-value-space-2));
}

.braip-radio.is-xs {
  --braip-radio-size: var(--braip-value-space-16);
}

/* Color — slots por familia */
.braip-radio.color-purple {
  --braip-radio-dot: var(--braip-alias-brand-core-static);
  --braip-radio-edge: var(--braip-alias-purple-tertiary);
}

.braip-radio.color-red {
  --braip-radio-dot: var(--braip-alias-red-quaternary);
  --braip-radio-edge: var(--braip-alias-red-tertiary);
}

.braip-radio.color-orange {
  --braip-radio-dot: var(--braip-alias-orange-quaternary);
  --braip-radio-edge: var(--braip-alias-orange-tertiary);
}

.braip-radio.color-blue {
  --braip-radio-dot: var(--braip-alias-blue-quaternary);
  --braip-radio-edge: var(--braip-alias-blue-tertiary);
}

.braip-radio.color-pink {
  --braip-radio-dot: var(--braip-alias-pink-quaternary);
  --braip-radio-edge: var(--braip-alias-pink-tertiary);
}

.braip-radio.color-green {
  --braip-radio-dot: var(--braip-alias-green-quaternary);
  --braip-radio-edge: var(--braip-alias-green-tertiary);
}

.braip-radio.color-grey {
  --braip-radio-dot: var(--braip-alias-neutral-quaternary);
  --braip-radio-edge: var(--braip-alias-neutral-tertiary);
}

/* State=Hover */
.braip-radio:hover .braip-radio__input:not(:disabled) ~ .braip-radio__box {
  --braip-radio-bd: var(--braip-radio-edge);
}

/* State=Selected e Pressed */
.braip-radio__input:checked ~ .braip-radio__box {
  --braip-radio-bd: var(--braip-radio-edge);
}

.braip-radio__input:checked ~ .braip-radio__box .braip-radio__dot {
  background: var(--braip-radio-dot);
}

/* State=Disabled e Selected-Disabled */
.braip-radio__input:disabled ~ .braip-radio__box {
  --braip-radio-bd: var(--braip-alias-neutral-tertiary);
}

.braip-radio__input:disabled:checked ~ .braip-radio__box .braip-radio__dot {
  background: var(--braip-alias-neutral-tertiary);
}
</style>
