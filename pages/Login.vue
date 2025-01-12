<template>
  <div class="container mx-auto">
    <!-- Formularz logowania -->
    <div v-if="!isRegistering" class="max-w-md mx-auto">
      <h2 class="text-2xl font-bold mb-4">Zaloguj się</h2>
      
      <form @submit.prevent="loginUser" class="space-y-4">
        <div>
          <label for="email" class="block">E-mail:</label>
          <input v-model="email" id="email" type="email" placeholder="E-mail" required class="p-2 w-full border rounded"/>
        </div>
        <div>
          <label for="password" class="block">Hasło:</label>
          <input v-model="password" id="password" type="password" placeholder="Hasło" required class="p-2 w-full border rounded"/>
        </div>
        <button type="submit" class="p-2 bg-blue-500 text-black rounded hover:bg-blue-600 transition w-full">
          Zaloguj się
        </button>
      </form>

      <p class="mt-4 text-center">
        Nie masz konta? 
        <button @click="toggleRegistering" class="bg-blue-500 text-black rounded hover:bg-blue-500 transition w-full">Zarejestruj się</button>
      </p>
    </div>

    <!-- Formularz rejestracji -->
    <div v-if="isRegistering" class="max-w-md mx-auto">
      <h2 class="text-2xl font-bold mb-4">Rejestracja</h2>
      
      <form @submit.prevent="registerUser" class="space-y-4">
        <div>
          <label for="email" class="block">E-mail:</label>
          <input v-model="email" id="email" type="email" placeholder="E-mail" required class="p-2 w-full border rounded"/>
        </div>
        <div>
          <label for="password" class="block">Hasło:</label>
          <input v-model="password" id="password" type="password" placeholder="Hasło" required class="p-2 w-full border rounded"/>
        </div>
        <div>
          <label for="confirmPassword" class="block">Potwierdź Hasło:</label>
          <input v-model="confirmPassword" id="confirmPassword" type="password" placeholder="Potwierdź Hasło" required class="p-2 w-full border rounded"/>
        </div>
        <button type="submit" class="p-2 bg-blue-500 text-black rounded hover:bg-blue-600 transition w-full">
            Zarejestruj się
        </button>
      </form>

      <p class="mt-4 text-center">
        Masz już konto? 
        <button @click="toggleRegistering" class="bg-blue-500 text-black rounded hover:bg-blue-500 transition w-full">Zaloguj się</button>
      </p>
    </div>

  </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';

export default {
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      isRegistering: false, // Stan do przełączania między formularzem logowania a rejestracji
    };
  },
  methods: {
    // Funkcja do logowania użytkownika
    async loginUser() {
      const auth = getAuth();
      try {
        const userCredential = await signInWithEmailAndPassword(auth, this.email, this.password);
        const user = userCredential.user;

        // Pobierz token i sprawdź rolę użytkownika
        const tokenResult = await user.getIdTokenResult();
        const isAdmin = tokenResult.claims.admin || false;

        if (isAdmin) {
          this.$router.push('/admin'); // Przekierowanie na panel administratora
        } else {
          this.$router.push('/'); // Przekierowanie na stronę główną
        }
      } catch (error) {
        this.errorMessage = 'Nie udało się zalogować: ' + error.message;
      }
    },
    
    // Funkcja do rejestracji użytkownika
    async registerUser() {
      if (this.password !== this.confirmPassword) {
        alert('Hasła się nie zgadzają');
        return;
      }

      const auth = getAuth();
      try {
        await createUserWithEmailAndPassword(auth, this.email, this.password);
        this.$router.push('/'); // Po rejestracji przekieruj na stronę główną
      } catch (error) {
        console.error('Błąd rejestracji:', error.message);
        alert('Błąd rejestracji: ' + error.message);
      }
    },

    // Funkcja do przełączania między formularzami logowania i rejestracji
    toggleRegistering() {
      this.isRegistering = !this.isRegistering;
    },
  },
};
</script>

<style scoped>
/* Opcjonalne stylowanie */
</style>
