import figma, { html } from '@figma/code-connect/html'

// Component set "Conta bancaria" — Braip Components.
// O nome do set no Figma ainda esta em PT (renomeacao adiada); no codigo o
// componente e generico e se chama Accordion.
figma.connect('<FIGMA_LIBRARY>?node-id=1422-15463', {
  props: {
    // Eixo unico do set: State=Default|Active vira a prop `open`.
    open: figma.enum('State', { Active: true, Default: false }),
  },
  example: (props) => html`
    <BraipAccordion title="Conta bancaria" :open="${props.open}">
      <!-- itens do painel -->
    </BraipAccordion>
  `,
})
