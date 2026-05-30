<script setup lang="ts">
import { onClickOutside, onKeyStroke } from '@vueuse/core'
import type { Project } from '~/types'

const router = useRouter()
const { formatCompactCurrency } = useFormat()

const query = ref('')
const debouncedQuery = useDebouncedRef(query, 250)
const open = ref(false)
const highlightedIndex = ref(0)
const rootEl = ref<HTMLElement | null>(null)
const inputRef = ref<{ inputRef?: HTMLInputElement } | null>(null)

const { data, isFetching, isLoading } = useProjectSearchQuery(debouncedQuery)

const results = computed<Project[]>(() => data.value ?? [])
const trimmedQuery = computed(() => debouncedQuery.value.trim())
const showDropdown = computed(() => open.value && query.value.trim().length > 0)
const isPending = computed(() =>
  query.value.trim().length > 0
  && (query.value.trim() !== trimmedQuery.value || isLoading.value || isFetching.value)
)
const hasNoResults = computed(() =>
  showDropdown.value
  && !isPending.value
  && trimmedQuery.value.length > 0
  && results.value.length === 0
)

watch(results, () => {
  highlightedIndex.value = 0
})

watch(query, (val) => {
  if (val.length > 0) open.value = true
})

function highlight(text: string): string {
  const q = trimmedQuery.value
  if (!q) return text
  const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return text.replace(new RegExp(`(${escaped})`, 'ig'), '<mark class="bg-primary-500/20 text-primary-700 dark:text-primary-300 rounded-sm px-0.5">$1</mark>')
}

function selectResult(project: Project) {
  open.value = false
  query.value = ''
  void router.push({ path: '/', query: { project: project.id } })
}

function focusInput() {
  const el = inputRef.value?.inputRef
  el?.focus()
}

defineExpose({ focus: focusInput })

onClickOutside(rootEl, () => {
  open.value = false
})

onKeyStroke('Escape', () => {
  if (open.value) {
    open.value = false
    inputRef.value?.inputRef?.blur()
  }
})

function onArrow(direction: 1 | -1) {
  if (!showDropdown.value || results.value.length === 0) return
  const next = highlightedIndex.value + direction
  if (next < 0) highlightedIndex.value = results.value.length - 1
  else if (next >= results.value.length) highlightedIndex.value = 0
  else highlightedIndex.value = next
}

function onEnter() {
  const project = results.value[highlightedIndex.value]
  if (project) selectResult(project)
}
</script>

<template>
  <div
    ref="rootEl"
    class="relative w-full"
  >
    <UInput
      ref="inputRef"
      v-model="query"
      placeholder="Search projects, categories, locations…"
      icon="i-lucide-search"
      :loading="isPending"
      autocomplete="off"
      role="combobox"
      :aria-expanded="showDropdown"
      aria-autocomplete="list"
      aria-controls="header-search-results"
      class="w-full"
      :ui="{ root: 'w-full', base: 'w-full pr-16 h-10 bg-elevated/60 border-default focus-visible:ring-primary-500/40' }"
      @focus="open = true"
      @keydown.down.prevent="onArrow(1)"
      @keydown.up.prevent="onArrow(-1)"
      @keydown.enter.prevent="onEnter"
    >
      <template #trailing>
        <div class="flex items-center gap-1">
          <UButton
            v-if="query.length > 0"
            icon="i-lucide-x"
            size="xs"
            color="neutral"
            variant="ghost"
            aria-label="Clear search"
            @click="query = ''"
          />
          <UKbd
            v-else
            class="hidden md:inline-flex"
          >
            /
          </UKbd>
        </div>
      </template>
    </UInput>

    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0 -translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-1"
    >
      <div
        v-if="showDropdown"
        id="header-search-results"
        role="listbox"
        class="absolute z-50 mt-2 left-0 right-0 rounded-xl border border-default bg-default shadow-xl ring-1 ring-black/5 overflow-hidden"
      >
        <div class="flex items-center justify-between px-3 py-2 border-b border-default bg-elevated/40">
          <span class="text-xs text-muted">
            <template v-if="isPending">Searching…</template>
            <template v-else-if="results.length">
              {{ results.length }} result{{ results.length === 1 ? '' : 's' }} for
              <span class="text-highlighted font-medium">"{{ trimmedQuery }}"</span>
            </template>
            <template v-else>
              No matches for <span class="text-highlighted font-medium">"{{ trimmedQuery }}"</span>
            </template>
          </span>
          <span class="hidden sm:flex items-center gap-1 text-[10px] text-dimmed">
            <UKbd size="sm">↑</UKbd>
            <UKbd size="sm">↓</UKbd>
            <span>to navigate</span>
            <UKbd
              size="sm"
              class="ml-1"
            >
              ↵
            </UKbd>
            <span>to open</span>
          </span>
        </div>

        <ul
          v-if="results.length"
          class="max-h-[420px] overflow-y-auto scroll-area py-1"
        >
          <li
            v-for="(project, index) in results"
            :id="`search-result-${project.id}`"
            :key="project.id"
            role="option"
            :aria-selected="index === highlightedIndex"
            :class="[
              'px-3 py-2.5 cursor-pointer flex items-start gap-3 transition-colors',
              index === highlightedIndex ? 'bg-elevated' : 'hover:bg-elevated/60'
            ]"
            @mouseenter="highlightedIndex = index"
            @click="selectResult(project)"
          >
            <div :class="['shrink-0 mt-0.5 size-9 rounded-lg bg-gradient-to-br grid place-items-center', project.coverColor]">
              <UIcon
                name="i-lucide-building-2"
                class="size-4 text-highlighted/70"
              />
            </div>
            <div class="min-w-0 flex-1">
              <p
                class="text-sm font-medium text-highlighted truncate"
                v-html="highlight(project.title)"
              />
              <div class="flex items-center gap-2 mt-0.5 text-[11px] text-muted">
                <span v-html="highlight(project.category)" />
                <span class="text-dimmed">•</span>
                <span
                  class="truncate"
                  v-html="highlight(project.location)"
                />
              </div>
            </div>
            <div class="shrink-0 text-right">
              <p class="text-xs font-semibold text-highlighted">
                {{ formatCompactCurrency(project.budget) }}
              </p>
              <p class="text-[10px] text-dimmed uppercase tracking-wide">
                {{ project.status.replace('-', ' ') }}
              </p>
            </div>
          </li>
        </ul>

        <div
          v-else-if="hasNoResults"
          class="px-6 py-10 text-center"
        >
          <div class="mx-auto mb-3 grid place-items-center size-12 rounded-full bg-elevated text-muted">
            <UIcon
              name="i-lucide-search-x"
              class="size-5"
            />
          </div>
          <p class="text-sm font-medium text-highlighted">
            No projects found
          </p>
          <p class="text-xs text-muted mt-1">
            Try searching by title, client, location, or category.
          </p>
        </div>

        <div
          v-else
          class="px-3 py-6 text-center text-sm text-muted"
        >
          <UIcon
            name="i-lucide-loader-2"
            class="size-4 animate-spin mr-1.5 -mt-0.5 inline-block align-middle"
          />
          Searching…
        </div>
      </div>
    </Transition>
  </div>
</template>
