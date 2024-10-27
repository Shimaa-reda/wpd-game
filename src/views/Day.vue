<template>
  <div class="background-container">
    <nav v-if="showFact" class="navbar" style="z-index:2000">
      <img src="@/assets/images/logo_white.png" alt="Left Logo" class="left-logo" style="width:150px" />
      <img src="@/assets/images/care_white.png" alt="Right Logo" class="right-logo" style="width:150px" />
    </nav>
    
    <div v-if="showFact" class="ref container" style="z-index:2100">
        <p style="color:red" v-if="currentFact.rsv">{{ currentFact.rsv }}</p>
        <p style="color:red" v-if="currentFact.nicu">{{ currentFact.nicu }}</p>
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
      <!-- <div v-if="showFact" class="modal" style="z-index:1000">
        <div class="modal-content">
          <span class="close" @click="closeModal">×</span>
          <p style="color:red">{{ currentFact.text }}</p>
        </div>
      </div> -->

      <div v-if="showFact" class="modal-overlay">
          <div class="modal-content">
            <button class="close-btn" @click="closeModal">×</button>
            <h2 class="modal-title">
              Thank you for being part of the chain of care! <br />
              Here are some important facts.
            </h2>
            <div class="modal-body">
              <p v-html="currentFact.text">
                
              </p>
              <button class="modal-button" @click="closeModal">Wrap Up Your Care – Now You Know More!</button>
            </div>
          </div>
  
       </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const loveCount = ref(0);
const careCount = ref(0);
const wishCount = ref(0);
const progressStep = ref(0);
const showFact = ref(false);
const currentFact = ref({});
let idleTimeout = null; // Holds the idle timeout reference

// console.log("idel",idleTimeout)
const originalFacts = [
  {
    id: 1,
    text: "World Prematurity Day aims to raise awareness of premature birth and the challenges that women and babies may face.<sup>1</sup>",
    reference: "Reference: 1. UNICEF. World Prematurity Day 2023. Available at: https://www.unicef.org/vietnam/press-releases/world-prematurity-day-2023 . Last accessed: October 2024.",
    rsv: "",
    nicu: ""
  },
  {
    id: 2,
    text: "Globally, <strong>15 million</strong> preterm births are estimated every year.<sup>1</sup>",
    reference: "Reference: 1. UNICEF. World Prematurity Day 2023. Available at: https://www.unicef.org/vietnam/press-releases/world-prematurity-day-2023 . Last accessed: October 2024.",
    rsv: "",
    nicu: ""
  },
  {
    id: 3,
    text: "Preterm birth is the leading cause of child deaths, accounting for <strong>more than 1 in 5 of all deaths</strong> of children occurring before their fifth birthday.<sup>1</sup>",
    reference: "Reference: 1. UNICEF. 150 million babies born preterm in the last decade. Available at: https://www.unicef.org/press-releases/150-million-babies-born-preterm-last-decade . Last accessed: October 2024. ",
    rsv: "",
    nicu: ""
  },
  {
    id: 4,
    text: "Preterm babies are at high risk for breathing difficulties due to their underdeveloped lungs.<sup>1</sup>",
    reference: "Reference: 1. World Health Organization (WHO). Newborn health: Challenges facing preterm babies. Available at: https://www.who.int/news-room/questions-and-answers/item/newborn-health-challenges-facing-preterm-babies . Last accessed: October 2024. ",
    rsv: "",
    nicu: ""
  },
  {
    id: 5,
    text: `
      <div style="text-align:left;">
        Important steps help to reduce the risk of preterm birth:<sup>1</sup>
        <ul style="list-style-type: disc;   margin-bottom:-20px">
          <li style="margin-top: 10px;">Quit smoking and avoid alcohol.</li>
          <li>Get prenatal care early and throughout pregnancy.</li>
          <li>Seek medical attention for any signs or symptoms of preterm labor.</li>
          <li>Wait at least 18 months between pregnancies.</li>
        </ul>
      </div>
    `,
    reference: "Reference: 1. Centers for Disease Control and Prevention (CDC). Preterm Birth. Available at: https://www.cdc.gov/maternal-infant-health/preterm-birth/index.html . Last accessed: October 2024.",
    rsv: "",
    nicu: ""
  },
  {
    id: 6,
    text: "Preterm babies are vulnerable to <strong>RSV-associated ALRI</strong> and severe disease because they have a less mature immune system, smaller airways, and diminished maternal antibody transfer.<sup>1</sup>",
    reference: "Reference: 1. Wang X, Li Y, Shi T, Bont LJ, et al. Global disease burden of and risk factors for acute lower respiratory infections caused by respiratory syncytial virus in preterm infants and young children in 2019: a systematic review and meta-analysis of aggregated and individual participant data. The Lancet. 2024;403(10433):1241-1253.",
    rsv: "RSV: Respiratory syncytial virus, ALRI: Acute lower respiratory infections.",
    nicu: ""
  },
  {
    id: 7,
    text: "Preterm infants accounted for a <strong>quarter</strong> of RSV-associated ALRI hospitalizations in all infants.<sup>1</sup>",
    reference: "Reference: 1. Wang X, Li Y, Shi T, Bont LJ, et al. Global disease burden of and risk factors for acute lower respiratory infections caused by respiratory syncytial virus in preterm infants and young children in 2019: a systematic review and meta-analysis of aggregated and individual participant data. The Lancet. 2024;403(10433):1241-1253.",
    rsv: "RSV: Respiratory syncytial virus, ALRI: Acute lower respiratory infections.",
    nicu: ""
  },
  {
    id: 8,
    text: "Mothers report <strong>significantly lower stress levels</strong> during <strong>Kangaroo Care</strong> compared to when the baby is receiving conventional care.<sup>1</sup>",
    reference: "Reference: 1. World Health Organization (WHO). Kangaroo mother care: a practical guide. Available at :https://www.who.int/publications/i/item/9241590351#:~:text=Kangaroo%20mother%20care%20is%20a,birth%2Dweight%20and%20preterm%20infants.. Last accessed: October 2024.",
    rsv: "",
    nicu: ""
  },
  {
    id: 9,
    text: "For preterm babies in the NICU, <strong>the skin-to-skin contact</strong> can <strong>improve recovery time</strong> and help them leave the NICU sooner.<sup>1</sup>",
    reference: "Reference: 1. Johns Hopkins All Children's Hospital. Kangaroo Care. Available at: https://www.hopkinsmedicine.org/all-childrens-hospital/services/maternal-fetal-neonatal-institute/neonatology/about-our-nicu/kangaroo-care . Last accessed: October 2024.",
    rsv: "",
    nicu: "NICU: Neonatal intensive care unit."
  }
];

