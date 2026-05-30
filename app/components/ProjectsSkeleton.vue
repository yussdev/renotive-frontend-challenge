<script setup lang="ts">
import type { ViewMode } from '~/types'

interface Props {
  view: ViewMode
  count?: number
}

withDefaults(defineProps<Props>(), { count: 6 })
</script>

<template>
  <div
    v-if="view === 'grid'"
    class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
    aria-hidden="true"
  >
    <div
      v-for="i in count"
      :key="i"
      class="rounded-xl border border-default bg-default overflow-hidden"
    >
      <USkeleton class="h-28 w-full rounded-none" />
      <div class="p-4 space-y-3">
        <USkeleton class="h-4 w-3/4" />
        <USkeleton class="h-3 w-full" />
        <div class="grid grid-cols-2 gap-2">
          <USkeleton class="h-10 w-full rounded-lg" />
          <USkeleton class="h-10 w-full rounded-lg" />
        </div>
        <div class="flex items-center justify-between">
          <USkeleton class="h-3 w-16" />
          <USkeleton class="h-8 w-24 rounded-md" />
        </div>
      </div>
    </div>
  </div>

  <div
    v-else
    class="flex flex-col gap-3"
    aria-hidden="true"
  >
    <div
      v-for="i in count"
      :key="i"
      class="flex items-center gap-4 p-4 rounded-xl border border-default bg-default"
    >
      <USkeleton class="hidden sm:block size-14 rounded-xl" />
      <div class="flex-1 space-y-2">
        <USkeleton class="h-3 w-24" />
        <USkeleton class="h-4 w-3/4" />
        <USkeleton class="h-3 w-1/2" />
      </div>
      <USkeleton class="hidden md:block h-8 w-20" />
      <USkeleton class="h-8 w-28 rounded-md" />
    </div>
  </div>
</template>
