<template>
  <v-container max-width="420" class="py-8">
    <v-card class="pa-6" rounded="lg" elevation="6">

      <v-card-title class="text-h5 mb-4">
        <v-icon icon="mdi-account-plus" class="mr-2" />
        {{ t('register_title') }}
      </v-card-title>

      <v-card-text>
        <v-text-field
          v-model="name"
          :label="t('register_name')"
          variant="outlined"
          class="mb-3"
        />

        <v-text-field
          v-model="email"
          :label="t('register_email')"
          variant="outlined"
          type="email"
          class="mb-3"
        />

        <v-text-field
          v-model="password"
          :label="t('register_password')"
          variant="outlined"
          type="password"
          class="mb-4"
          :error-messages="passwordError"
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
          {{ t('register_btn') }}
        </v-btn>

        <p class="text-center mt-4 text-caption">
          {{ t('register_has_account') }}
          <router-link to="/login">{{ t('register_login_link') }}</router-link>
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

const { register } = useAuth()
const router = useRouter()
const { t } = useLang()

const name = ref('')
const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const passwordError = computed(() =>
  password.value.length > 0 && password.value.length < 8 ? t('register_err_password') : ''
)

async function submit() {
  error.value = ''
  loading.value = true
  try {
    await register(name.value, email.value, password.value)
    router.push('/')
  } catch (e) {
    const msgs = e?.errors ? Object.values(e.errors).flat() : null
    error.value = msgs?.join(' ') ?? e?.message ?? t('register_err_failed')
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
