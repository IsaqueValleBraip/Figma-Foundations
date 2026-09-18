import figma, { html } from '@figma/code-connect/html'

// Component set "❖ Dropdown-Menu" — Braip Components
figma.connect('<FIGMA_LIBRARY>?node-id=731-15730', {
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
    scroll: figma.boolean('Scroll'),
  },
  example: (props) => html`
    <BraipDropdownMenu type="${props.type}" :scroll="${props.scroll}" label="Opcoes">
      <BraipDropdownItem type="${props.type}" label="Lorem ipsum" />
    </BraipDropdownMenu>
  `,
})
