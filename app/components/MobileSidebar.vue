<script setup lang="ts">
const open = defineModel<boolean>('open', { required: true })

const bidsStore = useBidsStore()
const route = useRoute()

interface NavItem {
  label: string
  to: string
  icon: string
  badge?: () => number
}

const navItems = computed<NavItem[]>(() => [
  { label: 'Projects', to: '/', icon: 'i-lucide-layout-dashboard' },
  { label: 'My Bids', to: '/bids', icon: 'i-lucide-gavel', badge: () => bidsStore.totalBids },
  { label: 'Schedule', to: '/schedule', icon: 'i-lucide-calendar-days' },
  { label: 'Documents', to: '/documents', icon: 'i-lucide-folder-open' },
  { label: 'Analytics', to: '/analytics', icon: 'i-lucide-bar-chart-3' },
  { label: 'Reports', to: '/reports', icon: 'i-lucide-file-bar-chart' },
  { label: 'Team', to: '/team', icon: 'i-lucide-users' },
  { label: 'Settings', to: '/settings', icon: 'i-lucide-settings' }
])

function isActive(to: string) {
  if (to === '/') return route.path === '/'
  return route.path.startsWith(to)
}

watch(() => route.path, () => {
  open.value = false
})
</script>

<template>
  <USlideover
    v-model:open="open"
    side="left"
    title="Navigation"
    :ui="{ content: 'w-[280px]' }"
  >
    <template #body>
      <div class="px-2 py-3">
        <AppLogo class="px-3 mb-4" />
        <ul class="space-y-0.5">
          <li
            v-for="item in navItems"
            :key="item.to"
          >
            <NuxtLink
              :to="item.to"
              :class="[
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
                isActive(item.to)
                  ? 'bg-primary-500/10 text-primary-600 dark:text-primary-400 font-medium'
                  : 'text-muted hover:bg-elevated hover:text-highlighted'
              ]"
            >
              <UIcon
                :name="item.icon"
                class="size-[18px]"
              />
              <span class="flex-1">{{ item.label }}</span>
              <UBadge
                v-if="item.badge && item.badge() > 0"
                size="sm"
                color="primary"
                variant="soft"
              >
                {{ item.badge() }}
              </UBadge>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </template>
  </USlideover>
</template>
