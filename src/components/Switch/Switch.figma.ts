import figma, { html } from '@figma/code-connect/html'

// Component set "Switch" — Braip Components
figma.connect('<FIGMA_LIBRARY>?node-id=680-76911', {
  props: {
    checked: figma.enum('Checked', { On: true, Off: false }),
    // Hover e Pressed sao estados de CSS: so Disabled vira prop.
    disabled: figma.enum('State', { Disabled: true }),
  },
  // label e obrigatorio: o switch nao tem rotulo visivel proprio.
  example: (props) => html`
    <BraipSwitch
      :checked="${props.checked}"
      :disabled="${props.disabled}"
      label="Descreva a opcao"
    />
  `,
})
