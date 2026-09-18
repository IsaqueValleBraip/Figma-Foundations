import figma, { html } from '@figma/code-connect/html'

// Component set "❖ Tabs-Container" — Braip Components
figma.connect('<FIGMA_LIBRARY>?node-id=765-19798', {
  props: {
    size: figma.enum('Size', {
      Large: 'lg',
      Medium: 'md',
      Small: 'sm',
    }),
    navigation: figma.boolean('Navigation'),
    // Amount e a quantidade de abas: vira o tamanho de `items`, nao uma variante.
    amount: figma.enum('Amount', {
      '2 item': 2,
      '3 item': 3,
      '4 item': 4,
      '5 item': 5,
      '6 item': 6,
      '7 item': 7,
      '8 item': 8,
      '9 item': 9,
    }),
  },
  example: (props) => html`
    <BraipTabs
      size="${props.size}"
      :navigation="${props.navigation}"
      :items="items"
      :model-value="0"
    />
  `,
})
