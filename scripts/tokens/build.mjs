#!/usr/bin/env node
// Gera os modulos por dominio de src/foundations/ a partir do espelho em source/.
// Determinístico: mesma entrada -> mesmos arquivos. Falha explicita em qualquer
// referencia quebrada que nao esteja documentada em known-issues.json.
import fs from 'node:fs'
import path from 'node:path'
import {
  COLLECTIONS, OUT_DIR, ROOT, VIEWPORTS, banner, buildIndex, cssVar, expand,
  leaves, loadSources, nest, responsiveOverrides, tsBanner, writeFile,
} from './lib.mjs'

const sources = loadSources()
const index = buildIndex(sources)
const { decls, errors } = expand(sources, index)

const waiverPath = path.join(ROOT, 'src/foundations/known-issues.json')
const waiver = fs.existsSync(waiverPath) ? JSON.parse(fs.readFileSync(waiverPath, 'utf8')) : { waived: [] }
const waived = new Set(waiver.waived.map((w) => w.id))
const unexpected = errors.filter((e) => !waived.has(e.id))

if (unexpected.length) {
  console.error(`build abortado: ${unexpected.length} referencia(s) nao resolvida(s) fora de known-issues.json`)
  for (const e of unexpected.slice(0, 20)) console.error(`  ${e.kind}: ${e.id}${e.ref ? ` -> ${e.ref}` : ''}`)
  process.exit(1)
}

const written = []
const by = (fn) => decls.filter(fn)
const sortDecls = (list) => [...list].sort((a, b) => a.name.localeCompare(b.name))

const cssBlock = (list, selector, indent = '  ') => {
  const rows = sortDecls(list).map((d) => `${indent}${d.name}: ${d.value};`)
  return rows.length ? `${selector} {\n${rows.join('\n')}\n}\n` : ''
}

const tsModule = (source, exportsMap) =>
  tsBanner(source) +
  Object.entries(exportsMap)
    .map(([name, value]) => `\nexport const ${name} = ${JSON.stringify(value, null, 2)} as const\n`)
    .join('')

// ---- colors (Primitive/colors + ❖ Color + ↳ Aliases) -----------------------
const colorDecls = by(
  (d) => d.collection === 'colors' || d.collection === 'aliases' ||
    (d.collection === 'primitives' && d.trail[0] === 'colors'),
)
const keyOf = (d) => `${d.collection}:${d.trail.join('/')}`
const perToken = new Map()
for (const d of colorDecls) (perToken.get(keyOf(d)) ?? perToken.set(keyOf(d), []).get(keyOf(d))).push(d)

// "main" = valor identico nos dois temas (ou token de modo unico): nao precisa de tema.
const mainDecls = []
const lightDecls = []
const darkDecls = []
for (const group of perToken.values()) {
  const light = group.find((d) => d.mode === 'light') ?? group.find((d) => d.mode === 'value')
  const dark = group.find((d) => d.mode === 'dark')
  // Um dos modos pode faltar quando a referencia esta em known-issues.json.
  if (!dark || !light) { if (light) mainDecls.push(light); if (dark) darkDecls.push(dark); continue }
  if (dark.value === light.value) { mainDecls.push(light); continue }
  lightDecls.push(light)
  darkDecls.push(dark)
}

writeFile('src/foundations/colors/main.css', banner('source/*.tokens.json') + '\n' + cssBlock(mainDecls, ':root'))
writeFile('src/foundations/colors/light.css', banner('source/colors + aliases') + '\n' + cssBlock(lightDecls, ':root'))
writeFile('src/foundations/colors/dark.css', banner('source/colors + aliases') + '\n' + cssBlock(darkDecls, '[data-theme="dark"]'))
writeFile('src/foundations/colors/index.css',
  banner('colors/') + "\n@import './main.css';\n@import './light.css';\n@import './dark.css';\n")