const facts = ref([...originalFacts]); // Initialize facts with the original list
const usedFacts = ref([]);
// Set up idle timer on mount and clear on unmount
onMounted(() => {
  
  loadCounts();
  console.log("idel onmounted",idleTimeout)
  resetIdleTimer();
  
  const body = document.body;
  const date = new Date("29 October 2024");
  const day = date.getDate();
  const month = date.getMonth() + 1; // getMonth() returns 0-11
  console.log("day",day,"month",month);

  let backgroundImage = '';

  // Define your background images based on day and month
  if (month === 10 && day === 29) {
    backgroundImage = new URL('@/assets/images/day1.png', import.meta.url).href;
   
  } else if (month === 10 && day === 30) {
    backgroundImage = new URL('@/assets/images/day2.png', import.meta.url).href;
   
  } else if (month === 10 && day === 31) {
    backgroundImage = new URL('@/assets/images/day3.png', import.meta.url).href;
    
  } else if (month === 11 && day === 1) {
    
    router.push({ name: 'lastday' });
  }

  body.style.backgroundImage = `url(${backgroundImage})`;
});

onUnmounted(() => {
  console.log("idel onunmounted",idleTimeout)
  clearTimeout(idleTimeout);
});
function showRandomFact() {
  if (facts.value.length > 0) {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * facts.value.length);
    } while (usedFacts.value.includes(randomIndex));
    
    currentFact.value = facts.value[randomIndex];
    usedFacts.value.push(randomIndex);
    showFact.value = true;
    progressStep.value = 0;
  }
  
  // Reset facts and usedFacts once all facts have been shown
  if (usedFacts.value.length === facts.value.length) {
    usedFacts.value = [];
    facts.value = [...originalFacts]; // Reset facts
  }
}

function loadCounts() {
  loveCount.value = Number(localStorage.getItem('loveCount')) || 0;
  careCount.value = Number(localStorage.getItem('careCount')) || 0;
  wishCount.value = Number(localStorage.getItem('wishCount')) || 0;
  progressStep.value = 0;
}
// Watchers to store the values in localStorage when they change
watch([loveCount, careCount, wishCount], ([newLove, newCare, newWish]) => {
  localStorage.setItem('loveCount', newLove);
  localStorage.setItem('careCount', newCare);
  localStorage.setItem('wishCount', newWish);
});
function resetIdleTimer() {
  clearTimeout(idleTimeout);
  idleTimeout = setTimeout(() => {
    router.push({ name: 'home' }); // Redirect to the home page after 2 mins
  }, 120000); // 2 minutes
}

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
  resetIdleTimer(); // Reset the idle timer on any button click

  if (progressStep.value < 5) {
    progressStep.value += 1;
    if (type === 'love') loveCount.value += 1;
    if (type === 'care') careCount.value += 1;
    if (type === 'wish') wishCount.value += 1;
    
    if (progressStep.value === 5) {
      showRandomFact();
    }
  }
}

function closeModal() {
  showFact.value = false;
  currentFact.value = {};
}
// Set the background image based on the current date

</script>

<style>

body {
  position: relative;
  margin: 0;
  /* background-image: url('@/assets/images/day1.png'); */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
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
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(1, 1, 1, 0.2);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}
.modal-content {
  
  padding: 20px;
  border-radius: 20px;
  text-align: center;
  max-width: 700px;
  width: 100%;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 7px; 
  left: 105%; 
  transform: translate(-100%, 0);
  background: white;
  border: none;
  font-size: 1.5rem; 
  cursor: pointer;
  color: #b0afa1;
  width: 30px; 
  height: 30px; 
  border-radius: 50%; 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  padding: 0; 
  text-align: center;
}


.modal-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;
  padding: 15px;
  background-color: transparent;
  border-radius: 30px;
  width: 100%!important;
  border: 1px solid white;
}

.modal-body {
  margin-top: 20px;
  background-color: rgba(255, 255, 255, 0.7); 
  padding: 30px;
  border-radius: 40px;
  width: 80%;
  margin-left: 70px;
}

.modal-body p {
  font-size: 1rem;
  color: #333;
  padding:20px !important;
}

.modal-button {
 
  padding: 10px 20px;
  background-color: #f2f2f2;
  border: none;
  border-radius: 40px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  color: #333;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4); 
  margin-bottom: 50px;
}

.modal-button:hover {
  box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.15);
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



.ref {
  position: absolute; 
  bottom: 5px; 
  left: 80px; 
  z-index: 2100; 
  text-align: left;
  width: 1200px;
 
  
}

.ref p{
    font-size: 17px;
    color: white !important;
    
}

/* desktop */
@media (min-width: 1024px) {
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
   .left-logo {
    top: 20px;
    left: 0;
    
  }

  .right-logo {
    top: 20px;
    right: 0;
 
  }
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
