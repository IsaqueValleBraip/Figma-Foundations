<script setup lang="ts">
/* Espelha o component set "Pop-up" — Braip Components (node 1422:20286).
 * Usado no guided tour: Type=Default|Welcome|Award e o unico eixo do set.
 * Abertura/fechamento ficam em codigo (`open` + evento `close`), porque o
 * Figma nao modela estado de visibilidade neste set. */
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'

const props = withDefaults(defineProps<{
  type?: 'default' | 'welcome' | 'award'
  open?: boolean
  title?: string
  subtitle?: string
  description?: string
  /** Rotulo acessivel do botao de fechar. */
  closeLabel?: string
}>(), {
  type: 'default',
  open: true,
  title: '',
  subtitle: '',
  description: '',
  closeLabel: 'Fechar',
})

const emit = defineEmits<{ close: [] }>()

let seq = 0
const uid = `braip-guided-tour-${(seq += 1)}-${Math.random().toString(36).slice(2, 8)}`
const titleId = computed(() => `${uid}-title`)
const descriptionId = computed(() => `${uid}-description`)

const dialog = ref<HTMLElement | null>(null)
let lastFocused: HTMLElement | null = null

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    event.stopPropagation()
    emit('close')
  }
}

watch(() => props.open, async (open) => {
  if (open) {
    lastFocused = document.activeElement as HTMLElement | null
    await nextTick()
    dialog.value?.focus()
  } else {
    lastFocused?.focus?.()
    lastFocused = null
  }
}, { immediate: true })

onBeforeUnmount(() => {
  lastFocused = null
})
</script>

<template>
  <div
    v-if="open"
    ref="dialog"
    class="braip-guided-tour"
    :class="`is-${type}`"
    role="dialog"
    aria-modal="false"
    tabindex="-1"
    :aria-labelledby="title ? titleId : undefined"
    :aria-describedby="description ? descriptionId : undefined"
    @keydown="onKeydown"
  >
    <span v-if="$slots.media" class="braip-guided-tour__media" aria-hidden="true">
      <slot name="media" />
    </span>

    <button
      type="button"
      class="braip-guided-tour__close"
      :aria-label="closeLabel"
      @click="emit('close')"
    >
      <slot name="closeIcon" />
    </button>

    <p v-if="subtitle" class="braip-guided-tour__subtitle">{{ subtitle }}</p>
    <h2 v-if="title" :id="titleId" class="braip-guided-tour__title">{{ title }}</h2>
    <p v-if="description" :id="descriptionId" class="braip-guided-tour__description">
      {{ description }}
    </p>

    <footer v-if="$slots.actions" class="braip-guided-tour__actions">
      <slot name="actions" />
    </footer>
  </div>
</template>

<style scoped>
.braip-guided-tour {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--braip-space-base-xs);
  inline-size: var(--braip-value-space-320);
  padding: var(--braip-space-base-md);
  border-radius: var(--braip-space-radius-lg);
  background: var(--braip-guided-tour-bg, var(--braip-alias-bg-surface-primary));
  color: var(--braip-guided-tour-fg, var(--braip-alias-text-surface-primary));
  font-family: var(--braip-type-font-family-text);
  box-shadow: 0 0 20px var(--braip-alias-overlay-pressed);
}

.braip-guided-tour:focus-visible {
  outline: 2px solid var(--braip-alias-brand-core-primary);
  outline-offset: var(--braip-value-space-2);
}

.braip-guided-tour__media {
  display: flex;
  justify-content: center;
  margin-block-end: var(--braip-space-base-xxs);
}

.braip-guided-tour__close {
  position: absolute;
  inset-block-start: var(--braip-space-base-xs);
  inset-inline-end: var(--braip-space-base-xs);
  display: inline-flex;
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

.braip-guided-tour__close:hover {
  background: var(--braip-alias-overlay-hover);
}

.braip-guided-tour__close:active {
  background: var(--braip-alias-overlay-pressed);
}

.braip-guided-tour__subtitle {
  margin: 0;
  font-size: var(--braip-type-size-text-p6);
  line-height: var(--braip-type-line-height-text-p6);
  font-weight: var(--braip-type-weight-semi-bold);
  color: var(--braip-guided-tour-accent, var(--braip-alias-purple-text));
}

.braip-guided-tour__title {
  margin: 0;
  font-size: var(--braip-type-size-text-p3);
  line-height: var(--braip-type-line-height-text-p3);
  font-weight: var(--braip-type-weight-semi-bold);
}

.braip-guided-tour__description {
  margin: 0;
  font-size: var(--braip-type-size-text-p6);
  line-height: var(--braip-type-line-height-text-p6);
  font-weight: var(--braip-type-weight-regular);
  color: var(--braip-alias-text-surface-secondary);
}

.braip-guided-tour__actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--braip-space-base-xxs);
  margin-block-start: var(--braip-space-base-xxs);
}

/* Type — o set muda a superficie e a cor do destaque */
.braip-guided-tour.is-default {
  --braip-guided-tour-accent: var(--braip-alias-purple-text);
}

.braip-guided-tour.is-welcome {
  --braip-guided-tour-bg: var(--braip-alias-bg-branding-primary);
  --braip-guided-tour-fg: var(--braip-alias-on-active);
  --braip-guided-tour-accent: var(--braip-alias-brand-accent-primary);
}

.braip-guided-tour.is-welcome .braip-guided-tour__description {
  color: var(--braip-alias-on-active);
}

.braip-guided-tour.is-award {
  --braip-guided-tour-bg: var(--braip-alias-bg-surface-primary);
  --braip-guided-tour-accent: var(--braip-alias-yellow-text);
}
</style>
