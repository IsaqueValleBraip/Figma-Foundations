import figma, { html } from '@figma/code-connect/html'

// Component set "❖ Page" — Braip Components (paginacao vigente).
// As geracoes antigas "paginacao" (765:19604) e "Paginacao" (765:19611) NAO sao mapeadas.
figma.connect('<FIGMA_LIBRARY>?node-id=741-18408', {
  props: {
    type: figma.enum('Type', {
      Default: 'default',
      Arrow: 'arrow',
    }),
    // Amount define quantos numeros aparecem: vira um numero, nao uma variante de estilo.
    amount: figma.enum('Amount', {
      '2 items': 2,
      '3 items': 3,
      '4 items': 4,
      '5 items': 5,
      '6 items': 6,
      '7 items': 7,
      '8 items': 8,
      '9 items': 9,
      '10 items': 10,
    }),
  },
  example: (props) => html`
    <BraipPagination
      type="${props.type}"
      :amount="${props.amount}"
      :model-value="1"
      size="sm"
    />
  `,
})
