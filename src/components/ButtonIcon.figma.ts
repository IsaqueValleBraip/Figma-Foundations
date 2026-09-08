import figma, { html } from '@figma/code-connect/html'

// Component set "Icon" (Button Icon) — Braip Components
figma.connect('<FIGMA_LIBRARY>?node-id=672-56654', {
  props: {
    type: figma.enum('Type', {
      Primary: 'primary',
      Secundary: 'secundary',
      Outline: 'outline',
      Only: 'only',
    }),
    size: figma.enum('Size', {
      'Extra Large': 'xl',
      Large: 'lg',
      Medium: 'md',
      Small: 'sm',
      'Extra Small': 'xs',
    }),
    mode: figma.enum('Mode', {
      Normal: 'normal',
      Destructive: 'destructive',
      Sucess: 'sucess',
    }),
    disabled: figma.enum('State', { Disabled: true }),
    loading: figma.enum('State', { Loading: true }),
    icon: figma.instance('Icon'),
  },
  // label e obrigatorio: sem rotulo visivel, o botao precisa de nome acessivel.
  example: (props) => html`
    <BraipButtonIcon
      type="${props.type}"
      size="${props.size}"
      mode="${props.mode}"
      :disabled="${props.disabled}"
      :loading="${props.loading}"
      label="Descreva a acao"
    >
      ${props.icon}
    </BraipButtonIcon>
  `,
})
