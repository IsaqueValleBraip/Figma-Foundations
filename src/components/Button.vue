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
