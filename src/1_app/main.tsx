import ReactDOM from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'
import { Toaster } from '@/shared/ui/sonner'
import { queryClient } from '@/shared/model/query-client'
import { router } from '@/shared/model/router'
import { QueryClientProvider } from '@tanstack/react-query'

const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster />
    </QueryClientProvider>,
  )
}
