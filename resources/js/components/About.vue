<template>
  <v-container max-width="720" class="py-8">
    <v-card class="pa-6" rounded="lg" elevation="6">

      <v-card-title class="text-h5 mb-4">
        <v-icon icon="mdi-information-outline" class="mr-2" />
        {{ t('about_title') }}
      </v-card-title>

      <v-card-text>
        <p class="mb-6">{{ t('about_intro') }}</p>

        <v-divider class="mb-4" />

        <div class="mb-4">
          <p class="text-subtitle-1 font-weight-bold mb-1">
            <v-icon icon="mdi-cart" size="18" class="mr-1" /> {{ t('about_buy_title') }}
          </p>
          <p>{{ t('about_buy_text') }}</p>
        </div>

        <div class="mb-4">
          <p class="text-subtitle-1 font-weight-bold mb-1">
            <v-icon icon="mdi-bitcoin" size="18" class="mr-1" /> {{ t('about_sell_title') }}
          </p>
          <p>{{ t('about_sell_text') }}</p>
        </div>

        <div>
          <p class="text-subtitle-1 font-weight-bold mb-1">
            <v-icon icon="mdi-swap-horizontal" size="18" class="mr-1" /> {{ t('about_exchange_title') }}
          </p>
          <p>{{ t('about_exchange_text') }}</p>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { useLang } from '../composables/useLang'
const { t } = useLang()
</script>
