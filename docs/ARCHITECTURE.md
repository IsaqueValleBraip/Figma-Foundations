# Arquitetura

## Fonte de verdade

Uma so, em cadeia unidirecional — nunca editar um estagio a jusante:

```
Figma (upstream)  ->  src/foundations/source/*.tokens.json  ->  src/foundations/**/*.{ts,css}
   autoridade            espelho versionado                        derivados gerados
```

- **Figma** e a unica autoridade sobre valores. Toda mudanca de token nasce la.
- **`source/*.tokens.json`** e o espelho sem perdas: preserva `_meta`, ids de collection,
  modos, referencias `{...}`, descricoes, precisao numerica e alpha. E o que entra em
  revisao de PR quando o design muda.
- **`src/foundations/**`** e derivado. Regenerado por `npm run tokens:build`; qualquer
  edicao manual e perdida no proximo build.

O espelho e atualizado pelo fluxo em [workflows/token-sync.md](./workflows/token-sync.md).

## Separacao por dominio

| Dominio | Origem no Figma | Saida |
|---|---|---|
| `colors/` | `Primitive` (cores), `❖ Color`, `↳ Aliases` | `main`, `light`, `dark` |
| `sizes/` | `Primitive` (escala de espaco), `Spacing` | `primitives`, `spacing`, `radius` |
| `typography/` | `Typography` | `font-family`, `size`, `line-height`, `weight` |
| `layout/` | `Layout` | `breakpoints`, `font`, `grid` |

Temas sao **camada de consumo**, nao estrutura de origem: a collection `❖ Color` nao e
quebrada fisicamente. O build particiona por comportamento — `main` reune os tokens cujo
valor e identico nos dois temas, `light`/`dark` apenas os que divergem. Isso mantem o CSS
do tema pequeno e torna obvio, na revisao, o que realmente muda com o tema.

## Contrato publico

```css
@import './foundations/index.css';
```

| Escopo | Conteudo |
|---|---|
| `:root` | Primitive, Color light, Alias light, Typography, Spacing, Layout desktop |
| `[data-theme="dark"]` | sobrescritas de Color e Alias |
| `@media (max-width: 1439px)` | Layout tablet + tokens responsivos |
| `@media (max-width: 743px)` | Layout mobile + tokens responsivos |

Prefixo `--braip-*`. Em TypeScript: `primitive`, `color`, `alias`, `typography`,
`spacing`, `layout` e `responsive`, alem dos exports por dominio.

`src/tokens/` continua funcionando como reexport de compatibilidade.

## Garantias do build

1. **Determinismo** — mesma entrada produz os mesmos arquivos; declaracoes ordenadas por nome.
2. **Falha explicita** — referencia ausente, ciclo, modo incompleto, divergencia de paridade
   ou manifesto defasado encerram com codigo 1. Nada e descartado em silencio.
3. **Pendencias declaradas** — `known-issues.json` e a unica valvula de escape, e cada entrada
   exige causa registrada. Um waiver que passa a resolver vira erro de `waiver-obsoleto`, entao
   a lista nao envelhece sozinha.
4. **Paridade** — `folhas x modos = declaracoes + pendencias`, e todo `--braip-*` no CSS tem
   token de origem (e vice-versa).

## Decisoes

- **Grafias preservadas.** `secundary`, `disable`, `sucesso`, `sucesse` vem do Figma e ficam
  como estao. Corrigir e migracao propria, com alias de compatibilidade e nota de release —
  nunca rename silencioso.
- **Responsividade explicita.** 24 tokens de Typography e Spacing resolvem atraves de `Layout`.
  No CSS eles recebem sobrescrita nas media queries; em TS, `typography` e `spacing` seguem
  com o valor desktop (API estavel) e `responsive` expoe o valor por viewport.
- **Fontes sem binario.** Os arquivos dependem de licenca e nao estao versionados;
  `src/fonts/index.css` traz `@font-face` comentado e uma cadeia de fallback.
