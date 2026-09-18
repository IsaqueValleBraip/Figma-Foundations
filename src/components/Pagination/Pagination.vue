<script setup lang="ts">
/* Espelha o component set "❖ Page" (Braip Components, 741:18408).
 * Eixos: Type (Default | Arrow) x Amount (2..10 items) = 18 variantes.
 * Amount nao e prop de estilo: e a quantidade de itens numericos visiveis,
 * por isso vira `amount`. Type=Arrow adiciona os controles de anterior/proximo.
 * Cada item e um PaginationItem; os estados Hover/Pressed ficam la, em CSS. */
import { computed } from 'vue'
import PaginationItem from '../PaginationItem/PaginationItem.vue'

const props = withDefaults(defineProps<{
  /** Figma: Type */
  type?: 'default' | 'arrow'
  /** Figma: Amount — quantos numeros de pagina aparecem (2..10) */
  amount?: number
  /** Total de paginas; por padrao igual a `amount` */
  total?: number
  /** Pagina corrente (1-based) */
  modelValue?: number
  size?: 'lg' | 'md' | 'sm'
  disabled?: boolean
  ariaLabel?: string
}>(), {
  type: 'default',
  amount: 2,
  modelValue: 1,
  size: 'sm',
  disabled: false,
  ariaLabel: 'Paginacao',
})

const emit = defineEmits<{ 'update:modelValue': [value: number] }>()

const totalPages = computed(() => Math.max(props.total ?? props.amount, 1))

/** Janela deslizante de `amount` numeros ao redor da pagina corrente. */
const pages = computed(() => {
  const span = Math.min(Math.max(props.amount, 1), totalPages.value)
  let start = props.modelValue - Math.floor((span - 1) / 2)
  start = Math.min(Math.max(start, 1), totalPages.value - span + 1)
  return Array.from({ length: span }, (_, i) => start + i)
})

const atStart = computed(() => props.modelValue <= 1)
const atEnd = computed(() => props.modelValue >= totalPages.value)

function go(page: number) {
  if (props.disabled) return
  const next = Math.min(Math.max(page, 1), totalPages.value)
  if (next !== props.modelValue) emit('update:modelValue', next)
}
</script>

<template>
  <nav class="braip-pagination" :class="`is-${size}`" :aria-label="ariaLabel">
    <ul class="braip-pagination__list">
      <li v-if="type === 'arrow'" class="braip-pagination__cell">
        <PaginationItem
          variant="arrow"
          :size="size"
          :disabled="disabled || atStart"
          label="Pagina anterior"
          @select="go(modelValue - 1)"
        >
          <slot name="prev" />
        </PaginationItem>
      </li>

      <li v-for="page in pages" :key="page" class="braip-pagination__cell">
        <PaginationItem
          variant="number"
          :size="size"
          :active="page === modelValue"
          :disabled="disabled"
          :label="String(page)"
          @select="go(page)"
        />
      </li>

      <li v-if="type === 'arrow'" class="braip-pagination__cell">
        <PaginationItem
          variant="arrow"
          :size="size"
          :disabled="disabled || atEnd"
          label="Proxima pagina"
          @select="go(modelValue + 1)"
        >
          <slot name="next" />
        </PaginationItem>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
/* Divida conhecida: a pagina do Figma esta em escala 0.8 (padding 19.2, gap 6.4).
 * Aqui usamos a escala real dos tokens: 24 (space-base-sm) e 8 (space-base-xxs). */
.braip-pagination {
  display: inline-flex;
}

.braip-pagination__list {
  display: flex;
  align-items: center;
  gap: var(--braip-space-base-xxs);
  margin: var(--braip-space-base-none);
  padding: var(--braip-space-base-xxs) var(--braip-space-base-sm);
  border-radius: var(--braip-space-radius-lg);
  list-style: none;
}

.braip-pagination__cell {
  display: inline-flex;
}
</style>
