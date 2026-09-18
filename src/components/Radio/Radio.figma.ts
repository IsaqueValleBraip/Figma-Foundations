import figma, { html } from '@figma/code-connect/html'

// Component set "Radio" — Braip Components
figma.connect('<FIGMA_LIBRARY>?node-id=668-54769', {
  props: {
    size: figma.enum('Size', {
      'Extra Large': 'xl',
      Large: 'lg',
      Medium: 'md',
      Small: 'sm',
      'Extra Small': 'xs',
    }),
    color: figma.enum('Color', {
      Purple: 'purple',
      Red: 'red',
      Orange: 'orange',
      Blue: 'blue',
      Pink: 'pink',
      Grey: 'grey',
      Green: 'green',
    }),
    // Hover e Pressed sao estados de CSS.
    checked: figma.enum('State', { Selected: true, 'Selected-Disabled': true }),
    disabled: figma.enum('State', { Disabled: true, 'Selected-Disabled': true }),
  },
  example: (props) => html`
    <BraipRadio
      size="${props.size}"
      color="${props.color}"
      :checked="${props.checked}"
      :disabled="${props.disabled}"
      label="Descreva a opcao"
    />
  `,
})
