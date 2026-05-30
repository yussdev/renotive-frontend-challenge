<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

const bidsStore = useBidsStore()
const toast = useToast()

const items = computed<DropdownMenuItem[][]>(() => [
  [
    {
      type: 'label' as const,
      label: 'Casey Patel',
      avatar: { src: 'https://i.pravatar.cc/96?img=12' }
    }
  ],
  [
    { label: 'Profile', icon: 'i-lucide-user', to: '/profile' },
    { label: 'Notifications', icon: 'i-lucide-bell', to: '/notifications' },
    { label: 'Billing', icon: 'i-lucide-credit-card', to: '/billing' }
  ],
  [
    {
      label: 'Clear my bids',
      icon: 'i-lucide-trash-2',
      disabled: bidsStore.totalBids === 0,
      onSelect: () => {
        bidsStore.clearAll()
        toast.add({ title: 'Bids cleared', icon: 'i-lucide-check', color: 'success' })
      }
    },
    { label: 'Sign out', icon: 'i-lucide-log-out' }
  ]
])
</script>

<template>
  <UDropdownMenu
    :items="items"
    :content="{ align: 'end', sideOffset: 8 }"
    :ui="{ content: 'w-56' }"
  >
    <button
      type="button"
      class="flex items-center gap-2 rounded-full pl-1 pr-2 py-1 hover:bg-elevated transition-colors"
      aria-label="Open user menu"
    >
      <UAvatar
        src="https://i.pravatar.cc/96?img=12"
        alt="Casey Patel"
        size="sm"
      />
      <span class="hidden md:flex flex-col text-left leading-tight">
        <span class="text-xs font-medium text-highlighted">Casey Patel</span>
        <span class="text-[10px] text-muted">Project Manager</span>
      </span>
      <UIcon
        name="i-lucide-chevron-down"
        class="hidden md:block size-3.5 text-muted"
      />
    </button>
  </UDropdownMenu>
</template>
