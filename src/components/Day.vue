<template>
  <div class="background-container">
    <nav v-if="showFact" class="navbar" style="z-index:2000">
      <img src="@/assets/images/logo_white.png" alt="Left Logo" class="left-logo" style="width:150px" />
      <img src="@/assets/images/care_white.png" alt="Right Logo" class="right-logo" style="width:150px" />
    </nav>
    
    <div v-if="showFact" class="ref container" style="z-index:2100">
        <p style="color:red" v-if="currentFact.rsv">RSV Info: {{ currentFact.rsv }}</p>
        <p style="color:red" v-if="currentFact.nicu">NICU Info: {{ currentFact.nicu }}</p>
        <p style="color:red" v-if="currentFact.reference">{{ currentFact.reference }}</p>

    </div>
    
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
      </div>

      <!-- Modal for displaying fact -->
      <div v-if="showFact" class="modal" style="z-index:1000">
        <div class="modal-content">
          <span class="close" @click="closeModal">×</span>
          <p style="color:red">{{ currentFact.text }}</p>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

// Initialize the counters
const loveCount = ref(0);
const careCount = ref(0);
const wishCount = ref(0);
const progressStep = ref(0);
const showFact = ref(false);
const currentFact = ref({});
const facts = ref([
  {
    id: 1,
    text: "World Prematurity Day aims to raise awareness of premature birth and the challenges that women and babies may face.",
    reference: "Reference: 1. UNICEF. World Prematurity Day 2023. Available at: https://www.unicef.org/vietnam/press-releases/world-prematurity-day-2023 . Last accessed: October 2024.",
    rsv: "",
    nicu: ""
  },
  {
    id: 2,
    text: "Globally, 15 million preterm births are estimated every year.",
    reference: "Reference: 1. UNICEF. World Prematurity Day 2023. Available at: https://www.unicef.org/vietnam/press-releases/world-prematurity-day-2023 . Last accessed: October 2024.",
    rsv: "",
    nicu: ""
  },
  {
    id: 3,
    text: "Preterm birth is the leading cause of child deaths, accounting for more than 1 in 5 of all deaths of children occurring before their fifth birthday.",
    reference: "Reference: 1. UNICEF. 150 million babies born preterm in the last decade. Available at: https://www.unicef.org/press-releases/150-million-babies-born-preterm-last-decade . Last accessed: October 2024. ",
    rsv: "",
    nicu: ""
  },
  {
    id: 4,
    text: "Preterm babies are at high risk for breathing difficulties due to their underdeveloped lungs.",
    reference: "Reference: 1. World Health Organization (WHO). Newborn health: Challenges facing preterm babies. Available at: https://www.who.int/news-room/questions-and-answers/item/newborn-health-challenges-facing-preterm-babies . Last accessed: October 2024. ",
    rsv: "",
    nicu: ""
  },
  {
    id: 5,
    text: "Important steps help to reduce the risk of preterm birth: Quit smoking and avoid alcohol. Get prenatal care early and throughout pregnancy. Seek medical attention for any signs or symptoms of preterm labor. Wait at least 18 months between pregnancies.",
    reference: "Reference: 1. Centers for Disease Control and Prevention (CDC). Preterm Birth. Available at: https://www.cdc.gov/maternal-infant-health/preterm-birth/index.html . Last accessed: October 2024.",
    rsv: "",
    nicu: ""
  },
  {
    id: 6,
    text: "Preterm babies are vulnerable to RSV-associated ALRI and severe disease because they have a less mature immune system, smaller airways, and diminished maternal antibody transfer.",
    reference: "Reference: 1. Wang X, Li Y, Shi T, Bont LJ, et al. Global disease burden of and risk factors for acute lower respiratory infections caused by respiratory syncytial virus in preterm infants and young children in 2019: a systematic review and meta-analysis of aggregated and individual participant data. The Lancet. 2024;403(10433):1241-1253.",
    rsv: "RSV: Respiratory syncytial virus, ALRI: Acute lower respiratory infections.",
    nicu: ""
  },
  {
    id: 7,
    text: "Preterm infants accounted for a quarter of RSV-associated ALRI hospitalizations in all infants.",
    reference: "Reference: 1. Wang X, Li Y, Shi T, Bont LJ, et al. Global disease burden of and risk factors for acute lower respiratory infections caused by respiratory syncytial virus in preterm infants and young children in 2019: a systematic review and meta-analysis of aggregated and individual participant data. The Lancet. 2024;403(10433):1241-1253.",
    rsv: "RSV: Respiratory syncytial virus, ALRI: Acute lower respiratory infections.",
    nicu: ""
  },
  {
    id: 8,
    text: "Mothers report significantly lower stress levels during Kangaroo Care compared to when the baby is receiving conventional care.",
    reference: "Reference: 1. World Health Organization (WHO). Kangaroo mother care: a practical guide. Available at:https://www.who.int/publications/i/item/9241590351#:~:text=Kangaroo%20mother%20care%20is%20a,birth%2Dweight%20and%20preterm%20infants.. Last accessed: October 2024.",
    rsv: "",
    nicu: ""
  },
  {
    id: 9,
    text: "For preterm babies in the NICU, the skin-to-skin contact can improve recovery time and help them leave the NICU sooner.",
    reference: "Reference: 1. Johns Hopkins All Children's Hospital. Kangaroo Care. Available at: https://www.hopkinsmedicine.org/all-childrens-hospital/services/maternal-fetal-neonatal-institute/neonatology/about-our-nicu/kangaroo-care . Last accessed: October 2024.",
    rsv: "",
    nicu: "NICU: Neonatal intensive care unit."
  }
]);
const usedFacts = ref([]);

