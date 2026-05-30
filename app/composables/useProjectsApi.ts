import { mockProjects } from '~/data/projects'
import type { Project, ProjectsPage } from '~/types'

const PAGE_SIZE = 6
const NETWORK_DELAY_MS = 450
const SEARCH_DELAY_MS = 220

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function matchesQuery(project: Project, query: string): boolean {
  const q = query.trim().toLowerCase()
  if (!q) return true
  return (
    project.title.toLowerCase().includes(q)
    || project.category.toLowerCase().includes(q)
    || project.location.toLowerCase().includes(q)
    || project.client.toLowerCase().includes(q)
    || project.description.toLowerCase().includes(q)
  )
}

/**
 * Simulated paginated projects endpoint backed by the in-memory mock dataset.
 * The shape is intentionally close to what a REST endpoint would return so
 * swapping in a real backend later only requires replacing this function.
 */
export async function fetchProjectsPage(params: {
  cursor?: number
  pageSize?: number
}): Promise<ProjectsPage> {
  const cursor = params.cursor ?? 0
  const pageSize = params.pageSize ?? PAGE_SIZE
  await delay(NETWORK_DELAY_MS)

  const slice = mockProjects.slice(cursor, cursor + pageSize)
  const nextCursor = cursor + pageSize < mockProjects.length ? cursor + pageSize : null

  return {
    items: slice,
    nextCursor,
    total: mockProjects.length
  }
}

/**
 * Simulated search endpoint. Returns the top `limit` matching projects.
 */
export async function searchProjects(query: string, limit = 8): Promise<Project[]> {
  await delay(SEARCH_DELAY_MS)
  const trimmed = query.trim()
  if (!trimmed) return []
  return mockProjects.filter(p => matchesQuery(p, trimmed)).slice(0, limit)
}

export const PROJECTS_PAGE_SIZE = PAGE_SIZE
