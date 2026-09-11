import figma, { html } from '@figma/code-connect/html'

// Component set "Tooltip Icon" — Braip Components
// Position = onde a bolha aparece; State e derivado do hover/focus em CSS,
// por isso nao vira prop de codigo.
figma.connect('<FIGMA_LIBRARY>?node-id=2204-12166', {
  props: {
    position: figma.enum('Position', {
      Top: 'top',
      Bottom: 'bottom',
      Left: 'left',
      Right: 'right',
    }),
    // Conteudo vem da instancia aninhada exposta "Tooltip"
    tooltip: figma.nestedProps('Tooltip', {
      label: figma.string('Label'),
      description: figma.string('Description'),
      showLabel: figma.boolean('Show Label'),
      type: figma.enum('Type', {
        Neutral: 'neutral',
        Success: 'success',
        Alert: 'alert',
        Error: 'error',
      }),
    }),
  },
  example: (props) => html`
    <BraipTooltipIcon
      position="${props.position}"
      type="${props.tooltip.type}"
      label="${props.tooltip.label}"
      description="${props.tooltip.description}"
      :show-label="${props.tooltip.showLabel}"
    >
      <template #icon><BraipIcon name="info" /></template>
    </BraipTooltipIcon>
  `,
})
