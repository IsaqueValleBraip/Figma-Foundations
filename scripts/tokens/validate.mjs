#!/usr/bin/env node
// Valida o espelho de tokens e os artefatos gerados. Encerra com codigo 1 em
// qualquer falha: schema, referencia ausente, ciclo, modo incompleto ou paridade.
import fs from 'node:fs'
import path from 'node:path'
import { COLLECTIONS, ROOT, buildIndex, expand, leaves, loadSources } from './lib.mjs'

const failures = []
const fail = (check, detail) => failures.push({ check, detail })
const read = (relative) => fs.readFileSync(path.join(ROOT, relative), 'utf8')
const exists = (relative) => fs.existsSync(path.join(ROOT, relative))

const sources = loadSources()
const index = buildIndex(sources)

// 1. schema minimo do espelho -------------------------------------------------
for (const collection of COLLECTIONS) {
  const doc = sources[collection.file]
  const meta = doc._meta
  if (!meta) { fail('schema', `${collection.file}: _meta ausente`); continue }
  if (meta.$figmaCollection !== collection.figma)
    fail('schema', `${collection.file}: $figmaCollection "${meta.$figmaCollection}" != "${collection.figma}"`)
  if (!meta.$collectionId) fail('schema', `${collection.file}: $collectionId ausente`)
  for (const [trail, token] of leaves(doc)) {
    const id = `${collection.file}:${trail.join('/')}`
    if (!token.$type) fail('schema', `${id}: $type ausente`)
    if (token.$value === undefined) fail('schema', `${id}: $value ausente`)
  }
}

// 2. modos completos ----------------------------------------------------------
for (const collection of COLLECTIONS) {
  if (collection.inherits) continue
  const declared = sources[collection.file]._meta.$modes.map((m) => m.key)
  for (const [trail, token] of leaves(sources[collection.file])) {
    if (!token.$value || typeof token.$value !== 'object' || Array.isArray(token.$value)) continue
    for (const mode of declared)
      if (!(mode in token.$value))
        fail('modo-incompleto', `${collection.file}:${trail.join('/')} sem valor no modo "${mode}"`)
  }
}

// 3. referencias e ciclos -----------------------------------------------------
const waiverPath = 'src/foundations/known-issues.json'
const waiver = exists(waiverPath) ? JSON.parse(read(waiverPath)) : { waived: [] }
const waived = new Set(waiver.waived.map((w) => w.id))
const { decls, errors } = expand(sources, index)

for (const error of errors) {
  if (error.kind === 'cycle') { fail('ciclo', `${error.id}: ${error.chain.join(' -> ')}`); continue }
  if (!waived.has(error.id)) fail('referencia', `${error.id} -> ${error.ref ?? error.kind}`)
}
for (const id of waived)
  if (!errors.some((e) => e.id === id))
    fail('waiver-obsoleto', `${id} consta em known-issues.json mas ja resolve — remover a entrada`)

// 4. paridade entre o espelho e o CSS gerado ----------------------------------
if (!exists('src/foundations/index.css')) fail('paridade', 'src/foundations/index.css ausente — rode npm run tokens:build')
else {
  const cssFiles = ['colors/main.css', 'colors/light.css', 'colors/dark.css', 'sizes/sizes.css',
    'typography/typography.css', 'layout/layout.css']
  const emitted = new Set()
  for (const file of cssFiles)
    for (const match of read(`src/foundations/${file}`).matchAll(/(--braip-[a-z0-9-]+)\s*:/g)) emitted.add(match[1])

  const expected = new Set(decls.map((d) => d.name))
  for (const name of expected) if (!emitted.has(name)) fail('paridade', `${name} esperado no CSS e ausente`)
  for (const name of emitted) if (!expected.has(name)) fail('paridade', `${name} presente no CSS sem token de origem`)

  const totalLeaves = COLLECTIONS.reduce((n, c) => n + leaves(sources[c.file]).length * c.modes.length, 0)
  if (decls.length + errors.length !== totalLeaves)
    fail('paridade', `${decls.length} declaracoes + ${errors.length} pendencias != ${totalLeaves} folhas x modos`)
}

// 5. manifesto ----------------------------------------------------------------
if (!exists('src/foundations/generated-manifest.json')) fail('manifesto', 'generated-manifest.json ausente')
else {
  const manifest = JSON.parse(read('src/foundations/generated-manifest.json'))
  if (manifest.declarations !== decls.length)
    fail('manifesto', `declarations=${manifest.declarations} mas o build atual produz ${decls.length} — regenerar`)
  for (const output of manifest.outputs)
    if (!exists(`src/foundations/${output}`)) fail('manifesto', `${output} listado no manifesto e ausente em disco`)
}

// ---- relatorio --------------------------------------------------------------
const totalTokens = COLLECTIONS.reduce((n, c) => n + leaves(sources[c.file]).length, 0)
if (failures.length) {
  const grouped = failures.reduce((acc, f) => ((acc[f.check] ??= []).push(f.detail), acc), {})
  console.error(`validacao falhou: ${failures.length} problema(s)\n`)
  for (const [check, details] of Object.entries(grouped)) {
    console.error(`[${check}] ${details.length}`)
    for (const detail of details.slice(0, 10)) console.error(`  ${detail}`)
    if (details.length > 10) console.error(`  ... +${details.length - 10}`)
  }
  process.exit(1)
}
console.log(`ok — ${totalTokens} tokens, ${decls.length} declaracoes, ${waiver.waived.length} pendencias documentadas`)
