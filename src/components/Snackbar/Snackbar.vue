<script setup lang="ts">
/* Espelha o component set "Snackbar" — Braip Components (node 1422:27209).
 * Eixo unico Color, com 7 opcoes (inclui "Neutral Light", o default do set).
 * Icone de check e spinner sao os slots de status; CTA e acao opcional. */
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  color?: 'neutral-light' | 'neutral-dark' | 'purple' | 'green' | 'red' | 'orange' | 'blue'
  text?: string
  showCheck?: boolean
  showSpinner?: boolean
  showCta?: boolean
  cta?: string
  showClose?: boolean
  closeLabel?: string
}>(), {
  color: 'neutral-light',
  text: '',
  showCheck: true,
  showSpinner: false,
  showCta: true,
  cta: '',
  showClose: true,
  closeLabel: 'Fechar',
})

defineEmits<{ close: [], action: [] }>()

/* Snackbar de erro anuncia de forma assertiva; os demais, de forma educada. */
const isError = computed(() => props.color === 'red')
const role = computed(() => (isError.value ? 'alert' : 'status'))
const ariaLive = computed(() => (isError.value ? 'assertive' : 'polite'))
</script>

<template>
  <div
    class="braip-snackbar"
    :class="`is-${color}`"
    :role="role"
    :aria-live="ariaLive"
    aria-atomic="true"
  >
    <span v-if="showSpinner" class="braip-snackbar__status" aria-hidden="true">
      <slot name="spinner" />
    </span>
    <span v-else-if="showCheck" class="braip-snackbar__status" aria-hidden="true">
      <slot name="check" />
    </span>

    <span class="braip-snackbar__text">
      <slot>{{ text }}</slot>
    </span>

    <button
      v-if="showCta && cta"
      type="button"
      class="braip-snackbar__cta"
      @click="$emit('action')"
    >
      {{ cta }}
    </button>

    <button
      v-if="showClose"
      type="button"
      class="braip-snackbar__close"
      :aria-label="closeLabel"
      @click="$emit('close')"
    >
      <slot name="closeIcon" />
    </button>
  </div>
</template>

<style scoped>
.braip-snackbar {
  display: flex;
  align-items: center;
  gap: var(--braip-space-base-xs);
  min-block-size: var(--braip-value-space-56);
  padding-inline: var(--braip-space-base-sm);
  padding-block: var(--braip-space-base-xs);
  border-radius: var(--braip-space-radius-sm);
  background: var(--braip-snackbar-bg);
  color: var(--braip-snackbar-fg);
  font-family: var(--braip-type-font-family-text);
  box-shadow: 0 0 20px var(--braip-alias-overlay-pressed);
}

.braip-snackbar__status {
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  inline-size: var(--braip-value-space-24);
  block-size: var(--braip-value-space-24);
  color: currentColor;
}

.braip-snackbar__text {
  flex: 1 1 auto;
  font-size: var(--braip-type-size-text-p6);
  line-height: var(--braip-type-line-height-text-p6);
  font-weight: var(--braip-type-weight-regular);
}

.braip-snackbar__cta {
  flex: none;
  border: 0;
  background: transparent;
  padding-inline: var(--braip-space-base-xxs);
  color: currentColor;
  font-family: inherit;
  font-size: var(--braip-type-size-text-p6);
  line-height: var(--braip-type-line-height-text-p6);
  font-weight: var(--braip-type-weight-semi-bold);
  text-decoration: underline;
  cursor: pointer;
  border-radius: var(--braip-space-radius-xs);
}

.braip-snackbar__cta:hover {
  background: var(--braip-alias-overlay-hover);
}

.braip-snackbar__cta:active {
  background: var(--braip-alias-overlay-pressed);
}

.braip-snackbar__close {
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  inline-size: var(--braip-value-space-24);
  block-size: var(--braip-value-space-24);
  border: 0;
  border-radius: var(--braip-space-radius-full);
  background: transparent;
  color: currentColor;
  cursor: pointer;
}

.braip-snackbar__close:hover {
  background: var(--braip-alias-overlay-hover);
}

.braip-snackbar__close:active {
  background: var(--braip-alias-overlay-pressed);
}

/* Color — superficie e texto vindos da camada alias */
.braip-snackbar.is-neutral-light {
  --braip-snackbar-bg: var(--braip-alias-bg-surface-primary);
  --braip-snackbar-fg: var(--braip-alias-text-surface-primary);
}

.braip-snackbar.is-neutral-dark {
  --braip-snackbar-bg: var(--braip-alias-neutral-quaternary);
  --braip-snackbar-fg: var(--braip-alias-on-active);
}

.braip-snackbar.is-purple {
  --braip-snackbar-bg: var(--braip-alias-purple-quaternary);
  --braip-snackbar-fg: var(--braip-alias-on-active);
}

.braip-snackbar.is-green {
  --braip-snackbar-bg: var(--braip-alias-green-quaternary);
  --braip-snackbar-fg: var(--braip-alias-on-active);
}

.braip-snackbar.is-red {
  --braip-snackbar-bg: var(--braip-alias-red-quaternary);
  --braip-snackbar-fg: var(--braip-alias-on-active);
}

.braip-snackbar.is-orange {
  --braip-snackbar-bg: var(--braip-alias-orange-quaternary);
  --braip-snackbar-fg: var(--braip-alias-on-active);
}

.braip-snackbar.is-blue {
  --braip-snackbar-bg: var(--braip-alias-blue-quaternary);
  --braip-snackbar-fg: var(--braip-alias-on-active);
}
</style>
