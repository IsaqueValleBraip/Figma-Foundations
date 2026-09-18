<script setup lang="ts">
/* Espelha o component set "Cards" (Braip Components, 1422:16938).
 * Eixos: Size (5) x Direction (2) x State (2) = 20 variantes.
 * Modelado por eixo: Size controla tipografia/padding/raio, Direction controla
 * o fluxo do auto-layout e State=Hover vira CSS. Conteudo entra por slots. */
withDefaults(defineProps<{
  size?: 'xl' | 'lg' | 'md' | 'sm' | 'xs'
  direction?: 'vertical' | 'horizontal'
  /** Figma: Show Eyebrow */
  showEyebrow?: boolean
  /** Figma: Show Button Text */
  showButtonText?: boolean
  /** Figma: Show Button */
  showButton?: boolean
  /** Figma: Show Data */
  showData?: boolean
}>(), {
  size: 'xl',
  direction: 'vertical',
  showEyebrow: true,
  showButtonText: true,
  showButton: true,
  showData: true,
})
</script>

<template>
  <article class="braip-card" :class="[`is-${size}`, `dir-${direction}`]">
    <div v-if="$slots.media" class="braip-card__media"><slot name="media" /></div>

    <div class="braip-card__content">
      <p v-if="showEyebrow" class="braip-card__eyebrow"><slot name="eyebrow" /></p>
      <h3 class="braip-card__title"><slot name="title" /></h3>
      <p v-if="$slots.description" class="braip-card__description"><slot name="description" /></p>
      <p v-if="showData" class="braip-card__data"><slot name="data" /></p>
      <div v-if="showButtonText" class="braip-card__button-text"><slot name="buttonText" /></div>
      <div v-if="showButton" class="braip-card__button"><slot name="button" /></div>
    </div>
  </article>
</template>

<style scoped>
/* Sem valores literais: superficie/texto da camada de cor, espaco e raio de space/value. */
.braip-card {
  display: flex;
  overflow: hidden;
  background: var(--braip-color-global-base-white);
}

.braip-card.dir-vertical {
  flex-direction: column;
}

.braip-card.dir-horizontal {
  flex-direction: row;
}

.braip-card__media {
  display: block;
  overflow: hidden;
}

.braip-card__content {
  display: flex;
  flex-direction: column;
  flex: 1;
  background: var(--braip-color-global-base-white);
  font-family: var(--braip-type-font-family-text);
}

.braip-card__eyebrow {
  color: var(--braip-color-brand-core-text-primary);
  font-weight: var(--braip-type-weight-medium);
}

.braip-card__title {
  color: var(--braip-alias-text-primary);
  font-weight: var(--braip-type-weight-medium);
}

.braip-card__description,
.braip-card__data {
  color: var(--braip-color-aux-grey-text-primary);
  font-weight: var(--braip-type-weight-regular);
}

/* Size=Extra Large */
.braip-card.is-xl {
  border-radius: var(--braip-space-radius-md);
}

.braip-card.is-xl .braip-card__content {
  gap: var(--braip-space-base-sm);
  padding: var(--braip-space-base-sm);
}

.braip-card.is-xl .braip-card__eyebrow {
  font-size: var(--braip-type-size-text-p3);
}

.braip-card.is-xl .braip-card__title {
  font-size: var(--braip-type-size-text-p1);
  font-weight: var(--braip-type-weight-regular);
}

/* Size=Large */
.braip-card.is-lg {
  border-radius: var(--braip-space-radius-md);
}

.braip-card.is-lg .braip-card__content {
  gap: var(--braip-space-base-xs);
  padding: var(--braip-space-base-md);
}

.braip-card.is-lg .braip-card__eyebrow {
  font-size: var(--braip-type-size-text-p5);
}

.braip-card.is-lg .braip-card__title {
  font-size: var(--braip-type-size-text-p3);
}

.braip-card.is-lg .braip-card__description,
.braip-card.is-lg .braip-card__data {
  font-size: var(--braip-type-size-text-p5);
}

/* Size=Medium */
.braip-card.is-md {
  border-radius: var(--braip-space-radius-sm);
}

.braip-card.is-md .braip-card__content {
  gap: var(--braip-space-base-xxs);
  padding: var(--braip-space-base-sm);
}

.braip-card.is-md .braip-card__eyebrow {
  font-size: var(--braip-type-size-text-p6);
}

.braip-card.is-md .braip-card__title {
  font-size: var(--braip-type-size-text-p4);
}

.braip-card.is-md .braip-card__description,
.braip-card.is-md .braip-card__data {
  font-size: var(--braip-type-size-text-p5);
}

/* Size=Small */
.braip-card.is-sm {
  border-radius: var(--braip-space-radius-sm);
}

.braip-card.is-sm .braip-card__content {
  gap: var(--braip-space-base-xxs);
  padding: var(--braip-space-base-sm);
}

.braip-card.is-sm .braip-card__eyebrow {
  font-size: var(--braip-type-size-text-p6);
}

.braip-card.is-sm .braip-card__title {
  font-size: var(--braip-type-size-text-p5);
}

.braip-card.is-sm .braip-card__description,
.braip-card.is-sm .braip-card__data {
  font-size: var(--braip-type-size-text-p6);
}

/* Size=Extra Small */
.braip-card.is-xs {
  border-radius: var(--braip-space-radius-sm);
}

.braip-card.is-xs .braip-card__content {
  gap: var(--braip-space-base-micro);
  padding: var(--braip-space-base-xs);
}

.braip-card.is-xs .braip-card__eyebrow {
  font-size: var(--braip-type-size-text-p7);
}

.braip-card.is-xs .braip-card__title {
  font-size: var(--braip-type-size-text-p6);
}

.braip-card.is-xs .braip-card__description,
.braip-card.is-xs .braip-card__data {
  font-size: var(--braip-type-size-text-p6);
}

/* State=Hover — no Figma o unico delta e revelar Button-Text/Button. */
.braip-card .braip-card__button-text,
.braip-card .braip-card__button {
  visibility: hidden;
}

.braip-card:hover .braip-card__button-text,
.braip-card:focus-within .braip-card__button-text,
.braip-card:hover .braip-card__button,
.braip-card:focus-within .braip-card__button {
  visibility: visible;
}
</style>
