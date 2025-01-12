<template>
  <div class="container mx-auto">
    <!-- Panel Administratora -->
    <h2 class="text-2xl font-bold mb-4">Panel Administratora</h2>
    
    <!-- Przycisk wylogowania -->
    <button 
      @click="logout" 
      class="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
      Wyloguj się
    </button>

    <p>Witaj w panelu administratora. Możesz tutaj zarządzać danymi.</p>

    <!-- Formularz dodawania produktów -->
    <form @submit.prevent="addProduct" class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <input v-model="newProduct.name" type="text" placeholder="Nazwa produktu" required class="p-2 border rounded">
      <input v-model="newProduct.description" type="text" placeholder="Opis produktu" required class="p-2 border rounded">
      <input v-model="newProduct.price" type="number" placeholder="Cena" required class="p-2 border rounded">
      <button type="submit" class="btn btn-primary">Dodaj produkt</button>
    </form>

    <!-- Lista produktów -->
    <ul>
      <li v-for="product in products" :key="product.id" class="p-4 border rounded mb-4">
        <h3 class="text-lg font-semibold">{{ product.name }}</h3>
        <p>{{ product.description }}</p>
        <p>Cena: {{ product.price }} zł</p>
        <button @click="deleteProduct(product.id)" class="btn btn-danger mt-2">Usuń</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { collection, addDoc, deleteDoc, getDocs, doc } from 'firebase/firestore';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';

export default {
  data() {
    return {
      products: [],
      newProduct: { name: '', description: '', price: '' },
      user: null,
      isAdmin: false,
    };
  },
  methods: {
    async addProduct() {
      try {
        await addDoc(collection(this.$db, 'products'), {
          ...this.newProduct,
          price: parseFloat(this.newProduct.price),
        });
        this.newProduct = { name: '', description: '', price: '' };
        this.fetchProducts();
      } catch (error) {
        console.error('Błąd dodawania produktu:', error);
      }
    },
    async deleteProduct(id) {
      try {
        await deleteDoc(doc(this.$db, 'products', id));
        this.fetchProducts();
      } catch (error) {
        console.error('Błąd usuwania produktu:', error);
      }
    },
    async fetchProducts() {
      const querySnapshot = await getDocs(collection(this.$db, 'products'));
      this.products = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    },
    // Funkcja do wylogowania
    async logout() {
      const auth = getAuth();
      try {
        await signOut(auth); // Wylogowanie użytkownika
        this.$router.push('/'); // Przekierowanie na stronę listy produktów
      } catch (error) {
        console.error('Błąd podczas wylogowania:', error);
      }
    },
  },
  async mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.user = user;
        const tokenResult = await user.getIdTokenResult();
        this.isAdmin = tokenResult.claims.admin || false;
        if (this.isAdmin) {
          this.fetchProducts(); // Tylko administrator może zobaczyć produkty
        } else {
          this.$router.push('/'); // Przekierowanie na listę produktów, jeśli nie admin
        }
      } else {
        this.$router.push('/login'); // Przekierowanie na stronę logowania, jeśli nie ma zalogowanego użytkownika
      }
    });
  },
};
</script>

<style scoped>
/* Stylowanie opcjonalne */
</style>
