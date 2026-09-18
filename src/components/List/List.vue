<script setup lang="ts">
/* Espelha o component set "List" (Braip Components, 1422:21987).
 * Eixo unico State (Default/Hover/Pressed/Disabled): Hover e Pressed viram CSS,
 * Disabled vira prop. As booleans do Figma controlam os slots de cada regiao. */
withDefaults(defineProps<{
  /** Figma: State=Disabled */
  disabled?: boolean
  /** Figma: Show Icon System */
  showIconSystem?: boolean
  /** Figma: Show Icon Illustration */
  showIconIllustration?: boolean
  /** Figma: Show Icon Right */
  showIconRight?: boolean
  showCheckbox?: boolean
  showAvatar?: boolean
  showIconArrow?: boolean
  showTitle?: boolean
  showDescription?: boolean
  showSwitch?: boolean
  showRadio?: boolean
  showText?: boolean
}>(), {
  disabled: false,
  showIconSystem: true,
  showIconIllustration: true,
  showIconRight: true,
  showCheckbox: true,
  showAvatar: true,
  showIconArrow: true,
  showTitle: true,
  showDescription: true,
  showSwitch: true,
  showRadio: true,
  showText: true,
})
</script>

<template>
  <div
    class="braip-list"
    :class="{ 'is-disabled': disabled }"
    :aria-disabled="disabled ? 'true' : undefined"
  >
    <div class="braip-list__leading">
      <slot v-if="showCheckbox" name="checkbox" />
      <slot v-if="showIconSystem" name="iconSystem" />
      <slot v-if="showIconIllustration" name="iconIllustration" />
      <slot v-if="showAvatar" name="avatar" />
      <slot v-if="showIconArrow" name="iconArrow" />

      <div class="braip-list__text">
        <span v-if="showTitle" class="braip-list__title"><slot name="title" /></span>
        <span v-if="showDescription" class="braip-list__description"><slot name="description" /></span>
      </div>
    </div>

    <div class="braip-list__trailing">
      <slot v-if="showIconRight" name="iconRight" />
      <slot v-if="showSwitch" name="switch" />
      <slot v-if="showRadio" name="radio" />
      <span v-if="showText" class="braip-list__aux"><slot name="text" /></span>
    </div>
  </div>
</template>

<style scoped>
.braip-list {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: var(--braip-space-radius-sm);
  background: var(--braip-color-global-base-white);
  padding: var(--braip-space-base-xxs) var(--braip-space-base-xs);
  font-family: var(--braip-type-font-family-text);
}

.braip-list__leading,
.braip-list__trailing {
  display: flex;
  align-items: center;
  gap: var(--braip-space-base-xs);
}

.braip-list__text {
  display: flex;
  flex-direction: column;
  gap: var(--braip-space-base-none);
}

.braip-list__title {
  color: var(--braip-alias-text-primary);
  font-size: var(--braip-type-size-text-p5);
  font-weight: var(--braip-type-weight-medium);
}

.braip-list__description {
  color: var(--braip-color-global-surfaces-text-aux-disable);
  font-size: var(--braip-type-size-text-p6);
  font-weight: var(--braip-type-weight-regular);
}

.braip-list__aux {
  color: var(--braip-color-global-surfaces-text-aux-disable);
  font-size: var(--braip-type-size-text-p7);
  font-weight: var(--braip-type-weight-regular);
}

/* State=Hover */
.braip-list:hover:not(.is-disabled) {
  background: var(--braip-color-global-surfaces-bg-secondary);
}

/* State=Pressed — no Figma o texto secundario tambem escurece. */
.braip-list:active:not(.is-disabled) {
  background: var(--braip-color-aux-grey-states-secundary);
}

.braip-list:active:not(.is-disabled) .braip-list__description,
.braip-list:active:not(.is-disabled) .braip-list__aux {
  color: var(--braip-color-global-text-tertiary);
}

/* State=Disabled */
.braip-list.is-disabled {
  background: var(--braip-color-global-base-white);
  pointer-events: none;
}

.braip-list.is-disabled .braip-list__title {
  color: var(--braip-color-global-surfaces-text-aux-disable);
}

.braip-list.is-disabled .braip-list__description,
.braip-list.is-disabled .braip-list__aux {
  color: var(--braip-color-aux-grey-text-secundary);
}
</style>
