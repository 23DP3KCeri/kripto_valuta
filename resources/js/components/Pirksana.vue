<template>
  <v-container max-width="520" class="py-8">
    <v-card class="pa-6" rounded="lg" elevation="6">

      <v-card-title class="text-h5 mb-4">
        <v-icon icon="mdi-cart" color="#188fdf" class="mr-2" />
        Kriptovalūtas pirkšana
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

        <!-- EUR input -->
        <v-text-field
          v-model="eurAmount"
          label="Daudzums EUR"
          suffix="EUR"
          variant="outlined"
          type="number"
          min="0"
          class="mb-2"
          :error-messages="amountError"
          @input="calculateCrypto"
        />

        <!-- Crypto result -->
        <v-text-field
          :model-value="cryptoAmount"
          :label="`Saņemsi ${selectedCrypto}`"
          :suffix="selectedCrypto"
          variant="outlined"
          readonly
          placeholder=" "
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
          Pirkt
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
      Darījums veiksmīgi iesniegts! <strong>{{ successData.eurAmount }} EUR</strong>
      → <strong>{{ successData.cryptoAmount }} {{ successData.crypto }}</strong> tiks nosūtīts.
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
const eurAmount = ref('')
const cryptoAmount = ref('0.00000000')
const iban = ref('')
const success = ref(false)
const successData = ref({})
const loading = ref(false)

const rate = computed(() => rates[selectedCrypto.value])

const amountError = computed(() =>
  eurAmount.value !== '' && parseFloat(eurAmount.value) <= 0 ? 'Daudzumam jābūt lielākam par 0' : ''
)

const ibanError = computed(() =>
  iban.value && !ibanRegex.test(iban.value.replace(/\s/g, '')) ? 'Lūdzu ievadi derīgu IBAN!' : ''
)

const isValid = computed(() =>
  parseFloat(eurAmount.value) > 0 && ibanRegex.test(iban.value.replace(/\s/g, ''))
)

function calculateCrypto() {
  const val = parseFloat(eurAmount.value)
  cryptoAmount.value = (isNaN(val) || val <= 0)
    ? '0.00000000'
    : (val / rate.value).toLocaleString('lv-LV', { minimumFractionDigits: 8, maximumFractionDigits: 8 })
}

watch(selectedCrypto, () => calculateCrypto())

function parseNum(str) {
  return parseFloat(String(str).replace(/\s/g, '').replace(',', '.')) || 0
}

async function submit() {
  if (!isValid.value || loading.value) return
  loading.value = true
  try {
    await addTransaction({ type: 'buy', crypto: selectedCrypto.value, amount: parseFloat(eurAmount.value), result: parseNum(cryptoAmount.value), iban: iban.value })
    successData.value = { eurAmount: eurAmount.value, cryptoAmount: cryptoAmount.value, crypto: selectedCrypto.value }
    success.value = true
    eurAmount.value = ''
    cryptoAmount.value = '0.00000000'
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
