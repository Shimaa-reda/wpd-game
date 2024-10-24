<template>
  <div class="background-container">
    <div class="content">
      
      <div class="top-right">
        <div class="counter">
          <span><img src="@/assets/images/love.png" alt="" style="width:25px; align-items:center"> 80 Love</span>
        </div>
        <div class="counter">
          <span><img src="@/assets/images/care.png" alt="" style="width:25px; align-items:center"> 94 Care</span>
        </div>
        <div class="counter">
          <span><img src="@/assets/images/wish.png" alt="" style="width:25px; align-items:center"> 56 Wishes</span>
        </div>
      </div>

      <div class="bottom-center">
        <!-- Step Slider -->
        <div class="step-slider">
          <div class="step" :class="{ checked: progressStep >= 1 }"></div>

          <div class="line" :class="{ active: progressStep >= 1 }"></div>

          <div class="step" :class="{ checked: progressStep >= 2 }"></div>

          <div class="line" :class="{ active: progressStep >= 2 }"></div>

          <div class="step" :class="{ checked: progressStep === 3 }"></div>

          <div class="line" :class="{ active: progressStep >= 3 }"></div>

          <div class="step" :class="{ checked: progressStep === 3 }"></div>

          <div class="line" :class="{ active: progressStep >= 3 }"></div>

          <div class="step" :class="{ checked: progressStep === 3 }"></div>

          <div class="line" :class="{ active: progressStep >= 3 }"></div>
        </div>
        
        <p><img src="@/assets/images/cursor.png" alt="" style="width:25px; align-items:center"> Tap to show some love to the baby</p>
        
        <div class="actions">
          <button class="action-btn"><img src="@/assets/images/love.png" alt="" style="width:25px; align-items:center"> Send Love</button>
          <button class="action-btn"><img src="@/assets/images/care.png" alt="" style="width:25px; align-items:center">Send Care</button>
          <button class="action-btn"><img src="@/assets/images/wish.png" alt="" style="width:25px; align-items:center">Send a wish</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
 import { ref } from 'vue';

// Define progressStep
const progressStep = ref(1); 
</script>

<style>
body {
  position: relative;
  margin: 0;
  background-image: url('@/assets/images/day1.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
}

.content {
  color: red;
  text-align: center;
}

/* Top section */
.top-right {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  gap: 10px;
  width: 450px;
  padding: 20px;
  border-radius: 50px;
  background-color: rgba(1, 1, 1, 0.2);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
}

.counter {
  background-color: rgba(255, 255, 255, 0.8);
  padding: 10px 20px;
  border-radius: 30px;
  font-weight: bold;
}

/* Bottom buttons */
.bottom-center {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  width: 650px;
  padding: 20px;
  border-radius: 50px 50px 0 0;
  background-color: rgba(1, 1, 1, 0.2);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
   display: flex;
  flex-direction: column;
  justify-content: center; 
  align-items: center; 
}

.bottom-center p {
  margin-bottom: 10px;
  font-size: 30px;
  font-weight: bold;
  color: #FFFFFF;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.action-btn {
  background-color: white;
  color: black;
  padding: 10px 20px;
  border: none;
  border-radius: 30px;
  cursor: pointer;
}

.action-btn:hover {
  background-color: #D5D5D5;
}

/* Responsive styling */
/* ipads */
@media (max-width: 768px) {
  body {
    
    background-size: cover;
  }

  .top-right {
    width: 300px;
    padding: 10px;
  }

  .counter {
    padding: 5px 10px;
    font-size: 12px;
  }

  .bottom-center {
    width: 300px;
    padding: 10px;
    border-radius: 30px 30px 0 0;
  }

  .bottom-center p {
    font-size: 18px;
  }

  .actions {
    gap: 5px;
  }

  .action-btn {
    padding: 8px 15px;
    font-size: 14px;
  }
}
/* mobiles */
@media (max-width: 480px) {
  .top-right {
    width: 250px;
  }

  .counter {
    padding: 3px 5px;
    font-size: 10px;
  }

  .bottom-center {
    width: 250px;
  }

  .bottom-center p {
    font-size: 16px;
  }

  .action-btn {
    padding: 5px 10px;
    font-size: 12px;
  }
}
</style>

<style scoped>
.step-slider {
  display: flex;
  align-items: center;
  margin-bottom: 20px !important;
}

.step {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.step-slider {
  width: 80%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0;
  justify-content: center
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.line {
  width: 60px !important;
  height: 25px;
  background: #D5D5D5;
  flex: 1;
  border-right: 1px solid white;
  border: 1px solid white;
}

.line:nth-of-type(2) {
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
}

.line:last-of-type {
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
}

/* Active state */
.line.active {
  background-color: #6ad042;
}

p {
 font-size: 30px;
 color: white;
 margin: 0;
 margin-bottom: 20px;
}
</style>
