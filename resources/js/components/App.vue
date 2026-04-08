<template>
  <v-app>

    <!-- ===== HEADER ===== -->
    <v-app-bar color="black" flat height="70">

      <div class="logo-box">
        <v-icon icon="mdi-bitcoin" class="logo-icon" />
        <span class="brand-title">CryptoBridge</span>
      </div>

      <v-spacer />

      <!-- Nav saites (desktop) -->
      <div class="nav-links-desktop">
        <v-btn variant="text" href="#home" class="nav-btn">Home</v-btn>
        <v-btn variant="text" href="#about" class="nav-btn">About</v-btn>

        <v-menu open-on-hover>
          <template #activator="{ props }">
            <v-btn variant="text" v-bind="props" class="nav-btn">Services ▼</v-btn>
          </template>
          <v-list density="compact" bg-color="#1e1e1e">
            <v-list-item title="Pārdošana" to="/pardosana" />
            <v-list-item title="Pirkšana" to="/pirksana" />
            <v-list-item title="Apmaiņa" to="/apmaina" />
          </v-list>
        </v-menu>

        <v-btn variant="text" href="#contact" class="nav-btn">Contact</v-btn>
        <v-btn variant="text" href="/news.html" class="nav-btn">News</v-btn>
        <v-btn variant="text" to="/vesture" class="nav-btn">Vēsture</v-btn>
      </div>

      <!-- User + logout -->
      <span v-if="user" class="text-caption text-medium-emphasis mr-1">{{ user.name }}</span>
      <v-btn v-if="user" icon variant="text" class="theme-btn" title="Iziet" @click="handleLogout">
        <v-icon icon="mdi-logout" />
      </v-btn>

      <!-- Dark/Light toggle -->
      <v-btn icon variant="text" @click="toggleTheme" class="theme-btn">
        {{ isDark ? '🌙' : '☀️' }}
      </v-btn>

      <!-- Hamburger (mobile) -->
      <v-app-bar-nav-icon class="d-md-none" color="white" @click="drawer = !drawer" />
    </v-app-bar>

    <!-- Mobile drawer -->
    <v-navigation-drawer v-model="drawer" temporary>
      <v-list>
        <v-list-item title="Home" href="#home" />
        <v-list-item title="About" href="#about" />
        <v-list-item title="Pārdošana" to="/pardosana" />
        <v-list-item title="Pirkšana" to="/pirksana" />
        <v-list-item title="Apmaiņa" to="/apmaina" />
        <v-list-item title="Contact" href="#contact" />
        <v-list-item title="News" href="/news.html" />
        <v-list-item title="Vēsture" to="/vesture" />
      </v-list>
    </v-navigation-drawer>

    <!-- ===== SATURS ===== -->
    <v-main>
      <router-view />
    </v-main>

    <!-- ===== FOOTER ===== -->
    <v-footer class="cb-footer">
      <div class="footer-inner">
        <div class="footer-icons">
          <a href="#" class="footer-icon">
            <svg class="social-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
          <a href="#" class="footer-icon">
            <svg class="social-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
          <a href="#" class="footer-icon">
            <svg class="social-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
            </svg>
          </a>
        </div>
        <p class="footer-text">&copy; 2025 Kripto valūtas pārdošana. Visas tiesības aizsargātas.</p>
      </div>
    </v-footer>

  </v-app>
</template>

<script>
import { useTheme } from 'vuetify'
import { useRouter } from 'vue-router'
import { useAuth, logout } from '../composables/useAuth'

export default {
  name: 'App',

  setup() {
    const theme = useTheme()
    const router = useRouter()
    const { user } = useAuth()

    async function handleLogout() {
      await logout()
      router.push('/login')
    }

    return { theme, user, handleLogout }
  },

  data() {
    return {
      drawer: false
    }
  },

  computed: {
    isDark() {
      return this.theme.global.current.value.dark
    }
  },

  methods: {
    toggleTheme() {
      this.theme.global.name.value = this.isDark ? 'light' : 'dark'
    }
  }
}
</script>

<style scoped>
/* Logo + nosaukums */
.logo-box {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-left: 12px;
}

.logo-icon {
  font-size: 2.4em !important;
  color: #f7931a !important;
}

.brand-title {
  font-size: 1.9em;
  font-weight: bold;
  color: #ffffff;
  white-space: nowrap;
}

/* Desktop nav */
.nav-links-desktop {
  display: flex;
  align-items: center;
}

.nav-btn {
  font-size: 0.85em !important;
  color: #bbbbbb !important;
  text-transform: none !important;
  letter-spacing: 0 !important;
}

.nav-btn:hover {
  background-color: #2e62f1 !important;
  color: #ffffff !important;
}

.theme-btn {
  font-size: 1.1em;
  margin: 0 4px;
}

/* Paslēpt desktop nav uz mobilo */
@media (max-width: 960px) {
  .nav-links-desktop {
    display: none;
  }
}

/* Footer */
.cb-footer {
  padding: 16px !important;
  justify-content: center;
}

.footer-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
}

.footer-icons {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.social-icon {
  width: 28px;
  height: 28px;
  fill: #00bcd4;
  transition: transform 0.4s ease, fill 0.3s ease;
}

.footer-icon:hover .social-icon {
  transform: scale(1.3);
  fill: #4dd9ec;
}

.footer-text {
  margin: 0;
  font-size: 0.9em;
}
</style>
