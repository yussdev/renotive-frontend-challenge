<script setup lang="ts">
const preferences = usePreferencesStore()
const bidsStore = useBidsStore()
const route = useRoute()

interface NavItem {
  label: string
  to: string
  icon: string
  badge?: () => number
}

interface NavGroup {
  label: string
  items: NavItem[]
}

const navGroups = computed<NavGroup[]>(() => [
  {
    label: 'Workspace',
    items: [
      { label: 'Projects', to: '/', icon: 'i-lucide-layout-dashboard' },
      { label: 'My Bids', to: '/bids', icon: 'i-lucide-gavel', badge: () => bidsStore.totalBids },
      { label: 'Schedule', to: '/schedule', icon: 'i-lucide-calendar-days' },
      { label: 'Documents', to: '/documents', icon: 'i-lucide-folder-open' }
    ]
  },
  {
    label: 'Insights',
    items: [
      { label: 'Analytics', to: '/analytics', icon: 'i-lucide-bar-chart-3' },
      { label: 'Reports', to: '/reports', icon: 'i-lucide-file-bar-chart' }
    ]
  },
  {
    label: 'Account',
    items: [
      { label: 'Team', to: '/team', icon: 'i-lucide-users' },
      { label: 'Settings', to: '/settings', icon: 'i-lucide-settings' }
    ]
  }
])

const collapsed = computed(() => preferences.isSidebarCollapsed)

function isActive(to: string) {
  if (to === '/') return route.path === '/'
  return route.path.startsWith(to)
}
</script>

<template>
  <aside
    :class="[
      'hidden lg:flex flex-col shrink-0 border-r border-default bg-elevated/40 backdrop-blur-sm transition-[width] duration-300 ease-out',
      collapsed ? 'w-[76px]' : 'w-[252px]'
    ]"
  >
    <nav
      class="flex-1 overflow-y-auto scroll-area px-3 py-4 space-y-6"
      aria-label="Primary"
    >
      <div
        v-for="group in navGroups"
        :key="group.label"
      >
        <p
          v-if="!collapsed"
          class="px-3 mb-2 text-[10px] font-semibold uppercase tracking-wider text-dimmed"
        >
          {{ group.label }}
        </p>
        <ul class="space-y-0.5">
          <li
            v-for="item in group.items"
            :key="item.to"
          >
            <UTooltip
              :text="collapsed ? item.label : ''"
              :disabled="!collapsed"
              :delay-duration="100"
            >
              <NuxtLink
                :to="item.to"
                :class="[
                  'group flex items-center gap-3 rounded-lg text-sm transition-colors w-full',
                  collapsed ? 'justify-center px-2.5 py-2.5' : 'px-3 py-2',
                  isActive(item.to)
                    ? 'bg-primary-500/10 text-primary-600 dark:text-primary-400 font-medium'
                    : 'text-muted hover:bg-elevated hover:text-highlighted'
                ]"
              >
                <UIcon
                  :name="item.icon"
                  class="size-[18px] shrink-0"
                />
                <span
                  v-if="!collapsed"
                  class="flex-1 truncate"
                >{{ item.label }}</span>
                <UBadge
                  v-if="!collapsed && item.badge && item.badge() > 0"
                  size="sm"
                  color="primary"
                  variant="soft"
                  class="ml-auto"
                >
                  {{ item.badge() }}
                </UBadge>
                <span
                  v-else-if="collapsed && item.badge && item.badge() > 0"
                  class="absolute -mt-7 ml-5 grid place-items-center min-w-4 h-4 px-1 rounded-full bg-primary-500 text-white text-[10px] font-semibold"
                >
                  {{ item.badge() }}
                </span>
              </NuxtLink>
            </UTooltip>
          </li>
        </ul>
      </div>
    </nav>

    <div class="border-t border-default p-3">
      <UTooltip
        :text="collapsed ? (preferences.isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar') : ''"
        :disabled="!collapsed"
        :delay-duration="100"
      >
        <UButton
          variant="ghost"
          color="neutral"
          :icon="collapsed ? 'i-lucide-panel-left-open' : 'i-lucide-panel-left-close'"
          :class="[collapsed ? 'w-full justify-center' : 'w-full justify-start']"
          @click="preferences.toggleSidebar()"
        >
          <span v-if="!collapsed">Collapse sidebar</span>
        </UButton>
      </UTooltip>
    </div>
  </aside>
</template>
