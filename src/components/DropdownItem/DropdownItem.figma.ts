import figma, { html } from '@figma/code-connect/html'

// Component set "❖ Dropdown-Items" — Braip Components
figma.connect('<FIGMA_LIBRARY>?node-id=731-15617', {
  props: {
    type: figma.enum('Type', {
      None: 'none',
      Icon: 'icon',
      Checkbox: 'checkbox',
      Radio: 'radio',
      Avatar: 'avatar',
      // Grafia real do set, ainda em PT.
      Phone: 'phone',
    }),
    // Hover e estado de CSS: so Active e Disabled viram prop.
    selected: figma.enum('State', { Active: true }),
    disabled: figma.enum('State', { Disabled: true }),
    label: figma.string('↳ Text'),
    closable: figma.boolean('Close'),
    assistant: figma.boolean('Text-Assistant', { true: 'Texto assistente', false: undefined }),
    flag: figma.instance('Flag'),
  },
  example: (props) => html`
    <BraipDropdownItem
      type="${props.type}"
      label="${props.label}"
      assistant="${props.assistant}"
      :selected="${props.selected}"
      :disabled="${props.disabled}"
      :closable="${props.closable}"
    >
      <template #lead>${props.flag}</template>
    </BraipDropdownItem>
  `,
})
