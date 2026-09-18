import figma, { html } from '@figma/code-connect/html'

// Component set "Badges" — Braip Components
// Border e VARIANT no Figma (True|False) e vira prop booleana no Vue.
figma.connect('<FIGMA_LIBRARY>?node-id=2032-6385', {
  props: {
    type: figma.enum('Type', { Only: 'only', Number: 'number', Text: 'text' }),
    color: figma.enum('Color', {
      Red: 'red',
      Green: 'green',
      Purple: 'purple',
      Blue: 'blue',
      Orange: 'orange',
      Neutral: 'neutral',
    }),
    border: figma.enum('Border', { True: true, False: false }),
    label: figma.string('Label'),
    count: figma.string('Count'),
  },
  example: (props) => html`
    <BraipBadge
      type="${props.type}"
      color="${props.color}"
      :border="${props.border}"
      label="${props.label}"
      count="${props.count}"
    />
  `,
})
