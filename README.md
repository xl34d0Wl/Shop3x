# **Shop3x**

## **Opis projektu**
**Shop3x** to prosta aplikacja stworzona w oparciu o **Nuxt.js** (frontend), **Firebase** (backend) oraz **Tailwind CSS** (styling) z elementami klasycznego CSS.  
Aplikacja umożliwia wyświetlanie oraz zarządzanie produktami w sklepie internetowym. Jest przeznaczona zarówno dla użytkownika (wyświetlanie listy produktów, dodawanie do koszyka), jak i administratora, który ma możliwość dodawania, usuwania oraz przeglądania produktów.  

Dzięki integracji z Firebase, aplikacja oferuje funkcjonalność logowania i autentykacji, co zapewnia bezpieczeństwo dostępu do panelu administracyjnego.

---

## **Funkcje aplikacji**

### **1. Wyświetlanie listy produktów**
- Na stronie głównej wyświetlana jest lista produktów pobrana z bazy danych **Firebase Firestore**.
- Każdy produkt zawiera następujące informacje:
  - **Nazwa produktu**,
  - **Opis produktu**,
  - **Cena**.
### **2. Dodawanie produktów do koszyka**
- Użytkownik ma możliwość dodania produktów do koszyka
- Dzięki funkcji **Przejdź do koszyka** użytkownik ma możliwość przejścia do dodanych przez siebie produktów
- Koszyka automatycznie zlicza kwotą końcową wszystkich znajdujących się w nim produktów i daje możliwość dodawania (przycisk +), cofania ilości produktów (przycisk -) oraz usuwania produktu z koszyka.

### **2. Logowanie użytkownika**
- Zarówno użytkownik, jak i administrator mogą zalogować się za pomocą adresu e-mail i hasła.
- Logowanie wykorzystuje:
  - **Firebase Authentication**,
  - Funkcję `setAdmin` (na potrzeby demonstracji jest zawarta w gałęzi frontendowej; w rzeczywistości przechowywana jest w środowisku backendowym, które jest niedostępne dla użytkownika).
- Po udanym logowaniu:
  - **Zwykły użytkownik** jest przekierowywany na stronę listy produktów.
  - **Administrator** zostaje przekierowany do **Panelu Administracyjnego**.

### **3. Dodawanie produktów**
- W panelu administracyjnym administrator może dodawać nowe produkty do bazy danych.
- Formularz wymaga podania następujących informacji:
  - **Nazwa produktu**,
  - **Opis produktu**,
  - **Cena produktu**.

### **4. Usuwanie produktów**
- W panelu administracyjnym administrator może jednym kliknięciem usuwać produkty zapisane w bazie danych.

### **5. Bezpieczeństwo**
- Dostęp do panelu administracyjnego mają wyłącznie zalogowani użytkownicy z nadają rolą Admin przez funckje `setAdmin`.
- Reguły **Firebase Firestore Rules** kontrolują, kto ma uprawnienia do:
  - Przeglądania,
  - Dodawania,
  - Usuwania produktów.
  Fragment kodu z Firebase:
`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{document=**} {
      allow read: if true;
      allow write: if request.auth.token.admin == true;
    }
  }
}`

---

## **Technologie użyte w projekcie**

| **Kategoria**       | **Technologia**                  |
|----------------------|----------------------------------|
| **Frontend**         | Nuxt.js                         |
| **Styling**          | Tailwind CSS, klasyczny CSS     |
| **Backend**          | Firebase (Authentication, Firestore) |
| **Inne narzędzia**   | Node.js, Git                    |

---
