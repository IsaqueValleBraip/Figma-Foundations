<script setup lang="ts">
/* Galeria local dos componentes gerados a partir do Figma.
 * Nao faz parte da biblioteca publicada — e so o playground de inspecao visual. */
import { computed, ref } from 'vue'
import * as C from './components'
import Icon from './components/Icon/Icon.vue'

const GRUPOS: { nome: string; itens: string[] }[] = [
  { nome: 'Ícones', itens: ['Icon'] },
  { nome: 'Botões', itens: ['ButtonCommon', 'ButtonIcon', 'ButtonText', 'ButtonFab', 'ButtonAppleId', 'ButtonGoogle', 'SegmentedControl', 'Button'] },
  { nome: 'Seleção', itens: ['Checkbox', 'Radio', 'Switch', 'Slider', 'Rating'] },
  { nome: 'Campos', itens: ['TextField', 'PasswordField', 'SearchField', 'DatePickerField', 'SelectTextField', 'SelectField', 'DropdownMenu', 'DropdownItem', 'DatePicker'] },
  { nome: 'Rótulos', itens: ['Chip', 'Tag', 'TagSquircle', 'Badge', 'VerificationBadge', 'StatusIndicator'] },
  { nome: 'Feedback', itens: ['LoadingCircular', 'LoadingLinear', 'ProgressIndicator', 'PasswordLevel', 'Toast', 'Banner', 'Snackbar', 'Tooltip', 'TooltipIcon'] },
  { nome: 'Avatar', itens: ['AvatarItem', 'AvatarGroup'] },
  { nome: 'Dados', itens: ['Card', 'List', 'StatCard', 'MetricRow', 'SalesMetrics', 'Comment'] },
  { nome: 'Navegação', itens: ['Breadcrumb', 'BreadcrumbItem', 'Pagination', 'PaginationItem', 'Tabs', 'TabsFixed', 'Tab', 'Divider', 'IconArrow'] },
  { nome: 'Divulgação', itens: ['Accordion', 'StatusExpander', 'GuidedTourPopup', 'Popover'] },
]

/* Props minimas para cada componente renderizar sozinho. */
const PROPS: Record<string, Record<string, unknown>> = {
  Accordion: { title: 'Conta bancária', open: true },
  Breadcrumb: { items: [{ label: 'Início', href: '#' }, { label: 'Produtos', href: '#' }, { label: 'Detalhe' }] },
  BreadcrumbItem: { label: 'Produtos', href: '#' },
  ButtonFab: { label: 'Adicionar' },
  ButtonIcon: { label: 'Ação' },
  Checkbox: { label: 'Aceito os termos' },
  Chip: { label: 'Filtro' },
  DatePickerField: { label: 'Data' },
  DropdownItem: { label: 'Opção' },
  DropdownMenu: { label: 'Selecione' },
  PasswordField: { label: 'Senha' },
  Radio: { label: 'Opção A', name: 'demo' },
  SearchField: { label: 'Buscar' },
  SegmentedControl: { options: [{ label: 'Hoje', value: 'hoje' }, { label: 'Deste mês', value: 'mes' }] },
  SelectField: { label: 'Estado' },
  SelectTextField: { label: 'Telefone' },
  StatusExpander: { label: 'Ver mais status' },
  Switch: { label: 'Notificações' },
  Tabs: { items: [{ label: 'Visão geral', value: 'a' }, { label: 'Vendas', value: 'b' }] },
  TabsFixed: { items: [{ label: 'Todas', value: 'a' }, { label: 'Aprovadas', value: 'b' }] },
  Tag: { label: 'Aprovado' },
  TagSquircle: { label: 'Aprovado' },
  TextField: { label: 'Nome' },
  Toast: { title: 'Pagamento aprovado', subtitle: 'A venda entrou na sua conta.' },
  GuidedTourPopup: { title: 'Bem-vindo', description: 'Conheça o novo painel.', open: true },
  Popover: { title: 'Dica', description: 'Use filtros para refinar.', open: true },
  Tooltip: { label: 'Dica', description: 'Texto de apoio.' },
  Snackbar: { text: 'Alterações salvas' },
  Comment: { name: 'Ana Souza', position: 'Afiliada', text: 'Fluxo ficou muito mais claro.' },
  Card: { size: 'md' },
  MetricRow: { label: 'Vendas', value: 'R$ 27.940,35', percentage: '12%' },
  StatCard: { },
  PaginationItem: { label: '1' },
  Tab: { label: 'Visão geral' },
  Icon: { name: 'add-r', label: 'Adicionar' },
}

/* Componentes que expoem slot de icone — recebem o add-r exportado do Figma. */
const COM_ICONE = ['ButtonCommon', 'ButtonText', 'ButtonIcon', 'ButtonFab', 'Toast', 'Banner', 'Snackbar', 'DropdownItem', 'List', 'Chip', 'Tag', 'TagSquircle', 'StatCard', 'TooltipIcon']

