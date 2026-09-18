import figma, { html } from '@figma/code-connect/html'

// Component set "❖ Text field - Password" — Braip Components
figma.connect('<FIGMA_LIBRARY>?node-id=668-51277', {
  props: {
    // Type=On mostra o valor digitado, Type=Off mantem mascarado.
    revealed: figma.enum('Type', { On: true, Off: false }),
    // Pressed/Active/Filled sao estados de CSS: so Disabled e Error viram prop.
    disabled: figma.enum('State', { Disabled: true }),
    error: figma.enum('State', { Error: true }),
    label: figma.string('↳ Text-Label'),
    showLabel: figma.boolean('Label'),
    message: figma.boolean('Message Text', { true: 'Mensagem de apoio', false: undefined }),
    // O indicador vem do atom "Password Level" (1422:20714), nao reimplementado aqui.
    showLevel: figma.boolean('Password Level'),
  },
  example: (props) => html`
    <BraipPasswordField
      label="${props.label}"
      message="${props.message}"
      :revealed="${props.revealed}"
      :show-label="${props.showLabel}"
      :show-level="${props.showLevel}"
      :disabled="${props.disabled}"
      :error="${props.error}"
    >
      <template #level><BraipPasswordLevel level="weak" /></template>
    </BraipPasswordField>
  `,
})
