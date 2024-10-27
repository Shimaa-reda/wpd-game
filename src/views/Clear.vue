<template>
  <div>
    Click Here to Clear Counters
    <button @click="clear">Clear</button>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// Define reactive state for counters and message
const loveCount = ref(0);
const careCount = ref(0);
const wishCount = ref(0);
const message = ref('');

// Get the router instance
const router = useRouter();

// Clear function to remove counters from localStorage and reset values
const clear = () => {
  // Clear specific counters from localStorage
  localStorage.removeItem('loveCount');
  localStorage.removeItem('careCount');
  localStorage.removeItem('wishCount');

  // Reset reactive state
  loveCount.value = 0;
  careCount.value = 0;
  wishCount.value = 0;

  // Set success message
  message.value = 'Data cleared successfully, back to home.';

  // Redirect to home after a short delay
  setTimeout(() => {
    message.value = ''; // Clear the message
    router.push('/');   // Navigate to the home route
  }, 2000); // 2 seconds delay
};
</script>

<style scoped>
/* Add any relevant styles here */
</style>
