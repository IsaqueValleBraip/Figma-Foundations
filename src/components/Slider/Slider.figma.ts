import figma, { html } from '@figma/code-connect/html'

// Component set "Slider" — Braip Components (52 variantes)
// O eixo Percentage do Figma (26 valores, incluindo faixas "20% - 80%") nao
// vira enum: ele e o proprio valor numerico do input range. Mapeamos apenas
// Type, State e a boolean "Show Percentage".
figma.connect('<FIGMA_LIBRARY>?node-id=1422-26620', {
  props: {
    type: figma.enum('Type', { Single: 'single', Double: 'double' }),
    disabled: figma.enum('State', { Disabled: true, Default: false }),
    showPercentage: figma.boolean('Show Percentage'),
  },
  example: (props) => html`
    <BraipSlider
      type="${props.type}"
      :disabled="${props.disabled}"
      :show-percentage="${props.showPercentage}"
      :value="50"
      label="Seleção de valor"
    />
  `,
})
