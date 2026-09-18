<script setup lang="ts">
/* Espelha o component set "Avatar-Group" (Braip Components, 777:23380).
 * Eixos: Amount (2|3|4|5+) e Size (XL..XS).
 * A sobreposicao usa gap NEGATIVO no Figma — nao existe token de gap negativo,
 * entao e derivada com calc() sobre os primitivos de espaco (ver GAP no relatorio). */
withDefaults(defineProps<{
  amount?: '2' | '3' | '4' | '5+'
  size?: 'xl' | 'lg' | 'md' | 'sm' | 'xs'
  label?: string
}>(), { amount: '3', size: 'md', label: '' })
</script>

<template>
  <span
    class="braip-avatar-group"
    :class="[`is-${size}`, `amount-${amount === '5+' ? 'overflow' : amount}`]"
    role="group"
    :aria-label="label || undefined"
  >
    <slot />
  </span>
</template>

<style scoped>
.braip-avatar-group {
  display: inline-flex;
  align-items: center;
  /* gap negativo = sobreposicao; derivado do primitivo de espaco do tamanho */
  gap: calc(-1 * var(--braip-avatar-group-overlap));
}

.braip-avatar-group > :deep(*) {
  flex: none;
}

/* Size — sobreposicao de 40 / 32 / 24 / 16 / 12 por tamanho */
.braip-avatar-group.is-xl { --braip-avatar-group-overlap: var(--braip-value-space-40); }
.braip-avatar-group.is-lg { --braip-avatar-group-overlap: var(--braip-value-space-32); }
.braip-avatar-group.is-md { --braip-avatar-group-overlap: var(--braip-value-space-24); }
.braip-avatar-group.is-sm { --braip-avatar-group-overlap: var(--braip-value-space-16); }
.braip-avatar-group.is-xs { --braip-avatar-group-overlap: var(--braip-value-space-12); }
</style>
