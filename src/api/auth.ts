import type { User } from "../types"
import { apiClient } from "./client"


interface AuthResponse {
  user: User
  token: string
}

export async function registerRequest(
  name: string,
  email: string,
  password: string,
  image?: string
) {
  const { data } = await apiClient.post<AuthResponse>('/auth/register', {
    name,
    email,
    password,
    image,
  })
  return data
}

export async function loginRequest(email: string, password: string) {
  const { data } = await apiClient.post<AuthResponse>('/auth/login', {
    email,
    password,
  })
  return data
}

export async function meRequest() {
  const { data } = await apiClient.get<{ user: User }>('/auth/me')
  return data.user
}
