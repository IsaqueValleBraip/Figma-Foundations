<script setup lang="ts">
/* Espelha o component set "_Banner" (Braip Components, 1422:14281).
 * Eixos: Position=Horizontal|Vertical x Size=Large|Small x Color=Purple|Red|
 * Orange|Blue|Green (20 variantes), mais as booleans Icon/Close/Title/Subtitle/
 * Button e os textos "↳ Text Title" / "↳ Text Subtitle".
 * Modelado por eixo: cada eixo vira classe; as booleans viram slot/prop.
 * Color=Red anuncia como alert; o resto como status. */
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  /** Figma: Position */
  position?: 'horizontal' | 'vertical'
  /** Figma: Size */
  size?: 'large' | 'small'
  /** Figma: Color */
  color?: 'purple' | 'red' | 'orange' | 'blue' | 'green'
  /** Figma: property "↳ Text Title" — ausente quando a boolean Title e false */
  title?: string
  /** Figma: property "↳ Text Subtitle" — ausente quando a boolean Subtitle e false */
  subtitle?: string
  /** Figma: boolean "Close" */
  closable?: boolean
  /** Rotulo acessivel do botao de fechar */
  closeLabel?: string
}>(), {
  position: 'horizontal',
  size: 'large',
  color: 'purple',
  closable: true,
  closeLabel: 'Fechar aviso',
})

defineEmits<{ close: [] }>()

const role = computed(() => (props.color === 'red' ? 'alert' : 'status'))
const live = computed(() => (props.color === 'red' ? 'assertive' : 'polite'))
</script>

<template>
  <div
    class="braip-banner"
    :class="[`is-${position}`, `is-${size}`, `color-${color}`]"
    :role="role"
    :aria-live="live"
  >
    <div class="braip-banner__content">
      <span v-if="$slots.icon" class="braip-banner__icon" aria-hidden="true"><slot name="icon" /></span>

      <div class="braip-banner__text">
        <p v-if="title" class="braip-banner__title">{{ title }}</p>
        <p v-if="subtitle" class="braip-banner__subtitle">{{ subtitle }}</p>
      </div>
    </div>

    <div v-if="$slots.action" class="braip-banner__action"><slot name="action" /></div>

    <button
      v-if="closable"
      class="braip-banner__close"
      type="button"
      :aria-label="closeLabel"
      @click="$emit('close')"
    >
      <slot name="closeIcon" />
    </button>
  </div>
</template>

<style scoped>
.braip-banner {
  display: flex;
  gap: var(--braip-space-base-sm);
  padding: var(--braip-space-base-sm);
  border: 1px solid var(--braip-banner-bd);
  border-radius: var(--braip-space-radius-sm);
  background: var(--braip-banner-bg);
  color: var(--braip-banner-fg);
  font-family: var(--braip-type-font-family-text);
}

.braip-banner__content {
  display: flex;
  align-items: flex-start;
  gap: var(--braip-space-base-xs);
  flex: 1 1 auto;
}

.braip-banner__icon {
  display: inline-flex;
  align-items: center;
  color: var(--braip-banner-icon);
}

.braip-banner__text {
  display: flex;
  flex-direction: column;
  gap: var(--braip-space-base-micro);
}

.braip-banner__title {
  margin: var(--braip-space-base-none);
  font-size: var(--braip-type-size-text-p4);
  line-height: var(--braip-type-line-height-text-p4);
  font-weight: var(--braip-type-weight-semi-bold);
}

.braip-banner__subtitle {
  margin: var(--braip-space-base-none);
  font-size: var(--braip-type-size-text-p5);
  line-height: var(--braip-type-line-height-text-p5);
  font-weight: var(--braip-type-weight-regular);
}

.braip-banner__action {
  display: flex;
  align-items: center;
}

.braip-banner__close {
  display: inline-flex;
  align-items: flex-start;
  padding: var(--braip-space-base-none);
  border: none;
  border-radius: var(--braip-space-radius-xs);
  background: transparent;
  color: var(--braip-banner-fg);
  cursor: pointer;
}

.braip-banner__close:hover {
  background: var(--braip-alias-overlay-hover);
}

.braip-banner__close:active {
  background: var(--braip-alias-overlay-pressed);
}

/* Position */
.braip-banner.is-horizontal {
  flex-direction: row;
  align-items: center;
}

.braip-banner.is-vertical {
  flex-direction: column;
  align-items: stretch;
}

.braip-banner.is-vertical .braip-banner__close {
  align-self: flex-end;
  order: -1;
}

/* Size */
.braip-banner.is-small {
  padding: var(--braip-space-base-xs);
  gap: var(--braip-space-base-xs);
}

.braip-banner.is-small .braip-banner__title {
  font-size: var(--braip-type-size-text-p5);
  line-height: var(--braip-type-line-height-text-p5);
}

.braip-banner.is-small .braip-banner__subtitle {
  font-size: var(--braip-type-size-text-p6);
  line-height: var(--braip-type-line-height-text-p6);
}

/* Color — slots por familia */
.braip-banner.color-purple {
  --braip-banner-bg: var(--braip-alias-purple-primary);
  --braip-banner-bd: var(--braip-alias-purple-tertiary);
  --braip-banner-fg: var(--braip-alias-purple-text);
  --braip-banner-icon: var(--braip-alias-purple-quaternary);
}

.braip-banner.color-red {
  --braip-banner-bg: var(--braip-alias-red-primary);
  --braip-banner-bd: var(--braip-alias-red-tertiary);
  --braip-banner-fg: var(--braip-alias-red-text);
  --braip-banner-icon: var(--braip-alias-red-quaternary);
}

.braip-banner.color-orange {
  --braip-banner-bg: var(--braip-alias-orange-primary);
  --braip-banner-bd: var(--braip-alias-orange-tertiary);
  --braip-banner-fg: var(--braip-alias-orange-text);
  --braip-banner-icon: var(--braip-alias-orange-quaternary);
}

.braip-banner.color-blue {
  --braip-banner-bg: var(--braip-alias-blue-primary);
  --braip-banner-bd: var(--braip-alias-blue-tertiary);
  --braip-banner-fg: var(--braip-alias-blue-text);
  --braip-banner-icon: var(--braip-alias-blue-quaternary);
}

.braip-banner.color-green {
  --braip-banner-bg: var(--braip-alias-green-primary);
  --braip-banner-bd: var(--braip-alias-green-tertiary);
  --braip-banner-fg: var(--braip-alias-green-text);
  --braip-banner-icon: var(--braip-alias-green-quaternary);
}
</style>
