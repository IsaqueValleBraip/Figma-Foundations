<script setup lang="ts">
/* Espelha o component set "❖ Dropdown-Menu" (Braip Components, 731:15730).
 * Eixo unico Type (None/Icon/Checkbox/Radio/Avatar/Phone) — o mesmo Type dos
 * DropdownItem que a lista recebe pelo slot padrao. Scroll vira prop.
 * Navegacao por teclado: setas movem o foco entre as options, Enter seleciona,
 * Esc fecha. role=listbox no container e role=option em cada DropdownItem. */
import { ref } from 'vue'

withDefaults(defineProps<{
  /** Figma: Type — "Phone" apos a padronizacao EN */
  type?: 'none' | 'icon' | 'checkbox' | 'radio' | 'avatar' | 'phone'
  /** Figma: Scroll */
  scroll?: boolean
  label: string
  multiple?: boolean
}>(), { type: 'none', scroll: true, multiple: false })

const emit = defineEmits<{ close: [] }>()

const list = ref<HTMLUListElement | null>(null)

function options(): HTMLElement[] {
  if (!list.value) return []
  return Array.from(
    list.value.querySelectorAll<HTMLElement>('[role="option"]:not([aria-disabled="true"])'),
  )
}

function move(step: number) {
  const items = options()
  if (!items.length) return
  const current = items.indexOf(document.activeElement as HTMLElement)
  const next = (current + step + items.length) % items.length
  items[current === -1 && step < 0 ? items.length - 1 : next]?.focus()
}

function onKeydown(event: KeyboardEvent) {
  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      move(1)
      break
    case 'ArrowUp':
      event.preventDefault()
      move(-1)
      break
    case 'Home':
      event.preventDefault()
      options()[0]?.focus()
      break
    case 'End':
      event.preventDefault()
      options().at(-1)?.focus()
      break
    case 'Enter':
    case ' ':
      if (document.activeElement && options().includes(document.activeElement as HTMLElement)) {
        event.preventDefault()
        ;(document.activeElement as HTMLElement).click()
      }
      break
    case 'Escape':
      event.preventDefault()
      emit('close')
      break
  }
}

defineExpose({ focusFirst: () => options()[0]?.focus() })
</script>

<template>
  <ul
    ref="list"
    class="braip-dropdown-menu"
    :class="[`is-${type}`, { 'is-scrollable': scroll }]"
    role="listbox"
    :aria-label="label"
    :aria-multiselectable="multiple || undefined"
    tabindex="0"
    @keydown="onKeydown"
  >
    <slot />
  </ul>
</template>

<style scoped>
.braip-dropdown-menu {
  display: flex;
  flex-direction: column;
  gap: var(--braip-space-base-micro);
  margin: var(--braip-space-base-none);
  padding: var(--braip-space-base-xs);
  border: 1px solid var(--braip-alias-stroke-primary);
  border-radius: var(--braip-space-radius-sm);
  background: var(--braip-alias-bg-surface-primary);
  list-style: none;
}

.braip-dropdown-menu:focus-visible {
  border-color: var(--braip-alias-brand-core-primary);
  outline: none;
}

.braip-dropdown-menu.is-scrollable {
  max-block-size: var(--braip-value-space-320);
  overflow-y: auto;
}
</style>
