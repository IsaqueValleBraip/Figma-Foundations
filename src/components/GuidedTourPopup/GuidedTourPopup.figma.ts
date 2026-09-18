import figma, { html } from '@figma/code-connect/html'

// Component set "Pop-up" — Braip Components
// O set tem 3 variantes no eixo Type. `open` e `close` sao so de codigo:
// o Figma nao modela visibilidade aqui.
figma.connect('<FIGMA_LIBRARY>?node-id=1422-20286', {
  props: {
    type: figma.enum('Type', {
      Default: 'default',
      Welcome: 'welcome',
      Award: 'award',
    }),
    title: figma.string('Title'),
    subtitle: figma.string('Subtitle'),
    description: figma.string('Description'),
  },
  example: (props) => html`
    <BraipGuidedTourPopup
      type="${props.type}"
      title="${props.title}"
      subtitle="${props.subtitle}"
      description="${props.description}"
      :open="true"
      @close="onClose"
    />
  `,
})
