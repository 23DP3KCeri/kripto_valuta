# Sistēmas testēšana

## Test Case 1 — Lietotāja reģistrācija (User Registration)

**Apraksts:** Pārbauda, vai jauns lietotājs var izveidot kontu ar pareizi ievadītiem datiem.

**Soļi:**
1. Atver lapu `/register` (reģistrācijas lapa)  
2. Ievada vārdu, e-pastu un paroli  
3. Nospiež pogu “Register” (Reģistrēties)  

**Sagaidāmais rezultāts:**  
Lietotājs tiek pāradresēts uz sākumlapu `/` (Home). Navigācijas joslā parādās lietotāja vārds. Nav redzams pieteikšanās logs.

---

## Test Case 2 — Kriptovalūtas pirkšana (Buy Crypto)

**Apraksts:** Pārbauda, vai lietotājs var veiksmīgi veikt pirkšanas darījumu.

**Soļi:**
1. Ielogojas sistēmā  
2. Atver lapu `/pirksana` (pirkšanas lapa)  
3. Ievada summu (piemēram 100)  
4. Izvēlas kriptovalūtu (BTC)  
5. Ievada IBAN (bankas konta numurs)  
6. Nospiež pogu “Buy” (Pirkt)  

**Sagaidāmais rezultāts:**  
Parādās paziņojums par veiksmīgu darījumu. Darījums tiek saglabāts datubāzē un parādās lapā `/vesture` (vēsture). Lietotāja wallet (kripto maks) balanss tiek atjaunināts.

---

## Test Case 3 — Datu validācija pārdošanā (Sell Form Validation)

**Apraksts:** Pārbauda, vai sistēma nepieņem nepareizus vai tukšus ievades datus.

**Soļi:**
1. Atver lapu `/pardosana` (pārdošanas lapa)  
2. Mēģina iesniegt tukšu formu  
3. Ievada negatīvu skaitli (piemēram -50)  
4. Ievada tekstu skaitļa vietā (piemēram “abc”)  
5. Nospiež pogu “Sell” (Pārdot)  

**Sagaidāmais rezultāts:**  
Sistēma neļauj iesniegt formu un parāda kļūdas paziņojumus. Darījums netiek saglabāts datubāzē.

---

## Test Case 4 — Administratora piekļuve (Admin Access)

**Apraksts:** Pārbauda, vai administrators redz visus lietotājus un darījumus.

**Soļi:**
1. Izveido vairākus lietotājus  
2. Katrs lietotājs veic vismaz vienu darījumu  
3. Ielogojas kā administrators  
4. Atver lapu `/admin` (administratora panelis)  

**Sagaidāmais rezultāts:**  
Administrators redz visu lietotāju darījumus (ne tikai savus). Parastie lietotāji nevar piekļūt `/admin` (tiek pāradresēti uz sākumlapu vai login lapu).

---

## Test Case 5 — Sesijas saglabāšana pēc pārlādes (Session Persistence)

**Apraksts:** Pārbauda, vai lietotājs paliek ielogots pēc lapas pārlādes.

**Soļi:**
1. Ielogojas sistēmā  
2. Atver lapu `/vesture` (vēsture)  
3. Veic “hard refresh” (Ctrl + Shift + R)  

**Sagaidāmais rezultāts:**  
Lietotājs paliek ielogots. Netiek pāradresēts uz `/login` (pieteikšanās lapa). Navigācijā joprojām redzams lietotāja vārds un darījumu vēsture saglabājas.