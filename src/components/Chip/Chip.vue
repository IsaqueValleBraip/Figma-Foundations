<script setup lang="ts">
/* Espelha o component set "Chips" (Braip Components, 666:46971).
 * Eixos do Figma: Type x Style x State x Color x Mode (168 variantes).
 * Modelado por eixo: Color define os slots de cor, Style define o elemento
 * de abertura (avatar / icone / so texto), Type define se ha botao de remover.
 * State=Hover/Pressed vira CSS; State=Active e State=Disabled viram prop.
 * O eixo Mode (On/Off) e redundante no arquivo: Off so aparece junto de
 * State=Disabled, entao ele nao vira prop (ver relatorio de gaps). */
withDefaults(defineProps<{
  /** Figma: Type — Selected traz o botao de remover; Assist e so acionavel. */
  type?: 'selected' | 'assist'
  /** Figma: Style — elemento de abertura do chip. Nome `lead` para nao colidir
   *  com o atributo `style` de fallthrough do Vue. */
  lead?: 'avatar' | 'icon' | 'text'
  color?: 'purple' | 'red' | 'orange' | 'blue' | 'pink' | 'grey' | 'green'
  /** Figma: State=Active (so existe em Type=Assist). */
  actived?: boolean
  /** Figma: State=Disabled (equivale a Mode=Off). */
  disabled?: boolean
  label: string
  /** Rotulo acessivel do botao de remover (Type=Selected). */
  removeLabel?: string
}>(), {
  type: 'assist',
  lead: 'text',
  color: 'purple',
  actived: false,
  disabled: false,
  removeLabel: 'Remover',
})

defineEmits<{ remove: []; click: [] }>()
</script>

<template>
  <button
    class="braip-chip"
    type="button"
    :class="[`is-${type}`, `lead-${lead}`, `color-${color}`, { 'is-actived': actived }]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <span v-if="lead !== 'text'" class="braip-chip__lead">
      <slot :name="lead === 'avatar' ? 'avatar' : 'icon'" />
    </span>
    <span class="braip-chip__label">{{ label }}</span>
    <span
      v-if="type === 'selected'"
      class="braip-chip__remove"
      role="button"
      tabindex="-1"
      :aria-label="removeLabel"
      @click.stop="$emit('remove')"
    >
      <slot name="remove" />
    </span>
  </button>
</template>

<style scoped>
/* Sem valores literais: superficie e texto saem da camada alias,
 * altura/padding/raio/gap saem de space e value. */
.braip-chip {
  display: inline-flex;
  align-items: center;
  block-size: calc(var(--braip-value-space-24) + var(--braip-value-space-4));
  gap: var(--braip-space-base-micro);
  padding-block: var(--braip-space-base-micro);
  border: none;
  border-radius: var(--braip-space-radius-sm);
  background: var(--braip-chip-bg);
  color: var(--braip-chip-fg);
  font-family: var(--braip-type-font-family-text);
  font-size: var(--braip-type-size-text-p6);
  line-height: var(--braip-type-line-height-text-p6);
  font-weight: var(--braip-type-weight-medium);
  cursor: pointer;
}

/* Type — Selected reserva espaco menor a direita para o botao de remover */
.braip-chip.is-assist {
  padding-inline: var(--braip-space-base-xxs);
}

.braip-chip.is-selected {
  padding-inline-start: var(--braip-space-base-xxs);
  padding-inline-end: var(--braip-space-base-micro);
}

.braip-chip__lead,
.braip-chip__remove {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  inline-size: var(--braip-value-space-16);
  block-size: var(--braip-value-space-16);
  color: currentColor;
}

.braip-chip.lead-avatar .braip-chip__lead {
  border-radius: var(--braip-space-radius-full);
  overflow: hidden;
}

.braip-chip__remove {
  cursor: pointer;
}

.braip-chip__label {
  white-space: nowrap;
}

/* Color — slots por familia (default / hover / actived) */
.braip-chip.color-purple {
  --braip-chip-surface: var(--braip-alias-purple-primary);
  --braip-chip-surface-hover: var(--braip-alias-purple-secondary);
  --braip-chip-surface-actived: var(--braip-alias-purple-tertiary);
  --braip-chip-text: var(--braip-alias-purple-text);
}

.braip-chip.color-red {
  --braip-chip-surface: var(--braip-alias-red-primary);
  --braip-chip-surface-hover: var(--braip-alias-red-secondary);
  --braip-chip-surface-actived: var(--braip-alias-red-tertiary);
  --braip-chip-text: var(--braip-alias-red-text);
}

.braip-chip.color-orange {
  --braip-chip-surface: var(--braip-alias-orange-primary);
  --braip-chip-surface-hover: var(--braip-alias-orange-secondary);
  --braip-chip-surface-actived: var(--braip-alias-orange-tertiary);
  --braip-chip-text: var(--braip-alias-orange-text);
}

.braip-chip.color-blue {
  --braip-chip-surface: var(--braip-alias-blue-primary);
  --braip-chip-surface-hover: var(--braip-alias-blue-secondary);
  --braip-chip-surface-actived: var(--braip-alias-blue-tertiary);
  --braip-chip-text: var(--braip-alias-blue-text);
}

.braip-chip.color-pink {
  --braip-chip-surface: var(--braip-alias-pink-primary);
  --braip-chip-surface-hover: var(--braip-alias-pink-secondary);
  --braip-chip-surface-actived: var(--braip-alias-pink-tertiary);
  --braip-chip-text: var(--braip-alias-pink-text);
}

.braip-chip.color-grey {
  --braip-chip-surface: var(--braip-alias-neutral-primary);
  --braip-chip-surface-hover: var(--braip-alias-neutral-secondary);
  --braip-chip-surface-actived: var(--braip-alias-neutral-tertiary);
  --braip-chip-text: var(--braip-alias-neutral-text);
}

.braip-chip.color-green {
  --braip-chip-surface: var(--braip-alias-green-primary);
  --braip-chip-surface-hover: var(--braip-alias-green-secondary);
  --braip-chip-surface-actived: var(--braip-alias-green-tertiary);
  --braip-chip-text: var(--braip-alias-green-text);
}

/* State=Default */
.braip-chip {
  --braip-chip-bg: var(--braip-chip-surface);
  --braip-chip-fg: var(--braip-chip-text);
}

/* State=Hover */
.braip-chip:hover:not(:disabled) {
  --braip-chip-bg: var(--braip-chip-surface-hover);
}

/* State=Pressed — so existe em Type=Selected */
.braip-chip.is-selected:active:not(:disabled) {
  --braip-chip-bg: var(--braip-chip-surface-actived);
  --braip-chip-fg: var(--braip-alias-on-active);
}

/* State=Active — so existe em Type=Assist */
.braip-chip.is-actived:not(:disabled),
.braip-chip.is-actived:hover:not(:disabled) {
  --braip-chip-bg: var(--braip-chip-surface-actived);
  --braip-chip-fg: var(--braip-alias-on-active);
}

/* State=Disabled — superficie neutra; a opacidade 0.4 do Figma nao tem token */
.braip-chip:disabled {
  --braip-chip-bg: var(--braip-alias-neutral-primary);
  --braip-chip-fg: var(--braip-alias-neutral-text);
  opacity: 0.4;
  cursor: not-allowed;
}
</style>
