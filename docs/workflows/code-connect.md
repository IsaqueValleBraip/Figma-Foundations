# Workflow — Code Connect

Parser `html` (opcao oficial para Vue), CLI pinado em `@figma/code-connect@1` — a v2
removeu os parsers de framework.

## Requisito de caminho

O CLI faz glob sobre o caminho absoluto do projeto e **nao encontra nenhum arquivo
quando o caminho contem colchetes** (`[...]`). A falha e silenciosa: `parse` retorna
vazio e `publish` diz que nao ha arquivos. Manter o clone em um caminho sem colchetes.

## Passos

1. **Descobrir componentes publicados**
   ```bash
   npm run figma:list      # gera docs/figma-components.json (local, fora do git)
   ```
2. **Gerar o arquivo de conexao**
   ```bash
   npm run cc:create -- "<url-do-node>" --outDir src/components
   ```
3. **Validar**
   ```bash
   npm run cc:parse
   npm run cc:publish -- --dry-run
   ```
4. **Publicar** — aparece no painel Dev Mode do componente
   ```bash
   npm run cc:publish
   ```
5. **Remover**
   ```bash
   npm run cc:unpublish -- --file src/components/Button.figma.ts
   ```

## Convencoes

- Um arquivo `.figma.ts` por component set, ao lado do `.vue`.
- URL escrita como `<FIGMA_LIBRARY>?node-id=X-Y`; a substituicao fica em
  `figma.config.json`, que nao e versionado — a identificacao do arquivo do Figma nao
  entra no repositorio.
- `importPaths` define o import mostrado ao dev dentro do Figma.

## Cuidado

Com zero arquivos `.figma.ts` ativos, `cc:parse` termina com sucesso validando nada.
Nao trate esse verde como cobertura ate existir a primeira conexao.

## Requisitos

- Plano Figma com Dev Mode (Organization/Enterprise) e permissao de editor.
- `.env` com `FIGMA_ACCESS_TOKEN` (escopos `file_read` + `file_code_connect:write`).
