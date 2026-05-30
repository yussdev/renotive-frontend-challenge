<script setup lang="ts">
const preferences = usePreferencesStore()
const colorMode = useColorMode()

const mobileNavOpen = ref(false)

onMounted(() => {
  preferences.hydrate()
  if (preferences.theme !== colorMode.preference) {
    colorMode.preference = preferences.theme
  }
})
</script>

<template>
  <div class="h-screen w-screen flex flex-col bg-default text-default antialiased">
    <AppHeader v-model:mobile-nav-open="mobileNavOpen" />

    <div class="flex-1 flex min-h-0">
      <AppSidebar />
      <MobileSidebar v-model:open="mobileNavOpen" />
      <main class="flex-1 min-w-0 overflow-y-auto scroll-area">
        <slot />
      </main>
    </div>
  </div>
</template>
