<script setup lang="ts">
/* Espelha o component set "Date picker" (Braip Components, 823:2149).
 * Eixos: Type (Tabs | Calendar | Tabs+Calendar) x State
 * (Default/Pressed/Selected/Filled/Disabled/Error/Active) = 20 variantes.
 * Modelado por eixo, nao por variante:
 *   - Type controla quais blocos internos aparecem (tabs de atalho e/ou grade).
 *   - Pressed/Active/Selected sao CSS (:active, :focus-visible, [aria-selected]).
 *   - Filled sai do valor (.has-value); Disabled e Error sao prop.
 * Os sub-itens do Figma (.Item-Icon/Day/Header/Picker/Date Picker e .Group-Date Picker)
 * sao privados do set: aqui viram partes internas deste componente, sem pasta propria.
 * Grade acessivel: role="grid" + role="row"/"gridcell", aria-selected e navegacao
 * por setas / Home / End / PageUp / PageDown. */
import { computed, ref, useId } from 'vue'

type DateLike = Date | null

const props = withDefaults(defineProps<{
  /** Figma: Type */
  type?: 'tabs' | 'calendar' | 'tabs-calendar'
  /** Data selecionada. Figma: State=Filled quando preenchida. */
  modelValue?: DateLike
  /** Mes exibido; se ausente, deriva de modelValue ou de hoje. */
  month?: DateLike
  /** Figma: .Group-Date Picker -> atalhos do bloco Tabs */
  tabs?: { label: string; value: string }[]
  activeTab?: string
  /** Rotulo acessivel da grade (ex.: "Escolha uma data"). */
  label?: string
  /** Mensagem auxiliar / de erro, ligada por aria-describedby. */
  message?: string
  /** Figma: State=Disabled */
  disabled?: boolean
  /** Figma: State=Error */
  error?: boolean
  /** Primeiro dia da semana: 0 = domingo. */
  weekStart?: number
  locale?: string
}>(), {
  type: 'calendar',
  modelValue: null,
  month: null,
  tabs: () => [],
  activeTab: '',
  label: '',
  message: '',
  disabled: false,
  error: false,
  weekStart: 0,
  locale: 'pt-BR',
})

const emit = defineEmits<{
  'update:modelValue': [value: DateLike]
  'update:month': [value: Date]
  'update:activeTab': [value: string]
}>()

const uid = useId()
const gridId = `braip-date-picker-${uid}`
const messageId = `${gridId}-message`

const showTabs = computed(() => props.type === 'tabs' || props.type === 'tabs-calendar')
const showCalendar = computed(() => props.type === 'calendar' || props.type === 'tabs-calendar')

const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate())
const sameDay = (a: DateLike, b: DateLike) =>
  Boolean(a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate())

/** Mes visivel: controlado por `month`, ou interno a partir do valor/hoje. */
const internalMonth = ref<Date>(startOfDay(props.month ?? props.modelValue ?? new Date()))
const viewMonth = computed(() => props.month ?? internalMonth.value)

/** Dia que recebe o foco na grade (roving tabindex). */
const focusedDate = ref<Date>(startOfDay(props.modelValue ?? viewMonth.value))

const monthLabel = computed(() =>
  new Intl.DateTimeFormat(props.locale, { month: 'long', year: 'numeric' }).format(viewMonth.value))

const weekdays = computed(() => {
  const fmt = new Intl.DateTimeFormat(props.locale, { weekday: 'short' })
  // 2023-01-01 foi um domingo: base estavel para girar pelo weekStart.
  return Array.from({ length: 7 }, (_, i) =>
    fmt.format(new Date(2023, 0, 1 + ((i + props.weekStart) % 7))))
})

/** Semanas do mes visivel, completadas com dias vizinhos. */
const weeks = computed(() => {
  const first = new Date(viewMonth.value.getFullYear(), viewMonth.value.getMonth(), 1)
  const offset = (first.getDay() - props.weekStart + 7) % 7
  const cursor = new Date(first)
  cursor.setDate(1 - offset)
  return Array.from({ length: 6 }, () =>
    Array.from({ length: 7 }, () => {
      const day = new Date(cursor)
      cursor.setDate(cursor.getDate() + 1)
      return day
    }))
})

