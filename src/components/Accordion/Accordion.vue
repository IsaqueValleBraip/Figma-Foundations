<script setup lang="ts">
/* Espelha o component set "Conta bancaria" (Braip Components, 1422:15463).
 * O nome PT do set esta mantido no Figma ate a renomeacao em lote; no codigo o
 * componente e generico: Accordion.
 * Eixo unico: State=Default|Active. Modelado como prop `open` (nao ha variante
 * Hover/Pressed no set), com Disabled como prop propria de codigo.
 * Cabecalho e <button> real para foco/teclado, com aria-expanded + aria-controls. */
import { computed, useId } from 'vue'

const props = withDefaults(defineProps<{
  /** Figma: State=Active */
  open?: boolean
  /** Texto do cabecalho (frame "Title" do set) */
  title: string
  disabled?: boolean
}>(), { open: false, disabled: false })

defineEmits<{ 'update:open': [value: boolean] }>()

const uid = useId()
const panelId = computed(() => `braip-accordion-panel-${uid}`)
const headerId = computed(() => `braip-accordion-header-${uid}`)
</script>

<template>
  <div class="braip-accordion" :class="{ 'is-open': open, 'is-disabled': disabled }">
    <button
      :id="headerId"
      class="braip-accordion__header"
      type="button"
      :aria-expanded="open"
      :aria-controls="panelId"
      :disabled="disabled"
      @click="$emit('update:open', !props.open)"
    >
      <span class="braip-accordion__title">{{ title }}</span>
      <span class="braip-accordion__indicator" aria-hidden="true"><slot name="icon" /></span>
    </button>

    <div
      :id="panelId"
      class="braip-accordion__panel"
      role="region"
      :aria-labelledby="headerId"
      :hidden="!open"
    >
      <!-- frame "contas": itens separados pela "line divison" do Figma -->
      <slot />
    </div>
  </div>
</template>

<style scoped>
/* Sem valores literais de design: superficie, texto e borda saem da camada alias;
 * espaco e raio saem de space/value. */
.braip-accordion {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--braip-alias-stroke-secondary);
  border-radius: var(--braip-space-radius-sm);
  background: var(--braip-alias-bg-surface-primary);
  color: var(--braip-alias-text-surface-primary);
  font-family: var(--braip-type-font-family-text);
}

.braip-accordion__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--braip-space-base-xs);
  inline-size: 100%;
  min-block-size: var(--braip-value-space-56);
  padding: var(--braip-space-base-sm);
  border: none;
  border-radius: inherit;
  background: transparent;
  color: inherit;
  font: inherit;
  font-size: var(--braip-type-size-text-p4);
  line-height: var(--braip-type-line-height-text-p4);
  font-weight: var(--braip-type-weight-semi-bold);
  cursor: pointer;
  text-align: start;
}

.braip-accordion__indicator {
  display: inline-flex;
  align-items: center;
  color: var(--braip-alias-text-surface-secondary);
  transition: transform var(--braip-motion-duration-fast) var(--braip-motion-easing-standard);
}

/* State=Active */
.braip-accordion.is-open .braip-accordion__indicator {
  transform: rotate(180deg);
}

.braip-accordion.is-open .braip-accordion__header {
  border-end-start-radius: var(--braip-space-radius-none);
  border-end-end-radius: var(--braip-space-radius-none);
}

/* Hover/Pressed em CSS */
.braip-accordion__header:hover:not(:disabled) {
  background: var(--braip-alias-overlay-hover);
}

.braip-accordion__header:active:not(:disabled) {
  background: var(--braip-alias-overlay-pressed);
}

/* Disabled como prop */
.braip-accordion__header:disabled {
  color: var(--braip-alias-neutral-text);
  cursor: not-allowed;
}

.braip-accordion__panel {
  display: flex;
  flex-direction: column;
  padding-inline: var(--braip-space-base-sm);
  padding-block-end: var(--braip-space-base-sm);
}

.braip-accordion__panel[hidden] {
  display: none;
}

/* "line divison" do Figma entre os itens do painel */
.braip-accordion__panel :slotted(* + *) {
  border-block-start: 1px solid var(--braip-alias-stroke-tertiary);
}
</style>
