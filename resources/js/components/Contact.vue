<template>
  <v-container max-width="520" class="py-8">
    <v-card class="pa-6" rounded="lg" elevation="6">

      <v-card-title class="text-h5 mb-4">
        <v-icon icon="mdi-headset" class="mr-2" />
        {{ t('contact_title') }}
      </v-card-title>

      <v-card-text>
        <v-list lines="two">
          <v-list-item
            prepend-icon="mdi-email-outline"
            :title="t('contact_email_label')"
            subtitle="support@cryptobridge.com"
          />
          <v-list-item
            prepend-icon="mdi-phone-outline"
            :title="t('contact_phone_label')"
            subtitle="+37100000000"
          />
          <v-list-item
            prepend-icon="mdi-send-outline"
            title="Telegram"
            subtitle="@cryptobridge_support"
          />
        </v-list>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { useLang } from '../composables/useLang'
const { t } = useLang()
</script>
