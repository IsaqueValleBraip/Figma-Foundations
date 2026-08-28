# Fontes

| Uso | Familia | Token |
|---|---|---|
| Titulos | Sora | `--braip-type-font-family-title` |
| Texto | Poppins | `--braip-type-font-family-text` |

Os nomes vem da collection `Typography` no Figma. **Os binarios nao estao no
repositorio**: dependem de licenca e devem ser adicionados em `src/fonts/files/`
pelo time responsavel, junto do arquivo de licenca correspondente.

Enquanto isso, `src/fonts/index.css` mantem as declaracoes `@font-face` comentadas e
expoe duas cadeias de fallback prontas para uso:

```css
font-family: var(--braip-font-stack-title);
font-family: var(--braip-font-stack-text);
```

Para ativar: colocar os arquivos `.woff2` em `src/fonts/files/`, descomentar os
`@font-face` e conferir os intervalos de peso declarados.
