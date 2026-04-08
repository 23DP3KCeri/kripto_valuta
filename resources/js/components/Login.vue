<template>
  <v-container max-width="420" class="py-8">
    <v-card class="pa-6" rounded="lg" elevation="6">

      <v-card-title class="text-h5 mb-4">
        <v-icon icon="mdi-login" class="mr-2" />
        Pieslēgties
      </v-card-title>

      <v-card-text>
        <v-text-field
          v-model="email"
          label="E-pasts"
          variant="outlined"
          type="email"
          class="mb-3"
        />

        <v-text-field
          v-model="password"
          label="Parole"
          variant="outlined"
          type="password"
          class="mb-4"
        />

        <v-alert v-if="error" type="error" variant="tonal" class="mb-4">
          {{ error }}
        </v-alert>

        <v-btn
          block
          variant="flat"
          class="gradient-btn"
          size="large"
          :loading="loading"
          @click="submit"
        >
          Pieslēgties
        </v-btn>

        <p class="text-center mt-4 text-caption">
          Nav konta?
          <router-link to="/register">Reģistrēties</router-link>
        </p>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const { login } = useAuth()
const router = useRouter()

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

async function submit() {
  error.value = ''
  loading.value = true
  try {
    await login(email.value, password.value)
    router.push('/')
  } catch (e) {
    error.value = e?.message ?? 'Pieslēgšanās neizdevās.'
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
