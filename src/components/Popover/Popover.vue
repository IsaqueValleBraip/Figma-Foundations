<script setup lang="ts">
/* Espelha o component set "Popover" — Braip Components (node 1422:20329).
 * Eixo unico: Type = posicao da bolha em relacao ao gatilho.
 * O eixo se chama `position` aqui, alinhado a Tooltip/TooltipIcon, e usa
 * top|bottom|left|right. No Figma a opcao "Top" esta grafada "Higher"
 * (traducao errada de "Superior"); a correcao esta adiada — ver Popover.figma.ts. */
import { computed, nextTick, ref, watch } from 'vue'

const props = withDefaults(defineProps<{
  position?: 'top' | 'bottom' | 'left' | 'right'
  open?: boolean
  title?: string
  description?: string
  closeLabel?: string
}>(), {
  position: 'right',
  open: false,
  title: '',
  description: '',
  closeLabel: 'Fechar',
})

const emit = defineEmits<{ close: [] }>()

let seq = 0
const uid = `braip-popover-${(seq += 1)}-${Math.random().toString(36).slice(2, 8)}`
const titleId = computed(() => `${uid}-title`)
const descriptionId = computed(() => `${uid}-description`)

const bubble = ref<HTMLElement | null>(null)
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
    bubble.value?.focus()
  } else {
    lastFocused?.focus?.()
    lastFocused = null
  }
})

defineExpose({ titleId, descriptionId })
</script>

<template>
  <span class="braip-popover" :class="`pos-${position}`">
    <span class="braip-popover__trigger">
      <slot name="trigger" />
    </span>

    <div
      v-if="open"
      ref="bubble"
      class="braip-popover__bubble"
      role="dialog"
      tabindex="-1"
      :aria-labelledby="title ? titleId : undefined"
      :aria-describedby="description ? descriptionId : undefined"
      @keydown="onKeydown"
    >
      <span class="braip-popover__arrow" aria-hidden="true" />

      <div class="braip-popover__content">
        <button
          type="button"
          class="braip-popover__close"
          :aria-label="closeLabel"
          @click="emit('close')"
        >
          <slot name="closeIcon" />
        </button>

        <p v-if="title" :id="titleId" class="braip-popover__title">{{ title }}</p>
        <p v-if="description" :id="descriptionId" class="braip-popover__description">
          {{ description }}
        </p>

        <footer v-if="$slots.actions" class="braip-popover__actions">
          <slot name="actions" />
        </footer>
      </div>
    </div>
  </span>
</template>

<style scoped>
.braip-popover {
  position: relative;
  display: inline-flex;
}

.braip-popover__trigger {
  display: inline-flex;
}

.braip-popover__bubble {
  position: absolute;
  z-index: 1;
  display: flex;
  inline-size: max-content;
  max-inline-size: var(--braip-value-space-320);
}

.braip-popover__bubble:focus-visible {
  outline: none;
}

/* Position — eixo da bolha e direcao da seta */
.braip-popover.pos-top .braip-popover__bubble,
.braip-popover.pos-bottom .braip-popover__bubble {
  flex-direction: column;
  left: 50%;
  transform: translateX(-50%);
}

.braip-popover.pos-top .braip-popover__bubble {
  bottom: 100%;
  flex-direction: column-reverse;
}

.braip-popover.pos-bottom .braip-popover__bubble {
  top: 100%;
}

.braip-popover.pos-left .braip-popover__bubble,
.braip-popover.pos-right .braip-popover__bubble {
  flex-direction: row;
  top: 50%;
  transform: translateY(-50%);
}

.braip-popover.pos-left .braip-popover__bubble {
  right: 100%;
  flex-direction: row-reverse;
}

.braip-popover.pos-right .braip-popover__bubble {
  left: 100%;
}

.braip-popover__arrow {
  flex: none;
  align-self: center;
  inline-size: 0;
  block-size: 0;
  border: 6px solid transparent;
}

.braip-popover.pos-top .braip-popover__arrow {
  border-top-color: var(--braip-popover-bg);
  border-bottom-width: 0;
}

.braip-popover.pos-bottom .braip-popover__arrow {
  border-bottom-color: var(--braip-popover-bg);
  border-top-width: 0;
}

.braip-popover.pos-left .braip-popover__arrow {
  border-left-color: var(--braip-popover-bg);
  border-right-width: 0;
}

.braip-popover.pos-right .braip-popover__arrow {
  border-right-color: var(--braip-popover-bg);
  border-left-width: 0;
}

.braip-popover__content {
  --braip-popover-bg: var(--braip-alias-bg-branding-primary);
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--braip-space-base-xxs);
  padding: var(--braip-space-base-sm);
  border-radius: var(--braip-space-radius-sm);
  background: var(--braip-popover-bg);
  color: var(--braip-alias-on-active);
  font-family: var(--braip-type-font-family-text);
  box-shadow: 0 0 20px var(--braip-alias-overlay-pressed);
}

.braip-popover__close {
  position: absolute;
  inset-block-start: var(--braip-space-base-xxs);
  inset-inline-end: var(--braip-space-base-xxs);
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

.braip-popover__close:hover {
  background: var(--braip-alias-overlay-hover);
}

.braip-popover__close:active {
  background: var(--braip-alias-overlay-pressed);
}

.braip-popover__title {
  margin: 0;
  padding-inline-end: var(--braip-space-base-md);
  font-size: var(--braip-type-size-text-p5);
  line-height: var(--braip-type-line-height-text-p5);
  font-weight: var(--braip-type-weight-semi-bold);
}

.braip-popover__description {
  margin: 0;
  font-size: var(--braip-type-size-text-p6);
  line-height: var(--braip-type-line-height-text-p6);
  font-weight: var(--braip-type-weight-regular);
}

.braip-popover__actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--braip-space-base-xxs);
  margin-block-start: var(--braip-space-base-xxs);
}
</style>