const isOutside = (day: Date) => day.getMonth() !== viewMonth.value.getMonth()
const isToday = (day: Date) => sameDay(day, new Date())
const isSelected = (day: Date) => sameDay(day, props.modelValue)
const isFocused = (day: Date) => sameDay(day, focusedDate.value)
const dayNumber = (day: Date) => day.getDate()
const dayLabel = (day: Date) =>
  new Intl.DateTimeFormat(props.locale, { day: 'numeric', month: 'long', year: 'numeric' }).format(day)

function setMonth(next: Date) {
  internalMonth.value = next
  emit('update:month', next)
}

function shiftMonth(delta: number) {
  if (props.disabled) return
  const next = new Date(viewMonth.value.getFullYear(), viewMonth.value.getMonth() + delta, 1)
  setMonth(next)
  const focus = new Date(focusedDate.value)
  focus.setMonth(focus.getMonth() + delta)
  focusedDate.value = focus
}

function select(day: Date) {
  if (props.disabled) return
  focusedDate.value = day
  emit('update:modelValue', day)
}

const cells = ref<Record<string, HTMLElement | null>>({})
const key = (day: Date) => `${day.getFullYear()}-${day.getMonth()}-${day.getDate()}`

function moveFocus(next: Date) {
  focusedDate.value = next
  if (next.getMonth() !== viewMonth.value.getMonth())
    setMonth(new Date(next.getFullYear(), next.getMonth(), 1))
  requestAnimationFrame(() => cells.value[key(next)]?.focus())
}

function onGridKeydown(event: KeyboardEvent) {
  if (props.disabled) return
  const base = new Date(focusedDate.value)
  const jump = (days: number) => {
    const next = new Date(base)
    next.setDate(next.getDate() + days)
    moveFocus(next)
  }
  switch (event.key) {
    case 'ArrowLeft': jump(-1); break
    case 'ArrowRight': jump(1); break
    case 'ArrowUp': jump(-7); break
    case 'ArrowDown': jump(7); break
    case 'Home': moveFocus(new Date(base.getFullYear(), base.getMonth(), 1)); break
    case 'End': moveFocus(new Date(base.getFullYear(), base.getMonth() + 1, 0)); break
    case 'PageUp': moveFocus(new Date(base.getFullYear(), base.getMonth() - 1, base.getDate())); break
    case 'PageDown': moveFocus(new Date(base.getFullYear(), base.getMonth() + 1, base.getDate())); break
    case 'Enter':
    case ' ': select(base); break
    default: return
  }
  event.preventDefault()
}
</script>

