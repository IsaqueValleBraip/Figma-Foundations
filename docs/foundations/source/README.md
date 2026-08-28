# Espelho das collections

Um arquivo por collection do Figma, sem perdas: `_meta`, ids, modos, referencias
`{...}`, descricoes, precisao numerica e alpha sao preservados.

| Collection | Arquivo | Modos |
|---|---|---|
| `Primitive` | `primitives.tokens.json` | value |
| `❖ Color` | `colors.tokens.json` | light, dark |
| `↳ Aliases` | `aliases.tokens.json` | herda light, dark |
| `Typography` | `typography.tokens.json` | value |
| `Spacing` | `spacing.tokens.json` | value |
| `Layout` | `layout.tokens.json` | desktop, tablet, mobile |

Cadeia de dependencia: `Primitive -> ❖ Color -> ↳ Aliases`. `Aliases` nao tem modo
proprio no Figma, mas resolve para `❖ Color` e por isso herda light e dark.

Pendencias abertas do arquivo do Figma: `src/foundations/known-issues.json`.
