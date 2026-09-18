<script setup lang="ts">
/* Espelha o component set "Password Level" (Braip Components, 1422:20714).
 * Eixo unico Level=Weak|Medium|Strong|Secure; a barra tem 4 segmentos e
 * acende 1/2/3/4 deles conforme o nivel. */
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  level?: 'weak' | 'medium' | 'strong' | 'secure'
  caption?: string
  levelLabel?: string
}>(), { level: 'weak', caption: 'Força da sua senha', levelLabel: '' })

const FILLED = { weak: 1, medium: 2, strong: 3, secure: 4 } as const
const DEFAULT_LABEL = { weak: 'Fraca', medium: 'Média', strong: 'Forte', secure: 'Segura' } as const

const filled = computed(() => FILLED[props.level])
const text = computed(() => props.levelLabel || DEFAULT_LABEL[props.level])
</script>

<template>
  <div class="braip-password-level" :class="`is-${level}`">
    <div class="braip-password-level__bars" aria-hidden="true">
      <span
        v-for="i in 4"
        :key="i"
        class="braip-password-level__bar"
        :class="{ 'is-filled': i <= filled }"
      />
    </div>
    <p class="braip-password-level__text">
      <span class="braip-password-level__caption">{{ caption }}</span>
      <span class="braip-password-level__value">{{ text }}</span>
    </p>
  </div>
</template>

<style scoped>
.braip-password-level {
  display: flex;
  flex-direction: column;
  gap: var(--braip-value-space-12);
  padding-block-start: var(--braip-space-base-sm);
  font-family: var(--braip-type-font-family-text);
}

.braip-password-level__bars {
  display: flex;
  gap: var(--braip-space-base-xs);
}

/* Barra de 3px: sem token — derivada de 4 menos meio offset */
.braip-password-level__bar {
  flex: 1;
  block-size: calc(var(--braip-value-space-4) - var(--braip-space-base-offset) / 2);
  border-radius: var(--braip-space-radius-full);
  background: var(--braip-color-global-surfaces-bg-secondary);
}

.braip-password-level__bar.is-filled {
  background: var(--braip-password-accent);
}

.braip-password-level__text {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--braip-space-base-sm);
  margin: var(--braip-value-space-0);
  font-size: var(--braip-type-size-text-p6);
  line-height: var(--braip-type-line-height-text-p6);
}

.braip-password-level__caption {
  color: var(--braip-color-global-surfaces-text-aux-disable);
  font-weight: var(--braip-type-weight-regular);
}

.braip-password-level__value {
  color: var(--braip-password-text);
  font-weight: var(--braip-type-weight-medium);
}

/* Level */
.braip-password-level.is-weak {
  --braip-password-accent: var(--braip-color-aux-red-icons-primary);
  --braip-password-text: var(--braip-color-aux-red-text-primary);
}

.braip-password-level.is-medium {
  --braip-password-accent: var(--braip-color-aux-orange-icons-primary);
  --braip-password-text: var(--braip-color-aux-orange-text-primary);
}

.braip-password-level.is-strong {
  --braip-password-accent: var(--braip-color-aux-blue-icons-primary);
  --braip-password-text: var(--braip-color-aux-blue-text-primary);
}

.braip-password-level.is-secure {
  --braip-password-accent: var(--braip-color-aux-green-icons-primary);
  --braip-password-text: var(--braip-color-aux-green-text-primary);
}
</style>