<template>
  <div
    class="braip-date-picker"
    :class="[
      `is-${type}`,
      { 'has-value': Boolean(modelValue), 'is-disabled': disabled, 'is-error': error },
    ]"
    :aria-disabled="disabled || undefined"
  >
    <!-- Figma: .Group-Date Picker (atalhos) — Type=Tabs / Tabs+Calendar -->
    <div v-if="showTabs && tabs.length" class="braip-date-picker__tabs" role="tablist" :aria-label="label || undefined">
      <button
        v-for="tab in tabs"
        :key="tab.value"
        class="braip-date-picker__tab"
        type="button"
        role="tab"
        :aria-selected="tab.value === activeTab"
        :tabindex="tab.value === activeTab ? 0 : -1"
        :disabled="disabled"
        @click="emit('update:activeTab', tab.value)"
      >
        {{ tab.label }}
      </button>
    </div>

    <div v-if="showCalendar" class="braip-date-picker__calendar">
      <!-- Figma: .Item-Header/Date Picker -->
      <div class="braip-date-picker__header">
        <button
          class="braip-date-picker__nav"
          type="button"
          :disabled="disabled"
          :aria-label="`Mes anterior`"
          @click="shiftMonth(-1)"
        >
          <slot name="prevIcon">‹</slot>
        </button>
        <span class="braip-date-picker__month" aria-live="polite">{{ monthLabel }}</span>
        <button
          class="braip-date-picker__nav"
          type="button"
          :disabled="disabled"
          :aria-label="`Proximo mes`"
          @click="shiftMonth(1)"
        >
          <slot name="nextIcon">›</slot>
        </button>
      </div>

      <!-- Figma: .Item-Picker/Date Picker -> grade de .Item-Day -->
      <div
        :id="gridId"
        class="braip-date-picker__grid"
        role="grid"
        :aria-label="label || monthLabel"
        :aria-invalid="error || undefined"
        :aria-describedby="message ? messageId : undefined"
        @keydown="onGridKeydown"
      >
        <div class="braip-date-picker__row braip-date-picker__row--head" role="row">
          <span
            v-for="weekday in weekdays"
            :key="weekday"
            class="braip-date-picker__weekday"
            role="columnheader"
            :aria-label="weekday"
          >{{ weekday }}</span>
        </div>

        <div
          v-for="(week, weekIndex) in weeks"
          :key="weekIndex"
          class="braip-date-picker__row"
          role="row"
        >
          <span
            v-for="day in week"
            :key="key(day)"
            :ref="el => (cells[key(day)] = el as HTMLElement | null)"
            class="braip-date-picker__day"
            :class="{ 'is-outside': isOutside(day), 'is-today': isToday(day) }"
            role="gridcell"
            :aria-selected="isSelected(day)"
            :aria-disabled="disabled || undefined"
            :aria-label="dayLabel(day)"
            :tabindex="isFocused(day) && !disabled ? 0 : -1"
            @click="select(day)"
          >{{ dayNumber(day) }}</span>
        </div>
      </div>
    </div>

    <p v-if="message" :id="messageId" class="braip-date-picker__message">{{ message }}</p>
  </div>
</template>

<style scoped>
.braip-date-picker {
  display: inline-flex;
  flex-direction: column;
  gap: var(--braip-space-base-xs);
  padding: var(--braip-space-base-sm);
  border: 1px solid var(--braip-date-picker-bd, var(--braip-alias-stroke-primary));
  border-radius: var(--braip-space-radius-md);
  background: var(--braip-alias-bg-surface-primary);
  font-family: var(--braip-type-font-family-text);
  color: var(--braip-alias-text-surface-primary);
}

/* Figma: .Group-Date Picker */
.braip-date-picker__tabs {
  display: flex;
  gap: var(--braip-space-base-xxs);
}

.braip-date-picker__tab {
  padding: var(--braip-space-base-xxs) var(--braip-space-base-xs);
  border: 1px solid var(--braip-alias-stroke-primary);
  border-radius: var(--braip-space-radius-full);
  background: transparent;
  color: var(--braip-alias-text-surface-secondary);
  font-family: inherit;
  font-size: var(--braip-type-size-text-p7);
  line-height: var(--braip-type-line-height-text-p7);
  cursor: pointer;
  transition: background var(--braip-motion-duration-fast) var(--braip-motion-easing-standard),
    color var(--braip-motion-duration-fast) var(--braip-motion-easing-standard);
}

/* Figma: .Item-Header/Date Picker */
.braip-date-picker__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--braip-space-base-xs);
}

.braip-date-picker__month {
  font-size: var(--braip-type-size-text-p5);
  line-height: var(--braip-type-line-height-text-p5);
  font-weight: var(--braip-type-weight-semi-bold);
  text-transform: capitalize;
}

.braip-date-picker__nav {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  inline-size: var(--braip-value-space-32);
  block-size: var(--braip-value-space-32);
  padding: var(--braip-space-base-none);
  border: none;
  border-radius: var(--braip-space-radius-full);
  background: transparent;
  color: var(--braip-alias-text-surface-secondary);
  cursor: pointer;
}

/* Figma: .Item-Picker/Date Picker */
.braip-date-picker__grid {
  display: flex;
  flex-direction: column;
  gap: var(--braip-space-base-micro);
}

