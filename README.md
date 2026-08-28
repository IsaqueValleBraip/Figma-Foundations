# Figma Foundations — Code Connect (Vue)

Ponte entre a biblioteca de componentes no Figma e os componentes Vue, via
[Figma Code Connect](https://developers.figma.com/docs/code-connect/).

- CLI: `@figma/code-connect@1` — parser `html`, label `Vue`
  (a v2 removeu os parsers de framework; para Vue a v1 e o caminho suportado)
- Design tokens nao vivem neste repo.

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
| `npm run figma:list` | Baixa os componentes publicados -> `docs/figma-components.json` (script e saida sao locais, fora do git) |
| `npm run cc:create -- "<url-do-node>" --outDir src/components` | Gera o boilerplate de conexao |
| `npm run cc:parse` | Valida os arquivos localmente |
| `npm run cc:publish -- --dry-run` | Testa a publicacao sem gravar |
| `npm run cc:publish` | Publica no Figma (aparece no Dev Mode) |
| `npm run cc:unpublish -- --file <arquivo>` | Remove a conexao |

## Estado

Nenhum componente conectado ainda. Os arquivos `src/components/*.figma.ts.template`
sao exemplos desligados — renomear removendo `.template` para entrar no publish.

Detalhes do fluxo: [`docs/CODE-CONNECT.md`](docs/CODE-CONNECT.md).
