# Button Common

`src/components/ButtonCommon.vue` — espelha o component set `Common` (Braip Components,
node `666:48486`, 300 variantes).

| Prop | Tipo | Padrao | Variante no Figma |
|---|---|---|---|
| `type` | `primary \| secundary \| outline \| only` | `primary` | `Type` |
| `size` | `xl \| lg \| md \| sm \| xs` | `xl` | `Size` |
| `mode` | `normal \| destructive \| sucess` | `normal` | `Mode` |
| `disabled` | `boolean` | `false` | `State=Disabled` |
| `loading` | `boolean` | `false` | `State=Loading` |

Slots: padrao (rotulo), `iconLeft`, `iconRight` — correspondem a `Icon left - Show` e
`Icon right - Show`.

`State=Hover` e `State=Pressed` nao viram prop: sao `:hover` e `:active` no CSS.
As grafias `secundary` e `sucess` seguem o Figma de proposito.

## Origem dos valores

Cor sai da camada alias (`--braip-alias-*`), medida sai de `--braip-space-*` e dos
primitivos `--braip-value-space-*`, tipografia de `--braip-type-*`. Nenhum literal.

| Size | Altura | Padding lateral | Raio | Tipografia |
|---|---|---|---|---|
| xl | `value-space-72` | `space-base-md` | `radius-md` | `text-p3` |
| lg | `value-space-56` | `space-base-sm` | `radius-sm` | `text-p4` |
| md | `value-space-48` | `space-base-sm` | `radius-sm` | `text-p5` |
| sm | `value-space-40` | `space-base-sm` | `radius-sm` | `text-p6` |
| xs | `value-space-32` | `space-base-xs` | `radius-xs` | `text-p7` |

`Disabled` colapsa todos os `Type`/`Mode` em `alias-neutral-primary` +
`alias-neutral-text`, como no Figma.

## Gap conhecido

Os tamanhos de icone do Figma (28, 20 e 18 px nos sizes xl, md e sm) nao tem
primitivo em foundations — so 24 e 16 existem. Por isso o CSS nao dimensiona o
icone: o tamanho vem do SVG passado pelo consumidor. Criar os primitivos resolve.
