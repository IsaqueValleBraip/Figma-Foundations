<script setup lang="ts">
/* Espelha o component set "Badges" (Braip Components, 2032:6385).
 * Eixos do Figma: Type (Only|Number|Text), Color, Border.
 * Border ainda e VARIANT True|False no Figma; aqui vira prop booleana. */
withDefaults(defineProps<{
  type?: 'only' | 'number' | 'text'
  color?: 'red' | 'green' | 'purple' | 'blue' | 'orange' | 'neutral'
  border?: boolean
  label?: string
  count?: number | string
}>(), { type: 'text', color: 'red', border: false, label: '', count: 1 })
</script>

<template>
  <span class="braip-badge" :class="[`is-${type}`, `color-${color}`, { 'has-border': border }]">
    <template v-if="type === 'text'">{{ label }}</template>
    <template v-else-if="type === 'number'">{{ count }}</template>
    <span v-else class="braip-badge__sr" role="status">{{ label }}</span>
  </span>
</template>

<style scoped>
.braip-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border-radius: var(--braip-space-radius-full);
  border: var(--braip-space-base-offset) solid transparent;
  background: var(--braip-badge-bg);
  color: var(--braip-alias-on-active);
  font-family: var(--braip-type-font-family-text);
  font-size: var(--braip-type-size-text-p7);
  line-height: var(--braip-type-line-height-text-p7);
  font-weight: var(--braip-type-weight-semi-bold);
}

/* Type=Text / Type=Number — altura 20px = 16 + 4 (sem token de 20) */
.braip-badge.is-text,
.braip-badge.is-number {
  block-size: calc(var(--braip-value-space-16) + var(--braip-value-space-4));
  padding-inline: var(--braip-space-base-micro);
}

.braip-badge.is-number {
  inline-size: calc(var(--braip-value-space-16) + var(--braip-value-space-4));
  padding-inline: var(--braip-space-base-none);
}

/* Type=Only — ponto de 10px = 8 + 2 (sem token de 10) */
.braip-badge.is-only {
  inline-size: calc(var(--braip-value-space-8) + var(--braip-value-space-2));
  block-size: calc(var(--braip-value-space-8) + var(--braip-value-space-2));
}

.braip-badge__sr {
  position: absolute;
  inline-size: var(--braip-value-space-0);
  block-size: var(--braip-value-space-0);
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

/* Border=True */
.braip-badge.has-border {
  border-color: var(--braip-alias-on-active);
}

/* Color — Figma usa o degrau "tertiary" de cada rampa */
.braip-badge.color-red { --braip-badge-bg: var(--braip-alias-red-tertiary); }
.braip-badge.color-green { --braip-badge-bg: var(--braip-alias-green-tertiary); }
.braip-badge.color-purple { --braip-badge-bg: var(--braip-alias-purple-tertiary); }
.braip-badge.color-blue { --braip-badge-bg: var(--braip-alias-blue-tertiary); }
.braip-badge.color-orange { --braip-badge-bg: var(--braip-alias-orange-tertiary); }
.braip-badge.color-neutral { --braip-badge-bg: var(--braip-alias-neutral-tertiary); }

/* Type=Only usa fill branco no Figma, independente de Color */
.braip-badge.is-only { --braip-badge-bg: var(--braip-color-global-base-white); }
</style>
