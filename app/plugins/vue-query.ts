import {
  QueryClient,
  VueQueryPlugin,
  hydrate,
  dehydrate,
  type DehydratedState,
  type VueQueryPluginOptions
} from '@tanstack/vue-query'

export default defineNuxtPlugin((nuxt) => {
  const vueQueryState = useState<DehydratedState | null>('vue-query')

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 30,
        refetchOnWindowFocus: false,
        retry: 1
      }
    }
  })

  const options: VueQueryPluginOptions = { queryClient }

  nuxt.vueApp.use(VueQueryPlugin, options)

  if (import.meta.server) {
    nuxt.hooks.hook('app:rendered', () => {
      vueQueryState.value = dehydrate(queryClient)
    })
  }

  if (import.meta.client) {
    hydrate(queryClient, vueQueryState.value)
  }
})
