import figma, { html } from '@figma/code-connect/html'

// Component set "❖ Tabs Item" — Braip Components
figma.connect('<FIGMA_LIBRARY>?node-id=765-19669', {
  props: {
    type: figma.enum('Type', {
      Container: 'container',
      Fixed: 'fixed',
    }),
    size: figma.enum('Size', {
      Large: 'lg',
      Medium: 'md',
      Small: 'sm',
    }),
    // Hover e Pressed sao estados de CSS: so Active e Disabled viram prop.
    active: figma.enum('State', { Active: true }),
    disabled: figma.enum('State', { Disabled: true }),
    badge: figma.boolean('Badge'),
    label: figma.string('Text'),
  },
  example: (props) => html`
    <BraipTab
      type="${props.type}"
      size="${props.size}"
      :active="${props.active}"
      :disabled="${props.disabled}"
      :badge="${props.badge}"
    >
      ${props.label}
    </BraipTab>
  `,
})
