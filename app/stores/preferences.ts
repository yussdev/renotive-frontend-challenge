import { defineStore } from 'pinia'
import type { SidebarState, Theme, ViewMode } from '~/types'

interface PreferencesState {
  theme: Theme
  sidebar: SidebarState
  viewMode: ViewMode
}

const STORAGE_KEY = 'renotive:preferences:v1'

const DEFAULT_PREFERENCES: PreferencesState = {
  theme: 'system',
  sidebar: 'expanded',
  viewMode: 'grid'
}

function readStoredPreferences(): PreferencesState {
  if (!import.meta.client) return DEFAULT_PREFERENCES
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_PREFERENCES
    const parsed = JSON.parse(raw) as Partial<PreferencesState>
    return {
      theme: parsed.theme ?? DEFAULT_PREFERENCES.theme,
      sidebar: parsed.sidebar ?? DEFAULT_PREFERENCES.sidebar,
      viewMode: parsed.viewMode ?? DEFAULT_PREFERENCES.viewMode
    }
  } catch {
    return DEFAULT_PREFERENCES
  }
}

export const usePreferencesStore = defineStore('preferences', () => {
  const theme = ref<Theme>(DEFAULT_PREFERENCES.theme)
  const sidebar = ref<SidebarState>(DEFAULT_PREFERENCES.sidebar)
  const viewMode = ref<ViewMode>(DEFAULT_PREFERENCES.viewMode)
  const hydrated = ref(false)

  function hydrate() {
    if (hydrated.value) return
    const stored = readStoredPreferences()
    theme.value = stored.theme
    sidebar.value = stored.sidebar
    viewMode.value = stored.viewMode
    hydrated.value = true
  }

  function persist() {
    if (!import.meta.client) return
    const payload: PreferencesState = {
      theme: theme.value,
      sidebar: sidebar.value,
      viewMode: viewMode.value
    }
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
    } catch {
      // ignore quota / private mode errors
    }
  }

  watch([theme, sidebar, viewMode], () => {
    if (hydrated.value) persist()
  })

  function setTheme(next: Theme) {
    theme.value = next
  }

  function setSidebar(next: SidebarState) {
    sidebar.value = next
  }

  function toggleSidebar() {
    sidebar.value = sidebar.value === 'expanded' ? 'collapsed' : 'expanded'
  }

  function setViewMode(next: ViewMode) {
    viewMode.value = next
  }

  const isSidebarCollapsed = computed(() => sidebar.value === 'collapsed')

  return {
    theme,
    sidebar,
    viewMode,
    hydrated,
    isSidebarCollapsed,
    hydrate,
    setTheme,
    setSidebar,
    toggleSidebar,
    setViewMode
  }
})
