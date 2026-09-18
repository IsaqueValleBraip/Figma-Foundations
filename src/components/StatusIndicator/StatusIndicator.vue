<script setup lang="ts">
/* Espelha o component set "Status" (Braip Components, 1422:20684).
 * DIVIDA: o eixo `Type` do Figma ainda nomeia COR (Purple|Blue|...), nao semantica
 * (success/info/error). Espelhado como esta para manter paridade 1:1 com o set. */
withDefaults(defineProps<{
  type?: 'purple' | 'blue' | 'green' | 'neutral' | 'orange' | 'pink' | 'red'
  text?: string
}>(), { type: 'green', text: '' })
</script>

<template>
  <span class="braip-status" :class="`type-${type}`">
    <span class="braip-status__dot" aria-hidden="true">
      <svg viewBox="0 0 20 20" focusable="false"><path d="M5.8 10.3l2.8 2.8 5.6-6" /></svg>
    </span>
    <span class="braip-status__text"><slot>{{ text }}</slot></span>
  </span>
</template>

<style scoped>
.braip-status {
  display: inline-flex;
  align-items: center;
  gap: var(--braip-space-base-xxs);
  font-family: var(--braip-type-font-family-text);
  font-size: var(--braip-type-size-text-p5);
  line-height: var(--braip-type-line-height-text-p5);
  font-weight: var(--braip-type-weight-regular);
  color: var(--braip-status-fg);
}

/* Bolinha de 20px: sem token de 20 — composta de 16 + 4 */
.braip-status__dot {
  display: inline-flex;
  flex: none;
  inline-size: calc(var(--braip-value-space-16) + var(--braip-value-space-4));
  block-size: calc(var(--braip-value-space-16) + var(--braip-value-space-4));
  border-radius: var(--braip-space-radius-full);
  background: var(--braip-status-bg);
}

.braip-status__dot svg {
  inline-size: 100%;
  block-size: 100%;
  fill: none;
  stroke: var(--braip-color-global-base-white);
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* Type — nomeado por cor no Figma (ver DIVIDA no topo) */
.braip-status.type-purple { --braip-status-bg: var(--braip-alias-purple-tertiary); --braip-status-fg: var(--braip-alias-purple-text); }
.braip-status.type-blue { --braip-status-bg: var(--braip-alias-blue-tertiary); --braip-status-fg: var(--braip-alias-blue-text); }
.braip-status.type-green { --braip-status-bg: var(--braip-alias-green-tertiary); --braip-status-fg: var(--braip-alias-green-text); }
.braip-status.type-neutral { --braip-status-bg: var(--braip-alias-neutral-tertiary); --braip-status-fg: var(--braip-alias-neutral-text); }
.braip-status.type-orange { --braip-status-bg: var(--braip-alias-orange-tertiary); --braip-status-fg: var(--braip-alias-orange-text); }
.braip-status.type-pink { --braip-status-bg: var(--braip-alias-pink-tertiary); --braip-status-fg: var(--braip-alias-pink-text); }
.braip-status.type-red { --braip-status-bg: var(--braip-alias-red-tertiary); --braip-status-fg: var(--braip-alias-red-text); }
</style>
