import type { ProjectStatus } from '~/types'

interface StatusMeta {
  label: string
  color: 'success' | 'info' | 'warning' | 'primary' | 'neutral' | 'error'
  icon: string
}

const STATUS_META: Record<ProjectStatus, StatusMeta> = {
  'open': { label: 'Open for bids', color: 'success', icon: 'i-lucide-circle-dot' },
  'in-review': { label: 'In review', color: 'info', icon: 'i-lucide-search' },
  'awarded': { label: 'Awarded', color: 'primary', icon: 'i-lucide-award' },
  'in-progress': { label: 'In progress', color: 'warning', icon: 'i-lucide-hammer' },
  'completed': { label: 'Completed', color: 'neutral', icon: 'i-lucide-check-circle' },
  'closed': { label: 'Closed', color: 'error', icon: 'i-lucide-x-circle' }
}

export function useProjectStatus() {
  function meta(status: ProjectStatus): StatusMeta {
    return STATUS_META[status]
  }
  return { meta }
}
