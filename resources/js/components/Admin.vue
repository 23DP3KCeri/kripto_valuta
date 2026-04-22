<template>
  <v-container class="py-8">

    <!-- Transactions -->
    <v-card class="pa-6 mb-6" rounded="lg" elevation="6">

      <v-card-title class="text-h5 mb-4">
        <v-icon icon="mdi-shield-account" class="mr-2" />
        {{ t('admin_tx_title') }}
      </v-card-title>

      <v-card-text>
        <v-row class="mb-4">
          <v-col cols="12" sm="3">
            <v-text-field v-model="searchId" :label="t('filter_search_id')" variant="outlined" density="compact" clearable hide-details />
          </v-col>
          <v-col cols="12" sm="3">
            <v-select v-model="filterType" :items="typeOptions" item-title="title" item-value="value" :label="t('filter_type')" variant="outlined" density="compact" hide-details />
          </v-col>
          <v-col cols="12" sm="3">
            <v-select v-model="filterCrypto" :items="cryptoFilterOptions" item-title="title" item-value="value" :label="t('filter_crypto')" variant="outlined" density="compact" hide-details />
          </v-col>
          <v-col cols="12" sm="3">
            <v-select v-model="sortBy" :items="sortOptions" item-title="title" item-value="value" :label="t('filter_sort')" variant="outlined" density="compact" hide-details />
          </v-col>
        </v-row>

        <div v-if="transactions.length === 0" class="text-center py-8">
          <v-icon icon="mdi-history" size="56" class="mb-3 text-medium-emphasis" />
          <p class="text-medium-emphasis">{{ t('history_empty') }}</p>
        </div>

        <template v-else>
          <v-table v-if="filtered.length">
            <thead>
              <tr>
                <th>{{ t('col_id') }}</th>
                <th>{{ t('col_user') }}</th>
                <th>{{ t('col_type') }}</th>
                <th>{{ t('col_crypto') }}</th>
                <th>{{ t('col_amount') }}</th>
                <th>{{ t('col_result') }}</th>
                <th>{{ t('col_date') }}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="tx in filtered" :key="tx.id">
                <td>{{ tx.id }}</td>
                <td>{{ tx.user_id }}</td>
                <td>{{ tx.type }}</td>
                <td>{{ tx.type === 'exchange' ? `${tx.from_crypto} → ${tx.to_crypto}` : tx.crypto }}</td>
                <td>{{ tx.amount }}</td>
                <td>{{ tx.result }}</td>
                <td>{{ new Date(tx.created_at).toLocaleString('lv-LV') }}</td>
                <td>
                  <v-btn icon size="small" variant="text" color="error" @click="deleteTransaction(tx.id)">
                    <v-icon icon="mdi-delete-outline" />
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </v-table>
          <p v-else class="text-medium-emphasis text-center mt-4">{{ t('history_no_results') }}</p>
        </template>
      </v-card-text>
    </v-card>

    <!-- Users -->
    <v-card class="pa-6" rounded="lg" elevation="6">
      <v-card-title class="text-h5 mb-4">
        <v-icon icon="mdi-account-group" class="mr-2" />
        {{ t('admin_users_title') }}
      </v-card-title>

      <v-card-text>
        <v-table v-if="users.length">
          <thead>
            <tr>
              <th>{{ t('col_id') }}</th>
              <th>{{ t('col_name') }}</th>
              <th>{{ t('col_email') }}</th>
              <th>{{ t('col_role') }}</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="u in users" :key="u.id">
              <td>{{ u.id }}</td>
              <td>{{ u.name }}</td>
              <td>{{ u.email }}</td>
              <td>{{ u.role }}</td>
              <td>
                <v-btn
                  v-if="u.role !== 'admin' && u.id !== currentUser.id"
                  icon size="small" variant="text" color="primary"
                  :title="t('admin_promote_title')"
                  class="mr-1"
                  @click="promoteUser(u.id)"
                >
                  <v-icon icon="mdi-shield-plus-outline" />
                </v-btn>
                <v-btn
                  v-if="u.role !== 'admin' && u.id !== currentUser.id"
                  icon size="small" variant="text" color="error"
                  :title="t('admin_delete_title')"
                  @click="deleteUser(u.id)"
                >
                  <v-icon icon="mdi-delete-outline" />
                </v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
        <p v-else class="text-medium-emphasis text-center mt-4">{{ t('admin_no_users') }}</p>
      </v-card-text>
    </v-card>

  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuth } from '../composables/useAuth'
import { useLang } from '../composables/useLang'

const { user: currentUser } = useAuth()
const { t } = useLang()

const transactions = ref([])
const users = ref([])

onMounted(async () => {
  const [txRes, usrRes] = await Promise.all([
    fetch('/api/transactions', { credentials: 'include' }),
    fetch('/api/users', { credentials: 'include' }),
  ])
  if (txRes.ok) transactions.value = await txRes.json()
  if (usrRes.ok) users.value = await usrRes.json()
})

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
  let list = [...transactions.value]
  if (searchId.value) list = list.filter(tx => String(tx.id).includes(searchId.value.trim()))
  if (filterType.value !== null) list = list.filter(tx => tx.type === filterType.value)
  if (filterCrypto.value !== null) list = list.filter(tx =>
    tx.crypto === filterCrypto.value || tx.from_crypto === filterCrypto.value || tx.to_crypto === filterCrypto.value
  )
  list.sort((a, b) => {
    if (sortBy.value === 'date-desc') return new Date(b.created_at) - new Date(a.created_at)
    if (sortBy.value === 'date-asc') return new Date(a.created_at) - new Date(b.created_at)
    if (sortBy.value === 'amount-desc') return parseAmount(b.amount) - parseAmount(a.amount)
    if (sortBy.value === 'amount-asc') return parseAmount(a.amount) - parseAmount(b.amount)
    return 0
  })
  return list
})

async function deleteTransaction(id) {
  await fetch(`/api/transactions/${id}`, { method: 'DELETE', credentials: 'include' })
  transactions.value = transactions.value.filter(tx => tx.id !== id)
}

async function deleteUser(id) {
  await fetch(`/api/users/${id}`, { method: 'DELETE', credentials: 'include' })
  users.value = users.value.filter(u => u.id !== id)
}

async function promoteUser(id) {
  const res = await fetch(`/api/users/${id}/promote`, { method: 'PATCH', credentials: 'include' })
  if (res.ok) {
    const updated = await res.json()
    const idx = users.value.findIndex(u => u.id === id)
    if (idx !== -1) users.value[idx] = updated
  }
}
</script>
