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

const { formatCompactCurrency, formatDate } = useFormat()

function onBidClick() {
  emit('bid', props.project)
}
</script>

<template>
  <article class="group relative flex flex-col rounded-xl border border-default bg-default overflow-hidden transition-all hover:border-primary-500/40 hover:shadow-lg hover:-translate-y-0.5">
    <div :class="['relative h-28 bg-gradient-to-br', project.coverColor]">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.15),_transparent_60%)]" />
      <div class="absolute top-3 left-3">
        <UBadge
          color="neutral"
          variant="solid"
          class="bg-default/80 text-highlighted backdrop-blur"
        >
          {{ project.category }}
        </UBadge>
      </div>
      <div class="absolute top-3 right-3">
        <ProjectStatusBadge :status="project.status" />
      </div>
      <div class="absolute bottom-3 left-3 right-3 flex items-end justify-between">
        <span class="text-[11px] text-highlighted/90 bg-black/20 px-1.5 py-0.5 rounded backdrop-blur-sm">
          <UIcon
            name="i-lucide-map-pin"
            class="size-3 inline-block -mt-0.5 mr-0.5"
          />
          {{ project.location }}
        </span>
      </div>
    </div>

    <div class="flex flex-col flex-1 p-4 gap-3">
      <header>
        <h3 class="text-[15px] font-semibold text-highlighted leading-snug line-clamp-2">
          {{ project.title }}
        </h3>
        <p class="mt-1 text-xs text-muted line-clamp-2">
          {{ project.description }}
        </p>
      </header>

      <dl class="grid grid-cols-2 gap-2 text-xs">
        <div class="rounded-lg bg-elevated/50 px-2.5 py-1.5">
          <dt class="text-[10px] uppercase tracking-wide text-dimmed">
            Budget
          </dt>
          <dd class="text-sm font-semibold text-highlighted">
            {{ formatCompactCurrency(project.budget) }}
          </dd>
        </div>
        <div class="rounded-lg bg-elevated/50 px-2.5 py-1.5">
          <dt class="text-[10px] uppercase tracking-wide text-dimmed">
            Deadline
          </dt>
          <dd class="text-sm font-semibold text-highlighted">
            {{ formatDate(project.deadline) }}
          </dd>
        </div>
      </dl>

      <div class="flex items-center justify-between gap-2 mt-auto pt-1">
        <div class="flex items-center gap-1.5 text-xs text-muted">
          <UIcon
            name="i-lucide-users"
            class="size-3.5"
          />
          <span>{{ project.bidsCount }} bids</span>
        </div>
        <UButton
          color="primary"
          :variant="hasUserBid ? 'soft' : 'solid'"
          size="sm"
          :icon="hasUserBid ? 'i-lucide-check' : 'i-lucide-gavel'"
          @click="onBidClick"
        >
          {{ hasUserBid ? 'Bid placed' : 'Place Bid' }}
        </UButton>
      </div>
    </div>
  </article>
</template>
