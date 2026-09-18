<script setup lang="ts">
/* Espelha o component set "Metric Row" (Braip Components, 2278:2287).
 * Eixo unico Tone (Positive/Negative/Neutral): o unico delta e a cor do
 * percentual e a cor do badge. `Highlight` e `Show Badge` sao booleans do Figma. */
withDefaults(defineProps<{
  tone?: 'positive' | 'negative' | 'neutral'
  /** Figma: Show Badge */
  showBadge?: boolean
  /** Figma: Highlight — realce de fundo da linha. */
  highlight?: boolean
  label?: string
  percentage?: string
  valueLabel?: string
  value?: string
}>(), { tone: 'positive', showBadge: true, highlight: false })
</script>

<template>
  <div class="braip-metric-row" :class="[`tone-${tone}`, { 'is-highlight': highlight }]">
    <div class="braip-metric-row__ratio">
      <span v-if="showBadge" class="braip-metric-row__badge"><slot name="badge" /></span>
      <span class="braip-metric-row__label">{{ label }}<slot name="label" /></span>
      <span class="braip-metric-row__percentage">{{ percentage }}<slot name="percentage" /></span>
    </div>
    <div class="braip-metric-row__value-row">
      <span class="braip-metric-row__value-label">{{ valueLabel }}<slot name="valueLabel" /></span>
      <span class="braip-metric-row__value">{{ value }}<slot name="value" /></span>
    </div>
  </div>
</template>

<style scoped>
.braip-metric-row {
  display: flex;
  position: relative;
  flex-direction: column;
  gap: var(--braip-space-base-offset);
  padding: var(--braip-space-base-micro);
  font-family: var(--braip-type-font-family-text);
}

/* Highlight — retangulo de realce atras da linha. */
.braip-metric-row.is-highlight {
  border-radius: var(--braip-space-radius-md);
  background: var(--braip-alias-overlay-hover);
}

.braip-metric-row__ratio {
  display: flex;
  align-items: center;
  gap: var(--braip-space-base-micro);
}

.braip-metric-row__value-row {
  display: flex;
  align-items: center;
  gap: var(--braip-space-base-xs);
}

.braip-metric-row__badge {
  display: inline-flex;
  color: var(--braip-metric-row-badge, var(--braip-alias-purple-tertiary));
}

.braip-metric-row__label {
  color: var(--braip-alias-text-surface-secondary);
  font-size: var(--braip-type-size-text-p6);
  font-weight: var(--braip-type-weight-medium);
}

.braip-metric-row__percentage {
  color: var(--braip-metric-row-percentage, var(--braip-alias-neutral-text));
  font-size: var(--braip-type-size-text-p6);
  font-weight: var(--braip-type-weight-medium);
}

.braip-metric-row__value-label {
  color: var(--braip-alias-neutral-text);
  font-size: var(--braip-type-size-text-p7);
  font-weight: var(--braip-type-weight-regular);
}

.braip-metric-row__value {
  color: var(--braip-alias-text-surface-primary);
  font-size: var(--braip-type-size-text-p6);
  font-weight: var(--braip-type-weight-medium);
}

/* Tone — so percentual e badge mudam. */
.braip-metric-row.tone-positive {
  --braip-metric-row-percentage: var(--braip-alias-green-text);
  --braip-metric-row-badge: var(--braip-alias-purple-tertiary);
}

.braip-metric-row.tone-negative {
  --braip-metric-row-percentage: var(--braip-alias-red-text);
  --braip-metric-row-badge: var(--braip-alias-orange-tertiary);
}

.braip-metric-row.tone-neutral {
  --braip-metric-row-percentage: var(--braip-alias-neutral-text);
  --braip-metric-row-badge: var(--braip-alias-blue-tertiary);
}
</style>
