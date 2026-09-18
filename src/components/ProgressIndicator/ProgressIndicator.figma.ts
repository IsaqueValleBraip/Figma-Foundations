import figma, { html } from '@figma/code-connect/html'

// Component set "Progress" — Braip Components
// Type=Disabled vira prop `disabled`; os demais valores viram o eixo `state`.
figma.connect('<FIGMA_LIBRARY>?node-id=1422-20655', {
  props: {
    state: figma.enum('Type', {
      Default: 'default',
      'Current Step': 'current',
      Success: 'success',
    }),
    disabled: figma.enum('Type', { Disabled: true }),
    color: figma.enum('Color', { Purple: 'purple', Green: 'green' }),
  },
  example: (props) => html`
    <BraipProgressIndicator
      state="${props.state}"
      color="${props.color}"
      :disabled="${props.disabled}"
    />
  `,
})
