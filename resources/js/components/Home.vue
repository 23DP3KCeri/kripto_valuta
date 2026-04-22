<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <h1>{{ t('home_title') }}</h1>
                <p>{{ t('home_subtitle') }}</p>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12" md="4" class="d-flex">
                <v-card class="lift-card">
                    <v-img src="https://blocktrade.com/wp-content/uploads/2023/09/cover_bitcoin-into-cash-1024x576.png" height="180" cover />
                    <v-card-title>{{ t('home_sell_title') }}</v-card-title>
                    <v-card-text>{{ t('home_sell_text') }}</v-card-text>
                    <v-card-actions class="mt-auto">
                        <v-btn color="primary" variant="flat" class="gradient-btn" to="/pardosana">{{ t('home_sell_btn') }}</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>

            <v-col cols="12" md="4" class="d-flex">
                <v-card class="lift-card">
                    <v-img src="https://coincentral.com/wp-content/uploads/2022/08/how-to-buy-crypto.png" height="180" cover />
                    <v-card-title>{{ t('home_buy_title') }}</v-card-title>
                    <v-card-text>{{ t('home_buy_text') }}</v-card-text>
                    <v-card-actions class="mt-auto">
                        <v-btn color="primary" variant="flat" class="gradient-btn" to="/pirksana">{{ t('home_buy_btn') }}</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>

            <v-col cols="12" md="4" class="d-flex">
                <v-card class="lift-card">
                    <v-img src="https://www.addevice.io/storage/ckeditor/uploads/images/6390774fc068f_guide.on.how.to.start.a.cryptocurrency.exchange.png" height="180" cover />
                    <v-card-title>{{ t('home_exchange_title') }}</v-card-title>
                    <v-card-text>{{ t('home_exchange_text') }}</v-card-text>
                    <v-card-actions class="mt-auto">
                        <v-btn color="primary" variant="flat" class="gradient-btn" to="/apmaina">{{ t('home_exchange_btn') }}</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { useLang } from '../composables/useLang'
const { t } = useLang()
</script>

<style scoped>
.lift-card {
    width: 100%;
    display: flex;
    flex-direction: column;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.lift-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.4) !important;
}

.gradient-btn {
    background: linear-gradient(45deg, #188fdf, #2e62f1) !important;
    color: #ffffff !important;
    border-radius: 8px !important;
    border: none !important;
}
</style>
