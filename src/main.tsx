import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './Components/Router/Router.tsx'
import Loader from './Components/Loader/Loader.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Loader>
      <RouterProvider router={router} />,
    </Loader>
  </StrictMode>
)
