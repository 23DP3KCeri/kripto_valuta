<template>
  <v-container class="py-8">
    <v-card class="pa-6" rounded="lg" elevation="6">

      <v-card-title class="text-h5 mb-4">
        <v-icon icon="mdi-history" class="mr-2" />
        {{ t('history_title') }}
      </v-card-title>

      <v-card-text>

        <!-- Filters -->
        <v-row class="mb-4">
          <v-col cols="12" sm="3">
            <v-text-field
              v-model="searchId"
              :label="t('filter_search_id')"
              variant="outlined"
              density="compact"
              clearable
              hide-details
            />
          </v-col>
          <v-col cols="12" sm="3">
            <v-select
              v-model="filterType"
              :items="typeOptions"
              item-title="title"
              item-value="value"
              :label="t('filter_type')"
              variant="outlined"
              density="compact"
              hide-details
            />
          </v-col>
          <v-col cols="12" sm="3">
            <v-select
              v-model="filterCrypto"
              :items="cryptoFilterOptions"
              item-title="title"
              item-value="value"
              :label="t('filter_crypto')"
              variant="outlined"
              density="compact"
              hide-details
            />
          </v-col>
          <v-col cols="12" sm="3">
            <v-select
              v-model="sortBy"
              :items="sortOptions"
              item-title="title"
              item-value="value"
              :label="t('filter_sort')"
              variant="outlined"
              density="compact"
              hide-details
            />
          </v-col>
        </v-row>

        <!-- Table -->
        <div v-if="transactions.length === 0" class="text-center py-8">
          <v-icon icon="mdi-history" size="56" class="mb-3 text-medium-emphasis" />
          <p class="text-medium-emphasis">{{ t('history_empty') }}</p>
        </div>

        <template v-else>
          <v-table v-if="filtered.length">
            <thead>
              <tr>
                <th>{{ t('col_id') }}</th>
                <th>{{ t('col_type') }}</th>
                <th>{{ t('col_crypto') }}</th>
                <th>{{ t('col_amount') }}</th>
                <th>{{ t('col_result') }}</th>
                <th>{{ t('col_date') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="tx in filtered" :key="tx.id">
                <td>{{ tx.id }}</td>
                <td>{{ tx.type }}</td>
                <td>{{ tx.type === 'exchange' ? `${tx.from_crypto} → ${tx.to_crypto}` : tx.crypto }}</td>
                <td>{{ tx.amount }}</td>
                <td>{{ tx.result }}</td>
                <td>{{ new Date(tx.created_at).toLocaleString('lv-LV') }}</td>
              </tr>
            </tbody>
          </v-table>

          <p v-else class="text-medium-emphasis text-center mt-4">{{ t('history_no_results') }}</p>
        </template>

      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useCryptoState } from '../composables/useCryptoState'
import { useLang } from '../composables/useLang'

const { transactions, fetchTransactions } = useCryptoState()
const { t } = useLang()

onMounted(fetchTransactions)

const searchId = ref('')
const filterType = ref(null)
const filterCrypto = ref(null)
const sortBy = ref('date-desc')

const typeOptions = computed(() => [
  { title: t('filter_all'), value: null },
  { title: 'buy', value: 'buy' },
  { title: 'sell', value: 'sell' },
  { title: 'exchange', value: 'exchange' },
])

const cryptoFilterOptions = computed(() => [
  { title: t('filter_all'), value: null },
  ...['BTC', 'ETH', 'BNB', 'SOL'].map(c => ({ title: c, value: c })),
])

const sortOptions = computed(() => [
  { title: t('sort_date_desc'), value: 'date-desc' },
  { title: t('sort_date_asc'), value: 'date-asc' },
  { title: t('sort_amount_desc'), value: 'amount-desc' },
  { title: t('sort_amount_asc'), value: 'amount-asc' },
])

function parseAmount(val) {
  return parseFloat(String(val).replace(/\s/g, '').replace(',', '.')) || 0
}

const filtered = computed(() => {
  let list = [...transactions]

  if (searchId.value) {
    list = list.filter(tx => String(tx.id).includes(searchId.value.trim()))
  }

  if (filterType.value !== null) {
    list = list.filter(tx => tx.type === filterType.value)
  }

  if (filterCrypto.value !== null) {
    list = list.filter(tx =>
      tx.crypto === filterCrypto.value ||
      tx.from_crypto === filterCrypto.value ||
      tx.to_crypto === filterCrypto.value
    )
  }

  list.sort((a, b) => {
    if (sortBy.value === 'date-desc') return new Date(b.created_at) - new Date(a.created_at)
    if (sortBy.value === 'date-asc') return new Date(a.created_at) - new Date(b.created_at)
    if (sortBy.value === 'amount-desc') return parseAmount(b.amount) - parseAmount(a.amount)
    if (sortBy.value === 'amount-asc') return parseAmount(a.amount) - parseAmount(b.amount)
    return 0
  })

  return list
})
</script>
