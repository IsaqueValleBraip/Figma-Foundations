import figma, { html } from '@figma/code-connect/html'

// Component set "❖ Select-Field" — Braip Components (30 variantes: Type x State)
// Cada variante compoe ❖ Select - Text field (gatilho) + ❖ Dropdown-Menu (lista).
figma.connect('<FIGMA_LIBRARY>?node-id=866-9458', {
  props: {
    type: figma.enum('Type', {
      Phone: 'phone',
      None: 'none',
      Icon: 'icon',
      Checkbox: 'checkbox',
      Radio: 'radio',
    }),
    // Pressed / Active abrem a lista (estado interno); Filled sai do valor.
    disabled: figma.enum('State', { Disabled: true }),
    error: figma.enum('State', { Error: true }),
  },
  example: (props) => html`
    <BraipSelectField
      type="${props.type}"
      label="Title"
      :options="options"
      :disabled="${props.disabled}"
      :error="${props.error}"
      v-model="value"
    />
  `,
})