const busca = ref('')
const nomes = computed(() => GRUPOS.flatMap(g => g.itens))
const faltando = computed(() => Object.keys(C).filter(n => !nomes.value.includes(n)))

const gruposFiltrados = computed(() =>
  GRUPOS.map(g => ({
    ...g,
    itens: g.itens.filter(n => (C as never)[n] && n.toLowerCase().includes(busca.value.toLowerCase().trim())),
  })).filter(g => g.itens.length),
)

const total = computed(() => gruposFiltrados.value.reduce((n, g) => n + g.itens.length, 0))
const comp = (n: string) => (C as Record<string, unknown>)[n]
const props = (n: string) => PROPS[n] ?? {}
</script>

<template>
  <div class="app">
    <aside class="nav">
      <h1>Braip Components</h1>
      <p class="sub">{{ Object.keys(C).length }} componentes gerados do Figma</p>
      <input v-model="busca" class="busca" type="search" placeholder="Filtrar componente…" />
      <nav>
        <template v-for="g in gruposFiltrados" :key="g.nome">
          <span class="nav-grupo">{{ g.nome }}</span>
          <a v-for="n in g.itens" :key="n" :href="`#${n}`">{{ n }}</a>
        </template>
      </nav>
      <p v-if="faltando.length" class="alerta">Fora da galeria: {{ faltando.join(', ') }}</p>
    </aside>

    <main class="conteudo">
      <p class="contagem">{{ total }} componente(s) exibido(s)</p>
      <section v-for="g in gruposFiltrados" :key="g.nome" class="grupo">
        <h2>{{ g.nome }}</h2>
        <article v-for="n in g.itens" :id="n" :key="n" class="card">
          <header>
            <h3>{{ n }}</h3>
            <code v-if="Object.keys(props(n)).length">{{ Object.keys(props(n)).join(', ') }}</code>
          </header>
          <div class="palco">
            <component :is="comp(n)" v-bind="props(n)">
              <template v-if="COM_ICONE.includes(n)" #iconLeft><Icon name="add-r" /></template>
              <template v-if="COM_ICONE.includes(n)" #icon><Icon name="add-r" /></template>
              <template v-if="n === 'ButtonIcon' || n === 'ButtonFab'" #default><Icon name="add-r" /></template>
              <template v-else #default>Conteúdo de exemplo</template>
            </component>
          </div>
        </article>
      </section>
    </main>
  </div>
</template>

<style>
body { margin: 0; background: var(--braip-alias-bg-secondary, #f6f6fb); }
* { box-sizing: border-box; }
</style>

<style scoped>
.app {
  display: grid;
  grid-template-columns: 260px 1fr;
  min-height: 100vh;
  font-family: var(--braip-type-font-family-text), system-ui, sans-serif;
  color: var(--braip-alias-text-primary, #1c1c28);
}
.nav {
  position: sticky;
  top: 0;
  align-self: start;
  height: 100vh;
  overflow-y: auto;
  padding: 24px 16px;
  background: var(--braip-alias-bg-primary, #fff);
  border-right: 1px solid var(--braip-alias-stroke-secondary, #e6e6f0);
}
.nav h1 { font-size: 16px; margin: 0 0 4px; }
.sub { margin: 0 0 16px; font-size: 12px; opacity: .6; }
.busca { width: 100%; padding: 8px 10px; margin-bottom: 16px; border-radius: 6px; border: 1px solid var(--braip-alias-stroke-secondary, #e6e6f0); }
nav { display: flex; flex-direction: column; gap: 2px; }
.nav-grupo { margin: 12px 0 4px; font-size: 11px; text-transform: uppercase; letter-spacing: .06em; opacity: .5; }
nav a { font-size: 13px; text-decoration: none; color: inherit; padding: 3px 6px; border-radius: 4px; }
nav a:hover { background: var(--braip-alias-overlay-hover, #f0f0f7); }
.alerta { margin-top: 20px; font-size: 11px; color: var(--braip-alias-red-text, #b00020); }
.conteudo { padding: 32px 40px 80px; max-width: 1100px; }
.contagem { font-size: 12px; opacity: .6; margin: 0 0 24px; }
.grupo { margin-bottom: 48px; }
.grupo h2 { font-size: 13px; text-transform: uppercase; letter-spacing: .08em; opacity: .5; margin: 0 0 16px; }
.card { background: var(--braip-alias-bg-primary, #fff); border: 1px solid var(--braip-alias-stroke-secondary, #e6e6f0); border-radius: 10px; margin-bottom: 16px; overflow: hidden; }
.card header { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; padding: 12px 16px; border-bottom: 1px solid var(--braip-alias-stroke-secondary, #e6e6f0); }
.card h3 { font-size: 14px; margin: 0; }
.card code { font-size: 11px; opacity: .55; }
.palco { padding: 28px 16px; display: flex; flex-wrap: wrap; gap: 16px; align-items: center; justify-content: center; min-height: 96px; }
</style>
