# Code Connect — fluxo

Parser `html` (opcao oficial do Code Connect para Vue), CLI pinado em
`@figma/code-connect@1`. Configuracao local em `figma.config.json`
(a partir de `figma.config.example.json`), credenciais em `.env`.

## Fluxo

1. **Descobrir componentes publicados**
   ```bash
   npm run figma:list      # gera docs/figma-components.json (key, nodeId, url)
   # scripts/ e docs/figma-components.json nao sao versionados
   ```
2. **Gerar um arquivo de conexao a partir do node**
   ```bash
   npm run cc:create -- "<url-do-node>" --outDir src/components
   ```
   Ou copiar `src/components/Button.figma.ts.template` -> `Button.figma.ts` e ajustar as props.
3. **Validar sem publicar**
   ```bash
   npm run cc:parse
   npm run cc:publish -- --dry-run
   ```
4. **Publicar** (aparece no painel Dev Mode do componente)
   ```bash
   npm run cc:publish
   ```
5. **Remover uma conexao**
   ```bash
   npm run cc:unpublish -- --file src/components/Button.figma.ts
   ```

## Convencoes

- Um arquivo `.figma.ts` por component set do Figma, ao lado do `.vue`.
- URL do node escrita como `<FIGMA_LIBRARY>?node-id=X-Y`; a substituicao fica em
  `figma.config.json` (`documentUrlSubstitutions`), que nao e versionado — assim a
  identificacao do arquivo Figma nao entra no repositorio.
- `importPaths` mapeia `src/components/*` para o pacote publicado, que e o import
  mostrado ao dev dentro do Figma.
- Design tokens nao ficam aqui.

## Seguranca

- `FIGMA_ACCESS_TOKEN` so existe em `.env` local. Nunca commitar, nunca colar em
  arquivo versionado, nunca passar via `--token` em comando que va para o historico.
- Escopos minimos: `file_read` + `file_code_connect:write`.
- `docs/figma-components.json` e gerado sob demanda e ignorado pelo git.

## Requisitos

- Plano Figma com Dev Mode (Organization/Enterprise) e permissao de editor no arquivo.
- Clone em caminho sem colchetes (limitacao de glob do CLI).

## Design tokens

As collections priorizadas da biblioteca de foundations no Figma sao espelhadas em
`tokens/*.json` e compiladas para `src/tokens/`:

| Collection no Figma | Arquivo | Modos | Tokens |
|---|---|---|---|
| `Primitive` | `tokens/primitives.json` | value | 149 |
| `❖ Color` | `tokens/colors.json` | light, dark | 310 |
| `Typography` | `tokens/typography.json` | value | 39 |
| `Spacing` | `tokens/spacing.json` | value | 40 |
| `Layout` | `tokens/layout.json` | desktop, tablet, mobile | 24 |

`Primitive` e a base: as outras collections referenciam seus valores por alias.
Quando houver conflito com qualquer outra collection do arquivo, estas cinco vencem.

Para atualizar apos mudanca no Figma: re-sincronizar o SSOT de tokens e rodar
`npm run tokens:build -- <dir-do-ssot>`, conferindo o diff de `src/tokens/`.
