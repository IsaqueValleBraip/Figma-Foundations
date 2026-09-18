import figma, { html } from '@figma/code-connect/html'

// Component set "Button-Google" — Braip Components
figma.connect('<FIGMA_LIBRARY>?node-id=1094-10680', {
  props: {
    // O set so tem Default/Hover/Pressed: tudo vira CSS, nenhuma prop de State.
  },
  example: () => html`
    <BraipButtonGoogle overline="Disponível no" label="Google Play" />
  `,
})
