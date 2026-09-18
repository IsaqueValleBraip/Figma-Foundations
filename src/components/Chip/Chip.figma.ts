import figma, { html } from '@figma/code-connect/html'

// Component set "Chips" — Braip Components (168 variantes)
figma.connect('<FIGMA_LIBRARY>?node-id=666-46971', {
  props: {
    type: figma.enum('Type', {
      Selected: 'selected',
      Assist: 'assist',
    }),
    // Style vira `lead` no componente: `style` colide com o fallthrough do Vue.
    lead: figma.enum('Style', {
      Avatar: 'avatar',
      Icon: 'icon',
      Text: 'text',
    }),
    color: figma.enum('Color', {
      Purple: 'purple',
      Red: 'red',
      Orange: 'orange',
      Blue: 'blue',
      Pink: 'pink',
      Grey: 'grey',
      Green: 'green',
    }),
    // Hover e Pressed sao estados de CSS: so Active e Disabled viram prop.
    // O eixo Mode (On/Off) e redundante com State=Disabled e nao vira prop.
    actived: figma.enum('State', { Active: true }),
    disabled: figma.enum('State', { Disabled: true }),
    label: figma.string('Text'),
    icon: figma.instance('Icon'),
  },
  example: (props) => html`
    <BraipChip
      type="${props.type}"
      lead="${props.lead}"
      color="${props.color}"
      label="${props.label}"
      :actived="${props.actived}"
      :disabled="${props.disabled}"
    >
      <template #icon>${props.icon}</template>
    </BraipChip>
  `,
})
