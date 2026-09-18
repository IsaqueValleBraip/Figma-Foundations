import figma, { html } from '@figma/code-connect/html'

// Component set "❖ Select - Text field" — Braip Components (24 variantes: Type x State)
figma.connect('<FIGMA_LIBRARY>?node-id=866-11448', {
  props: {
    type: figma.enum('Type', {
      'Select-Phone': 'phone',
      'Select-None': 'none',
      'Select-Tags': 'tags',
      'Select-text icon': 'text-icon',
    }),
    // Pressed / Active sao CSS; Filled sai do valor.
    disabled: figma.enum('State', { Disabled: true }),
    error: figma.enum('State', { Error: true }),
    label: figma.string('Title-Select-None'),
    modelValue: figma.string('Text-Select-None'),
    message: figma.string('Text-Message'),
    showMessage: figma.boolean('Message text'),
    showIcon: figma.boolean('Icon', {
      true: figma.instance('Icon'),
      false: undefined,
    }),
  },
  example: (props) => html`
    <BraipSelectTextField
      type="${props.type}"
      label="${props.label}"
      message="${props.message}"
      :show-message="${props.showMessage}"
      :disabled="${props.disabled}"
      :error="${props.error}"
      v-model="value"
    >
      <template #icon>${props.showIcon}</template>
    </BraipSelectTextField>
  `,
})
