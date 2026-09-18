import figma, { html } from '@figma/code-connect/html'

// Component set "Icon Arrow" — Braip Components
figma.connect('<FIGMA_LIBRARY>?node-id=1422-21961', {
  props: {
    direction: figma.enum('Direction', {
      Up: 'up',
      Down: 'down',
    }),
  },
  example: (props) => html`
    <BraipIconArrow direction="${props.direction}" />
  `,
})
