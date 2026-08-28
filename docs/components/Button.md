# Button

`src/components/Button.vue`

| Prop | Tipo | Padrao |
|---|---|---|
| `variant` | `primary \| secondary \| ghost` | `primary` |
| `size` | `sm \| md \| lg` | `md` |
| `disabled` | `boolean` | `false` |

Slot padrao: conteudo do botao.

Consome apenas foundations — nenhum valor literal no CSS. Superficie e texto vem de
`brand/core/*`, espacamento de `space/component/*`, raio de `space/radius/*` e
tipografia de `type/*`. Trocar um token no Figma muda o componente sem editar o `.vue`.

Code Connect: `Button.figma.ts.template` (desligado). Antes de ativar, confirmar os
nomes das propriedades no component set do Figma — o mapa de props do template e um
exemplo, nao um espelho verificado.
