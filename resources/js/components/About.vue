<template>
  <v-container max-width="720" class="py-8">
    <v-card class="pa-6" rounded="lg" elevation="6">

      <v-card-title class="text-h5 mb-4">
        <v-icon icon="mdi-information-outline" class="mr-2" />
        Par CryptoBridge
      </v-card-title>

      <v-card-text>
        <p class="mb-6">
          CryptoBridge ir droša un ērta kriptovalūtas apmaiņas platforma, kas ļauj ātri un vienkārši
          pirkt, pārdot un apmainīt populārākās kriptovalūtas — Bitcoin, Ethereum, BNB un Solana.
        </p>

        <v-divider class="mb-4" />

        <div class="mb-4">
          <p class="text-subtitle-1 font-weight-bold mb-1">
            <v-icon icon="mdi-cart" size="18" class="mr-1" /> Pirkšana
          </p>
          <p>Ievadi summu eiro, izvēlies kriptovalūtu un norādi savu bankas IBAN. Kriptovalūta tiks ieskaitīta pēc maksājuma apstiprinājuma.</p>
        </div>

        <div class="mb-4">
          <p class="text-subtitle-1 font-weight-bold mb-1">
            <v-icon icon="mdi-bitcoin" size="18" class="mr-1" /> Pārdošana
          </p>
          <p>Izvēlies kriptovalūtu un daudzumu, ko vēlies pārdot, un norādi IBAN konta numuru. Eiro tiks pārskaitīti uz tavu bankas kontu.</p>
        </div>

        <div>
          <p class="text-subtitle-1 font-weight-bold mb-1">
            <v-icon icon="mdi-swap-horizontal" size="18" class="mr-1" /> Apmaiņa
          </p>
          <p>Izvēlies, kuru kriptovalūtu vēlies apmainīt pret citu. Konvertācija notiek pēc aktuālā tirgus kursa reāllaikā.</p>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
</script>
