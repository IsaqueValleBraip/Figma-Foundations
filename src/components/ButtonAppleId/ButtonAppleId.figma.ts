import figma, { html } from '@figma/code-connect/html'

// Component set "Button-ios" — Braip Components
figma.connect('<FIGMA_LIBRARY>?node-id=1094-10676', {
  props: {
    // O set so tem Default/Hover/Pressed: tudo vira CSS, nenhuma prop de State.
  },
  example: () => html`
    <BraipButtonAppleId overline="Disponível na" label="App Store" />
  `,
})
