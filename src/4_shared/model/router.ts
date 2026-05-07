import { createRouter } from '@tanstack/react-router'
import { routeTree } from '../../routeTree.gen'
import { queryClient } from './query-client'

export const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
})

declare module '@tanstack/react-router' {
  // eslint-disable-next-line ts/consistent-type-definitions
  interface Register {
    router: typeof router
  }
}
