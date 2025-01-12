<template>
  <div class="container mx-auto p-4 relative">
    <!-- Przycisk logowania/wylogowania w prawym górnym rogu -->
    <div class="fixed top-4 right-4 z-50">
      <button
        v-if="!user"
        @click="goToLogin"
        class="btn btn-primary btn-sm"
      >
        Zaloguj się
      </button>
      <button
        v-else
        @click="logout"
        class="btn btn-danger btn-sm"
      >
        Wyloguj się
      </button>
      <button
        @click="goToCart"
        style="
          position: fixed;
          right: 1rem;
          padding: 0.5rem 1rem;
          background-color: #48bb78; /* bg-green-500 */
          color: white;
          border-radius: 0.375rem; /* rounded */
          transition: background-color 0.3s ease;">
          Przejdź do koszyka
        </button>
    </div>

    <!-- Nagłówek strony -->
    <h1 class="text-3xl font-bold text-center mb-6">Lista produktów</h1>

    <!-- Lista produktów -->
    <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <li v-for="product in products" :key="product.id" class="rounded-lg shadow-md bg-white border hover:shadow-lg">
        <div class="p-4">
          <h2 class="text-lg font-semibold text-blue-600">{{ product.name }}</h2>
          <p class="text-gray-700">{{ product.description }}</p>
          <p class="text-sm font-bold text-gray-500 mt-2">Cena: {{ product.price }} zł</p>
        </div>
        <button
        @click ="addToCart(product)"
        style="background-color: #65a30d ; color: #ffffff ;margin: 1rem ; padding: 0.3rem 0.5rem ; border-radius: 0.375rem ; transition: background-color 0.3s ease ">
          Dodaj do koszyka
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { collection, getDocs } from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';

export default {
  data() {
    return {
      products: [], // Przechowywanie produktów
      user: null,   // Przechowywanie stanu zalogowania użytkownika
    };
  },
  methods: {
    // Funkcja przekierowująca do strony logowania
    goToLogin() {
      this.$router.push('/login'); // Użycie routera do przekierowania do strony logowania
    },
    // Funkcja wylogowania użytkownika
    async logout() {
      const { $auth } = useNuxtApp(); // Pobranie instancji auth z Nuxt Plugin
      try {
        await signOut($auth);
        console.log('Wylogowano użytkownika');
      } catch (error) {
        console.error('Błąd podczas wylogowania:', error.message);
      }
    },
    addToCart(product) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} dodano do koszyka`);
    },
      goToCart() {
        this.$router.push("/cart");
    },
  },
  async mounted() {
    const { $db, $auth } = useNuxtApp(); // Pobranie instancji db i auth

    // Nasłuchiwanie stanu zalogowania
    onAuthStateChanged($auth, (user) => {
      this.user = user;
      if (user) {
        console.log('Użytkownik zalogowany:', user.email);
      } else {
        console.log('Brak użytkownika zalogowanego');
      }
    });

    // Pobieranie produktów z Firestore
    try {
      const querySnapshot = await getDocs(collection($db, 'products'));
      this.products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Błąd podczas pobierania produktów:', error);
    }
  },
};
</script>

<style scoped>
/* Customizacja Tailwind i Bootstrap */
.container {
  max-width: 1200px;
}
.btn-primary {
  @apply bg-blue-500 text-white font-semibold px-3 py-1 rounded;
}
.btn-primary:hover {
  @apply bg-blue-600;
}
.btn-danger {
  @apply bg-red-500 text-white font-semibold px-3 py-1 rounded;
}
.btn-danger:hover {
  @apply bg-red-600;
}
.btn-sm {
  @apply text-sm px-2 py-1;
}
.btn-addToCart {
  @apply p-2 bg-green-600 text-white rounded hover:bg-lime-700 transition;
}
</style>
