import figma, { html } from '@figma/code-connect/html'

// Component set "Toast" — Braip Components
figma.connect('<FIGMA_LIBRARY>?node-id=1422-14187', {
  props: {
    size: figma.enum('Size', { Long: 'long', Compact: 'compact' }),
    color: figma.enum('Color', {
      Purple: 'purple',
      Red: 'red',
      Orange: 'orange',
      Blue: 'blue',
      Green: 'green',
    }),
    title: figma.string('Text Title'),
    subtitle: figma.string('Text Subtitle'),
    closable: figma.boolean('Close'),
    icon: figma.boolean('Icon', { true: figma.children('Status'), false: undefined }),
    action: figma.boolean('Button', { true: figma.children('Text/Button'), false: undefined }),
  },
  example: (props) => html`
    <BraipToast
      size="${props.size}"
      color="${props.color}"
      title="${props.title}"
      subtitle="${props.subtitle}"
      :closable="${props.closable}"
      @close="onClose"
    >
      <template #icon>${props.icon}</template>
      <template #action>${props.action}</template>
    </BraipToast>
  `,
})
