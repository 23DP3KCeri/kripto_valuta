<template>
  <v-container max-width="520" class="py-8">
    <v-card class="pa-6" rounded="lg" elevation="6">

      <v-card-title class="text-h5 mb-4">
        <v-icon icon="mdi-swap-horizontal" color="#2e62f1" class="mr-2" />
        Kriptovalūtas apmaiņa
      </v-card-title>

      <v-card-text>

        <!-- From crypto selector -->
        <v-select
          v-model="fromCrypto"
          :items="cryptoOptions"
          item-title="label"
          item-value="symbol"
          label="No"
          variant="outlined"
          class="mb-2"
        />

        <!-- To crypto selector -->
        <v-select
          v-model="toCrypto"
          :items="toOptions"
          item-title="label"
          item-value="symbol"
          label="Uz"
          variant="outlined"
          class="mb-2"
        />

        <!-- Cross rate display -->
        <p class="text-caption text-medium-emphasis mb-4">
          Kurss: 1 {{ fromCrypto }} = {{ crossRate.toLocaleString('lv-LV', { minimumFractionDigits: 8, maximumFractionDigits: 8 }) }} {{ toCrypto }}
        </p>

        <!-- From amount input -->
        <v-text-field
          v-model="fromAmount"
          label="Daudzums"
          :suffix="fromCrypto"
          variant="outlined"
          type="number"
          min="0"
          class="mb-2"
          :error-messages="amountError"
          @input="calculateTo"
        />

        <!-- To amount result -->
        <v-text-field
          :model-value="toAmount"
          :label="`Saņemsi ${toCrypto}`"
          :suffix="toCrypto"
          variant="outlined"
          readonly
          class="mb-4"
          bg-color="surface-variant"
        />

        <!-- Submit -->
        <v-btn
          block
          variant="flat"
          class="gradient-btn"
          size="large"
          :disabled="!isValid || loading"
          :loading="loading"
          @click="submit"
        >
          Apmainīt
        </v-btn>

      </v-card-text>
    </v-card>

    <!-- Success alert -->
    <v-alert
      v-if="success"
      type="success"
      variant="tonal"
      class="mt-6"
      closable
      @click:close="success = false"
    >
      Darījums veiksmīgi iesniegts! <strong>{{ fromAmount }} {{ fromCrypto }}</strong>
      → <strong>{{ toAmount }} {{ toCrypto }}</strong>.
    </v-alert>

  </v-container>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useCryptoState } from '../composables/useCryptoState'

const { rates, transactions, addTransaction } = useCryptoState()

const cryptoOptions = [
  { symbol: 'BTC', label: 'Bitcoin (BTC)' },
  { symbol: 'ETH', label: 'Ethereum (ETH)' },
  { symbol: 'BNB', label: 'BNB (BNB)' },
  { symbol: 'SOL', label: 'Solana (SOL)' },
]

const fromCrypto = ref('BTC')
const toCrypto = ref('ETH')
const fromAmount = ref('')
const toAmount = ref('0.00000000')
const success = ref(false)
const loading = ref(false)

const amountError = computed(() =>
  fromAmount.value !== '' && parseFloat(fromAmount.value) <= 0 ? 'Daudzumam jābūt lielākam par 0' : ''
)

const isValid = computed(() => parseFloat(fromAmount.value) > 0)

const toOptions = computed(() => cryptoOptions.filter(o => o.symbol !== fromCrypto.value))

const crossRate = computed(() => rates[fromCrypto.value] / rates[toCrypto.value])

function calculateTo() {
  const val = parseFloat(fromAmount.value)
  toAmount.value = (isNaN(val) || val <= 0)
    ? '0.00000000'
    : (val * crossRate.value).toLocaleString('lv-LV', { minimumFractionDigits: 8, maximumFractionDigits: 8 })
}

watch([fromCrypto, toCrypto], () => {
  if (toCrypto.value === fromCrypto.value) {
    const other = cryptoOptions.find(o => o.symbol !== fromCrypto.value)
    toCrypto.value = other.symbol
  }
  calculateTo()
})

function submit() {
  if (!isValid.value || loading.value) return
  loading.value = true
  setTimeout(() => {
    addTransaction({ id: transactions.length + 1, type: 'exchange', fromCrypto: fromCrypto.value, toCrypto: toCrypto.value, amount: fromAmount.value, result: toAmount.value, date: new Date() })
    success.value = true
    fromAmount.value = ''
    toAmount.value = '0.00000000'
    loading.value = false
  }, 1000)
}
</script>

<style scoped>
.gradient-btn {
  background: linear-gradient(45deg, #188fdf, #2e62f1) !important;
  color: #ffffff !important;
  border-radius: 8px !important;
}
</style>
