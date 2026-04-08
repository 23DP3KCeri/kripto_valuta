import { reactive } from 'vue'
import { useAuth } from './useAuth'

const rates = reactive({
  BTC: 85000,
  ETH: 2000,
  BNB: 300,
  SOL: 130,
})

const transactions = reactive([])

let intervalStarted = false

function startRateUpdates() {
  if (intervalStarted) return
  intervalStarted = true
  setInterval(() => {
    for (const key in rates) {
      const factor = 1 + (Math.random() * 0.04 - 0.02)
      rates[key] = Math.max(0.0001, rates[key] * factor)
    }
  }, 3000)
}

startRateUpdates()

async function fetchTransactions() {
  const res = await fetch('/api/transactions', { credentials: 'include' })
  if (!res.ok) return
  const data = await res.json()
  transactions.splice(0, transactions.length, ...data)
}

async function addTransaction(payload) {
  const { user } = useAuth()
  const res = await fetch('/api/transactions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ user_id: user.value?.id, ...payload }),
  })
  const tx = await res.json()
  transactions.push(tx)
  return tx
}

export function useCryptoState() {
  return { rates, transactions, addTransaction, fetchTransactions }
}
