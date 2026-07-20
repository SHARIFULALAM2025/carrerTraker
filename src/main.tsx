import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './Components/Router/Router.tsx'
import Loader from './Components/Loader/Loader.tsx'
import { AuthProvider } from './Components/lib/AuthContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Loader>
      <AuthProvider>
        <RouterProvider router={router} />,
      </AuthProvider>
    </Loader>
  </StrictMode>
)
