import figma, { html } from '@figma/code-connect/html'

// Component set "List" — Braip Components
figma.connect('<FIGMA_LIBRARY>?node-id=1422-21987', {
  props: {
    // Hover e Pressed sao estados de CSS: so Disabled vira prop.
    disabled: figma.enum('State', { Disabled: true }),
    showIconSystem: figma.boolean('Show Icon System'),
    showIconIllustration: figma.boolean('Show Icon Illustration'),
    showIconRight: figma.boolean('Show Icon Right'),
    showCheckbox: figma.boolean('Show Checkbox'),
    showAvatar: figma.boolean('Show Avatar'),
    showIconArrow: figma.boolean('Show Icon Arrow'),
    showTitle: figma.boolean('Show Title'),
    showDescription: figma.boolean('Show Description'),
    showSwitch: figma.boolean('Show Switch'),
    showRadio: figma.boolean('Show Radio'),
    showText: figma.boolean('Show Text'),
    title: figma.string('Title'),
    description: figma.string('Description'),
    text: figma.string('Text'),
  },
  example: (props) => html`
    <BraipList
      :disabled="${props.disabled}"
      :show-icon-system="${props.showIconSystem}"
      :show-icon-illustration="${props.showIconIllustration}"
      :show-icon-right="${props.showIconRight}"
      :show-checkbox="${props.showCheckbox}"
      :show-avatar="${props.showAvatar}"
      :show-icon-arrow="${props.showIconArrow}"
      :show-title="${props.showTitle}"
      :show-description="${props.showDescription}"
      :show-switch="${props.showSwitch}"
      :show-radio="${props.showRadio}"
      :show-text="${props.showText}"
    >
      <template #title>${props.title}</template>
      <template #description>${props.description}</template>
      <template #text>${props.text}</template>
    </BraipList>
  `,
})
