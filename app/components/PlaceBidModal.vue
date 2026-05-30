<script setup lang="ts">
import type { Project } from '~/types'

const open = defineModel<boolean>('open', { required: true })

interface Props {
  project: Project | null
}

const props = defineProps<Props>()

const bidsStore = useBidsStore()
const toast = useToast()
const { formatCurrency, formatCompactCurrency } = useFormat()

const amount = ref<number | null>(null)
const notes = ref('')
const submitting = ref(false)
const touched = ref(false)

const minimumBid = computed(() => {
  if (!props.project) return 0
  return Math.round(props.project.budget * 0.5)
})

const recommendedBid = computed(() => {
  if (!props.project) return 0
  return Math.round(props.project.budget * 0.92)
})

const validationError = computed(() => {
  if (!touched.value) return null
  if (amount.value == null || Number.isNaN(amount.value)) return 'Enter a bid amount.'
  if (amount.value <= 0) return 'Amount must be greater than zero.'
  if (props.project && amount.value < minimumBid.value) {
    return `Bids must be at least ${formatCurrency(minimumBid.value)}.`
  }
  if (props.project && amount.value > props.project.budget * 1.5) {
    return 'Amount looks unusually high — please double-check.'
  }
  return null
})

const canSubmit = computed(() =>
  !!props.project
  && amount.value != null
  && amount.value >= minimumBid.value
  && amount.value <= (props.project?.budget ?? Infinity) * 1.5
)

function reset() {
  amount.value = null
  notes.value = ''
  touched.value = false
  submitting.value = false
}

function close() {
  open.value = false
}

watch(open, (next) => {
  if (next) {
    reset()
    nextTick(() => {
      amount.value = recommendedBid.value || null
    })
  }
})

async function onSubmit() {
  touched.value = true
  if (!props.project || !canSubmit.value || amount.value == null) return
  submitting.value = true
  await new Promise(resolve => setTimeout(resolve, 350))
  bidsStore.placeBid(props.project, amount.value, notes.value)
  submitting.value = false
  toast.add({
    title: 'Bid placed',
    description: `${formatCurrency(amount.value)} on ${props.project.title}`,
    icon: 'i-lucide-check-circle',
    color: 'success'
  })
  close()
}

function quickBid(percent: number) {
  if (!props.project) return
  amount.value = Math.round(props.project.budget * percent)
  touched.value = true
}
</script>

<template>
  <UModal
    v-model:open="open"
    :ui="{ content: 'sm:max-w-lg' }"
    :close="{ color: 'neutral', variant: 'ghost' }"
  >
    <template #content>
      <div
        v-if="project"
        class="flex flex-col"
      >
        <div class="p-5 sm:p-6 border-b border-default">
          <div class="flex items-start gap-3">
            <div :class="['shrink-0 grid place-items-center size-11 rounded-xl bg-gradient-to-br', project.coverColor]">
              <UIcon
                name="i-lucide-gavel"
                class="size-5 text-highlighted/80"
              />
            </div>
            <div class="min-w-0 flex-1">
              <p class="text-[11px] uppercase tracking-wide text-dimmed">
                Place a bid
              </p>
              <h2 class="text-base sm:text-lg font-semibold text-highlighted leading-snug">
                {{ project.title }}
              </h2>
              <p class="text-xs text-muted mt-0.5">
                {{ project.client }} · {{ project.location }}
              </p>
            </div>
          </div>

          <dl class="grid grid-cols-3 gap-2 mt-4">
            <div class="rounded-lg bg-elevated/60 px-3 py-2">
              <dt class="text-[10px] uppercase tracking-wide text-dimmed">
                Budget
              </dt>
              <dd class="text-sm font-semibold text-highlighted">
                {{ formatCompactCurrency(project.budget) }}
              </dd>
            </div>
            <div class="rounded-lg bg-elevated/60 px-3 py-2">
              <dt class="text-[10px] uppercase tracking-wide text-dimmed">
                Min bid
              </dt>
              <dd class="text-sm font-semibold text-highlighted">
                {{ formatCompactCurrency(minimumBid) }}
              </dd>
            </div>
            <div class="rounded-lg bg-elevated/60 px-3 py-2">
              <dt class="text-[10px] uppercase tracking-wide text-dimmed">
                Bids
              </dt>
              <dd class="text-sm font-semibold text-highlighted">
                {{ project.bidsCount }}
              </dd>
            </div>
          </dl>
        </div>

        <form
          class="p-5 sm:p-6 space-y-4"
          @submit.prevent="onSubmit"
        >
          <UFormField
            label="Bid amount"
            required
            :error="validationError ?? undefined"
            :help="!validationError ? 'Recommended around ' + formatCurrency(recommendedBid) : undefined"
          >
            <UInputNumber
              v-model="amount"
              :min="0"
              :step="1000"
              placeholder="Enter your bid"
              size="lg"
              :format-options="{
                style: 'currency',
                currency: 'USD',
                currencyDisplay: 'symbol',
                maximumFractionDigits: 0
              }"
              :ui="{ base: 'w-full' }"
              @blur="touched = true"
            />
          </UFormField>

          <div class="flex flex-wrap gap-1.5">
            <UButton
              v-for="p in [0.6, 0.75, 0.9, 1]"
              :key="p"
              type="button"
              size="xs"
              color="neutral"
              variant="soft"
              @click="quickBid(p)"
            >
              {{ Math.round(p * 100) }}% · {{ formatCompactCurrency(Math.round(project.budget * p)) }}
            </UButton>
          </div>

          <UFormField
            label="Notes"
            hint="Optional"
          >
            <UTextarea
              v-model="notes"
              placeholder="Mention timeline, scope assumptions, materials, etc."
              :rows="3"
              :maxlength="500"
              class="w-full"
              :ui="{ base: 'w-full' }"
            />
            <template #help>
              <span class="text-[11px] text-dimmed">{{ notes.length }}/500</span>
            </template>
          </UFormField>

          <div class="flex items-center justify-end gap-2 pt-2 border-t border-default">
            <UButton
              type="button"
              color="neutral"
              variant="ghost"
              @click="close"
            >
              Cancel
            </UButton>
            <UButton
              type="submit"
              color="primary"
              icon="i-lucide-gavel"
              :loading="submitting"
              :disabled="!canSubmit"
            >
              Submit bid
            </UButton>
          </div>
        </form>
      </div>
    </template>
  </UModal>
</template>
