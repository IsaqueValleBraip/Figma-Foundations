import figma, { html } from '@figma/code-connect/html'

// Component set "Password Level" — Braip Components
figma.connect('<FIGMA_LIBRARY>?node-id=1422-20714', {
  props: {
    level: figma.enum('Level', {
      Weak: 'weak',
      Medium: 'medium',
      Strong: 'strong',
      Secure: 'secure',
    }),
  },
  example: (props) => html`<BraipPasswordLevel level="${props.level}" />`,
})
