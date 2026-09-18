import figma, { html } from '@figma/code-connect/html'

// Component set "Rating" — Braip Components (240 variantes)
figma.connect('<FIGMA_LIBRARY>?node-id=90-5298', {
  props: {
    size: figma.enum('Size', {
      'Extra Large': 'xl',
      Large: 'lg',
      Medium: 'md',
      Small: 'sm',
      'Extra Small': 'xs',
    }),
    color: figma.enum('Color', { Purple: 'purple', Yellow: 'yellow' }),
    // Eixo renomeado de `Full` para `Value` no Figma (0 a 5).
    value: figma.enum('Value', {
      '0': 0,
      '1': 1,
      '2': 2,
      '3': 3,
      '4': 4,
      '5': 5,
    }),
    // Hover e Pressed sao estados de CSS: so Disabled vira prop.
    disabled: figma.enum('State', { Disabled: true }),
  },
  example: (props) => html`
    <BraipRating
      size="${props.size}"
      color="${props.color}"
      :value="${props.value}"
      :disabled="${props.disabled}"
      label="Avaliação"
    />
  `,
})
