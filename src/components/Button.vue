<script setup lang="ts">
withDefaults(defineProps<{
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
}>(), { variant: 'primary', size: 'md', disabled: false })
</script>

<template>
  <button class="braip-button" :class="[`is-${variant}`, `is-${size}`]" :disabled="disabled">
    <slot />
  </button>
</template>

<style scoped>
.braip-button {
  border: 1px solid transparent;
  border-radius: 6px;
  font: inherit;
  font-weight: 600;
  cursor: pointer;
}
.braip-button:disabled { opacity: .5; cursor: not-allowed; }
.braip-button.is-sm { padding: .25rem .625rem; font-size: .8125rem; }
.braip-button.is-md { padding: .4375rem .875rem; font-size: .875rem; }
.braip-button.is-lg { padding: .625rem 1.125rem; font-size: 1rem; }
.braip-button.is-primary { background: #1a1a1a; color: #fff; }
.braip-button.is-secondary { background: #fff; color: #1a1a1a; border-color: #d4d4d4; }
.braip-button.is-ghost { background: transparent; color: #1a1a1a; }
</style>
