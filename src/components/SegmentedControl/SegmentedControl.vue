<script setup lang="ts">
/* Espelha o component set "Segmented Control — Vertical" (Braip Components, 2278:2678).
 * O set tem apenas o eixo Selected (First | Second): em codigo isso vira o indice
 * selecionado sobre uma lista de opcoes, sem limite de duas. Cada opcao e um
 * <button> real dentro de um group com aria-checked (radiogroup). */
withDefaults(defineProps<{
  options: { label: string; value?: string | number }[]
  /** Figma: Selected — indice da opcao ativa. */
  modelValue?: number
  label?: string
}>(), { modelValue: 0 })

defineEmits<{ 'update:modelValue': [value: number] }>()
</script>

<template>
  <div class="braip-segmented" role="radiogroup" :aria-label="label">
    <button
      v-for="(option, index) in options"
      :key="option.value ?? index"
      class="braip-segmented__option"
      :class="{ 'is-selected': index === modelValue }"
      type="button"
      role="radio"
      :aria-checked="index === modelValue"
      @click="$emit('update:modelValue', index)"
    >
      {{ option.label }}
    </button>
  </div>
</template>

<style scoped>
.braip-segmented {
  display: inline-flex;
  flex-direction: column;
  gap: var(--braip-space-base-offset);
  padding: var(--braip-space-base-offset);
  border-radius: var(--braip-space-radius-sm);
  background: var(--braip-alias-neutral-primary);
}

.braip-segmented__option {
  /* O padding vertical do Figma (5px) nao tem token: usa o passo mais proximo. */
  padding-block: var(--braip-value-space-4);
  padding-inline: var(--braip-value-space-12);
  border: none;
  border-radius: var(--braip-space-radius-sm);
  background: transparent;
  color: var(--braip-alias-neutral-text);
  font-family: var(--braip-type-font-family-text);
  font-size: var(--braip-type-size-text-p6);
  line-height: var(--braip-type-line-height-text-p6);
  font-weight: var(--braip-type-weight-semi-bold);
  text-align: center;
  cursor: pointer;
}

.braip-segmented__option:hover:not(.is-selected) {
  background: var(--braip-alias-neutral-secondary);
}

.braip-segmented__option.is-selected {
  background: var(--braip-alias-brand-core-primary);
  color: var(--braip-alias-on-active);
}
</style>
