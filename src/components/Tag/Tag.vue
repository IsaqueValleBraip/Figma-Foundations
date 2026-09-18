<script setup lang="ts">
/* Espelha o component set "Tags" (Braip Components, 422:38782) e tambem
 * "Tags/ Squircle" (1925:45076) — os dois sets sao byte-a-byte iguais em
 * cor, padding, gap, tipografia e tamanho; a UNICA diferenca medida no
 * Figma e o raio: radius/full no set Tags e radius/md no set Squircle.
 * Por isso um componente so, com a prop `shape`, em vez de CSS duplicado.
 * Eixos: Type x Style x Color x State (64 variantes por set).
 * State=On/Off vira prop `off` (Figma aplica opacidade 0.4 em Off). */
withDefaults(defineProps<{
  /** Figma: Type — Icon adiciona o indicador de status a esquerda. */
  type?: 'icon' | 'text'
  /** Figma: Style — Solid preenche; Minimalist usa a superficie clara. */
  variant?: 'solid' | 'minimalist'
  color?: 'purple' | 'red' | 'orange' | 'blue' | 'pink' | 'grey' | 'green' | 'yellow'
  /** Figma: shape vem do set — `pill` = Tags, `squircle` = Tags/ Squircle. */
  shape?: 'pill' | 'squircle'
  /** Figma: State=Off. */
  off?: boolean
  label: string
}>(), {
  type: 'text',
  variant: 'solid',
  color: 'purple',
  shape: 'pill',
  off: false,
})
</script>

<template>
  <span
    class="braip-tag"
    :class="[`is-${type}`, `variant-${variant}`, `color-${color}`, `shape-${shape}`, { 'is-off': off }]"
  >
    <span v-if="type === 'icon'" class="braip-tag__status" aria-hidden="true">
      <slot name="icon" />
    </span>
    <span class="braip-tag__label">{{ label }}</span>
  </span>
</template>

<style scoped>
/* Sem valores literais: cor da camada alias; padding/gap/raio de space e value. */
.braip-tag {
  display: inline-flex;
  align-items: center;
  block-size: calc(var(--braip-value-space-24) + var(--braip-value-space-4));
  gap: var(--braip-value-space-6);
  padding-block: var(--braip-space-base-micro);
  padding-inline-start: var(--braip-space-base-micro);
  padding-inline-end: var(--braip-space-base-xxs);
  background: var(--braip-tag-bg);
  color: var(--braip-tag-fg);
  font-family: var(--braip-type-font-family-text);
  font-size: var(--braip-type-size-text-p6);
  line-height: var(--braip-type-line-height-text-p6);
  font-weight: var(--braip-type-weight-medium);
}

/* Type=Text nao tem indicador: padding simetrico */
.braip-tag.is-text {
  padding-inline-start: var(--braip-space-base-xxs);
}

.braip-tag__status {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  inline-size: calc(var(--braip-value-space-16) + var(--braip-value-space-4));
  block-size: calc(var(--braip-value-space-16) + var(--braip-value-space-4));
  border-radius: inherit;
  background: var(--braip-tag-status-bg);
  color: var(--braip-tag-status-fg);
}

.braip-tag__label {
  white-space: nowrap;
}

/* Shape — unico eixo que separa "Tags" de "Tags/ Squircle" */
.braip-tag.shape-pill,
.braip-tag.shape-pill .braip-tag__status {
  border-radius: var(--braip-space-radius-full);
}

.braip-tag.shape-squircle,
.braip-tag.shape-squircle .braip-tag__status {
  border-radius: var(--braip-space-radius-md);
}

/* Color — slots por familia */
.braip-tag.color-purple {
  --braip-tag-solid: var(--braip-alias-purple-tertiary);
  --braip-tag-soft: var(--braip-alias-purple-primary);
  --braip-tag-ink: var(--braip-alias-purple-text);
}

.braip-tag.color-red {
  --braip-tag-solid: var(--braip-alias-red-quaternary);
  --braip-tag-soft: var(--braip-alias-red-primary);
  --braip-tag-ink: var(--braip-alias-red-text);
}

.braip-tag.color-orange {
  --braip-tag-solid: var(--braip-alias-orange-quaternary);
  --braip-tag-soft: var(--braip-alias-orange-primary);
  --braip-tag-ink: var(--braip-alias-orange-text);
}

.braip-tag.color-blue {
  --braip-tag-solid: var(--braip-alias-blue-quaternary);
  --braip-tag-soft: var(--braip-alias-blue-primary);
  --braip-tag-ink: var(--braip-alias-blue-text);
}

.braip-tag.color-pink {
  --braip-tag-solid: var(--braip-alias-pink-quaternary);
  --braip-tag-soft: var(--braip-alias-pink-primary);
  --braip-tag-ink: var(--braip-alias-pink-text);
}

.braip-tag.color-grey {
  --braip-tag-solid: var(--braip-alias-neutral-quaternary);
  --braip-tag-soft: var(--braip-alias-neutral-primary);
  --braip-tag-ink: var(--braip-alias-neutral-text);
}

.braip-tag.color-green {
  --braip-tag-solid: var(--braip-alias-green-quaternary);
  --braip-tag-soft: var(--braip-alias-green-primary);
  --braip-tag-ink: var(--braip-alias-green-text);
}

.braip-tag.color-yellow {
  --braip-tag-solid: var(--braip-alias-yellow-quaternary);
  --braip-tag-soft: var(--braip-alias-yellow-primary);
  --braip-tag-ink: var(--braip-alias-yellow-text);
}

/* Style=Solid — superficie cheia, texto sobre ativo, indicador invertido */
.braip-tag.variant-solid {
  --braip-tag-bg: var(--braip-tag-solid);
  --braip-tag-fg: var(--braip-alias-on-active);
  --braip-tag-status-bg: var(--braip-alias-on-active);
  --braip-tag-status-fg: var(--braip-tag-solid);
}

/* Style=Minimalist — superficie clara, texto na cor da familia */
.braip-tag.variant-minimalist {
  --braip-tag-bg: var(--braip-tag-soft);
  --braip-tag-fg: var(--braip-tag-ink);
  --braip-tag-status-bg: var(--braip-tag-ink);
  --braip-tag-status-fg: var(--braip-alias-on-active);
}

/* State=Off — o Figma usa opacidade 0.4; nao existe token de opacidade */
.braip-tag.is-off {
  opacity: 0.4;
}
</style>
