<script setup lang="ts">
/* Espelha o component set "Switch" (Braip Components, 680:76911).
 * Eixos: Checked x State. Hover/Pressed viram CSS; Disabled vira prop.
 * Input real (`checkbox` com role=switch) para manter teclado e leitor de tela. */
withDefaults(defineProps<{
  /** Figma: Checked = On | Off */
  checked?: boolean
  disabled?: boolean
  label: string
}>(), { checked: false, disabled: false })

defineEmits<{ 'update:checked': [value: boolean] }>()
</script>

<template>
  <label class="braip-switch" :class="{ 'is-disabled': disabled }">
    <input
      class="braip-switch__input"
      type="checkbox"
      role="switch"
      :checked="checked"
      :disabled="disabled"
      :aria-label="label"
      @change="$emit('update:checked', ($event.target as HTMLInputElement).checked)"
    >
    <span class="braip-switch__track">
      <span class="braip-switch__handle" />
    </span>
  </label>
</template>

<style scoped>
.braip-switch {
  display: inline-flex;
  position: relative;
  cursor: pointer;
}

.braip-switch.is-disabled {
  cursor: not-allowed;
}

.braip-switch__input {
  position: absolute;
  inset: 0;
  margin: var(--braip-space-base-none);
  opacity: 0;
  cursor: inherit;
}

.braip-switch__track {
  display: inline-flex;
  align-items: center;
  inline-size: var(--braip-value-space-56);
  block-size: var(--braip-value-space-32);
  padding-inline: var(--braip-value-space-4);
  border-radius: var(--braip-space-radius-full);
  background: var(--braip-switch-track, var(--braip-color-brand-core-icons-ghost));
  transition: background var(--braip-motion-duration-fast) var(--braip-motion-easing-standard);
}

.braip-switch__handle {
  inline-size: var(--braip-value-space-24);
  block-size: var(--braip-value-space-24);
  border-radius: var(--braip-space-radius-full);
  background: var(--braip-switch-handle, var(--braip-color-aux-grey-icons-on-surface));
  transition: transform var(--braip-motion-duration-fast) var(--braip-motion-easing-standard);
}

/* Checked=Off */
.braip-switch:hover .braip-switch__input:not(:checked):not(:disabled) ~ .braip-switch__track {
  --braip-switch-track: var(--braip-color-aux-grey-icons-secundary);
}

.braip-switch:active .braip-switch__input:not(:checked):not(:disabled) ~ .braip-switch__track {
  --braip-switch-track: var(--braip-color-aux-grey-icons-tertiary);
}

/* Checked=On */
.braip-switch__input:checked ~ .braip-switch__track {
  --braip-switch-track: var(--braip-color-brand-core-icons-primary);
  --braip-switch-handle: var(--braip-color-brand-core-icons-on-surface);
}

.braip-switch__input:checked ~ .braip-switch__track .braip-switch__handle {
  transform: translateX(var(--braip-value-space-24));
}

.braip-switch:hover .braip-switch__input:checked:not(:disabled) ~ .braip-switch__track {
  --braip-switch-track: var(--braip-color-brand-core-icons-secundary);
}

.braip-switch:active .braip-switch__input:checked:not(:disabled) ~ .braip-switch__track {
  --braip-switch-track: var(--braip-color-brand-core-icons-tertiary);
}

/* State=Disabled — mesma superficie em On e Off */
.braip-switch__input:disabled ~ .braip-switch__track {
  --braip-switch-track: var(--braip-color-aux-grey-icons-ghost);
  --braip-switch-handle: var(--braip-color-aux-grey-icons-ghost);
}
</style>
