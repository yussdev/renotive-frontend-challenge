<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core'
import type { Project } from '~/types'

const preferences = usePreferencesStore()
const bidsStore = useBidsStore()

const {
  data,
  isLoading,
  isFetchingNextPage,
  fetchNextPage,
  hasNextPage,
  isError,
  error,
  refetch
} = useProjectsInfiniteQuery()

const allProjects = computed<Project[]>(() =>
  data.value?.pages.flatMap(p => p.items) ?? []
)
const totalCount = computed(() => data.value?.pages[0]?.total ?? 0)

const sentinel = ref<HTMLElement | null>(null)

useIntersectionObserver(
  sentinel,
  ([entry]) => {
    if (entry?.isIntersecting && hasNextPage.value && !isFetchingNextPage.value) {
      void fetchNextPage()
    }
  },
  { rootMargin: '300px 0px' }
)

const selectedProject = ref<Project | null>(null)
const bidModalOpen = ref(false)

function openBid(project: Project) {
  selectedProject.value = project
  bidModalOpen.value = true
}

function hasUserBid(projectId: string): boolean {
  return bidsStore.bidsForProject(projectId).length > 0
}

const viewMode = computed({
  get: () => preferences.viewMode,
  set: (value) => preferences.setViewMode(value)
})
</script>

<template>
  <section class="space-y-4">
    <header class="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
      <div>
        <div class="flex items-center gap-2 text-xs text-muted">
          <UIcon
            name="i-lucide-layout-dashboard"
            class="size-3.5"
          />
          <span>Projects</span>
        </div>
        <h1 class="text-2xl sm:text-[28px] font-semibold text-highlighted tracking-tight">
          Active construction projects
        </h1>
        <p class="text-sm text-muted mt-1">
          <span v-if="!isLoading">
            Showing
            <span class="text-highlighted font-medium">{{ allProjects.length }}</span>
            of
            <span class="text-highlighted font-medium">{{ totalCount }}</span>
            projects
          </span>
          <span v-else>Loading projects…</span>
        </p>
      </div>

      <div class="flex items-center gap-2">
        <ViewModeToggle v-model="viewMode" />
        <UButton
          color="neutral"
          variant="outline"
          icon="i-lucide-refresh-cw"
          size="sm"
          :loading="isLoading"
          @click="refetch()"
        >
          <span class="hidden sm:inline">Refresh</span>
        </UButton>
      </div>
    </header>

    <div
      v-if="isError"
      class="rounded-xl border border-error/30 bg-error/5 px-4 py-3 flex items-start gap-3"
    >
      <UIcon
        name="i-lucide-alert-triangle"
        class="size-5 text-error mt-0.5"
      />
      <div class="flex-1">
        <p class="text-sm font-medium text-highlighted">
          Couldn't load projects
        </p>
        <p class="text-xs text-muted mt-0.5">
          {{ error?.message ?? 'Something went wrong while fetching the project list.' }}
        </p>
      </div>
      <UButton
        size="sm"
        color="error"
        variant="soft"
        @click="refetch()"
      >
        Retry
      </UButton>
    </div>

    <ProjectsSkeleton
      v-if="isLoading"
      :view="viewMode"
    />

    <template v-else>
      <div
        v-if="viewMode === 'grid'"
        class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
      >
        <ProjectCard
          v-for="project in allProjects"
          :key="project.id"
          :project="project"
          :has-user-bid="hasUserBid(project.id)"
          @bid="openBid"
        />
      </div>

      <div
        v-else
        class="flex flex-col gap-3"
      >
        <ProjectListItem
          v-for="project in allProjects"
          :key="project.id"
          :project="project"
          :has-user-bid="hasUserBid(project.id)"
          @bid="openBid"
        />
      </div>

      <ProjectsSkeleton
        v-if="isFetchingNextPage"
        :view="viewMode"
        :count="3"
      />

      <div
        ref="sentinel"
        class="h-px"
        aria-hidden="true"
      />

      <div
        v-if="!hasNextPage && allProjects.length > 0"
        class="flex flex-col items-center justify-center gap-1 py-8 text-center"
      >
        <div class="grid place-items-center size-10 rounded-full bg-elevated text-muted">
          <UIcon
            name="i-lucide-flag"
            class="size-5"
          />
        </div>
        <p class="text-sm font-medium text-highlighted">
          You've reached the end
        </p>
        <p class="text-xs text-muted">
          All {{ totalCount }} projects loaded.
        </p>
      </div>

      <div
        v-if="!isLoading && allProjects.length === 0"
        class="flex flex-col items-center justify-center gap-2 py-16 text-center"
      >
        <div class="grid place-items-center size-12 rounded-full bg-elevated text-muted">
          <UIcon
            name="i-lucide-inbox"
            class="size-6"
          />
        </div>
        <p class="text-sm font-medium text-highlighted">
          No projects available
        </p>
        <p class="text-xs text-muted">
          Check back later for new opportunities.
        </p>
      </div>
    </template>

    <PlaceBidModal
      v-model:open="bidModalOpen"
      :project="selectedProject"
    />
  </section>
</template>
