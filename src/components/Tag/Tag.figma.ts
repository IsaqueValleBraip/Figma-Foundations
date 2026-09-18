import figma, { html } from '@figma/code-connect/html'

// Component set "Tags" — Braip Components (64 variantes, raio radius/full)
figma.connect('<FIGMA_LIBRARY>?node-id=422-38782', {
  props: {
    type: figma.enum('Type', { Icon: 'icon', Text: 'text' }),
    variant: figma.enum('Style', { Solid: 'solid', Minimalist: 'minimalist' }),
    color: figma.enum('Color', {
      Purple: 'purple',
      Red: 'red',
      Orange: 'orange',
      Blue: 'blue',
      Pink: 'pink',
      Grey: 'grey',
      Green: 'green',
      Yellow: 'yellow',
    }),
    off: figma.enum('State', { Off: true, On: false }),
    label: figma.string('Text'),
  },
  example: (props) => html`
    <BraipTag
      type="${props.type}"
      variant="${props.variant}"
      color="${props.color}"
      shape="pill"
      label="${props.label}"
      :off="${props.off}"
    />
  `,
})
