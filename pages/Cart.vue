<template>
    <div class="container mx-auto p-4">
        <button
        @click="goToProducts"
        style="
          position: fixed;
          right: 1rem;
          padding: 0.5rem 1rem;
          background-color: #48bb78; /* bg-green-500 */
          color: white;
          border-radius: 0.375rem; /* rounded */
          transition: background-color 0.3s ease;">
        Przejdź do listy produktów
      </button>
      <h1 class="text-3xl font-bold text-center mb-6">Twój koszyk</h1>
      <div v-if="cart.length" class="p-4 border rounded bg-gray-50">
        <ul>
          <li
            v-for="item in cart"
            :key="item.id"
            class="flex justify-between items-center mb-4"
          >
            <div>
              <h3 class="font-semibold">{{ item.name }}</h3>
              <p class="text-gray-500">Cena: {{ item.price }} zł</p>
              <p>Ilość: {{ item.quantity }}</p>
            </div>
            <div class="flex items-center">
              <button
                @click="updateQuantity(item.id, item.quantity - 1)"
                class="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                :disabled="item.quantity <= 1"
              >
                -
              </button>
              <button
                @click="updateQuantity(item.id, item.quantity + 1)"
                class="ml-2 px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                +
              </button>
              <button
                @click="removeFromCart(item.id)"
                class="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Usuń
              </button>
            </div>
          </li>
        </ul>
        <div class="text-right mt-4">
          <p class="font-bold text-lg">Łączna cena: {{ totalPrice }} zł</p>
          <button
            @click="checkout"
            class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Przejdź do kasy
          </button>
        </div>
      </div>
      <div v-else class="text-center">
        <p class="text-gray-500">Twój koszyk jest pusty.</p>
        <button
          @click="goToProducts"
          class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Wróć do produktów
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        cart: [], // Koszyk przechowywany lokalnie
      };
    },
    computed: {
      // Łączna cena produktów w koszyku
      totalPrice() {
        return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      },
    },
    methods: {
      // Aktualizacja ilości w koszyku
      updateQuantity(productId, newQuantity) {
        const item = this.cart.find((item) => item.id === productId);
        if (item) {
          item.quantity = newQuantity;
          if (item.quantity <= 0) {
            this.removeFromCart(productId);
          }
        }
        this.saveCart();
      },
      // Usunięcie produktu z koszyka
      removeFromCart(productId) {
        this.cart = this.cart.filter((item) => item.id !== productId);
        this.saveCart();
      },
      // Przejście do produktów
      goToProducts() {
        this.$router.push("/");
      },
      // Symulacja przejścia do kasy
      checkout() {
        alert("Przechodzenie do kasy...");
      },
      // Wczytanie koszyka z localStorage
      loadCart() {
        const storedCart = localStorage.getItem("cart");
        this.cart = storedCart ? JSON.parse(storedCart) : [];
      },
      // Zapis koszyka do localStorage
      saveCart() {
        localStorage.setItem("cart", JSON.stringify(this.cart));
      },
      goToLogin() {
      this.$router.push('/login'); // Użycie routera do przekierowania do strony logowania
    },
    },
    mounted() {
      this.loadCart();
    },
  };
  </script>
  
  <style scoped>
  /* Stylowanie koszyka */
  </style>
  