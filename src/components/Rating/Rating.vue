<script setup lang="ts">
/* Espelha o component set "Rating" (Braip Components, 90:5298).
 * Eixos: State x Size x Color x Value (240 variantes = 4 x 5 x 2 x 6).
 * Modelado por eixo, nao por variante: Size define a caixa da estrela,
 * Color define os slots de cor, Value (0-5, renomeado de `Full`) e o valor,
 * State=Hover/Pressed vira CSS e State=Disabled vira prop.
 *
 * Acessibilidade: nao e decoracao. Cada nota e um <input type="radio"> real
 * dentro de um fieldset com role="radiogroup", entao Tab entra no grupo, as
 * setas trocam a nota e o leitor de tela anuncia o rotulo. `aria-valuenow` e
 * o texto de resumo expoem a nota atual mesmo em modo somente leitura. */
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  size?: 'xl' | 'lg' | 'md' | 'sm' | 'xs'
  color?: 'purple' | 'yellow'
  /** Figma: Value (0 a 5) — antes chamado `Full`. */
  value?: 0 | 1 | 2 | 3 | 4 | 5
  /** Figma: State=Disabled. */
  disabled?: boolean
  /** Sem interacao: vira apenas leitura semantica (sem inputs). */
  readonly?: boolean
  /** Rotulo acessivel do grupo. */
  label?: string
  name?: string
}>(), {
  size: 'lg',
  color: 'purple',
  value: 0,
  disabled: false,
  readonly: false,
  label: 'Avaliação',
})

defineEmits<{ 'update:value': [value: number] }>()

const stars = [1, 2, 3, 4, 5]
const groupName = computed(() => props.name ?? `braip-rating-${Math.random().toString(36).slice(2, 9)}`)
const summary = computed(() => `${props.value} de 5`)
</script>

<template>
  <div
    v-if="readonly"
    class="braip-rating is-readonly"
    :class="[`is-${size}`, `color-${color}`, { 'is-disabled': disabled }]"
    role="img"
    :aria-label="`${label}: ${summary}`"
  >
    <span
      v-for="star in stars"
      :key="star"
      class="braip-rating__star"
      :class="{ 'is-filled': star <= value }"
      aria-hidden="true"
    ><slot name="star" /></span>
    <span class="braip-rating__summary">{{ summary }}</span>
  </div>

  <fieldset
    v-else
    class="braip-rating"
    :class="[`is-${size}`, `color-${color}`, { 'is-disabled': disabled }]"
    role="radiogroup"
    :aria-label="label"
    :aria-valuenow="value"
    aria-valuemin="0"
    aria-valuemax="5"
    :disabled="disabled"
  >
    <label
      v-for="star in stars"
      :key="star"
      class="braip-rating__star"
      :class="{ 'is-filled': star <= value }"
    >
      <input
        class="braip-rating__input"
        type="radio"
        :name="groupName"
        :value="star"
        :checked="star === value"
        :disabled="disabled"
        :aria-label="`${star} de 5`"
        @change="$emit('update:value', star)"
      >
      <span class="braip-rating__glyph" aria-hidden="true"><slot name="star" /></span>
    </label>
    <span class="braip-rating__summary">{{ summary }}</span>
  </fieldset>
</template>

<style scoped>
/* Sem valores literais: cor de icone vem da camada color/icons (nao ha alias
 * equivalente para ghost/secundary de icone); tamanho vem de value/space. */
.braip-rating {
  display: inline-flex;
  align-items: center;
  gap: var(--braip-space-base-none);
  margin: var(--braip-space-base-none);
  padding: var(--braip-space-base-none);
  border: none;
}

.braip-rating__star {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  inline-size: var(--braip-rating-size);
  block-size: var(--braip-rating-size);
  color: var(--braip-rating-empty);
  cursor: pointer;
}

.braip-rating.is-readonly .braip-rating__star,
.braip-rating.is-disabled .braip-rating__star {
  cursor: default;
}

.braip-rating.is-disabled .braip-rating__star {
  cursor: not-allowed;
}

.braip-rating__input {
  position: absolute;
  inset: 0;
  margin: var(--braip-space-base-none);
  opacity: 0;
  cursor: inherit;
}

.braip-rating__glyph {
  display: inline-flex;
  inline-size: 100%;
  block-size: 100%;
  color: currentColor;
}

/* O resumo textual existe para leitor de tela; nao ocupa espaco visual. */
.braip-rating__summary {
  position: absolute;
  inline-size: 1px;
  block-size: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

/* Size — 48/40/32/24/16px, direto de value/space */
.braip-rating.is-xl { --braip-rating-size: var(--braip-value-space-48); }
.braip-rating.is-lg { --braip-rating-size: var(--braip-value-space-40); }
.braip-rating.is-md { --braip-rating-size: var(--braip-value-space-32); }
.braip-rating.is-sm { --braip-rating-size: var(--braip-value-space-24); }
.braip-rating.is-xs { --braip-rating-size: var(--braip-value-space-16); }

/* Color — slots por familia */
.braip-rating.color-purple {
  --braip-rating-empty: var(--braip-color-brand-core-icons-ghost);
  --braip-rating-filled: var(--braip-color-brand-core-icons-primary);
  --braip-rating-hover: var(--braip-color-brand-core-icons-secundary);
}

.braip-rating.color-yellow {
  --braip-rating-empty: var(--braip-color-aux-yellow-icons-ghost);
  --braip-rating-filled: var(--braip-color-aux-yellow-icons-primary);
  --braip-rating-hover: var(--braip-color-aux-yellow-icons-secundary);
}

/* Value — apenas as estrelas ate o valor atual ficam preenchidas */
.braip-rating__star.is-filled {
  color: var(--braip-rating-filled);
}

/* State=Hover — enquanto o ponteiro percorre o grupo, o tom clareia */
.braip-rating:not(.is-disabled):not(.is-readonly):hover .braip-rating__star.is-filled {
  color: var(--braip-rating-hover);
}

/* State=Pressed — volta ao tom cheio */
.braip-rating:not(.is-disabled):not(.is-readonly):active .braip-rating__star.is-filled {
  color: var(--braip-rating-filled);
}

/* State=Disabled — estrelas vazias caem para o cinza neutro */
.braip-rating.is-disabled .braip-rating__star {
  color: var(--braip-color-aux-grey-icons-ghost);
}

.braip-rating.is-disabled .braip-rating__star.is-filled {
  color: var(--braip-rating-filled);
}

/* Foco visivel: o input e invisivel, entao o anel vai na estrela */
.braip-rating__input:focus-visible ~ .braip-rating__glyph {
  outline: 2px solid var(--braip-alias-stroke-primary);
  outline-offset: var(--braip-space-base-offset);
}
</style>
