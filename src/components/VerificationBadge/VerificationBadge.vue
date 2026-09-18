<script setup lang="ts">
/* Espelha o component set "Verification" (Braip Components, 1422:20615).
 * Eixos: Size (XL..XS) e Border (True|False, aqui prop booleana).
 * O selo e decorativo por padrao; `label` promove a leitura por AT. */
withDefaults(defineProps<{
  size?: 'xl' | 'lg' | 'md' | 'sm' | 'xs'
  border?: boolean
  label?: string
}>(), { size: 'lg', border: true, label: '' })
</script>

<template>
  <span
    class="braip-verification"
    :class="[`is-${size}`, { 'has-border': border }]"
    :role="label ? 'img' : undefined"
    :aria-label="label || undefined"
    :aria-hidden="label ? undefined : 'true'"
  >
    <svg class="braip-verification__mark" viewBox="0 0 24 24" focusable="false" aria-hidden="true">
      <path
        class="braip-verification__shape"
        d="M12 1.5l2.6 1.9 3.2-.2.9 3.1 2.6 1.9-1.3 2.9 1.3 2.9-2.6 1.9-.9 3.1-3.2-.2L12 22.5l-2.6-1.9-3.2.2-.9-3.1L2.7 15.8 4 12.9l-1.3-2.9 2.6-1.9.9-3.1 3.2.2z"
      />
      <path class="braip-verification__check" d="M7.5 12.2l3 3 6-6.4" />
    </svg>
  </span>
</template>

<style scoped>
.braip-verification {
  display: inline-flex;
}

.braip-verification__mark {
  inline-size: 100%;
  block-size: 100%;
}

.braip-verification__shape {
  fill: var(--braip-alias-blue-tertiary);
  stroke: none;
}

.braip-verification__check {
  fill: none;
  stroke: var(--braip-color-global-base-white);
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* Border=True — anel branco em volta do selo */
.braip-verification.has-border .braip-verification__shape {
  stroke: var(--braip-color-global-base-white);
  stroke-width: 1;
}

/* Size — 32 / 24 / 18 / 16 / 12; 18 nao tem token proprio (16 + 2) */
.braip-verification.is-xl { inline-size: var(--braip-value-space-32); block-size: var(--braip-value-space-32); }
.braip-verification.is-lg { inline-size: var(--braip-value-space-24); block-size: var(--braip-value-space-24); }
.braip-verification.is-md {
  inline-size: calc(var(--braip-value-space-16) + var(--braip-value-space-2));
  block-size: calc(var(--braip-value-space-16) + var(--braip-value-space-2));
}
.braip-verification.is-sm { inline-size: var(--braip-value-space-16); block-size: var(--braip-value-space-16); }
.braip-verification.is-xs { inline-size: var(--braip-value-space-12); block-size: var(--braip-value-space-12); }
</style>
