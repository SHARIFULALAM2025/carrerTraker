import { createContext } from 'react'

export interface AuthUser {
  id: string
  name: string
  email: string
  image?: string | null
}

export interface AuthContextValue {
  user: AuthUser | null
  isPending: boolean
  register: (name: string, email: string, password: string) => Promise<void>
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
)
