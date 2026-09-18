<script setup lang="ts">
/* Espelha o COMPONENT "Sales Metrics" (Braip Components, 2278:1931).
 * Sem eixo de variante: um unico componente com a boolean `Show Actions`.
 * Composicao: cabecalho (titulo + acoes), grafico e corpo de tabela — todos
 * por slot, para nao duplicar Table/Chart aqui. */
withDefaults(defineProps<{
  /** Figma: Show Actions */
  showActions?: boolean
  title?: string
}>(), { showActions: true })
</script>

<template>
  <section class="braip-sales-metrics">
    <header class="braip-sales-metrics__header">
      <h2 class="braip-sales-metrics__title">{{ title }}<slot name="title" /></h2>
      <div v-if="showActions" class="braip-sales-metrics__actions">
        <slot name="actions" />
      </div>
    </header>

    <div v-if="$slots.chart" class="braip-sales-metrics__chart"><slot name="chart" /></div>

    <div class="braip-sales-metrics__table"><slot name="table" /></div>
  </section>
</template>

<style scoped>
.braip-sales-metrics {
  display: flex;
  flex-direction: column;
  gap: var(--braip-space-base-xs);
  font-family: var(--braip-type-font-family-text);
}

.braip-sales-metrics__header {
  display: flex;
  align-items: center;
  gap: var(--braip-space-base-md);
}

.braip-sales-metrics__title {
  margin: var(--braip-space-base-none);
  color: var(--braip-color-global-text-primary);
  font-size: var(--braip-type-size-text-p3);
  font-weight: var(--braip-type-weight-medium);
}

.braip-sales-metrics__actions {
  display: flex;
  align-items: center;
  gap: var(--braip-space-base-xs);
}

.braip-sales-metrics__chart {
  display: flex;
}

/* Corpo da tabela — borda e raio do container; as celulas vem pelo slot. */
.braip-sales-metrics__table {
  display: flex;
  border: 1px solid var(--braip-alias-neutral-secondary);
  border-radius: var(--braip-space-radius-sm);
  overflow: hidden;
}
</style>