const pickBy = (list, collection) => list.filter((d) => d.collection === collection)
writeFile('src/foundations/colors/main.ts', tsModule('source/*.tokens.json', {
  primitiveColors: nest(pickBy(mainDecls, 'primitives')).colors ?? {},
  staticColor: nest(pickBy(mainDecls, 'colors')),
  staticAlias: nest(pickBy(mainDecls, 'aliases')),
}))
for (const [file, list] of [['light', lightDecls], ['dark', darkDecls]])
  writeFile(`src/foundations/colors/${file}.ts`, tsModule('source/colors + aliases', {
    [`${file}Color`]: nest(pickBy(list, 'colors')),
    [`${file}Alias`]: nest(pickBy(list, 'aliases')),
  }))

const fullTheme = (mode) => ({
  color: nest(by((d) => d.collection === 'colors' && d.mode === mode)),
  alias: nest(by((d) => d.collection === 'aliases' && d.mode === mode)),
})
writeFile('src/foundations/colors/index.ts',
  tsBanner('colors/') +
  "\nexport * from './main'\nexport * from './light'\nexport * from './dark'\n" +
  `\n/** Tema completo por modo — inclui os tokens identicos entre light e dark. */\n` +
  `export const theme = ${JSON.stringify({ light: fullTheme('light'), dark: fullTheme('dark') }, null, 2)} as const\n`)

// ---- sizes (Primitive/value + Spacing) -------------------------------------
const sizeGroups = {
  primitives: by((d) => d.collection === 'primitives' && d.trail[0] === 'value'),
  spacing: by((d) => d.collection === 'spacing' && d.trail[0] !== 'radius'),
  radius: by((d) => d.collection === 'spacing' && d.trail[0] === 'radius'),
}
for (const [name, list] of Object.entries(sizeGroups))
  writeFile(`src/foundations/sizes/${name}.ts`, tsModule(`source/${name === 'primitives' ? 'primitives' : 'spacing'}.tokens.json`, {
    [name === 'primitives' ? 'spaceScale' : name]: nest(list),
  }))
writeFile('src/foundations/sizes/index.ts',
  tsBanner('sizes/') + "\nexport * from './primitives'\nexport * from './spacing'\nexport * from './radius'\n")
writeFile('src/foundations/sizes/sizes.css',
  banner('source/primitives + spacing') + '\n' + cssBlock(Object.values(sizeGroups).flat(), ':root'))

// ---- typography ------------------------------------------------------------
const typoGroups = { 'font-family': 'fontFamily', size: 'size', 'line-height': 'lineHeight', weight: 'weight' }
for (const [group, exportName] of Object.entries(typoGroups))
  writeFile(`src/foundations/typography/${group}.ts`, tsModule('source/typography.tokens.json', {
    [exportName]: nest(by((d) => d.collection === 'typography' && d.trail[0] === group))[group] ?? {},
  }))
writeFile('src/foundations/typography/index.ts',
  tsBanner('typography/') +
  "\nexport * from './font-family'\nexport * from './size'\nexport * from './line-height'\nexport * from './weight'\n")
writeFile('src/foundations/typography/typography.css',
  banner('source/typography.tokens.json') + '\n' + cssBlock(by((d) => d.collection === 'typography'), ':root'))

// ---- layout ----------------------------------------------------------------
const layoutGroups = { breakpoint: 'breakpoints', font: 'font', grid: 'grid' }
const layoutAt = (viewport, group) =>
  nest(by((d) => d.collection === 'layout' && d.mode === viewport && d.trail[0] === group))[group] ?? {}
for (const [group, file] of Object.entries(layoutGroups))
  writeFile(`src/foundations/layout/${file}.ts`, tsModule('source/layout.tokens.json', {
    [file]: Object.fromEntries(VIEWPORTS.map((v) => [v, layoutAt(v, group)])),
  }))
writeFile('src/foundations/layout/index.ts',
  tsBanner('layout/') + "\nexport * from './breakpoints'\nexport * from './font'\nexport * from './grid'\n")

const bpMax = (viewport) =>
  by((d) => d.collection === 'layout' && d.mode === viewport && d.trail.join('/') === 'breakpoint/max')[0]?.value
