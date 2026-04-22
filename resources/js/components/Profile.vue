<template>
  <v-container max-width="520" class="py-8">
    <v-card class="pa-6" rounded="lg" elevation="6">

      <v-card-title class="text-h5 mb-2">
        <v-icon icon="mdi-account-circle-outline" class="mr-2" />
        {{ user.name }}
      </v-card-title>

      <v-card-subtitle class="mb-4">{{ user.email }}</v-card-subtitle>

      <v-card-text>

        <p class="text-subtitle-2 mb-2">{{ t('profile_wallets') }}</p>

        <div v-if="wallets.length === 0" class="text-medium-emphasis mb-4">
          {{ t('profile_no_wallets') }}
        </div>

        <v-table v-else class="mb-4">
          <thead>
            <tr>
              <th>{{ t('profile_crypto') }}</th>
              <th>{{ t('profile_balance') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="w in wallets" :key="w.id">
              <td>{{ w.crypto }}</td>
              <td>{{ parseFloat(w.balance).toFixed(8) }}</td>
            </tr>
          </tbody>
        </v-table>

        <v-btn variant="flat" class="gradient-btn" to="/vesture">
          <v-icon icon="mdi-history" class="mr-1" /> {{ t('profile_history_btn') }}
        </v-btn>

      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuth } from '../composables/useAuth'
import { useLang } from '../composables/useLang'

const { user } = useAuth()
const { t } = useLang()
const wallets = ref([])

onMounted(async () => {
  const res = await fetch('/api/wallets', { credentials: 'include' })
  if (res.ok) wallets.value = await res.json()
})
</script>

<style scoped>
.gradient-btn {
  background: linear-gradient(45deg, #188fdf, #2e62f1) !important;
  color: #ffffff !important;
  border-radius: 8px !important;
}
</style>
