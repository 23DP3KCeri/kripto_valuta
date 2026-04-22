<template>
  <v-container max-width="420" class="py-8">
    <v-card class="pa-6" rounded="lg" elevation="6">

      <v-card-title class="text-h5 mb-4">
        <v-icon icon="mdi-login" class="mr-2" />
        {{ t('login_title') }}
      </v-card-title>

      <v-card-text>
        <v-text-field
          v-model="email"
          :label="t('login_email')"
          variant="outlined"
          type="email"
          class="mb-3"
          :error-messages="emailError"
        />

        <v-text-field
          v-model="password"
          :label="t('login_password')"
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
          {{ t('login_btn') }}
        </v-btn>

        <p class="text-center mt-4 text-caption">
          {{ t('login_no_account') }}
          <router-link to="/register">{{ t('login_register_link') }}</router-link>
        </p>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import { useLang } from '../composables/useLang'

const { login } = useAuth()
const router = useRouter()
const { t } = useLang()

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const emailError = computed(() =>
  email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value) ? t('login_err_email') : ''
)

async function submit() {
  error.value = ''
  loading.value = true
  try {
    await login(email.value, password.value)
    router.push('/')
  } catch (e) {
    const msg = e?.message ?? ''
    error.value = msg.includes('Nepareizs') ? t('login_invalid') : (msg || t('login_err_failed'))
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
