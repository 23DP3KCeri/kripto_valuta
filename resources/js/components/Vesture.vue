<template>
  <v-container class="py-8">
    <v-card class="pa-6" rounded="lg" elevation="6">

      <v-card-title class="text-h5 mb-4">
        <v-icon icon="mdi-history" class="mr-2" />
        Darījumu vēsture
      </v-card-title>

      <v-card-text>

        <!-- Filters -->
        <v-row class="mb-4">
          <v-col cols="12" sm="3">
            <v-text-field
              v-model="searchId"
              label="Meklēt pēc ID"
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
              label="Tips"
              variant="outlined"
              density="compact"
              hide-details
            />
          </v-col>
          <v-col cols="12" sm="3">
            <v-select
              v-model="filterCrypto"
              :items="cryptoFilterOptions"
              label="Kriptovalūta"
              variant="outlined"
              density="compact"
              hide-details
            />
          </v-col>
          <v-col cols="12" sm="3">
            <v-select
              v-model="sortBy"
              :items="sortOptions"
              label="Kārtot pēc"
              variant="outlined"
              density="compact"
              hide-details
            />
          </v-col>
        </v-row>

        <!-- Table -->
        <div v-if="transactions.length === 0" class="text-center py-8">
          <v-icon icon="mdi-history" size="56" class="mb-3 text-medium-emphasis" />
          <p class="text-medium-emphasis">Vēl nav neviena darījuma.</p>
        </div>

        <template v-else>
          <v-table v-if="filtered.length">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tips</th>
                <th>Kriptovalūta</th>
                <th>Daudzums</th>
                <th>Rezultāts</th>
                <th>Datums</th>
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

          <p v-else class="text-medium-emphasis text-center mt-4">Nav atbilstošu darījumu.</p>
        </template>

      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useCryptoState } from '../composables/useCryptoState'

const { transactions, fetchTransactions } = useCryptoState()

onMounted(fetchTransactions)

const searchId = ref('')
const filterType = ref('Visi')
const filterCrypto = ref('Visi')
const sortBy = ref('date-desc')

const typeOptions = ['Visi', 'buy', 'sell', 'exchange']
const cryptoFilterOptions = ['Visi', 'BTC', 'ETH', 'BNB', 'SOL']
const sortOptions = [
  { title: 'Datums: jaunākie', value: 'date-desc' },
  { title: 'Datums: vecākie', value: 'date-asc' },
  { title: 'Daudzums: dilstošs', value: 'amount-desc' },
  { title: 'Daudzums: augošs', value: 'amount-asc' },
]

function parseAmount(val) {
  return parseFloat(String(val).replace(/\s/g, '').replace(',', '.')) || 0
}

const filtered = computed(() => {
  let list = [...transactions]

  if (searchId.value) {
    list = list.filter(tx => String(tx.id).includes(searchId.value.trim()))
  }

  if (filterType.value !== 'Visi') {
    list = list.filter(tx => tx.type === filterType.value)
  }

  if (filterCrypto.value !== 'Visi') {
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
