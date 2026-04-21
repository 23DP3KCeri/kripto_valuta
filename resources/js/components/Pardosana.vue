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
          placeholder=" "
          class="mb-4"
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
      Darījums veiksmīgi iesniegts! <strong>{{ successData.amount }} {{ successData.crypto }}</strong>
      → <strong>{{ successData.eurAmount }} EUR</strong> tiks pārskaitīts uz {{ successData.iban }}.
    </v-alert>

    <!-- Error alert -->
    <v-alert
      v-if="submitError"
      type="error"
      variant="tonal"
      class="mt-6"
      closable
      @click:close="submitError = ''"
    >
      {{ submitError }}
    </v-alert>

  </v-container>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useCryptoState } from '../composables/useCryptoState'

const { rates, addTransaction, wallets, fetchWallets } = useCryptoState()

onMounted(() => fetchWallets())

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
const successData = ref({})
const loading = ref(false)
const submitError = ref('')

const rate = computed(() => rates[selectedCrypto.value])
const balance = computed(() => wallets[selectedCrypto.value] ?? 0)

const amountError = computed(() => {
  const val = parseFloat(amount.value)
  if (amount.value !== '' && val <= 0) return 'Daudzumam jābūt lielākam par 0'
  if (amount.value !== '' && val > balance.value) return 'Nepietiek līdzekļu'
  return ''
})

const ibanError = computed(() =>
  iban.value && !ibanRegex.test(iban.value.replace(/\s/g, '')) ? 'Lūdzu ievadi derīgu IBAN!' : ''
)

const isValid = computed(() => {
  const val = parseFloat(amount.value)
  return val > 0 && val <= balance.value && ibanRegex.test(iban.value.replace(/\s/g, ''))
})

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
  submitError.value = ''
  try {
    await addTransaction({ type: 'sell', crypto: selectedCrypto.value, amount: parseFloat(amount.value), result: parseNum(eurAmount.value), iban: iban.value })
    successData.value = { amount: amount.value, crypto: selectedCrypto.value, eurAmount: eurAmount.value, iban: iban.value }
    success.value = true
    amount.value = ''
    eurAmount.value = '0.00'
    iban.value = ''
  } catch (e) {
    submitError.value = e?.message ?? 'Kļūda! Lūdzu mēģini vēlreiz.'
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