// Load counts from localStorage when the component is mounted
onMounted(() => {
  loveCount.value = Number(localStorage.getItem('loveCount')) || 0;
  careCount.value = Number(localStorage.getItem('careCount')) || 0;
  wishCount.value = Number(localStorage.getItem('wishCount')) || 0;
  progressStep.value = 0; 
});

// Watchers to store the values in localStorage when they change
watch([loveCount, careCount, wishCount], ([newLove, newCare, newWish]) => {
  localStorage.setItem('loveCount', newLove);
  localStorage.setItem('careCount', newCare);
  localStorage.setItem('wishCount', newWish);
});

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
  // Increment the count only if it's less than 5
  if (progressStep.value < 5) {
    progressStep.value += 1;

    if (type === 'love') loveCount.value += 1;
    if (type === 'care') careCount.value += 1;
    if (type === 'wish') wishCount.value += 1;
    
    // Show a fact when reaching a total of 5 interactions
    if (progressStep.value === 5) {
      showRandomFact();
    }
  }
}

function showRandomFact() {
  if (facts.value.length > 0) {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * facts.value.length);
    } while (usedFacts.value.includes(randomIndex));
    
    currentFact.value = facts.value[randomIndex];
    usedFacts.value.push(randomIndex);
    showFact.value = true;

    // Reset progressStep to allow new interactions
    progressStep.value = 0;

    // Hide the fact after 5 seconds
    // setTimeout(closeModal, 5000);
  }
}


function closeModal() {
  showFact.value = false;
  currentFact.value = {};
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
  width: auto;
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

/* Modal styling */
.modal {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  
  
   background-color: rgba(1, 1, 1, 0.2);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
}

.modal-content {
  background-color: #fefefe; /* This can remain the same */
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 100%;
  max-width: 800px;
  border-radius: 10px;
  text-align: center;
}

/* Other styles remain unchanged */


.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
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
.ref {
  position: absolute; 
  bottom: 5px; 
  left: 80px; 
  z-index: 2100; 
  text-align: left;
 
  
}

.ref p{
    font-size: 18px;
    color: white !important;
    font-weight: bold;
}

</style>