const layoutCss = [banner('source/layout.tokens.json'), '', cssBlock(by((d) => d.collection === 'layout' && d.mode === 'desktop'), ':root')]
const responsiveByViewport = {}
for (const viewport of ['tablet', 'mobile']) {
  const max = bpMax(viewport)
  const overrides = responsiveOverrides(sources, index, viewport)
  responsiveByViewport[viewport] = overrides
  const rows = [
    ...by((d) => d.collection === 'layout' && d.mode === viewport),
    ...overrides.map((o) => ({ ...o, mode: viewport })),
  ]
  if (!max || !rows.length) continue
  layoutCss.push(`@media (max-width: ${max.replace('px', '')}px) {\n${cssBlock(rows, '  :root', '    ')}}\n`)
}
writeFile('src/foundations/layout/layout.css', layoutCss.join('\n'))

// ---- barris ----------------------------------------------------------------
writeFile('src/foundations/index.css', banner('src/foundations') + `
@import './colors/index.css';
@import './sizes/sizes.css';
@import './typography/typography.css';
@import './layout/layout.css';
`)

const modeNest = (collection, mode) => nest(by((d) => d.collection === collection && d.mode === mode))
const responsiveExport = Object.fromEntries(
  VIEWPORTS.map((v) => [v, nest(v === 'desktop'
    ? by((d) => d.responsive)
    : responsiveByViewport[v].map((o) => ({ ...o, value: o.value })))]),
)

writeFile('src/foundations/index.ts', tsBanner('src/foundations') + `
export * from './colors'
export * from './sizes'
export * from './typography'
export * from './layout'

/* API publica estavel — nomes e formatos preservados desde a primeira versao. */
export const primitive = ${JSON.stringify(modeNest('primitives', 'value'), null, 2)} as const

export const color = ${JSON.stringify({ light: modeNest('colors', 'light'), dark: modeNest('colors', 'dark') }, null, 2)} as const

export const alias = ${JSON.stringify({ light: modeNest('aliases', 'light'), dark: modeNest('aliases', 'dark') }, null, 2)} as const

export const typography = ${JSON.stringify(modeNest('typography', 'value'), null, 2)} as const

export const spacing = ${JSON.stringify(modeNest('spacing', 'value'), null, 2)} as const

export const layout = ${JSON.stringify(Object.fromEntries(VIEWPORTS.map((v) => [v, modeNest('layout', v)])), null, 2)} as const

/**
 * Tokens de Typography e Spacing que resolvem atraves de Layout e portanto mudam
 * por viewport. Em \`typography\` e \`spacing\` eles aparecem congelados em desktop;
 * aqui vem o valor de cada breakpoint. No CSS as sobrescritas ja saem nas media queries.
 */
export const responsive = ${JSON.stringify(responsiveExport, null, 2)} as const
`)

// ---- docs espelhadas -------------------------------------------------------
const mdTable = (rows, headers) =>
  [`| ${headers.join(' | ')} |`, `|${headers.map(() => '---').join('|')}|`,
    ...rows.map((r) => `| ${r.join(' | ')} |`)].join('\n')

const docBanner = (title, origem) =>
  `# ${title}\n\n> Gerado por \`scripts/tokens/build.mjs\`. Nao editar a mao.\n> Origem: ${origem}\n`

const tokenRows = (list) => list.map((d) => [
  `\`${d.trail.join('.')}\``, `\`${d.name}\``, `\`${d.value}\``, d.description ?? '—',
])

const writeDoc = (relative, title, origem, list, extra = '') =>
  writeFile(`docs/${relative}`, docBanner(title, origem) +
    `\n${list.length} tokens.\n\n` +
    mdTable(tokenRows(sortDecls(list)), ['Token', 'Variavel CSS', 'Valor', 'Descricao']) + '\n' + extra)

