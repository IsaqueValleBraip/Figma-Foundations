<script setup lang="ts">
/* Espelha o component set "Avatar Item" (Braip Components, 777:23144).
 * Eixos: Type (Image|Icon|Text), Size (XL..XS), State.
 * State=Hover/Pressed vira CSS; State=Disabled vira prop.
 * A property booleana `Verification` do Figma vira `verification`. */
withDefaults(defineProps<{
  type?: 'image' | 'icon' | 'text'
  size?: 'xl' | 'lg' | 'md' | 'sm' | 'xs'
  disabled?: boolean
  verification?: boolean
  text?: string
  src?: string
  alt?: string
}>(), {
  type: 'text',
  size: 'lg',
  disabled: false,
  verification: false,
  text: '',
  src: '',
  alt: '',
})
</script>

<template>
  <span
    class="braip-avatar-item"
    :class="[`is-${type}`, `is-${size}`, { 'is-disabled': disabled }]"
    :aria-disabled="disabled || undefined"
  >
    <!-- Type=Image: alt obrigatorio; sem src cai no fallback textual -->
    <img
      v-if="type === 'image' && src"
      class="braip-avatar-item__image"
      :src="src"
      :alt="alt || text"
    />
    <span v-else-if="type === 'icon'" class="braip-avatar-item__icon">
      <slot name="icon" />
      <span class="braip-avatar-item__sr">{{ alt || text }}</span>
    </span>
    <span v-else class="braip-avatar-item__text">{{ text }}</span>

    <span v-if="verification" class="braip-avatar-item__verification">
      <slot name="verification" />
    </span>
  </span>
</template>

<style scoped>
.braip-avatar-item {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border-radius: var(--braip-space-radius-full);
  border: var(--braip-space-base-micro) solid var(--braip-alias-neutral-secondary);
  background: var(--braip-color-brand-core-surface-primary);
  color: var(--braip-color-brand-core-text-on-surface);
  font-family: var(--braip-type-font-family-text);
  font-weight: var(--braip-type-weight-regular);
  overflow: visible;
}

.braip-avatar-item__image {
  inline-size: 100%;
  block-size: 100%;
  border-radius: var(--braip-space-radius-full);
  object-fit: cover;
}

.braip-avatar-item__icon {
  display: inline-flex;
  color: currentColor;
}

.braip-avatar-item__sr {
  position: absolute;
  inline-size: var(--braip-value-space-0);
  block-size: var(--braip-value-space-0);
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

.braip-avatar-item__verification {
  position: absolute;
  inset-block-end: var(--braip-value-space-0);
  inset-inline-end: var(--braip-value-space-0);
  display: inline-flex;
}

/* Size — 110 / 72 / 56 / 48 / 32; 110 nao tem token (112 - 2) */
.braip-avatar-item.is-xl {
  inline-size: calc(var(--braip-value-space-112) - var(--braip-value-space-2));
  block-size: calc(var(--braip-value-space-112) - var(--braip-value-space-2));
  font-size: var(--braip-type-size-title-h3);
  line-height: var(--braip-type-line-height-title-h3);
}
.braip-avatar-item.is-lg {
  inline-size: var(--braip-value-space-72);
  block-size: var(--braip-value-space-72);
  font-size: var(--braip-type-size-title-h5);
  line-height: var(--braip-type-line-height-title-h5);
}
.braip-avatar-item.is-md {
  inline-size: var(--braip-value-space-56);
  block-size: var(--braip-value-space-56);
  font-size: var(--braip-type-size-text-p2);
  line-height: var(--braip-type-line-height-text-p2);
}
.braip-avatar-item.is-sm {
  inline-size: var(--braip-value-space-48);
  block-size: var(--braip-value-space-48);
  font-size: var(--braip-type-size-text-p4);
  line-height: var(--braip-type-line-height-text-p4);
}
.braip-avatar-item.is-xs {
  inline-size: var(--braip-value-space-32);
  block-size: var(--braip-value-space-32);
  font-size: var(--braip-type-size-text-p6);
  line-height: var(--braip-type-line-height-text-p6);
}

/* State=Hover / State=Pressed — overlay sobre a superficie */
.braip-avatar-item:hover:not(.is-disabled) {
  background-image: linear-gradient(var(--braip-alias-overlay-hover), var(--braip-alias-overlay-hover));
}

.braip-avatar-item:active:not(.is-disabled) {
  background-image: linear-gradient(var(--braip-alias-overlay-pressed), var(--braip-alias-overlay-pressed));
}

/* State=Disabled */
.braip-avatar-item.is-disabled {
  background: var(--braip-color-aux-grey-surface-ghost);
  color: var(--braip-color-aux-grey-states-disable);
  cursor: not-allowed;
}
</style>
