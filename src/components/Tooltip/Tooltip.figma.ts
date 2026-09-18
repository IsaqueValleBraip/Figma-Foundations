import figma, { html } from '@figma/code-connect/html'

// Component set "Tooltip" — Braip Components
// Bolha isolada; o gatilho referencia o `id` via aria-describedby.
figma.connect('<FIGMA_LIBRARY>?node-id=1422-27349', {
  props: {
    type: figma.enum('Type', {
      Neutral: 'neutral',
      Success: 'success',
      Alert: 'alert',
      Error: 'error',
    }),
    position: figma.enum('Position', {
      Top: 'top',
      Bottom: 'bottom',
      Right: 'right',
      Left: 'left',
    }),
    label: figma.string('Label'),
    description: figma.string('Description'),
    showLabel: figma.boolean('Show Label'),
  },
  example: (props) => html`
    <BraipTooltip
      type="${props.type}"
      position="${props.position}"
      label="${props.label}"
      description="${props.description}"
      :show-label="${props.showLabel}"
    />
  `,
})
