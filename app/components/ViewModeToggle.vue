<script setup lang="ts">
import type { ViewMode } from '~/types'

const model = defineModel<ViewMode>({ required: true })

const options: { value: ViewMode, icon: string, label: string }[] = [
  { value: 'grid', icon: 'i-lucide-layout-grid', label: 'Grid view' },
  { value: 'list', icon: 'i-lucide-list', label: 'List view' }
]
</script>

<template>
  <div
    class="inline-flex items-center rounded-lg border border-default bg-elevated/40 p-0.5"
    role="radiogroup"
    aria-label="View mode"
  >
    <button
      v-for="opt in options"
      :key="opt.value"
      type="button"
      role="radio"
      :aria-checked="model === opt.value"
      :aria-label="opt.label"
      :class="[
        'flex items-center justify-center size-8 rounded-md transition-colors',
        model === opt.value
          ? 'bg-default text-highlighted shadow-sm'
          : 'text-muted hover:text-highlighted'
      ]"
      @click="model = opt.value"
    >
      <UIcon
        :name="opt.icon"
        class="size-4"
      />
    </button>
  </div>
</template>
