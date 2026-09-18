import figma, { html } from '@figma/code-connect/html'

// Component set "Loading Circular" — Braip Components
// DIVERGENCIA: a property `Type` do Figma carrega tamanhos; em codigo ela e `size`.
// O eixo `Position` (01..04|None) sao quadros do giro e nao vira prop.
figma.connect('<FIGMA_LIBRARY>?node-id=672-58334', {
  props: {
    size: figma.enum('Type', {
      'Extra Large': 'xl',
      Large: 'lg',
      Medium: 'md',
      Small: 'sm',
      'Extra Small': 'xs',
    }),
    color: figma.enum('Color', {
      Purple: 'purple',
      White: 'white',
      Red: 'red',
      Green: 'green',
    }),
    state: figma.enum('State', { Flip: 'flip', Success: 'success' }),
  },
  example: (props) => html`
    <BraipLoadingCircular size="${props.size}" color="${props.color}" state="${props.state}" />
  `,
})
