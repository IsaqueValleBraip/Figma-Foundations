# Figma Foundations — Code Connect (Vue)

Ponte entre a biblioteca de componentes no Figma e os componentes Vue, via
[Figma Code Connect](https://developers.figma.com/docs/code-connect/).

- CLI: `@figma/code-connect@1` — parser `html`, label `Vue`
  (a v2 removeu os parsers de framework; para Vue a v1 e o caminho suportado)
- Design tokens: mirror versionado das collections priorizadas da biblioteca de
  foundations no Figma — `Primitive`, `Typography`, `Spacing`, `Layout`, `Color` e `Aliases`.

## Requisito de caminho

O CLI do Code Connect faz glob sobre o caminho absoluto do projeto e **nao encontra
nenhum arquivo quando o caminho contem colchetes** (`[...]`) — falha silenciosa,
`parse` retorna vazio. Manter o clone em um caminho sem colchetes.

## Setup

```bash
npm install
cp .env.example .env                       # preencher token e file key
cp figma.config.example.json figma.config.json   # preencher a URL da biblioteca
```

`.env` e `figma.config.json` sao locais e ignorados pelo git.

## Comandos

| Comando | O que faz |
|---|---|
| `npm run dev` | Sobe o playground Vite em `localhost:5175` para preview local dos componentes |
| `npm run build` / `npm run preview` | Build e preview estatico do playground |
| `npm run tokens:build -- <dir-do-ssot>` | Regenera `tokens/*.json`, `src/tokens/tokens.css` e `src/tokens/index.ts` |
| `npm run figma:list` | Baixa os componentes publicados -> `docs/figma-components.json` (script e saida sao locais, fora do git) |
| `npm run cc:create -- "<url-do-node>" --outDir src/components` | Gera o boilerplate de conexao |
| `npm run cc:parse` | Valida os arquivos localmente |
| `npm run cc:publish -- --dry-run` | Testa a publicacao sem gravar |
| `npm run cc:publish` | Publica no Figma (aparece no Dev Mode) |
| `npm run cc:unpublish -- --file <arquivo>` | Remove a conexao |

## Design tokens

651 tokens nas collections priorizadas, consumiveis de duas formas:

```ts
import { color, spacing, typography, layout, primitive, alias } from './tokens'
```

```css
@import './tokens/tokens.css';   /* variaveis --braip-* */
```

- `:root` carrega Primitive, Typography, Spacing, o modo `light` de Color e o modo
  `desktop` de Layout.
- `[data-theme="dark"]` sobrescreve as cores e os aliases; media queries sobrescrevem Layout nos
  breakpoints de tablet e mobile.
- `Primitive` alimenta as demais collections: referencias como `{colors/neutral/light/0}`
  sao resolvidas em tempo de build ate o valor final.
- A collection `Aliases` e a camada semantica: cada token aponta para um token de
  `Color` (ou para outro alias). O build segue a cadeia inteira e emite o valor
  literal, entao `--braip-alias-*` ja sai como cor resolvida em cada modo.
- Arquivos gerados — nao editar a mao. A fonte e o Figma; o gerador vive em `scripts/`
  (local) e le o mirror do SSOT de tokens.

## Estado

Nenhum componente conectado ainda. Os arquivos `src/components/*.figma.ts.template`
sao exemplos desligados — renomear removendo `.template` para entrar no publish.

Detalhes do fluxo: [`docs/CODE-CONNECT.md`](docs/CODE-CONNECT.md).
