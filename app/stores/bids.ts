import { defineStore } from 'pinia'
import type { Bid, Project } from '~/types'

export const useBidsStore = defineStore('bids', () => {
  const bids = ref<Bid[]>([])

  const totalBids = computed(() => bids.value.length)

  const totalAmount = computed(() =>
    bids.value.reduce((sum, bid) => sum + bid.amount, 0)
  )

  const byProjectId = computed(() => {
    const map = new Map<string, Bid[]>()
    for (const bid of bids.value) {
      const list = map.get(bid.projectId) ?? []
      list.push(bid)
      map.set(bid.projectId, list)
    }
    return map
  })

  function bidsForProject(projectId: string): Bid[] {
    return byProjectId.value.get(projectId) ?? []
  }

  function placeBid(project: Pick<Project, 'id' | 'title'>, amount: number, notes?: string): Bid {
    const bid: Bid = {
      id: `bid_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`,
      projectId: project.id,
      projectTitle: project.title,
      amount,
      notes: notes?.trim() ? notes.trim() : undefined,
      createdAt: new Date().toISOString()
    }
    bids.value = [bid, ...bids.value]
    return bid
  }

  function removeBid(id: string) {
    bids.value = bids.value.filter(b => b.id !== id)
  }

  function clearAll() {
    bids.value = []
  }

  return {
    bids,
    totalBids,
    totalAmount,
    bidsForProject,
    placeBid,
    removeBid,
    clearAll
  }
})
