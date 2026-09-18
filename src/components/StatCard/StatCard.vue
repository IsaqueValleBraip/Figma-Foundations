<script setup lang="ts">
/* Espelha o component set "StatCard" (Braip Components, 1930:45343).
 * 108 variantes = Orientation (3) x Type (4) x State (3) x Show Icon (2) x Show Delta (2).
 * Modelado por eixo, nao por variante: Orientation define o layout, Type define
 * so a cor do valor, State=Hover vira CSS e State=Empty vira prop. `Show Icon` e
 * `Show Delta` ainda sao VARIANT True|False no Figma — aqui sao props booleanas.
 * Conteudo entra por slots. */
withDefaults(defineProps<{
  /** Figma: Orientation — `finance` e um layout proprio, nao uma orientacao. */
  orientation?: 'vertical' | 'horizontal' | 'finance'
  type?: 'neutral' | 'success' | 'info' | 'danger'
  /** Figma: State=Empty */
  empty?: boolean
  /** Figma: Show Icon (VARIANT True|False) */
  showIcon?: boolean
  /** Figma: Show Delta (VARIANT True|False) */
  showDelta?: boolean
}>(), {
  orientation: 'vertical',
  type: 'neutral',
  empty: false,
  showIcon: true,
  showDelta: true,
})
</script>

<template>
  <section
    class="braip-statcard"
    :class="[`orient-${orientation}`, `type-${type}`, { 'is-empty': empty }]"
  >
    <template v-if="orientation === 'horizontal'">
      <span v-if="showIcon" class="braip-statcard__icon"><slot name="icon" /></span>
      <div class="braip-statcard__content">
        <span class="braip-statcard__label"><slot name="label" /></span>
        <span class="braip-statcard__value"><slot name="value" /></span>
      </div>
      <div v-if="showDelta" class="braip-statcard__delta">
        <slot name="delta" />
        <span class="braip-statcard__period"><slot name="period" /></span>
      </div>
    </template>

    <template v-else-if="orientation === 'finance'">
      <div class="braip-statcard__balance">
        <span class="braip-statcard__label"><slot name="label" /></span>
        <span class="braip-statcard__value"><slot name="value" /></span>
        <div v-if="showDelta" class="braip-statcard__delta"><slot name="delta" /></div>
      </div>
      <hr class="braip-statcard__line">
      <div class="braip-statcard__action"><slot name="action" /></div>
    </template>

    <template v-else>
      <div class="braip-statcard__header">
        <span class="braip-statcard__label"><slot name="label" /></span>
        <span v-if="showIcon" class="braip-statcard__icon"><slot name="icon" /></span>
      </div>
      <span class="braip-statcard__value"><slot name="value" /></span>
      <div v-if="showDelta" class="braip-statcard__delta">
        <slot name="delta" />
        <span class="braip-statcard__period"><slot name="period" /></span>
      </div>
    </template>
  </section>
</template>

<style scoped>
/* Base — superficie, borda e raio iguais em Vertical/Horizontal. */
.braip-statcard {
  display: flex;
  border: 1px solid var(--braip-alias-neutral-secondary);
  border-radius: var(--braip-space-radius-lg);
  background: var(--braip-alias-bg-surface-aside);
  padding: var(--braip-space-base-xs);
  font-family: var(--braip-type-font-family-text);
}

/* Orientation=Vertical */
.braip-statcard.orient-vertical {
  flex-direction: column;
  gap: var(--braip-space-base-xxs);
}

.braip-statcard__header {
  display: flex;
  align-items: center;
  gap: var(--braip-space-base-xxs);
}

/* Orientation=Horizontal */
.braip-statcard.orient-horizontal {
  flex-direction: row;
  align-items: center;
  gap: var(--braip-space-base-xxs);
}

.braip-statcard__content {
  display: flex;
  flex-direction: column;
  gap: var(--braip-space-base-micro);
}

/* Orientation=Finance — layout proprio: raio, padding e gap distintos. */
.braip-statcard.orient-finance {
  flex-direction: column;
  gap: var(--braip-space-base-sm);
  border-radius: var(--braip-space-radius-sm);
  padding: var(--braip-space-base-md);
}

.braip-statcard__balance {
  display: flex;
  flex-direction: column;
  gap: var(--braip-space-base-xs);
}

.braip-statcard__line {
  margin: var(--braip-space-base-none);
  border: none;
  border-top: 1px solid var(--braip-alias-neutral-secondary);
}

.braip-statcard__action {
  display: flex;
  gap: var(--braip-space-base-none);
}

/* Texto */
.braip-statcard__label {
  color: var(--braip-alias-text-surface-secondary);
  font-size: var(--braip-type-size-text-p6);
  font-weight: var(--braip-type-weight-medium);
}

.braip-statcard__value {
  color: var(--braip-statcard-value, var(--braip-alias-text-surface-primary));
  font-family: var(--braip-type-font-family-title);
  font-size: var(--braip-type-size-title-h7);
  font-weight: var(--braip-type-weight-semi-bold);
}

.braip-statcard__delta {
  display: flex;
  align-items: center;
  gap: var(--braip-space-base-micro);
}

.braip-statcard__period {
  color: var(--braip-alias-neutral-text);
  font-size: var(--braip-type-size-text-p7);
  font-weight: var(--braip-type-weight-regular);
}

/* Type — o unico delta e a cor do valor. */
.braip-statcard.type-neutral {
  --braip-statcard-value: var(--braip-alias-text-surface-primary);
}

.braip-statcard.type-success {
  --braip-statcard-value: var(--braip-alias-green-static);
}

.braip-statcard.type-info {
  --braip-statcard-value: var(--braip-alias-blue-static);
}

.braip-statcard.type-danger {
  --braip-statcard-value: var(--braip-alias-red-static);
}

/* State=Hover */
.braip-statcard:hover {
  background: var(--braip-alias-neutral-primary);
}

/* State=Empty — no Figma o valor vira "--"; a cor por Type e mantida. */
.braip-statcard.is-empty .braip-statcard__delta {
  visibility: hidden;
}
</style>
