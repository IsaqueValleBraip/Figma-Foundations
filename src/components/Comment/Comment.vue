<script setup lang="ts">
/* Espelha o component set "Comment" — Braip Components (node 1422:19270).
 * O set tem 5 variantes num eixo unico (Type=Feedback|Testimony 1|2|3|Chat).
 * Em codigo isso vira DOIS eixos: `type` (feedback|testimony|chat) e, para
 * testimony, `layout` (1|2|3) — as tres testimonies sao o mesmo conteudo com
 * densidade/ordem diferentes, nao tipos diferentes de comentario. */
withDefaults(defineProps<{
  type?: 'feedback' | 'testimony' | 'chat'
  layout?: '1' | '2' | '3'
  /** Autor do comentario (Figma: Name). */
  name?: string
  /** Cargo/organizacao do autor (Figma: Position). */
  position?: string
  /** Corpo do comentario — Feedback/Testimony/Chat compartilham o mesmo slot de texto. */
  text?: string
  /** ISO datetime; renderizado em <time datetime>. */
  datetime?: string
  /** Rotulo legivel da data. Sem ele, cai no proprio `datetime`. */
  dateLabel?: string
  showImage?: boolean
  showFiles?: boolean
  showLink?: boolean
  showAttachments?: boolean
}>(), {
  type: 'feedback',
  layout: '1',
  name: '',
  position: '',
  text: '',
  datetime: '',
  dateLabel: '',
  showImage: true,
  showFiles: true,
  showLink: true,
  showAttachments: true,
})
</script>

<template>
  <article class="braip-comment" :class="[`is-${type}`, type === 'testimony' && `layout-${layout}`]">
    <header class="braip-comment__header">
      <span v-if="$slots.avatar" class="braip-comment__avatar"><slot name="avatar" /></span>

      <span class="braip-comment__identity">
        <span class="braip-comment__name">{{ name }}</span>
        <span v-if="position" class="braip-comment__position">{{ position }}</span>
      </span>

      <time v-if="datetime" class="braip-comment__date" :datetime="datetime">
        {{ dateLabel || datetime }}
      </time>
    </header>

    <div class="braip-comment__body">
      <slot>{{ text }}</slot>
    </div>

    <figure v-if="showImage && $slots.image" class="braip-comment__image">
      <slot name="image" />
    </figure>

    <ul v-if="showFiles && $slots.files" class="braip-comment__files">
      <slot name="files" />
    </ul>

    <ul v-if="showAttachments && $slots.attachments" class="braip-comment__attachments">
      <slot name="attachments" />
    </ul>

    <footer v-if="showLink && $slots.link" class="braip-comment__footer">
      <slot name="link" />
    </footer>
  </article>
</template>

<style scoped>
/* Sem valores literais: superficie, texto e borda saem da camada alias;
 * espacamento e raio saem de space/value. */
.braip-comment {
  display: flex;
  flex-direction: column;
  gap: var(--braip-space-base-xs);
  padding: var(--braip-space-base-sm);
  border-radius: var(--braip-space-radius-md);
  background: var(--braip-comment-bg, var(--braip-alias-bg-surface-primary));
  color: var(--braip-alias-text-surface-primary);
  font-family: var(--braip-type-font-family-text);
}

.braip-comment__header {
  display: flex;
  align-items: center;
  gap: var(--braip-space-base-xxs);
}

.braip-comment__avatar {
  display: inline-flex;
  flex: none;
}

.braip-comment__identity {
  display: flex;
  flex-direction: column;
  min-inline-size: 0;
}

.braip-comment__name {
  font-size: var(--braip-type-size-text-p5);
  line-height: var(--braip-type-line-height-text-p5);
  font-weight: var(--braip-type-weight-semi-bold);
  color: var(--braip-alias-text-surface-primary);
}

.braip-comment__position {
  font-size: var(--braip-type-size-text-p7);
  line-height: var(--braip-type-line-height-text-p7);
  font-weight: var(--braip-type-weight-regular);
  color: var(--braip-alias-text-surface-secondary);
}

.braip-comment__date {
  margin-inline-start: auto;
  flex: none;
  font-size: var(--braip-type-size-text-p7);
  line-height: var(--braip-type-line-height-text-p7);
  color: var(--braip-alias-text-surface-tertiary);
}

.braip-comment__body {
  font-size: var(--braip-type-size-text-p6);
  line-height: var(--braip-type-line-height-text-p6);
  font-weight: var(--braip-type-weight-regular);
  color: var(--braip-alias-text-surface-secondary);
}

.braip-comment__image {
  margin: 0;
  overflow: hidden;
  border-radius: var(--braip-space-radius-sm);
}

.braip-comment__files,
.braip-comment__attachments {
  display: flex;
  flex-wrap: wrap;
  gap: var(--braip-space-base-xxs);
  margin: 0;
  padding: 0;
  list-style: none;
}

.braip-comment__footer {
  display: flex;
  align-items: center;
  gap: var(--braip-space-base-xxs);
  color: var(--braip-alias-purple-text);
}

/* Type=Feedback — cartao sobre a superficie secundaria, com traco de acento */
.braip-comment.is-feedback {
  --braip-comment-bg: var(--braip-alias-bg-surface-secondary);
  border: 1px solid var(--braip-alias-stroke-secondary);
}

/* Type=Testimony — depoimento: corpo com mais respiro entre as partes */
.braip-comment.is-testimony {
  --braip-comment-bg: var(--braip-alias-bg-surface-primary);
  gap: var(--braip-space-base-sm);
  padding: var(--braip-space-base-md);
}

/* layout 2 traz a autoria para o fim; layout 3 e a versao compacta */
.braip-comment.is-testimony.layout-2 {
  flex-direction: column-reverse;
}

.braip-comment.is-testimony.layout-3 {
  gap: var(--braip-space-base-xxs);
  padding: var(--braip-space-base-sm);
}

/* Type=Chat — balao de conversa, raio assimetrico na base */
.braip-comment.is-chat {
  --braip-comment-bg: var(--braip-alias-bg-surface-tertiary);
  border-start-start-radius: var(--braip-space-radius-xs);
}
</style>
