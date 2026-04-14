# CryptoBridge

## Par projektu
CryptoBridge ir tīmekļa lietojumprogramma, kas ļauj lietotājiem pirkt, pārdot un apmainīt kriptovalūtas. Sistēma darbojas kā simulators, jo tajā netiek veikti reāli maksājumi.

## Galvenā funkcionalitāte
- Lietotāju reģistrācija un pieteikšanās (register / login)
- Kriptovalūtu pirkšana (`/pirksana`)
- Kriptovalūtu pārdošana (`/pardosana`)
- Kriptovalūtu apmaiņa (`/apmaina`)
- Darījumu vēsture (`/vesture`)
- Lietotāja profils (`/profile`)
- Administratora panelis (`/admin`)

## Lietotāju lomas
- **User (lietotājs)** – var veikt darījumus un skatīt savu vēsturi  
- **Admin (administrators)** – var redzēt visus lietotājus un darījumus, dzēst lietotājus un darījumus, kā arī piešķirt admin tiesības  

## Izmantotās tehnoloģijas
- Laravel (backend)
- Vue.js (frontend)
- MySQL (datubāze)
- DBngin (lokālais serveris)
- Vite (frontend build tools)

## Datubāze
Sistēmā tiek izmantotas vairākas savstarpēji saistītas tabulas:
- users (lietotāji)
- transactions (darījumi)
- wallets (lietotāju kripto maki)
- exchange_rates (valūtu kursi)

## Palaišana

1. Uzstādi atkarības:
- composer install  
- npm install  

2. Palaid migrācijas:
- php artisan migrate  

3. Palaid serveri:
- php artisan serve  
- npm run dev  

4. Atver pārlūkā:
- http://127.0.0.1:8000  

---

## PWA (Progressive Web App)

Sistēmai ir pievienots PWA atbalsts:

- Izveidots manifest.json  
- Pievienots service worker (sw.js)  
- Aplikāciju iespējams instalēt kā lietotni (Install App)  
- Tiek izmantota kešošana, lai uzlabotu veiktspēju  

---

## E-pastu sūtīšana

Pēc lietotāja reģistrācijas tiek nosūtīts e-pasts.

- Tiek izmantots Laravel Mail  
- Testēšanai izmantots log mail driver  
- E-pasti tiek saglabāti failā:  
  storage/logs/laravel.log  

---

## Testēšana

Sistēmas testēšanas scenāriji atrodami failā `TESTCASES.md`.

---

## Drošība (OWASP)

Izstrādē tika ievēroti pamata drošības principi:

- Datu validācija (frontend + backend)  
- Lietotāju autentifikācija (login)  
- Autorizācija pēc lomām (user / admin)  
- Piekļuves kontrole datiem  
- Droša sesiju izmantošana  

---

## Pieejamība (WCAG)

Sistēma ir veidota, ievērojot pieejamības principus:

- Skaidri un saprotami formu lauki (labels)  
- Kļūdu paziņojumi lietotājam  
- Konsekvents dizains visās lapās  
- Navigācija ar tastatūru  
- Pietiekams kontrasts starp tekstu un fonu  

---

## Datu apstrāde

Sistēmā tiek veikta datu iegūšana un apstrāde no vairākām savstarpēji saistītām tabulām:

- Darījumi tiek saistīti ar lietotāju (user_id)  
- Wallet tiek automātiski atjaunināts pēc darījumiem  
- Administrators var redzēt visu lietotāju datus  
- Dati tiek kārtoti, filtrēti un meklēti  

---

## Piezīme

Šī sistēma ir mācību projekts un neveic reālus finanšu darījumus.