<script setup lang="ts">
/* Espelha o component set "❖ Divider" (Braip Components, 878:4145).
 * Eixos: Size (Large/Medium/Small/Underline) x Color (Purple/Grey/Neutral/Green/Red) = 20 variantes.
 * Size=Underline e a regua pura, sem rotulo; Large/Medium/Small trazem rotulo centralizado.
 * Sem rotulo renderiza <hr>; com rotulo, um <div role="separator"> (um <hr> nao pode ter filhos). */
withDefaults(defineProps<{
  size?: 'lg' | 'md' | 'sm' | 'underline'
  color?: 'purple' | 'grey' | 'neutral' | 'green' | 'red'
  /** Figma: property Label — ausente em Size=Underline */
  label?: string
  orientation?: 'horizontal' | 'vertical'
}>(), { size: 'underline', color: 'purple', orientation: 'horizontal' })
</script>

<template>
  <hr
    v-if="size === 'underline' || (!label && !$slots.default)"
    class="braip-divider is-rule"
    :class="[`is-${size}`, `color-${color}`, `is-${orientation}`]"
    :aria-orientation="orientation === 'vertical' ? 'vertical' : undefined"
  >
  <div
    v-else
    class="braip-divider is-labelled"
    :class="[`is-${size}`, `color-${color}`, `is-${orientation}`]"
    role="separator"
    :aria-orientation="orientation"
  >
    <span class="braip-divider__line" aria-hidden="true" />
    <span class="braip-divider__label"><slot>{{ label }}</slot></span>
    <span class="braip-divider__line" aria-hidden="true" />
  </div>
</template>

<style scoped>
.braip-divider {
  --braip-divider-line: var(--braip-alias-stroke-primary);
  --braip-divider-fg: var(--braip-alias-text-tertiary);

  border: 0;
  margin: var(--braip-space-base-none);
}

/* Color */
.braip-divider.color-purple {
  --braip-divider-line: var(--braip-alias-purple-tertiary);
  --braip-divider-fg: var(--braip-alias-purple-text);
}

.braip-divider.color-grey {
  --braip-divider-line: var(--braip-alias-neutral-secondary);
  --braip-divider-fg: var(--braip-alias-neutral-text);
}

.braip-divider.color-neutral {
  --braip-divider-line: var(--braip-alias-stroke-primary);
  --braip-divider-fg: var(--braip-alias-text-tertiary);
}

.braip-divider.color-green {
  --braip-divider-line: var(--braip-alias-green-tertiary);
  --braip-divider-fg: var(--braip-alias-green-text);
}

.braip-divider.color-red {
  --braip-divider-line: var(--braip-alias-red-tertiary);
  --braip-divider-fg: var(--braip-alias-red-text);
}

/* Size=Underline — regua pura */
.braip-divider.is-rule {
  background: var(--braip-divider-line);
}

.braip-divider.is-rule.is-horizontal {
  inline-size: 100%;
  block-size: 1px;
}

.braip-divider.is-rule.is-vertical {
  inline-size: 1px;
  block-size: 100%;
}

/* Size=Large/Medium/Small — regua com rotulo */
.braip-divider.is-labelled {
  display: flex;
  align-items: center;
  gap: var(--braip-space-base-xxs);
  color: var(--braip-divider-fg);
  font-family: var(--braip-type-font-family-text);
  font-weight: var(--braip-type-weight-semi-bold);
}

.braip-divider.is-labelled.is-vertical {
  flex-direction: column;
  block-size: 100%;
}

.braip-divider__line {
  flex: 1 1 0;
  background: var(--braip-divider-line);
}

.braip-divider.is-horizontal .braip-divider__line {
  block-size: 1px;
}

.braip-divider.is-vertical .braip-divider__line {
  inline-size: 1px;
}

.braip-divider.is-sm .braip-divider__label {
  font-size: var(--braip-type-size-text-p7);
  line-height: var(--braip-type-line-height-text-p7);
}

.braip-divider.is-md .braip-divider__label {
  font-size: var(--braip-type-size-text-p6);
  line-height: var(--braip-type-line-height-text-p6);
}

.braip-divider.is-lg .braip-divider__label {
  font-size: var(--braip-type-size-text-p5);
  line-height: var(--braip-type-line-height-text-p5);
}
</style>
