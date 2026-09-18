<script setup lang="ts">
/* Espelha o component set "Tags/ Squircle" (Braip Components, 1925:45076).
 * Medido no Figma: identico ao set "Tags" em cor, padding, gap, tipografia e
 * tamanho — so o raio muda (radius/md em vez de radius/full). Por isso este
 * componente NAO duplica CSS: ele fixa `shape="squircle"` sobre o Tag.
 * O Code Connect proprio (TagSquircle.figma.ts) aponta para o set correto. */
import Tag from '../Tag/Tag.vue'

withDefaults(defineProps<{
  type?: 'icon' | 'text'
  variant?: 'solid' | 'minimalist'
  color?: 'purple' | 'red' | 'orange' | 'blue' | 'pink' | 'grey' | 'green' | 'yellow'
  /** Figma: State=Off. */
  off?: boolean
  label: string
}>(), { type: 'text', variant: 'solid', color: 'purple', off: false })
</script>

<template>
  <Tag
    :type="type"
    :variant="variant"
    :color="color"
    :off="off"
    :label="label"
    shape="squircle"
  >
    <template #icon><slot name="icon" /></template>
  </Tag>
</template>
