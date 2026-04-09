import { ref } from 'vue'

const user = ref(null)

const JSON_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
}

async function safeJson(res) {
  try { return await res.json() } catch { return {} }
}

export async function fetchUser() {
  const res = await fetch('/api/auth/user', {
    credentials: 'include',
    headers: { 'Accept': 'application/json' },
  })
  user.value = res.ok ? await safeJson(res) : null
}

export async function login(email, password) {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: JSON_HEADERS,
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  })
  const data = await safeJson(res)
  if (!res.ok) throw data
  await fetchUser()
}

export async function register(name, email, password) {
  const res = await fetch('/api/auth/register', {
    method: 'POST',
    headers: JSON_HEADERS,
    credentials: 'include',
    body: JSON.stringify({ name, email, password }),
  })
  const data = await safeJson(res)
  if (!res.ok) throw data
  await fetchUser()
}

export async function logout() {
  await fetch('/api/auth/logout', {
    method: 'POST',
    headers: { 'Accept': 'application/json' },
    credentials: 'include',
  })
  user.value = null
}

export function useAuth() {
  return { user, login, register, logout, fetchUser }
}
