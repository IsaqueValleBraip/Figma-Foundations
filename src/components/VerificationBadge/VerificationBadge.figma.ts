import figma, { html } from '@figma/code-connect/html'

// Component set "Verification" — Braip Components
figma.connect('<FIGMA_LIBRARY>?node-id=1422-20615', {
  props: {
    size: figma.enum('Size', {
      'Extra Large': 'xl',
      Large: 'lg',
      Medium: 'md',
      Small: 'sm',
      'Extra Small': 'xs',
    }),
    border: figma.enum('Border', { True: true, False: false }),
  },
  example: (props) => html`
    <BraipVerificationBadge size="${props.size}" :border="${props.border}" />
  `,
})
