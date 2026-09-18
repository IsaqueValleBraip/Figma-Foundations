import figma, { html } from '@figma/code-connect/html'

// Component set "Button-Text" — Braip Components
figma.connect('<FIGMA_LIBRARY>?node-id=668-52224', {
  props: {
    type: figma.enum('Type', {
      Link: 'link',
      Select: 'select',
    }),
    size: figma.enum('Size', {
      'Extra Large': 'xl',
      Large: 'lg',
      Medium: 'md',
      Small: 'sm',
      'Extra Small': 'xs',
    }),
    color: figma.enum('Color', {
      Purple: 'purple',
      Grey: 'grey',
    }),
    // Hover e Pressed sao estados de CSS: so Disabled vira prop.
    disabled: figma.enum('State', { Disabled: true }),
    underline: figma.boolean('Underline'),
    showLabel: figma.boolean('Label'),
    label: figma.string('Text'),
    iconLeft: figma.boolean('Arrow left', {
      true: figma.instance('Icon left'),
      false: undefined,
    }),
    iconRight: figma.boolean('Arrow right', {
      true: figma.instance('Icon right'),
      false: undefined,
    }),
  },
  example: (props) => html`
    <BraipButtonText
      type="${props.type}"
      size="${props.size}"
      color="${props.color}"
      :disabled="${props.disabled}"
      :underline="${props.underline}"
      :show-label="${props.showLabel}"
    >
      <template #iconLeft>${props.iconLeft}</template>
      ${props.label}
      <template #iconRight>${props.iconRight}</template>
    </BraipButtonText>
  `,
})
