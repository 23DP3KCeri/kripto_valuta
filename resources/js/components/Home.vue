<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <h1>Laipni lūgti CryptoBridge</h1>
                <p>Droša un ērta kriptovalūtas apmaiņas platforma</p>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12" md="4" class="d-flex">
                <v-card class="lift-card">
                    <v-img src="https://blocktrade.com/wp-content/uploads/2023/09/cover_bitcoin-into-cash-1024x576.png" height="180" cover />
                    <v-card-title>Pārdošana</v-card-title>
                    <v-card-text>Pārdod savu kriptovalūtu un saņem naudu savā bankas kontā.</v-card-text>
                    <v-card-actions>
                        <v-btn color="primary" variant="flat" class="gradient-btn" to="/pardosana">Pārdot</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>

            <v-col cols="12" md="4" class="d-flex">
                <v-card class="lift-card">
                    <v-img src="https://coincentral.com/wp-content/uploads/2022/08/how-to-buy-crypto.png" height="180" cover />
                    <v-card-title>Pirkšana</v-card-title>
                    <v-card-text>Iegādājies kriptovalūtu ērti un droši.</v-card-text>
                    <v-card-actions>
                        <v-btn color="primary" variant="flat" class="gradient-btn" to="/pirksana">Pirkt</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>

            <v-col cols="12" md="4" class="d-flex">
                <v-card class="lift-card">
                    <v-img src="https://www.addevice.io/storage/ckeditor/uploads/images/6390774fc068f_guide.on.how.to.start.a.cryptocurrency.exchange.png" height="180" cover />
                    <v-card-title>Apmaiņa</v-card-title>
                    <v-card-text>Apmaini vienu kriptovalūtu pret citu.</v-card-text>
                    <v-card-actions>
                        <v-btn color="primary" variant="flat" class="gradient-btn" to="/apmaina">Apmainīt</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'Home'
}
</script>

<style scoped>
.lift-card {
    width: 100%;
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