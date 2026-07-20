import { createAuthClient } from 'better-auth/react'

// better-auth ব্যাকএন্ড সার্ভারের বেস URL — .env এ VITE_API_URL সেট করো
// (e.g. VITE_API_URL=http://localhost:5000)
export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_API_URL,
})
