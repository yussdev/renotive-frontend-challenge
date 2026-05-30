<script setup lang="ts">
import type { ProjectStatus } from '~/types'

interface Props {
  status: ProjectStatus
  size?: 'sm' | 'md'
}

const props = withDefaults(defineProps<Props>(), { size: 'sm' })
const { meta } = useProjectStatus()
const data = computed(() => meta(props.status))
</script>

<template>
  <UBadge
    :color="data.color"
    variant="soft"
    :size="props.size"
    :icon="data.icon"
  >
    {{ data.label }}
  </UBadge>
</template>
