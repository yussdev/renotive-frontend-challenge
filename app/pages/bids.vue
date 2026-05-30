<script setup lang="ts">
useHead({ title: 'My Bids · Renotive' })

const bidsStore = useBidsStore()
const toast = useToast()
const { formatCurrency, formatDateTime } = useFormat()

function remove(id: string) {
  bidsStore.removeBid(id)
  toast.add({ title: 'Bid removed', icon: 'i-lucide-trash-2', color: 'neutral' })
}
</script>

<template>
  <div class="px-4 sm:px-6 lg:px-8 py-6 max-w-[1100px] mx-auto space-y-6">
    <header class="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
      <div>
        <div class="flex items-center gap-2 text-xs text-muted">
          <UIcon
            name="i-lucide-gavel"
            class="size-3.5"
          />
          <span>Bids</span>
        </div>
        <h1 class="text-2xl sm:text-[28px] font-semibold text-highlighted tracking-tight">
          My active bids
        </h1>
        <p class="text-sm text-muted mt-1">
          <span class="text-highlighted font-medium">{{ bidsStore.totalBids }}</span> bid{{ bidsStore.totalBids === 1 ? '' : 's' }}
          totalling
          <span class="text-highlighted font-medium">{{ formatCurrency(bidsStore.totalAmount) }}</span>
        </p>
      </div>
      <div class="flex items-center gap-2">
        <UButton
          to="/"
          color="neutral"
          variant="outline"
          icon="i-lucide-arrow-left"
          size="sm"
        >
          Back to projects
        </UButton>
        <UButton
          v-if="bidsStore.totalBids > 0"
          color="error"
          variant="soft"
          icon="i-lucide-trash-2"
          size="sm"
          @click="bidsStore.clearAll()"
        >
          Clear all
        </UButton>
      </div>
    </header>

    <div
      v-if="bidsStore.totalBids === 0"
      class="rounded-2xl border border-dashed border-default bg-elevated/30 px-6 py-16 text-center"
    >
      <div class="mx-auto mb-3 grid place-items-center size-12 rounded-full bg-elevated text-muted">
        <UIcon
          name="i-lucide-gavel"
          class="size-5"
        />
      </div>
      <h2 class="text-base font-medium text-highlighted">
        No bids yet
      </h2>
      <p class="text-sm text-muted mt-1 mb-4">
        Browse the project board and place your first bid.
      </p>
      <UButton
        to="/"
        color="primary"
        icon="i-lucide-arrow-right"
        trailing
      >
        Find projects
      </UButton>
    </div>

    <ul
      v-else
      class="flex flex-col gap-2"
    >
      <li
        v-for="bid in bidsStore.bids"
        :key="bid.id"
        class="flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-xl border border-default bg-default"
      >
        <div class="grid place-items-center size-10 rounded-lg bg-primary-500/10 text-primary-600 dark:text-primary-400 shrink-0">
          <UIcon
            name="i-lucide-gavel"
            class="size-5"
          />
        </div>
        <div class="flex-1 min-w-0">
          <p class="font-medium text-highlighted truncate">
            {{ bid.projectTitle }}
          </p>
          <p class="text-xs text-muted mt-0.5">
            Placed {{ formatDateTime(bid.createdAt) }}
          </p>
          <p
            v-if="bid.notes"
            class="text-xs text-muted mt-1 line-clamp-2"
          >
            <UIcon
              name="i-lucide-message-square-quote"
              class="size-3 inline-block -mt-0.5 mr-1"
            />
            {{ bid.notes }}
          </p>
        </div>
        <div class="flex items-center justify-between sm:justify-end gap-3 shrink-0">
          <span class="text-lg font-semibold text-highlighted">
            {{ formatCurrency(bid.amount) }}
          </span>
          <UButton
            icon="i-lucide-trash-2"
            color="neutral"
            variant="ghost"
            size="sm"
            aria-label="Remove bid"
            @click="remove(bid.id)"
          />
        </div>
      </li>
    </ul>
  </div>
</template>
