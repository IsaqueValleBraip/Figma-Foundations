import figma, { html } from '@figma/code-connect/html'

// Component set "❖ Text field - Text" — Braip Components
figma.connect('<FIGMA_LIBRARY>?node-id=668-51081', {
  props: {
    type: figma.enum('Type', {
      Common: 'common',
      Description: 'description',
      Comment: 'comment',
    }),
    // Pressed/Active/Filled sao estados de CSS: so Disabled e Error viram prop.
    disabled: figma.enum('State', { Disabled: true }),
    error: figma.enum('State', { Error: true }),
    label: figma.string('↳ Text-Label'),
    value: figma.string('Text'),
    showLabel: figma.boolean('Label'),
    message: figma.boolean('Message Text', { true: 'Mensagem de apoio', false: undefined }),
    info: figma.boolean('Info', { true: 'Informacao adicional', false: undefined }),
  },
  example: (props) => html`
    <BraipTextField
      type="${props.type}"
      label="${props.label}"
      model-value="${props.value}"
      message="${props.message}"
      info="${props.info}"
      :show-label="${props.showLabel}"
      :disabled="${props.disabled}"
      :error="${props.error}"
    />
  `,
})
