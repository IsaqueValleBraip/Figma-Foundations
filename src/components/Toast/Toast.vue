<script setup lang="ts">
/* Espelha o component set "Toast" (Braip Components, 1422:14187).
 * Eixos: Size=Long|Compact x Color=Purple|Red|Orange|Blue|Green (10 variantes),
 * mais as booleans Icon/Close/Button e os textos Text Title / Text Subtitle.
 * Modelado por eixo: `size` e `color` viram classe, as booleans viram
 * presenca de slot/prop. Color=Red anuncia como alert; o resto como status. */
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  /** Figma: Size */
  size?: 'long' | 'compact'
  /** Figma: Color */
  color?: 'purple' | 'red' | 'orange' | 'blue' | 'green'
  /** Figma: property "Text Title" */
  title: string
  /** Figma: property "Text Subtitle" — so aparece em Size=Long */
  subtitle?: string
  /** Figma: boolean "Close" */
  closable?: boolean
  /** Rotulo acessivel do botao de fechar */
  closeLabel?: string
}>(), {
  size: 'long',
  color: 'purple',
  closable: true,
  closeLabel: 'Fechar notificacao',
})

defineEmits<{ close: [] }>()

// Color=Red e o unico eixo destrutivo do set: interrompe o leitor de tela.
const role = computed(() => (props.color === 'red' ? 'alert' : 'status'))
const live = computed(() => (props.color === 'red' ? 'assertive' : 'polite'))
</script>

<template>
  <div
    class="braip-toast"
    :class="[`is-${size}`, `color-${color}`]"
    :role="role"
    :aria-live="live"
  >
    <div class="braip-toast__content">
      <span v-if="$slots.icon" class="braip-toast__icon" aria-hidden="true"><slot name="icon" /></span>

      <div class="braip-toast__text">
        <p class="braip-toast__title">{{ title }}</p>
        <p v-if="size === 'long' && subtitle" class="braip-toast__subtitle">{{ subtitle }}</p>
        <div v-if="$slots.action" class="braip-toast__action"><slot name="action" /></div>
      </div>
    </div>

    <button
      v-if="closable"
      class="braip-toast__close"
      type="button"
      :aria-label="closeLabel"
      @click="$emit('close')"
    >
      <slot name="closeIcon" />
    </button>
  </div>
</template>

<style scoped>
/* Sem valores literais: superficie/texto da camada alias por familia de cor. */
.braip-toast {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--braip-space-base-xs);
  padding: var(--braip-space-base-sm);
  border: 1px solid var(--braip-toast-bd);
  border-radius: var(--braip-space-radius-sm);
  background: var(--braip-toast-bg);
  color: var(--braip-toast-fg);
  font-family: var(--braip-type-font-family-text);
}

.braip-toast__content {
  display: flex;
  align-items: flex-start;
  gap: var(--braip-space-base-xs);
}

.braip-toast__icon {
  display: inline-flex;
  align-items: center;
  color: var(--braip-toast-icon);
}

.braip-toast__text {
  display: flex;
  flex-direction: column;
  gap: var(--braip-space-base-micro);
}

.braip-toast__title {
  margin: var(--braip-space-base-none);
  font-size: var(--braip-type-size-text-p5);
  line-height: var(--braip-type-line-height-text-p5);
  font-weight: var(--braip-type-weight-semi-bold);
}

.braip-toast__subtitle {
  margin: var(--braip-space-base-none);
  font-size: var(--braip-type-size-text-p6);
  line-height: var(--braip-type-line-height-text-p6);
  font-weight: var(--braip-type-weight-regular);
}

.braip-toast__action {
  padding-block-start: var(--braip-space-base-xxs);
}

.braip-toast__close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--braip-space-base-none);
  border: none;
  background: transparent;
  color: var(--braip-toast-fg);
  cursor: pointer;
  border-radius: var(--braip-space-radius-xs);
}

.braip-toast__close:hover {
  background: var(--braip-alias-overlay-hover);
}

.braip-toast__close:active {
  background: var(--braip-alias-overlay-pressed);
}

/* Size */
.braip-toast.is-compact {
  padding: var(--braip-space-base-xs);
  align-items: center;
}

.braip-toast.is-compact .braip-toast__content {
  align-items: center;
}

/* Color — slots por familia */
.braip-toast.color-purple {
  --braip-toast-bg: var(--braip-alias-purple-primary);
  --braip-toast-bd: var(--braip-alias-purple-tertiary);
  --braip-toast-fg: var(--braip-alias-purple-text);
  --braip-toast-icon: var(--braip-alias-purple-quaternary);
}

.braip-toast.color-red {
  --braip-toast-bg: var(--braip-alias-red-primary);
  --braip-toast-bd: var(--braip-alias-red-tertiary);
  --braip-toast-fg: var(--braip-alias-red-text);
  --braip-toast-icon: var(--braip-alias-red-quaternary);
}

.braip-toast.color-orange {
  --braip-toast-bg: var(--braip-alias-orange-primary);
  --braip-toast-bd: var(--braip-alias-orange-tertiary);
  --braip-toast-fg: var(--braip-alias-orange-text);
  --braip-toast-icon: var(--braip-alias-orange-quaternary);
}

.braip-toast.color-blue {
  --braip-toast-bg: var(--braip-alias-blue-primary);
  --braip-toast-bd: var(--braip-alias-blue-tertiary);
  --braip-toast-fg: var(--braip-alias-blue-text);
  --braip-toast-icon: var(--braip-alias-blue-quaternary);
}

.braip-toast.color-green {
  --braip-toast-bg: var(--braip-alias-green-primary);
  --braip-toast-bd: var(--braip-alias-green-tertiary);
  --braip-toast-fg: var(--braip-alias-green-text);
  --braip-toast-icon: var(--braip-alias-green-quaternary);
}
</style>
