import { reactive } from 'vue'

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
  const res = await fetch('/api/transactions')
  const data = await res.json()
  transactions.splice(0, transactions.length, ...data)
}

async function addTransaction(payload) {
  const res = await fetch('/api/transactions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id: 1, ...payload }),
  })
  const tx = await res.json()
  transactions.push(tx)
  return tx
}

fetchTransactions()

export function useCryptoState() {
  return { rates, transactions, addTransaction }
}
