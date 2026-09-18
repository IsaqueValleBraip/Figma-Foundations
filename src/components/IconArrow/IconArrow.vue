<script setup lang="ts">
/* Espelha o component set "Icon Arrow" (Braip Components, 1422:21961).
 * Eixo unico: Direction=Up|Down. Decorativo por padrao (aria-hidden);
 * quando `interactive` for true vira button com rotulo acessivel. */
withDefaults(defineProps<{
  direction?: 'up' | 'down'
  /** Quando true renderiza como botao e deixa de ser decorativo. */
  interactive?: boolean
  /** Rotulo acessivel — obrigatorio quando interactive. */
  label?: string
  disabled?: boolean
}>(), { direction: 'down', interactive: false, disabled: false })
</script>

<template>
  <component
    :is="interactive ? 'button' : 'span'"
    class="braip-icon-arrow"
    :class="`dir-${direction}`"
    :type="interactive ? 'button' : undefined"
    :disabled="interactive ? disabled : undefined"
    :aria-hidden="interactive ? undefined : 'true'"
    :aria-label="interactive ? label : undefined"
  >
    <span class="braip-icon-arrow__bg" />
    <span class="braip-icon-arrow__icon"><slot /></span>
  </component>
</template>

<style scoped>
.braip-icon-arrow {
  display: inline-flex;
  position: relative;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: var(--braip-space-radius-none);
  background: transparent;
  padding: var(--braip-space-base-none);
  color: currentColor;
}

button.braip-icon-arrow {
  cursor: pointer;
}

button.braip-icon-arrow:disabled {
  cursor: not-allowed;
}

/* "bg" do Figma — retangulo com radius/sm atras do vetor. */
.braip-icon-arrow__bg {
  position: absolute;
  inset: 0;
  border-radius: var(--braip-space-radius-sm);
}

.braip-icon-arrow__icon {
  display: inline-flex;
  position: relative;
  align-items: center;
  justify-content: center;
}

/* Direction — no Figma o set troca o icone (arrow-up-r / arrow-down-r).
 * Em codigo o icone vem pelo slot; a classe so marca a semantica do eixo
 * e fica disponivel para o consumidor estilizar. */
</style>
