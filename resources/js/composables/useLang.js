import { ref } from 'vue'

const lang = ref('lv')

const translations = {
  lv: {
    // Navbar / footer
    nav_home: 'Home', nav_about: 'About', nav_services: 'Services ▼',
    nav_sell: 'Pārdošana', nav_buy: 'Pirkšana', nav_exchange: 'Apmaiņa',
    nav_contact: 'Contact', nav_news: 'News', nav_history: 'Vēsture',
    nav_admin: 'Admin', nav_logout_title: 'Iziet',
    footer_copy: '© 2025 Kripto valūtas pārdošana. Visas tiesības aizsargātas.',
    // Home
    home_title: 'Laipni lūgti CryptoBridge',
    home_subtitle: 'Droša un ērta kriptovalūtas apmaiņas platforma',
    home_sell_title: 'Pārdošana',
    home_sell_text: 'Pārdod savu kriptovalūtu un saņem naudu savā bankas kontā.',
    home_sell_btn: 'Pārdot',
    home_buy_title: 'Pirkšana',
    home_buy_text: 'Iegādājies kriptovalūtu ērti un droši.',
    home_buy_btn: 'Pirkt',
    home_exchange_title: 'Apmaiņa',
    home_exchange_text: 'Apmaini vienu kriptovalūtu pret citu.',
    home_exchange_btn: 'Apmainīt',
    // Common form labels
    label_choose_crypto: 'Izvēlies kriptovalūtu',
    label_amount: 'Daudzums',
    label_iban: 'IBAN',
    label_rate: 'Aktuālais kurss',
    label_receive: 'Saņemsi',
    label_receive_eur: 'Saņemsi EUR',
    label_from: 'No',
    label_to: 'Uz',
    label_crossrate: 'Kurss',
    // Validation / errors
    err_amount_positive: 'Daudzumam jābūt lielākam par 0',
    err_insufficient: 'Nepietiek līdzekļu',
    err_iban_invalid: 'Lūdzu ievadi derīgu IBAN!',
    err_generic: 'Kļūda! Lūdzu mēģini vēlreiz.',
    tx_success: 'Darījums veiksmīgi iesniegts!',
    // Sell (Pardosana)
    sell_page_title: 'Kriptovalūtas pārdošana',
    sell_btn: 'Pārdot',
    sell_suffix: 'tiks pārskaitīts uz',
    // Buy (Pirksana)
    buy_page_title: 'Kriptovalūtas pirkšana',
    buy_label_eur: 'Daudzums EUR',
    buy_btn: 'Pirkt',
    buy_suffix: 'tiks nosūtīts.',
    // Exchange (Apmaina)
    exchange_page_title: 'Kriptovalūtas apmaiņa',
    exchange_btn: 'Apmainīt',
    // History / filters
    history_title: 'Darījumu vēsture',
    filter_search_id: 'Meklēt pēc ID',
    filter_type: 'Tips',
    filter_crypto: 'Kriptovalūta',
    filter_sort: 'Kārtot pēc',
    filter_all: 'Visi',
    history_empty: 'Vēl nav neviena darījuma.',
    history_no_results: 'Nav atbilstošu darījumu.',
    col_id: 'ID', col_type: 'Tips', col_crypto: 'Kriptovalūta',
    col_amount: 'Daudzums', col_result: 'Rezultāts', col_date: 'Datums',
    sort_date_desc: 'Datums: jaunākie', sort_date_asc: 'Datums: vecākie',
    sort_amount_desc: 'Daudzums: dilstošs', sort_amount_asc: 'Daudzums: augošs',
    // Login
    login_title: 'Pieslēgties', login_email: 'E-pasts', login_password: 'Parole',
    login_btn: 'Pieslēgties', login_no_account: 'Nav konta?',
    login_register_link: 'Reģistrēties',
    login_err_email: 'Ievadi derīgu e-pasta adresi.',
    login_err_failed: 'Pieslēgšanās neizdevās.',
    login_invalid: 'Nepareizs e-pasts vai parole.',
    // Register
    register_title: 'Reģistrēties', register_name: 'Vārds',
    register_email: 'E-pasts', register_password: 'Parole',
    register_btn: 'Reģistrēties', register_has_account: 'Jau ir konts?',
    register_login_link: 'Pieslēgties',
    register_err_password: 'Parolei jābūt vismaz 8 rakstzīmes.',
    register_err_failed: 'Reģistrācija neizdevās.',
    // Admin
    admin_tx_title: 'Administrācija — visi darījumi',
    admin_users_title: 'Lietotāji',
    col_user: 'Lietotājs', col_role: 'Loma', col_name: 'Vārds', col_email: 'E-pasts',
    admin_promote_title: 'Paaugstināt uz admin',
    admin_delete_title: 'Dzēst',
    admin_no_users: 'Nav lietotāju.',
    // About
    about_title: 'Par CryptoBridge',
    about_intro: 'CryptoBridge ir droša un ērta kriptovalūtas apmaiņas platforma, kas ļauj ātri un vienkārši pirkt, pārdot un apmainīt populārākās kriptovalūtas — Bitcoin, Ethereum, BNB un Solana.',
    about_buy_title: 'Pirkšana',
    about_buy_text: 'Ievadi summu eiro, izvēlies kriptovalūtu un norādi savu bankas IBAN. Kriptovalūta tiks ieskaitīta pēc maksājuma apstiprinājuma.',
    about_sell_title: 'Pārdošana',
    about_sell_text: 'Izvēlies kriptovalūtu un daudzumu, ko vēlies pārdot, un norādi IBAN konta numuru. Eiro tiks pārskaitīti uz tavu bankas kontu.',
    about_exchange_title: 'Apmaiņa',
    about_exchange_text: 'Izvēlies, kuru kriptovalūtu vēlies apmainīt pret citu. Konvertācija notiek pēc aktuālā tirgus kursa reāllaikā.',
    // Contact
    contact_title: 'Sazinies ar mums',
    contact_email_label: 'E-pasts', contact_phone_label: 'Tālrunis',
    // Profile
    profile_wallets: 'Maki', profile_no_wallets: 'Nav maku.',
    profile_crypto: 'Kriptovalūta', profile_balance: 'Bilance',
    profile_history_btn: 'Darījumu vēsture',
  },
  en: {
    // Navbar / footer
    nav_home: 'Home', nav_about: 'About', nav_services: 'Services ▼',
    nav_sell: 'Sell', nav_buy: 'Buy', nav_exchange: 'Exchange',
    nav_contact: 'Contact', nav_news: 'News', nav_history: 'History',
    nav_admin: 'Admin', nav_logout_title: 'Log out',
    footer_copy: '© 2025 Cryptocurrency exchange. All rights reserved.',
    // Home
    home_title: 'Welcome to CryptoBridge',
    home_subtitle: 'A safe and convenient cryptocurrency exchange platform',
    home_sell_title: 'Sell',
    home_sell_text: 'Sell your cryptocurrency and receive money in your bank account.',
    home_sell_btn: 'Sell',
    home_buy_title: 'Buy',
    home_buy_text: 'Buy cryptocurrency easily and securely.',
    home_buy_btn: 'Buy',
    home_exchange_title: 'Exchange',
    home_exchange_text: 'Swap one cryptocurrency for another.',
    home_exchange_btn: 'Exchange',
    // Common form labels
    label_choose_crypto: 'Choose cryptocurrency',
    label_amount: 'Amount',
    label_iban: 'IBAN',
    label_rate: 'Current rate',
    label_receive: 'You will receive',
    label_receive_eur: 'You will receive EUR',
    label_from: 'From',
    label_to: 'To',
    label_crossrate: 'Rate',
    // Validation / errors
    err_amount_positive: 'Amount must be greater than 0',
    err_insufficient: 'Insufficient funds',
    err_iban_invalid: 'Please enter a valid IBAN!',
    err_generic: 'Error! Please try again.',
    tx_success: 'Transaction submitted successfully!',
    // Sell (Pardosana)
    sell_page_title: 'Sell Cryptocurrency',
    sell_btn: 'Sell',
    sell_suffix: 'will be transferred to',
    // Buy (Pirksana)
    buy_page_title: 'Buy Cryptocurrency',
    buy_label_eur: 'Amount in EUR',
    buy_btn: 'Buy',
    buy_suffix: 'will be sent.',
    // Exchange (Apmaina)
    exchange_page_title: 'Exchange Cryptocurrency',
    exchange_btn: 'Exchange',
    // History / filters
    history_title: 'Transaction History',
    filter_search_id: 'Search by ID',
    filter_type: 'Type',
    filter_crypto: 'Cryptocurrency',
    filter_sort: 'Sort by',
    filter_all: 'All',
    history_empty: 'No transactions yet.',
    history_no_results: 'No matching transactions.',
    col_id: 'ID', col_type: 'Type', col_crypto: 'Cryptocurrency',
    col_amount: 'Amount', col_result: 'Result', col_date: 'Date',
    sort_date_desc: 'Date: newest', sort_date_asc: 'Date: oldest',
    sort_amount_desc: 'Amount: descending', sort_amount_asc: 'Amount: ascending',
    // Login
    login_title: 'Log In', login_email: 'Email', login_password: 'Password',
    login_btn: 'Log In', login_no_account: 'No account?',
    login_register_link: 'Register',
    login_err_email: 'Please enter a valid email address.',
    login_err_failed: 'Login failed.',
    login_invalid: 'Incorrect email or password.',
    // Register
    register_title: 'Register', register_name: 'Name',
    register_email: 'Email', register_password: 'Password',
    register_btn: 'Register', register_has_account: 'Already have an account?',
    register_login_link: 'Log In',
    register_err_password: 'Password must be at least 8 characters.',
    register_err_failed: 'Registration failed.',
    // Admin
    admin_tx_title: 'Administration — all transactions',
    admin_users_title: 'Users',
    col_user: 'User', col_role: 'Role', col_name: 'Name', col_email: 'Email',
    admin_promote_title: 'Promote to admin',
    admin_delete_title: 'Delete',
    admin_no_users: 'No users.',
    // About
    about_title: 'About CryptoBridge',
    about_intro: 'CryptoBridge is a safe and convenient cryptocurrency exchange platform that allows you to quickly and easily buy, sell and exchange the most popular cryptocurrencies — Bitcoin, Ethereum, BNB and Solana.',
    about_buy_title: 'Buy',
    about_buy_text: 'Enter the amount in euros, choose a cryptocurrency and enter your bank IBAN. The cryptocurrency will be credited after payment confirmation.',
    about_sell_title: 'Sell',
    about_sell_text: 'Choose the cryptocurrency and amount you want to sell and enter your IBAN account number. Euros will be transferred to your bank account.',
    about_exchange_title: 'Exchange',
    about_exchange_text: 'Choose which cryptocurrency you want to exchange for another. Conversion happens at the current market rate in real time.',
    // Contact
    contact_title: 'Contact Us',
    contact_email_label: 'Email', contact_phone_label: 'Phone',
    // Profile
    profile_wallets: 'Wallets', profile_no_wallets: 'No wallets.',
    profile_crypto: 'Cryptocurrency', profile_balance: 'Balance',
    profile_history_btn: 'Transaction History',
  },
}

function t(key) {
  return translations[lang.value][key] ?? key
}

export function useLang() {
  return { lang, t }
}
