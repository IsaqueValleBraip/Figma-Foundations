import figma, { html } from '@figma/code-connect/html'

// Component set "Comment" — Braip Components
// O eixo unico Type do Figma e desdobrado em dois eixos de codigo:
// `type` (feedback|testimony|chat) e `layout` (1|2|3, so para testimony).
figma.connect('<FIGMA_LIBRARY>?node-id=1422-19270', {
  props: {
    type: figma.enum('Type', {
      Feedback: 'feedback',
      'Testimony 1': 'testimony',
      'Testimony 2': 'testimony',
      'Testimony 3': 'testimony',
      Chat: 'chat',
    }),
    layout: figma.enum('Type', {
      'Testimony 1': '1',
      'Testimony 2': '2',
      'Testimony 3': '3',
    }),
    // O set tem um campo de texto por variante; todos alimentam o mesmo slot de corpo.
    feedback: figma.string('Feedback'),
    testimony: figma.string('Testimony'),
    chat: figma.string('Chat'),
    name: figma.string('Name'),
    position: figma.string('Position'),
    showImage: figma.boolean('Show Image'),
    showFiles: figma.boolean('Show Files'),
    showLink: figma.boolean('Show Link'),
    showAttachments: figma.boolean('Show Attachments'),
  },
  example: (props) => html`
    <BraipComment
      type="${props.type}"
      layout="${props.layout}"
      name="${props.name}"
      position="${props.position}"
      :show-image="${props.showImage}"
      :show-files="${props.showFiles}"
      :show-link="${props.showLink}"
      :show-attachments="${props.showAttachments}"
      datetime="2026-09-17T12:00:00-03:00"
      date-label="17 set 2026"
    >
      ${props.feedback}${props.testimony}${props.chat}
    </BraipComment>
  `,
})