.braip-date-picker__row {
  display: grid;
  grid-template-columns: repeat(7, var(--braip-value-space-32));
  gap: var(--braip-space-base-micro);
}

.braip-date-picker__weekday {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  block-size: var(--braip-value-space-24);
  color: var(--braip-alias-text-surface-tertiary);
  font-size: var(--braip-type-size-text-p7);
  line-height: var(--braip-type-line-height-text-p7);
  text-transform: capitalize;
}

/* Figma: .Item-Day/Date Picker */
.braip-date-picker__day {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  block-size: var(--braip-value-space-32);
  border-radius: var(--braip-space-radius-full);
  background: var(--braip-date-picker-day-bg, transparent);
  color: var(--braip-date-picker-day-fg, var(--braip-alias-text-surface-primary));
  font-size: var(--braip-type-size-text-p6);
  line-height: var(--braip-type-line-height-text-p6);
  cursor: pointer;
  transition: background var(--braip-motion-duration-instant) var(--braip-motion-easing-standard);
}

.braip-date-picker__day.is-outside {
  --braip-date-picker-day-fg: var(--braip-alias-text-surface-tertiary);
}

.braip-date-picker__day.is-today {
  box-shadow: inset 0 0 0 1px var(--braip-alias-brand-core-primary);
}

/* State=Hover */
.braip-date-picker:not(.is-disabled) .braip-date-picker__day:hover,
.braip-date-picker:not(.is-disabled) .braip-date-picker__tab:hover {
  --braip-date-picker-day-bg: var(--braip-alias-bg-surface-secondary);
  background: var(--braip-alias-bg-surface-secondary);
}

/* State=Pressed */
.braip-date-picker:not(.is-disabled) .braip-date-picker__day:active,
.braip-date-picker:not(.is-disabled) .braip-date-picker__tab:active {
  --braip-date-picker-day-bg: var(--braip-alias-bg-surface-tertiary);
  background: var(--braip-alias-bg-surface-tertiary);
}

/* State=Active — foco de teclado na grade e nos tabs */
.braip-date-picker__day:focus-visible,
.braip-date-picker__tab:focus-visible,
.braip-date-picker__nav:focus-visible {
  outline: 2px solid var(--braip-alias-brand-core-primary);
  outline-offset: var(--braip-space-base-micro);
}

/* State=Selected */
.braip-date-picker__day[aria-selected='true'],
.braip-date-picker__tab[aria-selected='true'] {
  --braip-date-picker-day-bg: var(--braip-alias-brand-core-primary);
  --braip-date-picker-day-fg: var(--braip-alias-text-primary);
  border-color: var(--braip-alias-brand-core-primary);
  background: var(--braip-alias-brand-core-primary);
  color: var(--braip-alias-text-primary);
}

/* State=Filled — ha data escolhida */
.braip-date-picker.has-value {
  --braip-date-picker-bd: var(--braip-alias-stroke-secondary);
}

/* State=Error */
.braip-date-picker.is-error {
  --braip-date-picker-bd: var(--braip-alias-red-quaternary);
}

.braip-date-picker.is-error .braip-date-picker__message {
  color: var(--braip-alias-red-text);
}

/* State=Disabled */
.braip-date-picker.is-disabled {
  --braip-date-picker-bd: var(--braip-alias-neutral-secondary);
  background: var(--braip-alias-neutral-primary);
  color: var(--braip-alias-neutral-text);
}

.braip-date-picker.is-disabled .braip-date-picker__day,
.braip-date-picker.is-disabled .braip-date-picker__tab,
.braip-date-picker.is-disabled .braip-date-picker__nav {
  --braip-date-picker-day-fg: var(--braip-alias-neutral-text);
  color: var(--braip-alias-neutral-text);
  cursor: not-allowed;
}

.braip-date-picker__message {
  margin: var(--braip-space-base-none);
  color: var(--braip-alias-text-surface-tertiary);
  font-size: var(--braip-type-size-text-p7);
  line-height: var(--braip-type-line-height-text-p7);
}
</style>
