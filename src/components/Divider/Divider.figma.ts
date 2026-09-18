import figma, { html } from '@figma/code-connect/html'

// Component set "❖ Divider" — Braip Components
figma.connect('<FIGMA_LIBRARY>?node-id=878-4145', {
  props: {
    size: figma.enum('Size', {
      Large: 'lg',
      Medium: 'md',
      Small: 'sm',
      Underline: 'underline',
    }),
    color: figma.enum('Color', {
      Purple: 'purple',
      Grey: 'grey',
      Neutral: 'neutral',
      Green: 'green',
      Red: 'red',
    }),
    label: figma.string('Label'),
  },
  example: (props) => html`
    <BraipDivider size="${props.size}" color="${props.color}" label="${props.label}" />
  `,
})
