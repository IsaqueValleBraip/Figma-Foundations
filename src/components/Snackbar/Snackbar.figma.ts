import figma, { html } from '@figma/code-connect/html'

// Component set "Snackbar" — Braip Components
// Eixo unico Color (7 opcoes). `showClose` e o evento `close` sao so de codigo:
// o set nao expoe botao de fechar como property.
figma.connect('<FIGMA_LIBRARY>?node-id=1422-27209', {
  props: {
    color: figma.enum('Color', {
      'Neutral Light': 'neutral-light',
      'Neutral Dark': 'neutral-dark',
      Purple: 'purple',
      Green: 'green',
      Red: 'red',
      Orange: 'orange',
      Blue: 'blue',
    }),
    text: figma.string('Text'),
    cta: figma.string('CTA'),
    showCheck: figma.boolean('Show Check'),
    showSpinner: figma.boolean('Show Spinner'),
    showCta: figma.boolean('Show CTA'),
  },
  example: (props) => html`
    <BraipSnackbar
      color="${props.color}"
      cta="${props.cta}"
      :show-check="${props.showCheck}"
      :show-spinner="${props.showSpinner}"
      :show-cta="${props.showCta}"
      @close="onClose"
      @action="onAction"
    >
      ${props.text}
    </BraipSnackbar>
  `,
})
