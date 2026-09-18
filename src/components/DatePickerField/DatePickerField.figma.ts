import figma, { html } from '@figma/code-connect/html'

// Component set "❖ Text field - Date picker" — Braip Components
figma.connect('<FIGMA_LIBRARY>?node-id=823-6562', {
  props: {
    // Pressed/Active/Filled sao estados de CSS: so Disabled e Error viram prop.
    disabled: figma.enum('State', { Disabled: true }),
    error: figma.enum('State', { Error: true }),
    label: figma.string('↳ Text-Label'),
    value: figma.string('Text-Date'),
    showLabel: figma.boolean('Label'),
    showIcon: figma.boolean('Icon'),
    message: figma.boolean('Message Text', { true: 'Mensagem de apoio', false: undefined }),
  },
  example: (props) => html`
    <BraipDatePickerField
      label="${props.label}"
      model-value="${props.value}"
      message="${props.message}"
      :show-label="${props.showLabel}"
      :show-icon="${props.showIcon}"
      :disabled="${props.disabled}"
      :error="${props.error}"
    />
  `,
})
