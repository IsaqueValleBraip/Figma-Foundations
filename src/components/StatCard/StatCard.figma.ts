import figma, { html } from '@figma/code-connect/html'

// Component set "StatCard" — Braip Components
figma.connect('<FIGMA_LIBRARY>?node-id=1930-45343', {
  props: {
    orientation: figma.enum('Orientation', {
      Vertical: 'vertical',
      Horizontal: 'horizontal',
      Finance: 'finance',
    }),
    type: figma.enum('Type', {
      Neutral: 'neutral',
      Success: 'success',
      Info: 'info',
      Danger: 'danger',
    }),
    // State=Hover e CSS; so Empty vira prop.
    empty: figma.enum('State', { Empty: true }),
    // `Show Icon` e `Show Delta` ainda sao VARIANT True|False no Figma —
    // expostos como prop booleana no componente.
    showIcon: figma.enum('Show Icon', { True: true, False: false }),
    showDelta: figma.enum('Show Delta', { True: true, False: false }),
  },
  example: (props) => html`
    <BraipStatCard
      orientation="${props.orientation}"
      type="${props.type}"
      :empty="${props.empty}"
      :show-icon="${props.showIcon}"
      :show-delta="${props.showDelta}"
    >
      <template #label>Label</template>
      <template #value>Value</template>
    </BraipStatCard>
  `,
})
