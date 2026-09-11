<script setup lang="ts">
/* Espelha o component set "Tooltip Icon" — Braip Components (node 2204:12166).
 * Position = onde a bolha aparece em relacao ao icone de gatilho.
 * A bolha aparece no hover e no focus do gatilho, com os tokens de Motion. */
withDefaults(defineProps<{
  position?: 'top' | 'bottom' | 'left' | 'right'
  type?: 'neutral' | 'success' | 'alert' | 'error'
  label?: string
  description?: string
  showLabel?: boolean
}>(), {
  position: 'top',
  type: 'neutral',
  label: '',
  description: '',
  showLabel: true,
})
</script>

<template>
  <span class="braip-tooltip-icon" :class="[`pos-${position}`, `type-${type}`]">
    <span class="braip-tooltip-icon__trigger" tabindex="0" role="button" :aria-describedby="undefined">
      <slot name="icon" />
    </span>

    <span class="braip-tooltip-icon__bubble" role="tooltip">
      <span class="braip-tooltip-icon__arrow" aria-hidden="true" />
      <span class="braip-tooltip-icon__content">
        <span v-if="showLabel && label" class="braip-tooltip-icon__label">{{ label }}</span>
        <span v-if="description" class="braip-tooltip-icon__description">{{ description }}</span>
      </span>
    </span>
  </span>
</template>

<style scoped>
.braip-tooltip-icon {
  position: relative;
  display: inline-flex;
}

.braip-tooltip-icon__trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  inline-size: var(--braip-value-space-24);
  block-size: var(--braip-value-space-24);
  padding: var(--braip-value-space-4);
  color: var(--braip-alias-neutral-text);
}

/* Bolha — invisivel ate hover/focus; a transicao usa os tokens de Motion */
.braip-tooltip-icon__bubble {
  position: absolute;
  z-index: 1;
  display: flex;
  inline-size: max-content;
  max-inline-size: 230px;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition:
    opacity var(--braip-motion-duration-fast) var(--braip-motion-easing-enter),
    visibility 0s linear var(--braip-motion-duration-fast);
}

.braip-tooltip-icon:hover .braip-tooltip-icon__bubble,
.braip-tooltip-icon:focus-within .braip-tooltip-icon__bubble {
  opacity: 1;
  visibility: visible;
  transition:
    opacity var(--braip-motion-duration-fast) var(--braip-motion-easing-enter),
    visibility 0s;
}

@media (prefers-reduced-motion: reduce) {
  .braip-tooltip-icon__bubble {
    transition: none;
  }
}

/* Position — o eixo da bolha e a direcao da seta */
.braip-tooltip-icon.pos-top .braip-tooltip-icon__bubble,
.braip-tooltip-icon.pos-bottom .braip-tooltip-icon__bubble {
  flex-direction: column;
  left: 50%;
  transform: translateX(-50%);
}

.braip-tooltip-icon.pos-top .braip-tooltip-icon__bubble {
  bottom: 100%;
  flex-direction: column-reverse;
}

.braip-tooltip-icon.pos-bottom .braip-tooltip-icon__bubble {
  top: 100%;
}

.braip-tooltip-icon.pos-left .braip-tooltip-icon__bubble,
.braip-tooltip-icon.pos-right .braip-tooltip-icon__bubble {
  flex-direction: row;
  top: 50%;
  transform: translateY(-50%);
  max-inline-size: 423px;
}

.braip-tooltip-icon.pos-left .braip-tooltip-icon__bubble {
  right: 100%;
  flex-direction: row-reverse;
}

.braip-tooltip-icon.pos-right .braip-tooltip-icon__bubble {
  left: 100%;
}

/* Seta */
.braip-tooltip-icon__arrow {
  flex: none;
  align-self: center;
  inline-size: 0;
  block-size: 0;
  border: 6px solid transparent;
}

.braip-tooltip-icon.pos-top .braip-tooltip-icon__arrow {
  border-top-color: var(--braip-tooltip-bg);
  border-bottom-width: 0;
}

.braip-tooltip-icon.pos-bottom .braip-tooltip-icon__arrow {
  border-bottom-color: var(--braip-tooltip-bg);
  border-top-width: 0;
}

.braip-tooltip-icon.pos-left .braip-tooltip-icon__arrow {
  border-left-color: var(--braip-tooltip-bg);
  border-right-width: 0;
}

.braip-tooltip-icon.pos-right .braip-tooltip-icon__arrow {
  border-right-color: var(--braip-tooltip-bg);
  border-left-width: 0;
}

/* Conteudo */
.braip-tooltip-icon__content {
  display: flex;
  flex-direction: column;
  gap: var(--braip-value-space-8);
  padding: var(--braip-value-space-16);
  border-radius: var(--braip-space-radius-sm);
  background: var(--braip-tooltip-bg);
  color: var(--braip-tooltip-fg);
  box-shadow: 0 0 20px var(--braip-alias-overlay-pressed);
}

.braip-tooltip-icon__label {
  font-size: var(--braip-type-size-text-p5);
  line-height: var(--braip-type-line-height-text-p5);
  font-weight: var(--braip-type-weight-semi-bold);
}

.braip-tooltip-icon__description {
  font-size: var(--braip-type-size-text-p5);
  line-height: var(--braip-type-line-height-text-p5);
  font-weight: var(--braip-type-weight-regular);
}

/* Type — espelha os fills do component set base */
.braip-tooltip-icon.type-neutral {
  --braip-tooltip-bg: var(--braip-alias-neutral-secondary);
  --braip-tooltip-fg: var(--braip-alias-neutral-text);
}

.braip-tooltip-icon.type-success {
  --braip-tooltip-bg: var(--braip-alias-green-secondary);
  --braip-tooltip-fg: var(--braip-alias-green-text);
}

.braip-tooltip-icon.type-alert {
  --braip-tooltip-bg: var(--braip-alias-orange-secondary);
  --braip-tooltip-fg: var(--braip-alias-orange-text);
}

.braip-tooltip-icon.type-error {
  --braip-tooltip-bg: var(--braip-alias-red-secondary);
  --braip-tooltip-fg: var(--braip-alias-red-text);
}
</style>
