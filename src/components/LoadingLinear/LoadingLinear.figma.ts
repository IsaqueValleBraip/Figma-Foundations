import figma, { html } from '@figma/code-connect/html'

// Component set "Loading Linear" — Braip Components
// State e um eixo discreto no Figma (0%..100%) e vira `value` continuo no Vue.
figma.connect('<FIGMA_LIBRARY>?node-id=672-58787', {
  props: {
    mode: figma.enum('Mode', {
      Default: 'default',
      Information: 'information',
      Warning: 'warning',
      Error: 'error',
      Success: 'success',
    }),
    value: figma.enum('State', {
      '0%': 0,
      '25%': 25,
      '50%': 50,
      '75%': 75,
      '100%': 100,
    }),
  },
  example: (props) => html`
    <BraipLoadingLinear mode="${props.mode}" :value="${props.value}" />
  `,
})
