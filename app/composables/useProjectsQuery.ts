import { useInfiniteQuery, useQuery } from '@tanstack/vue-query'
import type { MaybeRef } from 'vue'
import { fetchProjectsPage, searchProjects } from '~/composables/useProjectsApi'
import type { Project, ProjectsPage } from '~/types'

export const projectsQueryKeys = {
  all: ['projects'] as const,
  infinite: () => [...projectsQueryKeys.all, 'infinite'] as const,
  search: (q: string) => [...projectsQueryKeys.all, 'search', q] as const
}

/**
 * Infinite paginated projects query. Each page contains up to `PROJECTS_PAGE_SIZE`
 * items along with the next cursor (or null when exhausted).
 */
export function useProjectsInfiniteQuery() {
  return useInfiniteQuery<ProjectsPage>({
    queryKey: projectsQueryKeys.infinite(),
    queryFn: ({ pageParam }) => fetchProjectsPage({ cursor: pageParam as number }),
    initialPageParam: 0,
    getNextPageParam: lastPage => lastPage.nextCursor ?? undefined,
    staleTime: 1000 * 60
  })
}

/**
 * Debounced search query. The caller is responsible for passing in an already
 * debounced reactive query string.
 */
export function useProjectSearchQuery(query: MaybeRef<string>) {
  return useQuery<Project[]>({
    queryKey: computed(() => projectsQueryKeys.search(toValue(query).trim())),
    queryFn: () => searchProjects(toValue(query)),
    enabled: computed(() => toValue(query).trim().length > 0),
    staleTime: 1000 * 30,
    placeholderData: previous => previous
  })
}
