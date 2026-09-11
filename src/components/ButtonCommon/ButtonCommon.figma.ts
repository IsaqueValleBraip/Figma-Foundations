import figma, { html } from '@figma/code-connect/html'

// Component set "Common" — Braip Components
figma.connect('<FIGMA_LIBRARY>?node-id=666-48486', {
  props: {
    type: figma.enum('Type', {
      Primary: 'primary',
      Secundary: 'secundary',
      Outline: 'outline',
      Only: 'only',
    }),
    size: figma.enum('Size', {
      'Extra Large': 'xl',
      Large: 'lg',
      Medium: 'md',
      Small: 'sm',
      'Extra Small': 'xs',
    }),
    mode: figma.enum('Mode', {
      Normal: 'normal',
      Destructive: 'destructive',
      Sucess: 'sucess',
    }),
    // Hover e Pressed sao estados de CSS: so Disabled e Loading viram prop.
    disabled: figma.enum('State', { Disabled: true }),
    loading: figma.enum('State', { Loading: true }),
    label: figma.string('Text'),
    iconLeft: figma.boolean('Icon left - Show', {
      true: figma.instance('Icon left'),
      false: undefined,
    }),
    iconRight: figma.boolean('Icon right - Show', {
      true: figma.instance('Icon right'),
      false: undefined,
    }),
  },
  example: (props) => html`
    <BraipButtonCommon
      type="${props.type}"
      size="${props.size}"
      mode="${props.mode}"
      :disabled="${props.disabled}"
      :loading="${props.loading}"
    >
      <template #iconLeft>${props.iconLeft}</template>
      ${props.label}
      <template #iconRight>${props.iconRight}</template>
    </BraipButtonCommon>
  `,
})
