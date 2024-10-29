<template>
  <div class="container">
    <div class="content">
      <h2>Select an Option</h2>

      <!-- Dropdown for selecting an option -->
      <label for="option-select">Select an option:</label>
      <select id="option-select" v-model="selectedOption" class="dropdown">
        <option value="">--Select an option--</option>
        <option value="baby1">Baby 1</option>
        <option value="baby2">Baby 2</option>
        <option value="baby3">Baby 3</option>
        <option value="video">Video</option>
      </select>

      <button @click="saveOption" class="save-button">Save Option</button>
      <p v-if="message" :class="{'success-message': isSuccess, 'error-message': !isSuccess}">{{ message }}</p>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'; 

const selectedOption = ref(''); 
const message = ref(''); 
const isSuccess = ref(false); // Flag to determine if the message is success or error
const router = useRouter();

const saveOption = () => {
  if (selectedOption.value) {
    // Save selected option to localStorage
    localStorage.setItem('selectedOption', selectedOption.value);
    
    message.value = 'Option saved successfully!'; 
    isSuccess.value = true; // Set to true for success message
    
    // router.push({ name: 'day' });
  } else {
    message.value = 'Please select an option.'; 
    isSuccess.value = false; // Set to false for error message
  }
};
</script>


<style scoped>
.success-message {
  margin-top: 20px; 
  color: #28a745; /* Green color for success */
}

.error-message {
  margin-top: 20px; 
  color: red; /* Red color for error */
}

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

.save-button {
  padding: 10px 20px; 
  background-color: #99176e; 
  color: white; 
  border: none; 
  border-radius: 4px; 
  cursor: pointer; 
  transition: background-color 0.3s; 
}

.save-button:hover {
  background-color: #99176e; 
}

.message {
  margin-top: 20px; 
  color: #28a745; 
}

.dropdown {
  margin: 20px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
}
</style>
