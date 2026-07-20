import { useMemo, type ReactNode } from 'react'

//import { AuthContext, type AuthContextValue } from './AuthContextInstance'
import { authClient } from './Authclient'
import { AuthContext, type AuthContextValue } from './Authcontextinstance'

export function AuthProvider({ children }: { children: ReactNode }) {
  // better-auth এর নিজস্ব রিয়্যাক্টিভ সেশন হুক — session বদলালে
  // (login/logout/expire) স্বয়ংক্রিয়ভাবে রি-রেন্ডার করবে
  const { data: session, isPending } = authClient.useSession()

  const register = async (name: string, email: string, password: string) => {
    const { error } = await authClient.signUp.email({ name, email, password })
    if (error) {
      throw new Error(error.message || 'Registration failed. Please try again.')
    }
  }

  const login = async (email: string, password: string) => {
    const { error } = await authClient.signIn.email({ email, password })
    if (error) {
      throw new Error(error.message || 'Login failed. Please try again.')
    }
  }

  const logout = async () => {
    await authClient.signOut()
  }

  const value = useMemo<AuthContextValue>(
    () => ({
      user: session?.user ?? null,
      isPending,
      register,
      login,
      logout,
    }),

    [session, isPending]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
