import figma, { html } from '@figma/code-connect/html'

// Component set "Avatar-Group" — Braip Components
// Amount = quantidade de avatares exibidos; "5+" e o estado de overflow.
figma.connect('<FIGMA_LIBRARY>?node-id=777-23380', {
  props: {
    amount: figma.enum('Amount', { '2': '2', '3': '3', '4': '4', '5+': '5+' }),
    size: figma.enum('Size', {
      'Extra Large': 'xl',
      Large: 'lg',
      Medium: 'md',
      Small: 'sm',
      'Extra Small': 'xs',
    }),
  },
  example: (props) => html`
    <BraipAvatarGroup amount="${props.amount}" size="${props.size}">
      <BraipAvatarItem size="${props.size}" type="text" text="LR" alt="LR" />
    </BraipAvatarGroup>
  `,
})
