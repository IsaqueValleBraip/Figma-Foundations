import figma, { html } from '@figma/code-connect/html'

// Component set "Metric Row" — Braip Components
figma.connect('<FIGMA_LIBRARY>?node-id=2278-2287', {
  props: {
    tone: figma.enum('Tone', {
      Positive: 'positive',
      Negative: 'negative',
      Neutral: 'neutral',
    }),
    showBadge: figma.boolean('Show Badge'),
    highlight: figma.boolean('Highlight'),
    label: figma.string('Label'),
    percentage: figma.string('Percentage'),
    valueLabel: figma.string('Value Label'),
    value: figma.string('Value'),
  },
  example: (props) => html`
    <BraipMetricRow
      tone="${props.tone}"
      :show-badge="${props.showBadge}"
      :highlight="${props.highlight}"
      label="${props.label}"
      percentage="${props.percentage}"
      value-label="${props.valueLabel}"
      value="${props.value}"
    />
  `,
})
