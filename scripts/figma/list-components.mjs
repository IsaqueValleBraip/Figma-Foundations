// Lista componentes publicados do arquivo Figma -> docs/figma-components.json
// uso: node scripts/list-components.mjs
import fs from 'node:fs';

const env = Object.fromEntries(
  fs.readFileSync(new URL('../.env', import.meta.url), 'utf8')
    .split('\n').filter(l => l.includes('=') && !l.trim().startsWith('#'))
    .map(l => [l.slice(0, l.indexOf('=')).trim(), l.slice(l.indexOf('=') + 1).trim()])
);

const token = process.env.FIGMA_ACCESS_TOKEN || env.FIGMA_ACCESS_TOKEN;
const fileKey = process.env.FIGMA_FILE_KEY || env.FIGMA_FILE_KEY;
if (!token || !fileKey) throw new Error('FIGMA_ACCESS_TOKEN e FIGMA_FILE_KEY sao obrigatorios (.env)');

const get = async (path) => {
  const res = await fetch(`https://api.figma.com/v1${path}`, { headers: { 'X-Figma-Token': token } });
  if (!res.ok) throw new Error(`${path} -> ${res.status} ${await res.text()}`);
  return (await res.json()).meta;
};

const [components, sets] = await Promise.all([
  get(`/files/${fileKey}/components`),
  get(`/files/${fileKey}/component_sets`),
]);

const out = {
  fileKey,
  fetchedAt: new Date().toISOString(),
  componentSets: (sets.component_sets ?? []).map(s => ({
    key: s.key, name: s.name, nodeId: s.node_id,
    url: `https://www.figma.com/design/${fileKey}?node-id=${s.node_id.replace(':', '-')}`,
  })),
  components: (components.components ?? []).map(c => ({
    key: c.key, name: c.name, nodeId: c.node_id, setId: c.containing_frame?.containingStateGroup?.nodeId ?? null,
    url: `https://www.figma.com/design/${fileKey}?node-id=${c.node_id.replace(':', '-')}`,
  })),
};

fs.mkdirSync(new URL('../docs/', import.meta.url), { recursive: true });
fs.writeFileSync(new URL('../docs/figma-components.json', import.meta.url), JSON.stringify(out, null, 2));
console.log(`sets=${out.componentSets.length} components=${out.components.length} -> docs/figma-components.json`);
