# Button Icon

`src/components/ButtonIcon.vue` — espelha o component set `Icon` (Braip Components,
node `672:56654`, 300 variantes). Mesma matriz do [Button Common](./ButtonCommon.md),
sem rotulo: area quadrada, unico conteudo e o icone.

| Prop | Tipo | Padrao | Variante no Figma |
|---|---|---|---|
| `type` | `primary \| secundary \| outline \| only` | `primary` | `Type` |
| `size` | `xl \| lg \| md \| sm \| xs` | `xl` | `Size` |
| `mode` | `normal \| destructive \| sucess` | `normal` | `Mode` |
| `disabled` | `boolean` | `false` | `State=Disabled` |
| `loading` | `boolean` | `false` | `State=Loading` |
| `label` | `string` | obrigatoria | — |

`label` vira `aria-label`. E obrigatoria de proposito: sem texto visivel, o botao
nao teria nome acessivel.

Cores identicas as do Common em cada combinacao `Type` x `State` x `Mode` — a
paridade entre os dois sets foi verificada no Figma. Largura e altura usam o mesmo
primitivo da altura do Common no size equivalente.
