import figma, { html } from '@figma/code-connect/html'

// Component set "Date picker" — Braip Components (20 variantes: Type x State)
figma.connect('<FIGMA_LIBRARY>?node-id=823-2149', {
  props: {
    type: figma.enum('Type', {
      'Tabs': 'tabs',
      'Calendar': 'calendar',
      'Tabs+Calendar': 'tabs-calendar',
    }),
    // Pressed / Active / Selected sao estados de CSS.
    // Filled sai do valor. So Disabled e Error viram prop.
    disabled: figma.enum('State', { Disabled: true }),
    error: figma.enum('State', { Error: true }),
  },
  example: (props) => html`
    <BraipDatePicker
      type="${props.type}"
      :disabled="${props.disabled}"
      :error="${props.error}"
      v-model="date"
    />
  `,
})
