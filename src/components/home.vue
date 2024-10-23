<template>
  <div class="background-container">
    <nav class="navbar">
      <img src="@/assets/images/world prematurity day logo.png" alt="Left Logo" class="left-logo" />
      <img src="@/assets/images/care_logo.png" alt="Right Logo" class="right-logo" />
    </nav>
    
    <!-- Image centered vertically and aligned to the right -->
    <div class="content">
      <img src="@/assets/images/part_of_video.png" alt="Video Part" class="video-image" />
      <!-- Button  -->
      <button class="care-button" @click="navigateToDay">Deliver Your Care</button>
    </div>
    
    
    <img src="@/assets/images/astrazenca.png" alt="Bottom Right Logo" class="bottom-right-logo" />
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

const navigateToDay = () => {
  router.push({ name: 'day' }); 
};
</script>

<style scoped>
body {
  position: relative;
}

.background-container {
  background-image: url('@/assets/images/home_background.png');
  background-size: cover;
  background-position: center;
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.navbar {
  position: relative;
  width: 100%;
  height: 50px;
}

.left-logo {
  position: absolute;
  top: 60px;
  left: 60px;
}

.right-logo {
  position: absolute;
  top: 60px;
  right: 60px;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: flex-end; 
  height: 100%;
  justify-content: center; 
}

.video-image {
  width: 1000px; 
  margin-bottom: 20px; 
}

.care-button {
  background-color: #E44096;
  color: white;
  padding: 10px ;
  border: none;
  border-radius: 40px;
  font-size: 16px;
  cursor: pointer;
  width: 200px;
  position: absolute;
  right: 150px;
  bottom: 150px;
}

.care-button:hover {
  background-color: #D53886; 
}

.bottom-right-logo {
  position: absolute;
  bottom: 60px;
  right: 50px;
  height: 50px;
}

/* Media Query for Mobile Screens */
@media (max-width: 768px) {
  .left-logo {
    top: 20px;
    left: 20px;
    height: 40px;
  }

  .right-logo {
    top: 20px;
    right: 20px;
    height: 40px;
  }

  .bottom-right-logo {
    bottom: 20px;
    right: 20px;
    height: 40px;
  }

  .video-image {
    width: 100%; 
  }

  .care-button {
    
    text-align: center;
  }
}
</style>
