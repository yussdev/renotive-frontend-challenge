<script setup lang="ts">
import type { Project } from '~/types'

interface Props {
  project: Project
  hasUserBid?: boolean
}

const props = withDefaults(defineProps<Props>(), { hasUserBid: false })
const emit = defineEmits<{
  bid: [project: Project]
}>()

const { formatCurrency, formatDate } = useFormat()
</script>

<template>
  <article class="group flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-xl border border-default bg-default hover:border-primary-500/40 hover:shadow-sm transition-all">
    <div :class="['shrink-0 hidden sm:grid place-items-center size-14 rounded-xl bg-gradient-to-br', project.coverColor]">
      <UIcon
        name="i-lucide-building-2"
        class="size-6 text-highlighted/70"
      />
    </div>

    <div class="flex-1 min-w-0">
      <div class="flex flex-wrap items-center gap-2 mb-1">
        <UBadge
          color="neutral"
          variant="soft"
          size="sm"
        >
          {{ project.category }}
        </UBadge>
        <ProjectStatusBadge :status="project.status" />
        <span class="text-xs text-dimmed flex items-center gap-1">
          <UIcon
            name="i-lucide-map-pin"
            class="size-3"
          />
          {{ project.location }}
        </span>
      </div>
      <h3 class="font-semibold text-highlighted leading-snug">
        {{ project.title }}
      </h3>
      <p class="text-xs text-muted line-clamp-1 mt-0.5">
        {{ project.description }}
      </p>
    </div>

    <div class="hidden md:flex flex-col items-end shrink-0 min-w-[120px]">
      <span class="text-[10px] uppercase tracking-wide text-dimmed">Budget</span>
      <span class="text-sm font-semibold text-highlighted">
        {{ formatCurrency(project.budget) }}
      </span>
    </div>

    <div class="hidden lg:flex flex-col items-end shrink-0 min-w-[110px]">
      <span class="text-[10px] uppercase tracking-wide text-dimmed">Deadline</span>
      <span class="text-sm font-medium text-default">
        {{ formatDate(project.deadline) }}
      </span>
    </div>

    <div class="flex items-center justify-between sm:justify-end gap-3 shrink-0">
      <div class="flex items-center gap-1.5 text-xs text-muted">
        <UIcon
          name="i-lucide-users"
          class="size-3.5"
        />
        <span>{{ project.bidsCount }}</span>
      </div>
      <UButton
        color="primary"
        :variant="hasUserBid ? 'soft' : 'solid'"
        size="sm"
        :icon="hasUserBid ? 'i-lucide-check' : 'i-lucide-gavel'"
        @click="emit('bid', project)"
      >
        {{ hasUserBid ? 'Bid placed' : 'Place Bid' }}
      </UButton>
    </div>
  </article>
</template>
