<script setup lang="ts">
useHead({ title: 'Projects · Renotive' })

const bidsStore = useBidsStore()
const { formatCompactCurrency } = useFormat()

interface Stat {
  label: string
  value: string
  icon: string
  trend?: { value: string, positive: boolean }
}

const stats = computed<Stat[]>(() => [
  {
    label: 'Active projects',
    value: '26',
    icon: 'i-lucide-hard-hat',
    trend: { value: '+4 this week', positive: true }
  },
  {
    label: 'Open for bids',
    value: '18',
    icon: 'i-lucide-circle-dot',
    trend: { value: '+2 today', positive: true }
  },
  {
    label: 'Your bids',
    value: String(bidsStore.totalBids),
    icon: 'i-lucide-gavel'
  },
  {
    label: 'Total bid value',
    value: formatCompactCurrency(bidsStore.totalAmount),
    icon: 'i-lucide-trending-up'
  }
])
</script>

<template>
  <div class="px-4 sm:px-6 lg:px-8 py-6 max-w-[1400px] mx-auto space-y-6">
    <section class="grid grid-cols-2 lg:grid-cols-4 gap-3">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="rounded-xl border border-default bg-default p-4 flex items-start justify-between gap-3"
      >
        <div class="min-w-0">
          <p class="text-[11px] uppercase tracking-wider text-dimmed">
            {{ stat.label }}
          </p>
          <p class="text-2xl font-semibold text-highlighted mt-1">
            {{ stat.value }}
          </p>
          <p
            v-if="stat.trend"
            :class="[
              'text-xs mt-0.5 flex items-center gap-1',
              stat.trend.positive ? 'text-success' : 'text-error'
            ]"
          >
            <UIcon
              :name="stat.trend.positive ? 'i-lucide-arrow-up-right' : 'i-lucide-arrow-down-right'"
              class="size-3"
            />
            {{ stat.trend.value }}
          </p>
        </div>
        <div class="grid place-items-center size-10 rounded-lg bg-primary-500/10 text-primary-600 dark:text-primary-400 shrink-0">
          <UIcon
            :name="stat.icon"
            class="size-5"
          />
        </div>
      </div>
    </section>

    <ProjectsBoard />
  </div>
</template>
