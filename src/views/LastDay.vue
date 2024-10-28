<template>
  <div class="video-container">
    <!-- Navbar -->
    <nav v-if="showNav" class="navbar" style="z-index:1000">
      <img src="@/assets/images/world prematurity day logo.png" alt="Left Logo" class="left-logo" />
      <img src="@/assets/images/care_logo.png" alt="Right Logo" class="right-logo" />
    </nav>
    
    <!-- Bottom Right Logo -->
    <img 
      v-if="showNav" 
      src="@/assets/images/astrazenca.png" 
      alt="Bottom Right Logo" 
      class="bottom-right-logo" 
      style="z-index:1000"
    />
    
    <video ref="videoPlayer" autoplay loop :muted="isMuted" 
      width="500" 
      height="300" 
      playsinline @canplaythrough="playVideo" @ended="resetVideo">
      <source src="@/assets/images/Synagis - WPD Activation.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>

    <!-- Overlay for displaying counters -->
    <div class="counters-overlay">
      <div class="counter">
        <span>
          <img src="@/assets/images/love.png" alt="" style="width:25px;"> {{ loveCount }} Love
        </span>
      </div>
      <div class="counter">
        <span>
          <img src="@/assets/images/care.png" alt="" style="width:25px;"> {{ careCount }} Care
        </span>
      </div>
      <div class="counter">
        <span>
          <img src="@/assets/images/wish.png" alt="" style="width:25px;"> {{ wishCount }} Wishes
        </span>
      </div>
    </div>
  </div>
  <!-- Mute/Unmute Control -->
    <div 
      id="audio-control" 
      class="audio-control" 
      @click="toggleMute"
    >
      {{ isMuted ? 'Unmute' : 'Mute' }}
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router'; // Import the useRouter function

const loveCount = ref(0);
const careCount = ref(0);
const wishCount = ref(0);
const videoPlayer = ref(null);
const showNav = ref(false);
let animationFrameId;
const router = useRouter(); // Initialize the router

// Function to read counters from local storage
function loadCounters() {
  loveCount.value = Number(localStorage.getItem('loveCount')) || 0;
  careCount.value = Number(localStorage.getItem('careCount')) || 0;
  wishCount.value = Number(localStorage.getItem('wishCount')) || 0;
}

// Function to play video
function playVideo() {
  if (videoPlayer.value) {
    videoPlayer.value.play();
    monitorVideoTime(); // Start monitoring video time
    redirectToDayPage(); // Start the redirection timer
  }
}

// Function to reset video and start monitoring
function resetVideo() {
  videoPlayer.value.currentTime = 0;
  playVideo();
}

// Function to monitor video time and show/hide logos
function monitorVideoTime() {
  if (videoPlayer.value) {
    const currentTime = videoPlayer.value.currentTime;

    // Show logos in 11s and 26s
    if (currentTime >= 11 && currentTime < 26) {
      showNav.value = true;
    } else {
      showNav.value = false;
    }

    // Continue monitoring
    animationFrameId = requestAnimationFrame(monitorVideoTime);
  }
}

// Function to redirect to the Day page
function redirectToDayPage() {
  setTimeout(() => {
    router.push('/day'); // Change '/day' to your actual route
  }, 900000 ); // Redirect after 15 minutes
}

// Load counters and play video if mounted
onMounted(() => {
  loadCounters();
  playVideo();
});

// Stop monitoring when the component is unmounted
onUnmounted(() => {
  cancelAnimationFrame(animationFrameId);
});

// State to track mute status
const isMuted = ref(true);

// Function to toggle mute status
const toggleMute = () => {
  isMuted.value = !isMuted.value;

  // Get video element and update its muted property
  const videoElement = videoPlayer.value;
  if (videoElement) {
    videoElement.muted = isMuted.value;
  }
};
</script>

<style scoped>
.video-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  z-index: -1; 
}

video {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: translate(-50%, -50%);
}

/* Overlay for counters */
.counters-overlay {
  position: absolute;
  bottom: 10px; 
  left: 50%; 
  display: flex;
  gap: 30px;
  width: auto;
  padding: 20px;
  border-radius: 50px;
  background-color: rgba(1, 1, 1, 0.2);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  color: black;
  text-align: center; 
  transform: translateX(-50%); 
}

.counter {
  background-color: rgba(255, 255, 255, 0.8);
  padding: 10px 20px;
  border-radius: 30px;
  font-weight: bold;
}

.navbar {
  position: relative;
  width: 100%;
  height: 50px;
}

.left-logo {
  position: absolute;
  top: 10px; 
  left: 60px;
}

.right-logo {
  position: absolute;
  top: 10px; 
  right: 60px;
}

.bottom-right-logo {
  position: absolute;
  bottom: 15px;
  right: 30px;
  height: 50px;
}
.audio-control {
  display: inline-block;
  padding: 10px 20px;
  background-color: #99176e; 
  color: white;
  cursor: pointer;
  border-radius: 5px;
  text-align: center;
  transition: background-color 0.3s;
  position: absolute;
  left: 40px;
  bottom: 10px;
}

.audio-control:hover {
  background-color: #99176e; 
}
</style>
