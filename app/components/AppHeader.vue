<script setup lang="ts">
import { onKeyStroke } from '@vueuse/core'

const preferences = usePreferencesStore()
const bidsStore = useBidsStore()

const mobileNavOpen = defineModel<boolean>('mobileNavOpen', { default: false })
const searchRef = ref<{ focus: () => void } | null>(null)

onKeyStroke('/', (e) => {
  const target = e.target as HTMLElement | null
  if (target && ['INPUT', 'TEXTAREA'].includes(target.tagName)) return
  e.preventDefault()
  searchRef.value?.focus()
})
</script>

<template>
  <header
    class="relative z-30 flex items-center gap-2 sm:gap-3 h-16 px-3 sm:px-4 lg:px-6 border-b border-default bg-default/80 backdrop-blur supports-[backdrop-filter]:bg-default/70"
  >
    <UButton
      icon="i-lucide-menu"
      variant="ghost"
      color="neutral"
      class="lg:hidden"
      aria-label="Open menu"
      @click="mobileNavOpen = true"
    />

    <UButton
      :icon="preferences.isSidebarCollapsed ? 'i-lucide-panel-left-open' : 'i-lucide-panel-left-close'"
      variant="ghost"
      color="neutral"
      class="hidden lg:inline-flex"
      aria-label="Toggle sidebar"
      @click="preferences.toggleSidebar()"
    />

    <div class="hidden lg:flex items-center min-w-[180px]">
      <AppLogo />
    </div>

    <div class="lg:hidden flex items-center">
      <AppLogo collapsed />
    </div>

    <div class="flex-1 max-w-2xl mx-auto lg:mx-6">
      <HeaderSearch ref="searchRef" />
    </div>

    <div class="flex items-center gap-1 sm:gap-1.5">
      <UTooltip
        text="My bids"
        :delay-duration="200"
      >
        <UButton
          to="/bids"
          variant="ghost"
          color="neutral"
          class="relative"
          aria-label="My bids"
        >
          <UIcon
            name="i-lucide-gavel"
            class="size-5"
          />
          <span
            v-if="bidsStore.totalBids > 0"
            class="absolute -top-0.5 -right-0.5 grid place-items-center min-w-[18px] h-[18px] px-1 rounded-full bg-primary-500 text-white text-[10px] font-semibold ring-2 ring-default"
          >
            {{ bidsStore.totalBids > 99 ? '99+' : bidsStore.totalBids }}
          </span>
        </UButton>
      </UTooltip>

      <ThemeToggle />
      <PreferencesMenu />

      <div class="hidden sm:block mx-1 h-6 w-px bg-default" />

      <UserMenu />
    </div>
  </header>
</template>
