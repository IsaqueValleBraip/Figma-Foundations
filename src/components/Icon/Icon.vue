<script setup lang="ts">
/* Icone do sistema Braip. Um unico componente para toda a familia
 * `Icons/ System` — 721 icones sao 721 entradas no registry, nao 721 componentes.
 *
 * Cor: sempre `currentColor`. Quem posiciona o icone decide a cor, o que mantem
 * botao, campo e tag coerentes sem precisar de prop de cor aqui.
 * Tamanho: 24 e a caixa nativa do Figma; `size` aceita qualquer token de espaco. */
import { icons, type IconName } from './icons'

withDefaults(defineProps<{
  name: IconName
  /** Rotulo acessivel. Sem ele o icone e tratado como decorativo. */
  label?: string
  size?: string
}>(), { size: 'var(--braip-value-space-24)' })
</script>

<template>
  <svg
    class="braip-icon"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    :style="{ width: size, height: size }"
    :role="label ? 'img' : undefined"
    :aria-label="label"
    :aria-hidden="label ? undefined : true"
    v-html="icons[name]"
  />
</template>

<style scoped>
.braip-icon {
  display: inline-block;
  flex: none;
  color: inherit;
}
</style>
