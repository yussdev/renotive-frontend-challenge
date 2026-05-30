import type { Ref } from 'vue'

/**
 * Returns a readonly ref whose value lags behind `source` by `delay` ms.
 * Useful for typeahead search inputs where we want UI bindings to be
 * instant but downstream queries to be debounced.
 */
export function useDebouncedRef<T>(source: Ref<T>, delay = 250): Readonly<Ref<T>> {
  const debounced = ref(source.value) as Ref<T>
  let timer: ReturnType<typeof setTimeout> | null = null

  watch(source, (value) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      debounced.value = value
    }, delay)
  })

  onScopeDispose(() => {
    if (timer) clearTimeout(timer)
  })

  return readonly(debounced) as Readonly<Ref<T>>
}
