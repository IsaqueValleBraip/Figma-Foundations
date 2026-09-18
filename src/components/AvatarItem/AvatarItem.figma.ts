import figma, { html } from '@figma/code-connect/html'

// Component set "Avatar Item" — Braip Components
// Hover e Pressed sao estados de CSS; so Disabled vira prop.
figma.connect('<FIGMA_LIBRARY>?node-id=777-23144', {
  props: {
    type: figma.enum('Type', { Image: 'image', Icon: 'icon', Text: 'text' }),
    size: figma.enum('Size', {
      'Extra Large': 'xl',
      Large: 'lg',
      Medium: 'md',
      Small: 'sm',
      'Extra Small': 'xs',
    }),
    disabled: figma.enum('State', { Disabled: true }),
    verification: figma.boolean('Verification'),
    text: figma.string('Text'),
  },
  example: (props) => html`
    <BraipAvatarItem
      type="${props.type}"
      size="${props.size}"
      :disabled="${props.disabled}"
      :verification="${props.verification}"
      text="${props.text}"
      alt="${props.text}"
    />
  `,
})
