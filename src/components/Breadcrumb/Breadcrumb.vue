<script setup lang="ts">
/* Espelha o component set "Breadcrumb-Group" (Braip Components, 741:18792).
 * Eixos: Amount=2..6 Item x Size=Small|Large.
 * O eixo Amount NAO vira prop: no codigo ele e o tamanho da lista `items` —
 * a variante existe no Figma so porque o canvas nao tem repeticao dinamica.
 * Size desce para cada BraipBreadcrumbItem.
 * Semantica: <nav aria-label> + <ol>; o ultimo item recebe aria-current="page"
 * (via `active` do BreadcrumbItem) e os separadores sao decorativos. */
import BraipBreadcrumbItem from '../BreadcrumbItem/BreadcrumbItem.vue'

export interface BreadcrumbEntry {
  label: string
  href?: string
  disabled?: boolean
}

withDefaults(defineProps<{
  /** Figma: Amount=N Item — derivado do comprimento da lista */
  items: BreadcrumbEntry[]
  /** Figma: Size */
  size?: 'small' | 'large'
  /** Rotulo acessivel da trilha */
  ariaLabel?: string
}>(), { size: 'small', ariaLabel: 'Trilha de navegacao' })
</script>

<template>
  <nav class="braip-breadcrumb" :aria-label="ariaLabel">
    <ol class="braip-breadcrumb__list" :class="[`is-${size}`]">
      <li
        v-for="(item, index) in items"
        :key="`${index}-${item.label}`"
        class="braip-breadcrumb__entry"
      >
        <BraipBreadcrumbItem
          :label="item.label"
          :href="item.href"
          :size="size"
          :disabled="item.disabled"
          :active="index === items.length - 1"
        />
        <!-- "Line Division" do Figma: separador puramente decorativo -->
        <span
          v-if="index < items.length - 1"
          class="braip-breadcrumb__separator"
          aria-hidden="true"
        >
          <slot name="separator">/</slot>
        </span>
      </li>
    </ol>
  </nav>
</template>

<style scoped>
.braip-breadcrumb__list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: var(--braip-space-base-none);
  padding: var(--braip-space-base-none);
  list-style: none;
  font-family: var(--braip-type-font-family-text);
}

.braip-breadcrumb__entry {
  display: inline-flex;
  align-items: center;
}

.braip-breadcrumb__separator {
  display: inline-flex;
  align-items: center;
  color: var(--braip-alias-text-tertiary);
}

/* Size — o espacamento entre item e separador acompanha o eixo */
.braip-breadcrumb__list.is-small .braip-breadcrumb__entry {
  gap: var(--braip-space-base-xxs);
}

.braip-breadcrumb__list.is-small {
  gap: var(--braip-space-base-xxs);
  font-size: var(--braip-type-size-text-p6);
  line-height: var(--braip-type-line-height-text-p6);
}

.braip-breadcrumb__list.is-large .braip-breadcrumb__entry {
  gap: var(--braip-space-base-xs);
}

.braip-breadcrumb__list.is-large {
  gap: var(--braip-space-base-xs);
  font-size: var(--braip-type-size-text-p5);
  line-height: var(--braip-type-line-height-text-p5);
}
</style>
