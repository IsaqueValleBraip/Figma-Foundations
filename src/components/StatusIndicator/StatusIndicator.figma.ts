import figma, { html } from '@figma/code-connect/html'

// Component set "Status" — Braip Components
// DIVIDA: `Type` nomeia cor, nao semantica. Mapeado 1:1 ate o rename no Figma.
figma.connect('<FIGMA_LIBRARY>?node-id=1422-20684', {
  props: {
    type: figma.enum('Type', {
      Purple: 'purple',
      Blue: 'blue',
      Green: 'green',
      Neutral: 'neutral',
      Orange: 'orange',
      Pink: 'pink',
      Red: 'red',
    }),
    text: figma.string('Text'),
  },
  example: (props) => html`
    <BraipStatusIndicator type="${props.type}">${props.text}</BraipStatusIndicator>
  `,
})
