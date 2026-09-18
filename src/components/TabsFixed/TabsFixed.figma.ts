import figma, { html } from '@figma/code-connect/html'

// Component set "❖ Tabs-Fixed" — Braip Components
figma.connect('<FIGMA_LIBRARY>?node-id=765-20092', {
  props: {
    size: figma.enum('Size', {
      Large: 'lg',
      Medium: 'md',
      Small: 'sm',
    }),
    // Amount e a quantidade de abas: vira o tamanho de `items`, nao uma variante.
    amount: figma.enum('Amount', {
      '2 item': 2,
      '3 item': 3,
      '4 item': 4,
    }),
  },
  example: (props) => html`
    <BraipTabsFixed size="${props.size}" :items="items" :model-value="0" />
  `,
})
