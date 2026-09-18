<script setup lang="ts">
/* Espelha o component set "Tooltip" (Braip Components, 1422:27349).
 * Eixos: Type (Neutral|Success|Alert|Error) e Position (Top|Bottom|Left|Right).
 * Componente de bolha pura: o vinculo com o gatilho e feito por `id` +
 * aria-describedby no elemento que dispara o tooltip.
 * O TooltipIcon vizinho compoe este mesmo desenho junto de um icone de gatilho. */
withDefaults(defineProps<{
  id?: string
  type?: 'neutral' | 'success' | 'alert' | 'error'
  position?: 'top' | 'bottom' | 'left' | 'right'
  label?: string
  description?: string
  showLabel?: boolean
  visible?: boolean
}>(), {
  id: undefined,
  type: 'neutral',
  position: 'top',
  label: '',
  description: '',
  showLabel: true,
  visible: true,
})
</script>

<template>
  <span
    :id="id"
    class="braip-tooltip"
    :class="[`pos-${position}`, `type-${type}`, { 'is-hidden': !visible }]"
    role="tooltip"
  >
    <span class="braip-tooltip__arrow" aria-hidden="true" />
    <span class="braip-tooltip__content">
      <span v-if="showLabel && label" class="braip-tooltip__label">{{ label }}</span>
      <span v-if="description" class="braip-tooltip__description">{{ description }}</span>
      <slot />
    </span>
  </span>
</template>

<style scoped>
.braip-tooltip {
  display: flex;
  inline-size: max-content;
  /* 230px nao tem token: composto de 224 + 6 */
  max-inline-size: calc(var(--braip-value-space-224) + var(--braip-value-space-6));
  transition: opacity var(--braip-motion-duration-fast) var(--braip-motion-easing-enter);
}

.braip-tooltip.is-hidden {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}

@media (prefers-reduced-motion: reduce) {
  .braip-tooltip { transition: none; }
}

/* Position — eixo da bolha e direcao da seta */
.braip-tooltip.pos-top { flex-direction: column-reverse; }
.braip-tooltip.pos-bottom { flex-direction: column; }

.braip-tooltip.pos-left,
.braip-tooltip.pos-right {
  max-inline-size: var(--braip-value-space-240);
}

.braip-tooltip.pos-left { flex-direction: row-reverse; }
.braip-tooltip.pos-right { flex-direction: row; }

/* Seta — 6px de aresta sai do primitivo de espaco */
.braip-tooltip__arrow {
  flex: none;
  align-self: center;
  inline-size: var(--braip-value-space-0);
  block-size: var(--braip-value-space-0);
  border: var(--braip-value-space-6) solid transparent;
}

.braip-tooltip.pos-top .braip-tooltip__arrow {
  border-block-start-color: var(--braip-tooltip-bg);
  border-block-end-width: var(--braip-value-space-0);
}

.braip-tooltip.pos-bottom .braip-tooltip__arrow {
  border-block-end-color: var(--braip-tooltip-bg);
  border-block-start-width: var(--braip-value-space-0);
}

.braip-tooltip.pos-left .braip-tooltip__arrow {
  border-inline-start-color: var(--braip-tooltip-bg);
  border-inline-end-width: var(--braip-value-space-0);
}

.braip-tooltip.pos-right .braip-tooltip__arrow {
  border-inline-end-color: var(--braip-tooltip-bg);
  border-inline-start-width: var(--braip-value-space-0);
}

/* Conteudo */
.braip-tooltip__content {
  display: flex;
  flex-direction: column;
  gap: var(--braip-value-space-8);
  padding: var(--braip-value-space-16);
  border-radius: var(--braip-space-radius-sm);
  background: var(--braip-tooltip-bg);
  color: var(--braip-tooltip-fg);
  font-family: var(--braip-type-font-family-text);
}

.braip-tooltip__label {
  font-size: var(--braip-type-size-text-p5);
  line-height: var(--braip-type-line-height-text-p5);
  font-weight: var(--braip-type-weight-semi-bold);
}

.braip-tooltip__description {
  font-size: var(--braip-type-size-text-p5);
  line-height: var(--braip-type-line-height-text-p5);
  font-weight: var(--braip-type-weight-regular);
}

/* Type */
.braip-tooltip.type-neutral {
  --braip-tooltip-bg: var(--braip-alias-neutral-secondary);
  --braip-tooltip-fg: var(--braip-alias-neutral-text);
}

.braip-tooltip.type-success {
  --braip-tooltip-bg: var(--braip-alias-green-secondary);
  --braip-tooltip-fg: var(--braip-alias-green-text);
}

.braip-tooltip.type-alert {
  --braip-tooltip-bg: var(--braip-alias-orange-secondary);
  --braip-tooltip-fg: var(--braip-alias-orange-text);
}

.braip-tooltip.type-error {
  --braip-tooltip-bg: var(--braip-alias-red-secondary);
  --braip-tooltip-fg: var(--braip-alias-red-text);
}
</style>
