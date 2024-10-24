<template>
  <div class="background-container">
    <div class="content">
      <div class="top-right">
        <div class="counter">
          <span><img src="@/assets/images/love.png" alt="" style="width:25px; align-items:center"> {{ loveCount }} Love</span>
        </div>
        <div class="counter">
          <span><img src="@/assets/images/care.png" alt="" style="width:25px; align-items:center"> {{ careCount }} Care</span>
        </div>
        <div class="counter">
          <span><img src="@/assets/images/wish.png" alt="" style="width:25px; align-items:center"> {{ wishCount }} Wishes</span>
        </div>
      </div>

      <div class="bottom-center">
        <div class="step-slider">
          <div class="step" :class="{ checked: progressStep >= 1 }"></div>
          <div class="line" :class="{ active: progressStep >= 1 }"></div>
          <div class="step" :class="{ checked: progressStep >= 2 }"></div>
          <div class="line" :class="{ active: progressStep >= 2 }"></div>
          <div class="step" :class="{ checked: progressStep >= 3 }"></div>
          <div class="line" :class="{ active: progressStep >= 3 }"></div>
          <div class="step" :class="{ checked: progressStep >= 4 }"></div>
          <div class="line" :class="{ active: progressStep >= 4 }"></div>
          <div class="step" :class="{ checked: progressStep === 5 }"></div>
          <div class="line" :class="{ active: progressStep >= 5 }"></div> 
        </div>

        <p>
          <img src="@/assets/images/cursor.png" alt="" style="width:25px; align-items:center"> Tap to show some love to the baby
        </p>

        <div class="actions">
          <button class="action-btn" @click="sendLove"><img src="@/assets/images/love.png" alt="" style="width:25px; align-items:center"> Send Love</button>
          <button class="action-btn" @click="sendCare"><img src="@/assets/images/care.png" alt="" style="width:25px; align-items:center"> Send Care</button>
          <button class="action-btn" @click="sendWish"><img src="@/assets/images/wish.png" alt="" style="width:25px; align-items:center"> Send a Wish</button>
        </div>

        <!-- Displaying fact directly on the screen -->
        <div v-if="showFact" class="fact-display">
          <p>{{ currentFact }}</p>
        </div>

       
          
        
      
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const loveCount = ref(0);
const careCount = ref(0);
const wishCount = ref(0);
const progressStep = ref(0);
const showFact = ref(false);
const currentFact = ref("");
const facts = [
  "Fact 1: fact1",
  "Fact 2: fact2",
  "Fact 3: fact3",
  // Add more facts as needed
];
const usedFacts = ref([]);

function sendLove() {
  incrementCount('love');
}

function sendCare() {
  incrementCount('care');
}

function sendWish() {
  incrementCount('wish');
}

function incrementCount(type) {
  if (progressStep.value < 5) {
    progressStep.value += 1;

    if (type === 'love') loveCount.value += 1;
    if (type === 'care') careCount.value += 1;
    if (type === 'wish') wishCount.value += 1;

    // Show a fact when reaching a total of 5 clicks
    if (progressStep.value === 5) {
      showFactDisplay();
    }
  }
}

function showFactDisplay() {
  // Choose a random not used fact 
  let availableFacts = facts.filter(fact => !usedFacts.value.includes(fact));
  

  if (availableFacts.length === 0) {
    // If no facts available, reset used facts
    usedFacts.value = [];
    availableFacts = facts;
  }

  const randomIndex = Math.floor(Math.random() * availableFacts.length);
  currentFact.value = availableFacts[randomIndex];
  usedFacts.value.push(currentFact.value);

  showFact.value = true;

  // Reset progressStep after (3 seconds)
  setTimeout(() => {
    progressStep.value = 0; 
    showFact.value = false; 
  }, 3000); 
}
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

/* Fact Display */
.fact-display {
  margin-top: 20px;
  font-size: 24px;
  color: white;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 15px;
  border-radius: 10px;
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
