import figma, { html } from '@figma/code-connect/html'

// Component set "Checkbox" — Braip Components
figma.connect('<FIGMA_LIBRARY>?node-id=668-55384', {
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
    // Hover e Pressed sao estados de CSS. O eixo Checked do Figma e redundante
    // (so varia junto com State), entao marcado/indeterminado saem de State.
    checked: figma.enum('State', { Selected: true }),
    indeterminate: figma.enum('State', { Indeterminate: true }),
    disabled: figma.enum('State', { Disabled: true }),
  },
  example: (props) => html`
    <BraipCheckbox
      size="${props.size}"
      color="${props.color}"
      :checked="${props.checked}"
      :indeterminate="${props.indeterminate}"
      :disabled="${props.disabled}"
      label="Descreva a opcao"
    />
  `,
})
