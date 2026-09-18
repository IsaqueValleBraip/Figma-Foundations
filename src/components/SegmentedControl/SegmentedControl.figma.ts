import figma, { html } from '@figma/code-connect/html'

// Component set "Segmented Control — Vertical" — Braip Components
figma.connect('<FIGMA_LIBRARY>?node-id=2278-2678', {
  props: {
    // O unico eixo do set e qual opcao esta ativa.
    modelValue: figma.enum('Selected', { First: 0, Second: 1 }),
  },
  example: (props) => html`
    <BraipSegmentedControl
      :options="[{ label: 'Hoje' }, { label: 'Deste mes' }]"
      :model-value="${props.modelValue}"
      label="Periodo"
    />
  `,
})
