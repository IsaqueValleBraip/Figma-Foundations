<script setup lang="ts">
/* Espelha o component set "❖ Tabs-Fixed" (Braip Components, 765:20092).
 * Eixos: Size (Small/Medium/Large) x Amount (2..4 item) = 9 variantes.
 * Amount vira o tamanho da lista `items`; as abas dividem a largura em fracoes iguais
 * e o selecionado e marcado por sublinhado (Tab type="fixed").
 * Navegacao por setas com roving tabindex. */
import { ref } from 'vue'
import Tab from '../Tab/Tab.vue'

export interface TabsFixedItem {
  label: string
  disabled?: boolean
  badge?: boolean
  controls?: string
}

const props = withDefaults(defineProps<{
  items: TabsFixedItem[]
  size?: 'lg' | 'md' | 'sm'
  modelValue?: number
  ariaLabel?: string
}>(), { size: 'sm', modelValue: 0, ariaLabel: 'Abas' })

const emit = defineEmits<{ 'update:modelValue': [value: number] }>()

const list = ref<HTMLElement | null>(null)

function focusTab(index: number) {
  list.value?.querySelectorAll<HTMLButtonElement>('[role="tab"]')?.[index]?.focus()
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
  <div
    ref="list"
    class="braip-tabs-fixed"
    :class="`is-${size}`"
    role="tablist"
    :aria-label="ariaLabel"
    @keydown="onKeydown"
  >
    <Tab
      v-for="(item, index) in items"
      :key="item.label + index"
      type="fixed"
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
</template>

<style scoped>
.braip-tabs-fixed {
  display: flex;
  inline-size: 100%;
  border-block-end: 1px solid var(--braip-alias-stroke-primary);
}
</style>
