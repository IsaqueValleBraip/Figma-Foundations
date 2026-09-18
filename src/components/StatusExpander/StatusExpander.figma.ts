import figma, { html } from '@figma/code-connect/html'

// Component set "Status Expander" — Braip Components
figma.connect('<FIGMA_LIBRARY>?node-id=2278-2277', {
  props: {
    expanded: figma.enum('State', { Active: true, Default: false }),
    label: figma.string('Label'),
  },
  example: (props) => html`
    <BraipStatusExpander label="${props.label}" :expanded="${props.expanded}" />
  `,
})
