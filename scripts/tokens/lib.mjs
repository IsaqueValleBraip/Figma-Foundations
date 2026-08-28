// Nucleo compartilhado entre build.mjs e validate.mjs.
// Fonte: src/foundations/source/*.tokens.json (espelho versionado do Figma).
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
export const SOURCE_DIR = path.join(ROOT, 'src/foundations/source')
export const OUT_DIR = path.join(ROOT, 'src/foundations')

/** Collections espelhadas, na ordem de dependencia: Primitive -> Color -> Aliases. */
export const COLLECTIONS = [
  { file: 'primitives', prefix: '', figma: 'Primitive', modes: ['value'] },
  { file: 'colors', prefix: 'color', figma: '❖ Color', modes: ['light', 'dark'] },
  { file: 'typography', prefix: 'type', figma: 'Typography', modes: ['value'] },
  { file: 'spacing', prefix: 'space', figma: 'Spacing', modes: ['value'] },
  { file: 'layout', prefix: 'layout', figma: 'Layout', modes: ['desktop', 'tablet', 'mobile'] },
  // Sem modo proprio no Figma (Mode 1), mas resolve para ❖ Color: herda light/dark.
  { file: 'aliases', prefix: 'alias', figma: '↳ Aliases', modes: ['light', 'dark'], inherits: 'colors' },
]

export const VIEWPORTS = ['desktop', 'tablet', 'mobile']

export const readSource = (file) =>
  JSON.parse(fs.readFileSync(path.join(SOURCE_DIR, `${file}.tokens.json`), 'utf8'))

export const loadSources = () =>
  Object.fromEntries(COLLECTIONS.map((c) => [c.file, readSource(c.file)]))

/** Folhas de um documento de tokens: [trailArray, tokenObject]. */
export const leaves = (obj, trail = [], out = []) => {
  for (const [key, value] of Object.entries(obj)) {
    if (key.startsWith('$') || key === '_meta') continue
    if (value && typeof value === 'object' && '$value' in value) out.push([[...trail, key], value])
    else if (value && typeof value === 'object') leaves(value, [...trail, key], out)
  }
  return out
}

/** Indice global `collection:a/b/c` -> token, para resolver referencias `{a/b/c}`. */
export const buildIndex = (sources) => {
  const index = new Map()
  for (const [file, doc] of Object.entries(sources))
    for (const [trail, token] of leaves(doc)) index.set(`${file}:${trail.join('/')}`, { file, trail, token })
  return index
}

export const lookup = (index, ref) => {
  for (const { file } of COLLECTIONS) {
    const hit = index.get(`${file}:${ref}`)
    if (hit) return hit
  }
  return null
}

export const REF = /^\{(.+)\}$/

/**
 * Resolve um valor ate o literal, seguindo a cadeia de referencias.
 * Devolve { value, chain, error } — nunca lanca, para o validate poder
 * relatar todas as falhas de uma vez em vez de parar na primeira.
 */
export const resolveValue = (rawValue, mode, index, chain = [], seen = new Set()) => {
  let value = rawValue

  if (value && typeof value === 'object' && !Array.isArray(value)) {
    const picked = mode in value ? value[mode] : value.value ?? Object.values(value)[0]
    return resolveValue(picked, mode, index, chain, seen)
  }

  if (typeof value === 'string') {
    const match = value.match(REF)
    if (match) {
      const ref = match[1]
      if (seen.has(ref)) return { value: null, chain, error: { kind: 'cycle', ref, chain: [...chain, ref] } }
      const target = lookup(index, ref)
      if (!target) return { value: null, chain, error: { kind: 'missing-ref', ref, chain } }
      return resolveValue(target.token.$value, mode, index, [...chain, ref], new Set([...seen, ref]))
    }
  }

  return { value, chain, error: null }
}

/** true se a cadeia de resolucao passa pela collection Layout (token responsivo). */
export const dependsOnLayout = (chain, index) =>
  chain.some((ref) => lookup(index, ref)?.file === 'layout')

// ---- nomes -----------------------------------------------------------------

export const cssVar = (prefix, trail) =>
  ['--braip', prefix, ...trail].filter(Boolean).join('-').replace(/[^a-zA-Z0-9-]/g, '-').toLowerCase()

export const formatValue = (value, type) => {
  if (value === null || value === undefined) return null
  if (typeof value !== 'number') return String(value)
  const unitless = type === 'number' || type === 'fontWeight'
  return unitless ? String(value) : `${Math.round(value * 1000) / 1000}px`
}

/**
 * Expande cada collection em declaracoes { trail, name, mode, value, responsive }.
 * `errors` acumula toda referencia quebrada ou ciclo encontrado.
 */
export const expand = (sources, index) => {
  const decls = []
  const errors = []
  for (const collection of COLLECTIONS) {
    for (const [trail, token] of leaves(sources[collection.file])) {
      for (const mode of collection.modes) {
        const { value, chain, error } = resolveValue(token.$value, mode, index)
        const id = `${collection.file}:${trail.join('/')}[${mode}]`
        if (error) { errors.push({ id, ...error }); continue }
        const formatted = formatValue(value, token.$type)
        if (formatted === null) { errors.push({ id, kind: 'empty-value' }); continue }
        decls.push({
          collection: collection.file,
          trail,
          mode,
          name: cssVar(collection.prefix, trail),
          value: formatted,
          type: token.$type,
          description: token.$description ?? null,
          responsive: collection.file !== 'layout' && dependsOnLayout(chain, index),
        })
      }
    }
  }
  return { decls, errors }
}

/** Reexpande as folhas responsivas nos demais viewports (corrige o congelamento em desktop). */
export const responsiveOverrides = (sources, index, viewport) => {
  const out = []
  for (const collection of COLLECTIONS) {
    if (collection.file === 'layout') continue
    for (const [trail, token] of leaves(sources[collection.file])) {
      const base = resolveValue(token.$value, collection.modes[0], index)
      if (base.error || !dependsOnLayout(base.chain, index)) continue
      const { value, error } = resolveValue(token.$value, viewport, index)
      if (error) continue
      const formatted = formatValue(value, token.$type)
      if (formatted === null || formatted === base.value) continue
      out.push({ name: cssVar(collection.prefix, trail), value: formatted, trail, collection: collection.file })
    }
  }
  return out
}

export const nest = (entries, pick = (d) => d.value) => {
  const root = {}
  for (const decl of entries) {
    let node = root
    for (const key of decl.trail.slice(0, -1)) node = node[key] ??= {}
    node[decl.trail.at(-1)] = pick(decl)
  }
  return root
}

export const banner = (source) =>
  `/* Gerado por scripts/tokens/build.mjs a partir de ${source}.\n * Nao editar a mao — rode \`npm run tokens:build\`. */\n`

export const tsBanner = (source) =>
  `// Gerado por scripts/tokens/build.mjs a partir de ${source}.\n// Nao editar a mao — rode \`npm run tokens:build\`.\n`

export const writeFile = (relative, content) => {
  const target = path.join(ROOT, relative)
  fs.mkdirSync(path.dirname(target), { recursive: true })
  fs.writeFileSync(target, content.endsWith('\n') ? content : content + '\n')
  return relative
}
