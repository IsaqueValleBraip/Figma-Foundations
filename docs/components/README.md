# Componentes

| Componente | Codigo | Code Connect |
|---|---|---|
| Button | `src/components/Button.vue` | template desligado |
| Stepper | — | template desligado |

Nenhuma conexao esta publicada. Os arquivos `*.figma.ts.template` sao exemplos
prontos: renomear removendo `.template` faz o arquivo entrar no `include` do
`figma.config.json` e, a partir dai, no `cc:publish`.

Consequencia importante: com zero arquivos ativos, `npm run cc:parse` **passa
validando nada**. Ele so vira um teste de verdade depois da primeira conexao.

Fluxo completo: [../workflows/code-connect.md](../workflows/code-connect.md).
