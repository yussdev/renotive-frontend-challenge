<script setup lang="ts">
const preferences = usePreferencesStore()
const colorMode = useColorMode()

const isDark = computed(() => colorMode.value === 'dark')

function toggle() {
  const next = isDark.value ? 'light' : 'dark'
  preferences.setTheme(next)
  colorMode.preference = next
}
</script>

<template>
  <ClientOnly>
    <UTooltip
      :text="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
      :delay-duration="200"
    >
      <UButton
        :icon="isDark ? 'i-lucide-sun' : 'i-lucide-moon'"
        color="neutral"
        variant="ghost"
        size="md"
        aria-label="Toggle theme"
        @click="toggle"
      />
    </UTooltip>
    <template #fallback>
      <UButton
        icon="i-lucide-moon"
        color="neutral"
        variant="ghost"
        size="md"
        disabled
      />
    </template>
  </ClientOnly>
</template>
