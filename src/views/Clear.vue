<template>
  <div class="container">
    <div class="content">
      <h2>Clear Counters</h2>
      <button @click="clear" class="clear-button">Clear</button>
      <p v-if="message" class="message">{{ message }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';


const message = ref('');


const router = useRouter();

const clear = () => {
  // Clear specific counters from localStorage
  localStorage.removeItem('loveCount');
  localStorage.removeItem('careCount');
  localStorage.removeItem('wishCount');
  localStorage.removeItem('usedFacts');
  localStorage.removeItem('selectedOption');


  // Set success message
  message.value = 'Data cleared successfully, back to home.';

  
  setTimeout(() => {
    message.value = ''; 
    router.push('/');  
  }, 2000); 
};
</script>

<style scoped>

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; 
  background-color: #f0f0f0; 
}

.content {
  text-align: center;
  background-color: #ffffff; 
  padding: 20px;
  border-radius: 8px; 
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); 
}

h2 {
  margin-bottom: 20px; 
  color: #333; 
}

.clear-button {
  padding: 10px 20px; 
  background-color: #007bff; 
  color: white; 
  border: none; 
  border-radius: 4px; 
  cursor: pointer; 
  transition: background-color 0.3s; 
}

.clear-button:hover {
  background-color: #0056b3; 
}

.message {
  margin-top: 20px; 
  color: #28a745; 
}
</style>
