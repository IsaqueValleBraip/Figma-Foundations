<script setup lang="ts">
/* Espelha o component set "Slider" (Braip Components, 1422:26620).
 * Eixos: Type x State x Percentage (52 variantes).
 * Modelado por eixo, nao por variante: o eixo Percentage do Figma nao vira
 * 26 regras de CSS — ele e o proprio valor numerico do input. Type=Single usa
 * um <input type="range"> nativo; Type=Double usa dois ranges sobrepostos
 * (o navegador nao tem range de duas pontas), mantendo teclado e leitor de
 * tela nativos. State=Disabled vira prop. */
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  /** Figma: Type. */
  type?: 'single' | 'double'
  min?: number
  max?: number
  step?: number
  /** Figma: Percentage (Type=Single). */
  value?: number
  /** Figma: Percentage inicial (Type=Double). */
  from?: number
  /** Figma: Percentage final (Type=Double). */
  to?: number
  /** Figma: componente "Show Percentage". */
  showPercentage?: boolean
  /** Figma: State=Disabled. */
  disabled?: boolean
  label?: string
}>(), {
  type: 'single',
  min: 0,
  max: 100,
  step: 1,
  value: 0,
  from: 0,
  to: 100,
  showPercentage: true,
  disabled: false,
  label: 'Seleção de valor',
})

const emit = defineEmits<{
  'update:value': [value: number]
  'update:from': [value: number]
  'update:to': [value: number]
}>()

const pct = (n: number) => ((n - props.min) / (props.max - props.min)) * 100

const start = computed(() => (props.type === 'double' ? pct(Math.min(props.from, props.to)) : 0))
const end = computed(() => (props.type === 'double' ? pct(Math.max(props.from, props.to)) : pct(props.value)))

const onFrom = (e: Event) => emit('update:from', Number((e.target as HTMLInputElement).value))
const onTo = (e: Event) => emit('update:to', Number((e.target as HTMLInputElement).value))
const onValue = (e: Event) => emit('update:value', Number((e.target as HTMLInputElement).value))
</script>

<template>
  <div
    class="braip-slider"
    :class="[`is-${type}`, { 'is-disabled': disabled }]"
    :style="{ '--braip-slider-start': `${start}%`, '--braip-slider-end': `${end}%` }"
  >
    <div class="braip-slider__track">
      <div class="braip-slider__fill" />

      <input
        v-if="type === 'single'"
        class="braip-slider__input"
        type="range"
        :min="min"
        :max="max"
        :step="step"
        :value="value"
        :disabled="disabled"
        :aria-label="label"
        @input="onValue"
      >

      <template v-else>
        <input
          class="braip-slider__input is-from"
          type="range"
          :min="min"
          :max="max"
          :step="step"
          :value="from"
          :disabled="disabled"
          :aria-label="`${label} — início`"
          @input="onFrom"
        >
        <input
          class="braip-slider__input is-to"
          type="range"
          :min="min"
          :max="max"
          :step="step"
          :value="to"
          :disabled="disabled"
          :aria-label="`${label} — fim`"
          @input="onTo"
        >
      </template>
    </div>

    <div v-if="showPercentage" class="braip-slider__legend">
      <span v-if="type === 'double'" class="braip-slider__value">{{ Math.round(start) }}%</span>
      <span class="braip-slider__value">{{ Math.round(end) }}%</span>
    </div>
  </div>
</template>

<style scoped>
/* Sem valores literais: trilha, preenchimento e polegar vem da camada color;
 * alturas e raio vem de value/space e space/radius. */
.braip-slider {
  display: flex;
  flex-direction: column;
  gap: var(--braip-space-base-xs);
  inline-size: 100%;
}

.braip-slider__track {
  position: relative;
  block-size: var(--braip-value-space-4);
  border-radius: var(--braip-space-radius-lg);
  background: var(--braip-color-aux-grey-states-secundary);
}

.braip-slider.is-disabled .braip-slider__track {
  background: var(--braip-color-aux-grey-states-primary);
}

.braip-slider__fill {
  position: absolute;
  inset-block: 0;
  inset-inline-start: var(--braip-slider-start);
  inline-size: calc(var(--braip-slider-end) - var(--braip-slider-start));
  border-radius: var(--braip-space-radius-lg);
  background: var(--braip-color-brand-core-surface-primary);
}

.braip-slider.is-disabled .braip-slider__fill {
  background: var(--braip-color-aux-grey-states-secundary);
}

/* O range nativo fica transparente sobre a trilha: so o polegar aparece,
 * mas foco, setas, Home/End e leitor de tela continuam nativos. */
.braip-slider__input {
  position: absolute;
  inset-block-start: 50%;
  inset-inline: 0;
  inline-size: 100%;
  block-size: var(--braip-value-space-24);
  margin: var(--braip-space-base-none);
  transform: translateY(-50%);
  background: transparent;
  appearance: none;
  pointer-events: none;
}

/* Em Type=Double, os dois ranges se sobrepoem: so os polegares recebem evento. */
.braip-slider__input::-webkit-slider-thumb {
  inline-size: var(--braip-value-space-24);
  block-size: var(--braip-value-space-24);
  border: none;
  border-radius: var(--braip-space-radius-full);
  background: var(--braip-color-brand-core-icons-primary);
  appearance: none;
  pointer-events: auto;
  cursor: pointer;
}

.braip-slider__input::-moz-range-thumb {
  inline-size: var(--braip-value-space-24);
  block-size: var(--braip-value-space-24);
  border: none;
  border-radius: var(--braip-space-radius-full);
  background: var(--braip-color-brand-core-icons-primary);
  pointer-events: auto;
  cursor: pointer;
}

/* O polegar final de Type=Double e o claro (Ellipse Secundary no Figma) */
.braip-slider.is-double .braip-slider__input.is-to::-webkit-slider-thumb {
  background: var(--braip-color-global-base-white);
}

.braip-slider.is-double .braip-slider__input.is-to::-moz-range-thumb {
  background: var(--braip-color-global-base-white);
}

/* State=Disabled */
.braip-slider.is-disabled .braip-slider__input::-webkit-slider-thumb {
  background: var(--braip-color-global-surfaces-aux-disable);
  cursor: not-allowed;
}

.braip-slider.is-disabled .braip-slider__input::-moz-range-thumb {
  background: var(--braip-color-global-surfaces-aux-disable);
  cursor: not-allowed;
}

.braip-slider__input:focus-visible::-webkit-slider-thumb {
  outline: 2px solid var(--braip-alias-stroke-primary);
  outline-offset: var(--braip-space-base-offset);
}

/* Show Percentage */
.braip-slider__legend {
  display: flex;
  justify-content: space-between;
  font-family: var(--braip-type-font-family-text);
  font-size: var(--braip-type-size-text-p4);
  line-height: var(--braip-type-line-height-text-p4);
  font-weight: var(--braip-type-weight-medium);
  color: var(--braip-color-brand-core-text-primary);
}

.braip-slider.is-single .braip-slider__legend {
  justify-content: flex-start;
}

.braip-slider.is-disabled .braip-slider__legend {
  color: var(--braip-color-aux-grey-stroke-secundary);
}
</style>
