import figma, { html } from '@figma/code-connect/html'

// Component set "Breadcrumb-Group" — Braip Components
figma.connect('<FIGMA_LIBRARY>?node-id=741-18792', {
  props: {
    size: figma.enum('Size', { Small: 'small', Large: 'large' }),
    // Amount=N Item nao vira prop: no codigo e o comprimento de `items`.
    // O mapeamento existe so para o snippet mostrar a lista com o tamanho certo.
    items: figma.enum('Amount', {
      '2 Item': "[{ label: 'Nivel 1', href: '#' }, { label: 'Nivel 2' }]",
      '3 Item': "[{ label: 'Nivel 1', href: '#' }, { label: 'Nivel 2', href: '#' }, { label: 'Nivel 3' }]",
      '4 Item': "[{ label: 'Nivel 1', href: '#' }, { label: 'Nivel 2', href: '#' }, { label: 'Nivel 3', href: '#' }, { label: 'Nivel 4' }]",
      '5 Item': "[{ label: 'Nivel 1', href: '#' }, { label: 'Nivel 2', href: '#' }, { label: 'Nivel 3', href: '#' }, { label: 'Nivel 4', href: '#' }, { label: 'Nivel 5' }]",
      '6 Item': "[{ label: 'Nivel 1', href: '#' }, { label: 'Nivel 2', href: '#' }, { label: 'Nivel 3', href: '#' }, { label: 'Nivel 4', href: '#' }, { label: 'Nivel 5', href: '#' }, { label: 'Nivel 6' }]",
    }),
  },
  example: (props) => html`
    <BraipBreadcrumb size="${props.size}" :items="${props.items}" />
  `,
})
