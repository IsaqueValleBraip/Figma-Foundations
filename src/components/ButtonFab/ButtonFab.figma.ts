import figma, { html } from '@figma/code-connect/html'

// Component set "FABs" — Braip Components
figma.connect('<FIGMA_LIBRARY>?node-id=672-57312', {
  props: {
    type: figma.enum('Type', {
      Primary: 'primary',
      Secondary: 'secondary',
    }),
    size: figma.enum('Size', {
      Large: 'lg',
      Medium: 'md',
      Small: 'sm',
    }),
    color: figma.enum('Color', {
      Purple: 'purple',
      Red: 'red',
      Green: 'green',
    }),
    // O set so tem Default/Hover/Pressed: tudo vira CSS, nenhuma prop de State.
    icon: figma.instance('Icon'),
  },
  // label e obrigatorio: sem rotulo visivel, o botao precisa de nome acessivel.
  example: (props) => html`
    <BraipButtonFab
      type="${props.type}"
      size="${props.size}"
      color="${props.color}"
      label="Descreva a acao"
    >
      ${props.icon}
    </BraipButtonFab>
  `,
})
