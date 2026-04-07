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

function addTransaction(tx) {
  transactions.push(tx)
}

export function useCryptoState() {
  return { rates, transactions, addTransaction }
}
