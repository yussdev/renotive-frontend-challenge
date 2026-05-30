<script setup lang="ts">
import type { Theme, ViewMode } from '~/types'

const preferences = usePreferencesStore()
const colorMode = useColorMode()

const themeOptions: { value: Theme, label: string, icon: string }[] = [
  { value: 'light', label: 'Light', icon: 'i-lucide-sun' },
  { value: 'dark', label: 'Dark', icon: 'i-lucide-moon' },
  { value: 'system', label: 'System', icon: 'i-lucide-monitor' }
]

const viewOptions: { value: ViewMode, label: string, icon: string }[] = [
  { value: 'grid', label: 'Grid', icon: 'i-lucide-layout-grid' },
  { value: 'list', label: 'List', icon: 'i-lucide-list' }
]

function applyTheme(value: Theme) {
  preferences.setTheme(value)
  colorMode.preference = value
}
</script>

<template>
  <UPopover
    :ui="{ content: 'w-[260px] p-3' }"
    :content="{ align: 'end', side: 'bottom', sideOffset: 8 }"
  >
    <UTooltip
      text="Preferences"
      :delay-duration="200"
    >
      <UButton
        icon="i-lucide-sliders-horizontal"
        color="neutral"
        variant="ghost"
        size="md"
        aria-label="Open preferences"
      />
    </UTooltip>

    <template #content>
      <div class="space-y-4">
        <div>
          <div class="flex items-center justify-between mb-2">
            <p class="text-xs font-semibold uppercase tracking-wider text-dimmed">
              Theme
            </p>
            <UIcon
              name="i-lucide-palette"
              class="size-3.5 text-dimmed"
            />
          </div>
          <div class="grid grid-cols-3 gap-1.5">
            <button
              v-for="opt in themeOptions"
              :key="opt.value"
              type="button"
              :class="[
                'flex flex-col items-center justify-center gap-1 rounded-lg border px-2 py-2.5 text-xs transition-colors',
                preferences.theme === opt.value
                  ? 'border-primary-500/60 bg-primary-500/10 text-primary-600 dark:text-primary-400'
                  : 'border-default text-muted hover:bg-elevated hover:text-highlighted'
              ]"
              @click="applyTheme(opt.value)"
            >
              <UIcon
                :name="opt.icon"
                class="size-4"
              />
              <span>{{ opt.label }}</span>
            </button>
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between mb-2">
            <p class="text-xs font-semibold uppercase tracking-wider text-dimmed">
              Default view
            </p>
            <UIcon
              name="i-lucide-eye"
              class="size-3.5 text-dimmed"
            />
          </div>
          <div class="grid grid-cols-2 gap-1.5">
            <button
              v-for="opt in viewOptions"
              :key="opt.value"
              type="button"
              :class="[
                'flex items-center justify-center gap-1.5 rounded-lg border px-2 py-2 text-xs transition-colors',
                preferences.viewMode === opt.value
                  ? 'border-primary-500/60 bg-primary-500/10 text-primary-600 dark:text-primary-400'
                  : 'border-default text-muted hover:bg-elevated hover:text-highlighted'
              ]"
              @click="preferences.setViewMode(opt.value)"
            >
              <UIcon
                :name="opt.icon"
                class="size-4"
              />
              <span>{{ opt.label }}</span>
            </button>
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between mb-2">
            <p class="text-xs font-semibold uppercase tracking-wider text-dimmed">
              Sidebar
            </p>
            <UIcon
              name="i-lucide-panel-left"
              class="size-3.5 text-dimmed"
            />
          </div>
          <div class="flex items-center justify-between rounded-lg border border-default px-3 py-2">
            <div class="flex flex-col">
              <span class="text-sm text-highlighted">Expanded</span>
              <span class="text-[11px] text-muted">Show navigation labels</span>
            </div>
            <USwitch
              :model-value="preferences.sidebar === 'expanded'"
              @update:model-value="preferences.setSidebar($event ? 'expanded' : 'collapsed')"
            />
          </div>
        </div>

        <p class="text-[11px] text-dimmed flex items-center gap-1.5">
          <UIcon
            name="i-lucide-info"
            class="size-3"
          />
          Preferences are saved to this device.
        </p>
      </div>
    </template>
  </UPopover>
</template>
