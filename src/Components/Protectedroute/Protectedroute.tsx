import { type ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../lib/useAuth'
import Loading from '../Loader/Loading'

interface ProtectedRouteProps {
  children: ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth()
  const location = useLocation()


  if (isLoading) {
    return <Loading/>
  }


  if (!user) {
    return <Navigate to="/auth/register" replace state={{ from: location }} />
  }

  return <>{children}</>
}

export default ProtectedRoute
