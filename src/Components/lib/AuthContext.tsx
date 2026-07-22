import { useState, useEffect, type ReactNode } from 'react'
import type { User } from '../../types/index'

import { AuthContext, type AuthContextValue } from './AuthContextInstance'
import { loginRequest, meRequest, registerRequest } from '../../api/auth'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      setIsLoading(false)
      return
    }

    meRequest()
      .then((currentUser) => setUser(currentUser))
      .catch(() => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      })
      .finally(() => setIsLoading(false))
  }, [])

  async function login(email: string, password: string) {
    const { user: loggedInUser, token } = await loginRequest(email, password)
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(loggedInUser))
    setUser(loggedInUser)
  }

  async function register(
    name: string,
    email: string,
    password: string,
    image?: string
  ) {
    const { user: newUser, token } = await registerRequest(
      name,
      email,
      password,
      image
    )
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(newUser))
    setUser(newUser)
  }

  function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  const value: AuthContextValue = { user, isLoading, login, register, logout }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
