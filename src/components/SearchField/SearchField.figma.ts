import figma, { html } from '@figma/code-connect/html'

// Component set "❖ Search" — Braip Components
figma.connect('<FIGMA_LIBRARY>?node-id=731-15277', {
  props: {
    size: figma.enum('Size', {
      Large: 'lg',
      Medium: 'md',
      Small: 'sm',
      'Extra Small': 'xs',
    }),
    // O eixo de estado chama State neste set. Pressed/Active/Filled sao CSS.
    disabled: figma.enum('State', { Disabled: true }),
    label: figma.string('Label'),
  },
  example: (props) => html`
    <BraipSearchField
      size="${props.size}"
      label="${props.label}"
      :disabled="${props.disabled}"
    />
  `,
})
