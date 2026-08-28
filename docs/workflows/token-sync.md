# Workflow — sincronizar tokens com o Figma

O Figma e o upstream. Este fluxo atualiza o espelho e regenera os derivados.

## 1. Exportar do Figma

O plugin **Desktop Bridge** precisa estar aberto no arquivo de foundations — a
Variables REST API e exclusiva de plano Enterprise e falha sem ele.

Exportar em **DTCG**, com todos os modos e `resolveAliases: false`.

Por que DTCG e nao o dump cru de variaveis: no DTCG os aliases vem como caminhos
qualificados (`{primitive.Colors.neutral.light.0}`) em vez de `VariableID:`. Isso
elimina por construcao a classe de bug em que o alias nao encontra o alvo.

## 2. Atualizar o espelho

Substituir os arquivos em `src/foundations/source/*.tokens.json` pelo resultado da
exportacao, preservando o formato (`_meta`, modos, referencias, descricoes).

## 3. Regenerar e validar

```bash
npm run tokens:build
npm run tokens:validate
```

O build falha se aparecer referencia quebrada nova. Se a causa for real e estiver no
Figma, documentar em `src/foundations/known-issues.json` com a causa — nunca silenciar
sem registro.

## 4. Revisar o diff

O que olhar antes de commitar:

- `src/foundations/source/` — o que mudou no design
- `generated-manifest.json` — contagem de declaracoes e de sobrescritas responsivas
- `colors/light.css` e `colors/dark.css` — tokens que entraram ou sairam do tema

## Pendencias conhecidas

Dez pendencias documentadas, todas com a mesma raiz: seis aliases apontam para
bibliotecas nao assinadas no Figma (a variavel de origem foi desvinculada e a
referencia ficou pendurada), e quatro aliases dark dependem delas.

```
colors:aux/pink/states/primary[light]
colors:aux/pink/states/secundary[light]
colors:global/surfaces/bg/{aside,primary,secondary,tertiary}[dark]
aliases:bg/surface-{aside,primary,secondary,tertiary}[dark]
```

Correcao e no arquivo do Figma: religar a biblioteca ou reapontar o token. Feito isso,
`tokens:validate` acusa `waiver-obsoleto` e a entrada deve sair do `known-issues.json`.
