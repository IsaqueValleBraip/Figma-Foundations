import figma, { html } from '@figma/code-connect/html'

// Component set "Popover" — Braip Components
//
// DIVIDA DE DESIGN (correcao adiada no Figma):
// a opcao do eixo Type que representa "acima do gatilho" esta grafada "Higher",
// traducao errada de "Superior" — deveria ser "Top". A chave abaixo espelha a
// grafia REAL do set (`Higher`) para o Code Connect nao quebrar; o valor em
// codigo continua `top`, alinhado a Tooltip/TooltipIcon. Quando o set for
// renomeado no Figma, trocar a chave `Higher` por `Top` aqui.
figma.connect('<FIGMA_LIBRARY>?node-id=1422-20329', {
  props: {
    position: figma.enum('Type', {
      Higher: 'top',
      Bottom: 'bottom',
      Left: 'left',
      Right: 'right',
    }),
    title: figma.string('Title'),
    description: figma.string('Description'),
  },
  example: (props) => html`
    <BraipPopover
      position="${props.position}"
      title="${props.title}"
      description="${props.description}"
      :open="isOpen"
      @close="isOpen = false"
    >
      <template #trigger><BraipButtonIcon /></template>
    </BraipPopover>
  `,
})
