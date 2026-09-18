<script setup lang="ts">
/* Espelha o component set "❖ Tabs-Container" (Braip Components, 765:19798).
 * Eixos: Size (Small/Medium/Large) x Amount (2..9 item) = 24 variantes.
 * Amount e a quantidade de abas, logo vira a lista `items` (o tamanho dela) e nao uma variante.
 * Navegacao por setas com roving tabindex: so a aba selecionada fica tabbable. */
import { ref } from 'vue'
import Tab from '../Tab/Tab.vue'

export interface TabsItem {
  label: string
  disabled?: boolean
  badge?: boolean
  /** id do painel (aria-controls) */
  controls?: string
}

const props = withDefaults(defineProps<{
  items: TabsItem[]
  size?: 'lg' | 'md' | 'sm'
  /** Figma: property Navigation — mostra os controles de rolagem da faixa */
  navigation?: boolean
  /** indice da aba selecionada */
  modelValue?: number
  ariaLabel?: string
}>(), { size: 'sm', navigation: false, modelValue: 0, ariaLabel: 'Abas' })

const emit = defineEmits<{ 'update:modelValue': [value: number] }>()

const list = ref<HTMLElement | null>(null)

function focusTab(index: number) {
  const nodes = list.value?.querySelectorAll<HTMLButtonElement>('[role="tab"]')
  nodes?.[index]?.focus()
}

function nextEnabled(from: number, step: number) {
  const n = props.items.length
  for (let i = 1; i <= n; i++) {
    const idx = (from + step * i + n * n) % n
    if (!props.items[idx]?.disabled) return idx
  }
  return from
}

function onKeydown(event: KeyboardEvent) {
  const map: Record<string, number | 'home' | 'end'> = {
    ArrowRight: 1,
    ArrowDown: 1,
    ArrowLeft: -1,
    ArrowUp: -1,
    Home: 'home',
    End: 'end',
  }
  const action = map[event.key]
  if (action === undefined) return
  event.preventDefault()
  let target: number
  if (action === 'home') target = nextEnabled(-1, 1)
  else if (action === 'end') target = nextEnabled(props.items.length, -1)
  else target = nextEnabled(props.modelValue, action)
  emit('update:modelValue', target)
  focusTab(target)
}
</script>

<template>
  <div class="braip-tabs" :class="[`is-${size}`, { 'has-navigation': navigation }]">
    <button
      v-if="navigation"
      class="braip-tabs__nav"
      type="button"
      aria-label="Rolar abas para tras"
      @click="$emit('update:modelValue', nextEnabled(modelValue, -1))"
    >
      <slot name="navPrev" />
    </button>

    <div
      ref="list"
      class="braip-tabs__list"
      role="tablist"
      :aria-label="ariaLabel"
      @keydown="onKeydown"
    >
      <Tab
        v-for="(item, index) in items"
        :key="item.label + index"
        type="container"
        :size="size"
        :active="index === modelValue"
        :disabled="item.disabled"
        :badge="item.badge"
        :controls="item.controls"
        @select="$emit('update:modelValue', index)"
      >
        {{ item.label }}
        <template #badge><slot name="badge" :item="item" :index="index" /></template>
      </Tab>
    </div>

    <button
      v-if="navigation"
      class="braip-tabs__nav"
      type="button"
      aria-label="Rolar abas para frente"
      @click="$emit('update:modelValue', nextEnabled(modelValue, 1))"
    >
      <slot name="navNext" />
    </button>
  </div>
</template>

<style scoped>
.braip-tabs {
  display: inline-flex;
  align-items: center;
  gap: var(--braip-space-base-xxs);
}

.braip-tabs__list {
  display: inline-flex;
  align-items: center;
  gap: var(--braip-space-base-micro);
  padding: var(--braip-space-base-micro);
  border-radius: var(--braip-space-radius-lg);
  background: var(--braip-alias-bg-secondary);
}

.braip-tabs__nav {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: var(--braip-space-radius-md);
  background: transparent;
  color: var(--braip-alias-text-tertiary);
  cursor: pointer;
}

.braip-tabs__nav:hover {
  background: var(--braip-alias-overlay-hover);
  color: var(--braip-alias-purple-text);
}

.braip-tabs__nav:active {
  background: var(--braip-alias-overlay-pressed);
}

.braip-tabs.is-sm .braip-tabs__nav {
  inline-size: var(--braip-value-space-32);
  block-size: var(--braip-value-space-32);
}

.braip-tabs.is-md .braip-tabs__nav {
  inline-size: var(--braip-value-space-40);
  block-size: var(--braip-value-space-40);
}

.braip-tabs.is-lg .braip-tabs__nav {
  inline-size: var(--braip-value-space-48);
  block-size: var(--braip-value-space-48);
}
</style>
