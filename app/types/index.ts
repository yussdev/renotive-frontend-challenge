export type Theme = 'light' | 'dark' | 'system'
export type ViewMode = 'grid' | 'list'
export type SidebarState = 'expanded' | 'collapsed'

export type ProjectStatus =
  | 'open'
  | 'in-review'
  | 'awarded'
  | 'in-progress'
  | 'completed'
  | 'closed'

export type ProjectCategory =
  | 'Residential'
  | 'Commercial'
  | 'Industrial'
  | 'Infrastructure'
  | 'Renovation'
  | 'Landscaping'
  | 'Interior'
  | 'Roofing'

export interface Project {
  id: string
  title: string
  description: string
  category: ProjectCategory
  status: ProjectStatus
  budget: number
  currency: 'USD'
  location: string
  client: string
  bidsCount: number
  deadline: string
  postedAt: string
  coverColor: string
}

export interface Bid {
  id: string
  projectId: string
  projectTitle: string
  amount: number
  notes?: string
  createdAt: string
}

export interface ProjectsPage {
  items: Project[]
  nextCursor: number | null
  total: number
}