// espelho por collection
for (const c of COLLECTIONS) {
  const list = by((d) => d.collection === c.file && d.mode === c.modes[0])
  writeDoc(`foundations/source/${c.file}.tokens.md`, `Collection \`${c.figma}\``,
    `\`src/foundations/source/${c.file}.tokens.json\` — modos: ${c.modes.join(', ')}`, list)
}

// dominios
writeDoc('foundations/colors/main.md', 'Colors — main', 'tokens identicos em light e dark', mainDecls)
writeDoc('foundations/colors/light.md', 'Colors — light', 'tokens que mudam por tema', lightDecls)
writeDoc('foundations/colors/dark.md', 'Colors — dark', 'tokens que mudam por tema', darkDecls)
for (const [name, list] of Object.entries(sizeGroups))
  writeDoc(`foundations/sizes/${name}.md`, `Sizes — ${name}`, `\`src/foundations/sizes/${name}.ts\``, list)
for (const group of Object.keys(typoGroups))
  writeDoc(`foundations/typography/${group}.md`, `Typography — ${group}`,
    `\`src/foundations/typography/${group}.ts\``, by((d) => d.collection === 'typography' && d.trail[0] === group))
for (const [group, file] of Object.entries(layoutGroups))
  writeDoc(`foundations/layout/${file}.md`, `Layout — ${file}`,
    `\`src/foundations/layout/${file}.ts\` — um valor por viewport`,
    by((d) => d.collection === 'layout' && d.trail[0] === group),
    `\nValores por viewport (desktop, tablet, mobile) — as sobrescritas saem em media queries.\n`)

const indexDoc = (relative, title, files, extra) =>
  writeFile(`docs/${relative}`, docBanner(title, 'build de tokens') + extra +
    '\n' + files.map((f) => `- [${f}](./${f})`).join('\n') + '\n')
indexDoc('foundations/colors/index.md', 'Colors — indice', ['main.md', 'light.md', 'dark.md'],
  `\nExport TS: \`theme.light\` / \`theme.dark\`, \`color\`, \`alias\`. CSS: \`colors/index.css\`.\n`)
indexDoc('foundations/sizes/index.md', 'Sizes — indice', Object.keys(sizeGroups).map((n) => `${n}.md`),
  `\nExport TS: \`primitive.value\`, \`spacing\`. CSS: \`sizes/sizes.css\`.\n`)
indexDoc('foundations/typography/index.md', 'Typography — indice', Object.keys(typoGroups).map((n) => `${n}.md`),
  `\nExport TS: \`typography\`. CSS: \`typography/typography.css\`.\n`)
indexDoc('foundations/layout/index.md', 'Layout — indice', Object.values(layoutGroups).map((n) => `${n}.md`),
  `\nExport TS: \`layout.desktop|tablet|mobile\` e \`responsive\`. CSS: \`layout/layout.css\`.\n`)

// ---- manifesto -------------------------------------------------------------
const manifest = {
  generatedFrom: 'src/foundations/source/*.tokens.json',
  figmaFile: 'Braip Foundations',
  collections: COLLECTIONS.map((c) => ({
    figma: c.figma, source: `source/${c.file}.tokens.json`, modes: c.modes,
    tokens: leaves(sources[c.file]).length,
  })),
  declarations: decls.length,
  responsiveOverrides: Object.fromEntries(Object.entries(responsiveByViewport).map(([v, o]) => [v, o.length])),
  waived: waiver.waived.length,
  outputs: [...new Set(written)].sort(),
}
const outputs = []
for (const dir of ['colors', 'sizes', 'typography', 'layout'])
  for (const f of fs.readdirSync(path.join(OUT_DIR, dir))) outputs.push(`${dir}/${f}`)
manifest.outputs = [...outputs, 'index.ts', 'index.css'].sort()
writeFile('src/foundations/generated-manifest.json', JSON.stringify(manifest, null, 2))

console.log(`${decls.length} declaracoes | ${manifest.outputs.length} arquivos gerados | ${waiver.waived.length} pendencias documentadas`)
for (const [v, o] of Object.entries(responsiveByViewport)) console.log(`  sobrescritas responsivas ${v}: ${o.length}`)
