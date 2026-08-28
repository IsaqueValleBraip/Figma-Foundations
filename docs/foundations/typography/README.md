# Typography

As familias de fonte sao tokens como qualquer outro — nao existe camada de fontes
separada no repositorio:

| Uso | Familia | Variavel CSS |
|---|---|---|
| Titulos | Sora | `--braip-type-font-family-title` |
| Texto | Poppins | `--braip-type-font-family-text` |

```css
font-family: var(--braip-type-font-family-title);
```

Os arquivos das fontes nao estao aqui e nao ha `@font-face`: carregar Sora e Poppins
(webfont, self-host ou provedor) e responsabilidade da aplicacao que consome a
biblioteca, junto do licenciamento correspondente.

Referencia dos tokens: [index.md](./index.md).
