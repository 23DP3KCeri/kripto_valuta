<template>
  <v-container max-width="520" class="py-8">
    <v-card class="pa-6" rounded="lg" elevation="6">

      <v-card-title class="text-h5 mb-4">
        <v-icon icon="mdi-bitcoin" color="#f7931a" class="mr-2" />
        Kriptovalūtas pārdošana
      </v-card-title>

      <v-card-text>

        <!-- Crypto selector -->
        <v-select
          v-model="selectedCrypto"
          :items="cryptoOptions"
          item-title="label"
          item-value="symbol"
          label="Izvēlies kriptovalūtu"
          variant="outlined"
          class="mb-2"
        />

        <!-- Current rate display -->
        <p class="text-caption text-medium-emphasis mb-4">
          Aktuālais kurss: 1 {{ selectedCrypto }} = {{ rate.toLocaleString() }} EUR
        </p>

        <!-- Amount input -->
        <v-text-field
          v-model="amount"
          label="Daudzums"
          :suffix="selectedCrypto"
          variant="outlined"
          type="number"
          min="0"
          class="mb-2"
          :error-messages="amountError"
          @input="calculateEur"
        />

        <!-- EUR result -->
        <v-text-field
          :model-value="eurAmount"
          label="Saņemsi EUR"
          suffix="EUR"
          variant="outlined"
          readonly
          class="mb-4"
          bg-color="surface-variant"
        />

        <!-- IBAN input -->
        <v-text-field
          v-model="iban"
          label="IBAN"
          placeholder="LV00BANK0000000000000"
          variant="outlined"
          class="mb-4"
          :error-messages="ibanError"
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
          Pārdot
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
      Darījums veiksmīgi iesniegts! <strong>{{ amount }} {{ selectedCrypto }}</strong>
      → <strong>{{ eurAmount }} EUR</strong> tiks pārskaitīts uz {{ iban }}.
    </v-alert>

  </v-container>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useCryptoState } from '../composables/useCryptoState'

const { rates, addTransaction } = useCryptoState()

const cryptoOptions = [
  { symbol: 'BTC', label: 'Bitcoin (BTC)' },
  { symbol: 'ETH', label: 'Ethereum (ETH)' },
  { symbol: 'BNB', label: 'BNB (BNB)' },
  { symbol: 'SOL', label: 'Solana (SOL)' },
]

const ibanRegex = /^[A-Z]{2}\d{2}[A-Z0-9]{1,30}$/

const selectedCrypto = ref('BTC')
const amount = ref('')
const eurAmount = ref('0.00')
const iban = ref('')
const success = ref(false)
const loading = ref(false)

const rate = computed(() => rates[selectedCrypto.value])

const amountError = computed(() =>
  amount.value !== '' && parseFloat(amount.value) <= 0 ? 'Daudzumam jābūt lielākam par 0' : ''
)

const ibanError = computed(() =>
  iban.value && !ibanRegex.test(iban.value.replace(/\s/g, '')) ? 'Lūdzu ievadi derīgu IBAN!' : ''
)

const isValid = computed(() =>
  parseFloat(amount.value) > 0 && ibanRegex.test(iban.value.replace(/\s/g, ''))
)

function calculateEur() {
  const val = parseFloat(amount.value)
  eurAmount.value = (isNaN(val) || val <= 0)
    ? '0.00'
    : (val * rate.value).toLocaleString('lv-LV', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

watch(selectedCrypto, () => calculateEur())

function parseNum(str) {
  return parseFloat(String(str).replace(/\s/g, '').replace(',', '.')) || 0
}

async function submit() {
  if (!isValid.value || loading.value) return
  loading.value = true
  try {
    await addTransaction({ type: 'sell', crypto: selectedCrypto.value, amount: parseFloat(amount.value), result: parseNum(eurAmount.value), iban: iban.value })
    success.value = true
    amount.value = ''
    eurAmount.value = '0.00'
    iban.value = ''
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.gradient-btn {
  background: linear-gradient(45deg, #188fdf, #2e62f1) !important;
  color: #ffffff !important;
  border-radius: 8px !important;
}
</style>
