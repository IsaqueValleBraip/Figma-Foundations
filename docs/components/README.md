# Componentes

| Componente | Codigo | Code Connect |
|---|---|---|
| Button (legado) | `src/components/Button.vue` | template desligado |
| Button Common | `src/components/ButtonCommon.vue` | `ButtonCommon.figma.ts` — ativo |
| Button Icon | `src/components/ButtonIcon.vue` | `ButtonIcon.figma.ts` — ativo |
| Stepper | — | template desligado |

`Button.vue` e anterior ao mapeamento do component set e tem outra API
(`variant`/`size` proprios). Ficou intacto para nao quebrar consumidores; o botao
que espelha o Figma e o `ButtonCommon.vue`.

Fluxo completo: [../workflows/code-connect.md](../workflows/code-connect.md).
