<script setup lang="ts">
interface Props {
  collapsed?: boolean
}

withDefaults(defineProps<Props>(), { collapsed: false })
</script>

<template>
  <NuxtLink
    to="/"
    class="flex items-center gap-2.5 group"
    aria-label="Renotive home"
  >
    <span
      class="grid place-items-center size-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-sm ring-1 ring-primary-600/30 transition-transform group-hover:scale-105"
    >
      <UIcon
        name="i-lucide-hard-hat"
        class="size-5"
      />
    </span>
    <span
      v-if="!collapsed"
      class="flex flex-col leading-tight"
    >
      <span class="font-semibold tracking-tight text-[15px] text-highlighted">Renotive</span>
      <span class="text-[11px] text-muted">Project Dashboard</span>
    </span>
  </NuxtLink>
</template>
