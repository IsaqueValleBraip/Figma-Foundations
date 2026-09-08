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

## 2b. Cores aliasadas com opacidade

O Figma passou a permitir compor opacidade **preservando o alias** — internamente um
`VARIABLE_EXPRESSION` / `COMPOSE_COLOR`, com `[alias, opacidade]` como argumentos.
Antes disso o unico jeito era congelar o resultado num hex bruto (`#5EC34D52`), o que
quebrava o vinculo com o primitive e deixava o valor apodrecer quando a paleta mudava.

No espelho isso vira um valor estruturado no lugar do hex:

```json
"ghost": {
  "$type": "color",
  "$value": {
    "light": { "$alias": "{colors/auxiliary/green/600}", "$alpha": 0.32 },
    "dark":  { "$alias": "{colors/auxiliary/green/600}", "$alpha": 0.32 }
  }
}
```

`$alpha` e fracao (0..1). O build resolve o alias ate o literal e compoe a opacidade
via `withAlpha` (`scripts/tokens/lib.mjs`), emitindo `#RRGGBBAA` — a saida gerada
continua no mesmo formato de antes, so a origem passa a ser rastreavel.

**Atencao:** o exportador DTCG do MCP `figma-console` ainda nao entende
`VARIABLE_EXPRESSION` — ele descarta esses valores com o aviso
`COLOR value isn't an RGB object`. Enquanto isso nao for corrigido upstream, esses
tokens precisam ser extraidos do Bridge via `figma_execute`, lendo
`valuesByMode` e resolvendo `expressionArguments`.

## 2c. Motion

A collection `Motion` traz dois tipos que nenhum outro dominio usava:

- `$type: "duration"` — numero em ms; sai como `250ms`, nao `250px`
- `$type: "cubicBezier"` — o Figma guarda os quatro argumentos crus numa string
  (`"0.2, 0, 0, 1"`); o build embrulha em `cubic-bezier(...)`

Os cinco `duration/*` semanticos aliasam a escala crua em `value/duration/*` — a mesma
separacao entre primitivo e semantico dos outros dominios.

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
