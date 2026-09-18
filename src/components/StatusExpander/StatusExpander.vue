<script setup lang="ts">
/* Espelha o component set "Status Expander" (Braip Components, 2278:2277).
 * Eixos: State=Default|Active (prop `expanded`) + property de texto Label.
 * Gatilho e <button> real, com aria-expanded e aria-controls apontando para a
 * regiao que ele revela — a regiao vive fora do componente (slot `default`). */
import { computed, useId } from 'vue'

const props = withDefaults(defineProps<{
  /** Figma: State=Active */
  expanded?: boolean
  /** Figma: property "Label" */
  label: string
  /** Id do elemento controlado quando a regiao nao e o slot interno */
  controls?: string
  disabled?: boolean
}>(), { expanded: false, disabled: false })

defineEmits<{ 'update:expanded': [value: boolean] }>()

const uid = useId()
const ownPanelId = computed(() => `braip-status-expander-panel-${uid}`)
const controlledId = computed(() => props.controls ?? ownPanelId.value)
</script>

<template>
  <div class="braip-status-expander" :class="{ 'is-expanded': expanded }">
    <button
      class="braip-status-expander__trigger"
      type="button"
      :aria-expanded="expanded"
      :aria-controls="controlledId"
      :disabled="disabled"
      @click="$emit('update:expanded', !props.expanded)"
    >
      <span class="braip-status-expander__label">{{ label }}</span>
      <span class="braip-status-expander__icon" aria-hidden="true"><slot name="icon" /></span>
    </button>

    <div
      v-if="!controls"
      :id="ownPanelId"
      class="braip-status-expander__panel"
      role="region"
      :hidden="!expanded"
    >
      <slot />
    </div>
  </div>
</template>

<style scoped>
.braip-status-expander {
  display: inline-flex;
  flex-direction: column;
  font-family: var(--braip-type-font-family-text);
}

.braip-status-expander__trigger {
  display: inline-flex;
  align-items: center;
  gap: var(--braip-space-base-xxs);
  padding: var(--braip-space-base-none);
  border: none;
  background: transparent;
  color: var(--braip-alias-purple-text);
  font: inherit;
  font-size: var(--braip-type-size-text-p6);
  line-height: var(--braip-type-line-height-text-p6);
  font-weight: var(--braip-type-weight-semi-bold);
  cursor: pointer;
}

.braip-status-expander__icon {
  display: inline-flex;
  align-items: center;
  color: currentColor;
  transition: transform var(--braip-motion-duration-fast) var(--braip-motion-easing-standard);
}

/* State=Active */
.braip-status-expander.is-expanded .braip-status-expander__icon {
  transform: rotate(180deg);
}

/* Hover/Pressed em CSS */
.braip-status-expander__trigger:hover:not(:disabled) {
  color: var(--braip-alias-brand-core-primary);
}

.braip-status-expander__trigger:active:not(:disabled) {
  color: var(--braip-alias-purple-text);
}

/* Disabled como prop */
.braip-status-expander__trigger:disabled {
  color: var(--braip-alias-neutral-text);
  cursor: not-allowed;
}

.braip-status-expander__panel {
  padding-block-start: var(--braip-space-base-xs);
}

.braip-status-expander__panel[hidden] {
  display: none;
}
</style>
