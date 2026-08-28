# Figma Foundations

Ponte entre a biblioteca de foundations e componentes no Figma e o codigo Vue, via
tokens gerados e [Figma Code Connect](https://developers.figma.com/docs/code-connect/).

- **Tokens** — 651 tokens em seis collections, espelhados e compilados para TS e CSS
- **Code Connect** — `@figma/code-connect@1`, parser `html`, label `Vue`
- **Playground** — Vite, para ver componentes e foundations rodando

O Figma e a fonte de verdade; `src/foundations/source/` e o espelho versionado; tudo
em `src/foundations/**` e derivado. Detalhes em [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## Requisito de caminho

O CLI do Code Connect faz glob sobre o caminho absoluto e **nao encontra nenhum
arquivo quando o caminho contem colchetes** (`[...]`) — falha silenciosa. Manter o
clone em um caminho sem colchetes.

## Setup

```bash
npm install
cp .env.example .env                              # token e file key
cp figma.config.example.json figma.config.json    # URL da biblioteca
```

`.env` e `figma.config.json` sao locais e ignorados pelo git.

## Comandos

| Comando | O que faz |
|---|---|
| `npm run dev` | Playground em `localhost:5175` |
| `npm run build` / `npm run preview` | Build e preview estatico |
| `npm run tokens:build` | Regenera `src/foundations/**` e `docs/foundations/**` |
| `npm run tokens:validate` | Schema, referencias, ciclos, modos e paridade |
| `npm run check` | tokens:build + tokens:validate + cc:parse + build |
| `npm run figma:list` | Lista componentes publicados (saida local) |
| `npm run cc:create -- "<url-node>" --outDir src/components` | Boilerplate de conexao |
| `npm run cc:parse` | Valida os arquivos de Code Connect |
| `npm run cc:publish -- --dry-run` | Testa a publicacao |
| `npm run cc:publish` | Publica no Dev Mode |

## Uso

```ts
import { color, alias, spacing, typography, layout, primitive, responsive } from '@/foundations'
```

```css
@import './foundations/index.css';
```

| Escopo | Conteudo |
|---|---|
| `:root` | Primitive, Color light, Alias light, Typography, Spacing, Layout desktop |
| `[data-theme="dark"]` | sobrescritas de Color e Alias |
| `@media (max-width: 1439px)` | Layout tablet + tokens responsivos |
| `@media (max-width: 743px)` | Layout mobile + tokens responsivos |

Prefixo publico `--braip-*`. `src/tokens/` segue funcionando como reexport de
compatibilidade.

## Estado

- Nenhum componente conectado. Os `*.figma.ts.template` sao exemplos desligados —
  com zero conexoes ativas, `cc:parse` passa validando nada.
- Dez pendencias de referencia documentadas em `src/foundations/known-issues.json`,
  todas com origem no arquivo do Figma. Ver
  [docs/workflows/token-sync.md](docs/workflows/token-sync.md).
- Binarios de fonte nao versionados — ver [docs/fonts/README.md](docs/fonts/README.md).
