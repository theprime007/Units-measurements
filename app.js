// RRB Mock Test Application - Main JavaScript File

// Questions data
const QUESTIONS = [
  {"id":1,"question":"The dimensional formula [ML²T⁻¹] represents:","options":["Angular momentum","Linear momentum","Energy","Power"],"correctIndex":0,"topic":"Basic Dimensions","difficulty":"Easy","solution":"Angular momentum L = mvr so [M][LT⁻¹][L] = [ML²T⁻¹]."},
  {"id":2,"question":"In F = kmᵃvᵇ (F is force), what are values of a and b?","options":["a = 2, b = 1","a = 1, b = 2","a = 1, b = 1","a = 2, b = 2"],"correctIndex":1,"topic":"Dimensional Equations","difficulty":"Medium","solution":"Comparing M, L, T powers gives a = 1, b = 2."},
  {"id":3,"question":"What is the dimensional formula for pressure gradient?","options":["[ML⁻²T⁻²]","[ML⁻¹T⁻²]","[ML⁻⁴T⁻²]","[ML⁻³T⁻²]"],"correctIndex":0,"topic":"Derived Quantities","difficulty":"Medium","solution":"Pressure/length so [ML⁻¹T⁻²]/[L] = [ML⁻²T⁻²]."},
  {"id":4,"question":"The dimensions of gravitational constant G are:","options":["[M⁻¹L⁻³T⁻²]","[M⁻¹L³T⁻²]","[ML³T⁻²]","[M⁻²L³T⁻²]"],"correctIndex":1,"topic":"Gravitation","difficulty":"Medium","solution":"From F = GMm/r², solve for [G]."},
  {"id":5,"question":"In the equation E = mc², c² has dimensions:","options":["[L²T⁻²]","[LT⁻¹]","[L²T⁻¹]","[LT⁻²]"],"correctIndex":0,"topic":"Relativity","difficulty":"Easy","solution":"E/m gives [L²T⁻²]."},
  {"id":6,"question":"The dimensional formula for electric field is:","options":["[MLT⁻²I⁻¹]","[MLT⁻³I⁻¹]","[ML²T⁻³I⁻¹]","[ML²T⁻²I⁻¹]"],"correctIndex":1,"topic":"Electricity","difficulty":"Medium","solution":"Force/charge = [MLT⁻²]/[IT]."},
  {"id":7,"question":"Surface tension has the dimensional formula:","options":["[ML⁻¹T⁻²]","[MT⁻²]","[MLT⁻²]","[ML²T⁻²]"],"correctIndex":1,"topic":"Fluid Mechanics","difficulty":"Medium","solution":"Force/length = [MT⁻²]."},
  {"id":8,"question":"In wave equation v = λ/T, v has dimensions:","options":["[LT⁻¹]","[L²T⁻¹]","[LT⁻²]","[L²T⁻²]"],"correctIndex":0,"topic":"Waves","difficulty":"Easy","solution":"[L]/[T]."},
  {"id":9,"question":"Planck's constant has dimensions:","options":["[ML²T⁻¹]","[MLT⁻¹]","[ML²T⁻²]","[ML²T⁻³]"],"correctIndex":0,"topic":"Quantum","difficulty":"Medium","solution":"Energy·time = [ML²T⁻²][T]."},
  {"id":10,"question":"The dimensional formula [M⁻¹L⁻²T⁴I²] represents:","options":["Inductance","Capacitance","Resistance","Conductance"],"correctIndex":1,"topic":"Electricity","difficulty":"Medium","solution":"C = Q/V gives [IT]/[ML²T⁻³I⁻¹]."},
  {"id":11,"question":"Which quantity has dimensions [ML⁻¹T⁻¹]?","options":["Viscosity","Surface tension","Pressure","Density"],"correctIndex":0,"topic":"Fluid Mechanics","difficulty":"Medium","solution":"Dynamic viscosity η has dimensions [ML⁻¹T⁻¹]."},
  {"id":12,"question":"The dimensional formula for magnetic field B is:","options":["[MT⁻²I⁻¹]","[MLT⁻²I⁻¹]","[M⁰LT⁻²I⁻¹]","[ML⁰T⁻²I⁻¹]"],"correctIndex":0,"topic":"Magnetism","difficulty":"Medium","solution":"From F = BIl, [B] = [MLT⁻²]/[I][L] = [MT⁻²I⁻¹]."},
  {"id":13,"question":"Young's modulus has the same dimensions as:","options":["Force","Pressure","Energy","Power"],"correctIndex":1,"topic":"Elasticity","difficulty":"Easy","solution":"Stress/strain = [ML⁻¹T⁻²]/[dimensionless] = [ML⁻¹T⁻²]."},
  {"id":14,"question":"The dimensional formula for impulse is:","options":["[MLT⁻¹]","[ML²T⁻¹]","[MLT⁻²]","[ML²T⁻²]"],"correctIndex":0,"topic":"Mechanics","difficulty":"Easy","solution":"Impulse = Force × time = [MLT⁻²][T] = [MLT⁻¹]."},
  {"id":15,"question":"Coefficient of friction is:","options":["[ML⁻¹T⁻²]","[MLT⁻²]","[M⁰L⁰T⁰]","[ML⁻²T⁻²]"],"correctIndex":2,"topic":"Friction","difficulty":"Easy","solution":"Friction force/Normal force is dimensionless."},
  {"id":16,"question":"The dimensions of electric potential are:","options":["[ML²T⁻³I⁻¹]","[MLT⁻³I⁻¹]","[ML²T⁻²I⁻¹]","[ML³T⁻³I⁻¹]"],"correctIndex":0,"topic":"Electricity","difficulty":"Medium","solution":"Work/charge = [ML²T⁻²]/[IT] = [ML²T⁻³I⁻¹]."},
  {"id":17,"question":"Power has dimensional formula:","options":["[ML²T⁻²]","[ML²T⁻³]","[MLT⁻³]","[ML³T⁻³]"],"correctIndex":1,"topic":"Power","difficulty":"Easy","solution":"Energy/time = [ML²T⁻²]/[T] = [ML²T⁻³]."},
  {"id":18,"question":"The dimensional formula for torque is:","options":["[ML²T⁻²]","[MLT⁻²]","[ML²T⁻¹]","[ML²T⁻³]"],"correctIndex":0,"topic":"Rotational Mechanics","difficulty":"Medium","solution":"Force × distance = [MLT⁻²][L] = [ML²T⁻²]."},
  {"id":19,"question":"Specific heat capacity has dimensions:","options":["[L²T⁻²K⁻¹]","[ML²T⁻²K⁻¹]","[LT⁻²K⁻¹]","[M⁻¹L²T⁻²K⁻¹]"],"correctIndex":0,"topic":"Thermodynamics","difficulty":"Medium","solution":"Energy/(mass × temperature) = [ML²T⁻²]/[M][K] = [L²T⁻²K⁻¹]."},
  {"id":20,"question":"The dimensional formula for frequency is:","options":["[T]","[T⁻¹]","[LT⁻¹]","[M⁰L⁰T⁻¹]"],"correctIndex":3,"topic":"Oscillations","difficulty":"Easy","solution":"1/time period = 1/[T] = [T⁻¹]."},
  {"id":21,"question":"Bulk modulus has the same dimensions as:","options":["Density","Pressure","Volume","Area"],"correctIndex":1,"topic":"Elasticity","difficulty":"Medium","solution":"Stress = [ML⁻¹T⁻²], same as pressure."},
  {"id":22,"question":"The dimensions of magnetic flux are:","options":["[ML²T⁻²I⁻¹]","[ML²T⁻¹I⁻¹]","[MLT⁻²I⁻¹]","[ML³T⁻²I⁻¹]"],"correctIndex":0,"topic":"Magnetism","difficulty":"Hard","solution":"Φ = BA, so [MT⁻²I⁻¹][L²] = [ML²T⁻²I⁻¹]."},
  {"id":23,"question":"In P = F/A, if F has dimensions [MLT⁻²], then P has:","options":["[ML⁻¹T⁻²]","[MLT⁻²]","[ML²T⁻²]","[MT⁻²]"],"correctIndex":0,"topic":"Pressure","difficulty":"Easy","solution":"Force/area = [MLT⁻²]/[L²] = [ML⁻¹T⁻²]."},
  {"id":24,"question":"The dimensional formula for permittivity of free space ε₀ is:","options":["[M⁻¹L⁻³T⁴I²]","[ML⁻³T⁴I²]","[M⁻¹L⁻²T⁴I²]","[ML⁻²T⁴I²]"],"correctIndex":0,"topic":"Electricity","difficulty":"Hard","solution":"From Coulomb's law, solve for [ε₀]."},
  {"id":25,"question":"Moment of inertia has dimensions:","options":["[ML²]","[ML²T⁻²]","[MLT⁻²]","[M²L²]"],"correctIndex":0,"topic":"Rotational Mechanics","difficulty":"Medium","solution":"I = mr², so [M][L²] = [ML²]."},
  {"id":26,"question":"The dimensional formula for electric current density is:","options":["[IL⁻²]","[I]","[IL⁻¹]","[IL⁻³]"],"correctIndex":0,"topic":"Current Electricity","difficulty":"Medium","solution":"Current/area = [I]/[L²] = [IL⁻²]."},
  {"id":27,"question":"Thermal conductivity has dimensions:","options":["[MLT⁻³K⁻¹]","[ML²T⁻³K⁻¹]","[MLT⁻²K⁻¹]","[ML³T⁻³K⁻¹]"],"correctIndex":0,"topic":"Heat Transfer","difficulty":"Hard","solution":"Heat flow rate/(area × temperature gradient)."},
  {"id":28,"question":"The dimensions of acceleration are:","options":["[LT⁻¹]","[LT⁻²]","[MLT⁻²]","[L²T⁻²]"],"correctIndex":1,"topic":"Kinematics","difficulty":"Easy","solution":"Velocity/time = [LT⁻¹]/[T] = [LT⁻²]."},
  {"id":29,"question":"Universal gas constant R has dimensions:","options":["[ML²T⁻²K⁻¹mol⁻¹]","[MLT⁻²K⁻¹mol⁻¹]","[ML²T⁻³K⁻¹mol⁻¹]","[M²L²T⁻²K⁻¹mol⁻¹]"],"correctIndex":0,"topic":"Thermodynamics","difficulty":"Hard","solution":"PV = nRT, solve for [R]."},
  {"id":30,"question":"The dimensional formula for angular velocity is:","options":["[T⁻¹]","[LT⁻¹]","[ML²T⁻¹]","[M⁰L⁰T⁻¹]"],"correctIndex":3,"topic":"Rotational Motion","difficulty":"Easy","solution":"Angle/time = [dimensionless]/[T] = [T⁻¹]."},
  {"id":31,"question":"Electric resistance has dimensions:","options":["[ML²T⁻³I⁻²]","[MLT⁻³I⁻²]","[ML²T⁻²I⁻²]","[M²L²T⁻³I⁻²]"],"correctIndex":0,"topic":"Electricity","difficulty":"Medium","solution":"V/I = [ML²T⁻³I⁻¹]/[I] = [ML²T⁻³I⁻²]."},
  {"id":32,"question":"The dimensions of gravitational field are:","options":["[LT⁻²]","[MLT⁻²]","[ML²T⁻²]","[M⁻¹LT⁻²]"],"correctIndex":0,"topic":"Gravitation","difficulty":"Medium","solution":"Force/mass = [MLT⁻²]/[M] = [LT⁻²]."},
  {"id":33,"question":"Poisson's ratio is:","options":["[ML⁻¹T⁻²]","[M⁰L⁰T⁰]","[LT⁻²]","[MLT⁻²]"],"correctIndex":1,"topic":"Elasticity","difficulty":"Easy","solution":"Lateral strain/longitudinal strain is dimensionless."},
  {"id":34,"question":"The dimensional formula for energy density is:","options":["[ML⁻¹T⁻²]","[ML²T⁻²]","[MLT⁻²]","[M²LT⁻²]"],"correctIndex":0,"topic":"Energy","difficulty":"Medium","solution":"Energy/volume = [ML²T⁻²]/[L³] = [ML⁻¹T⁻²]."},
  {"id":35,"question":"Magnetic permeability μ₀ has dimensions:","options":["[MLT⁻²I⁻²]","[M²LT⁻²I⁻²]","[ML²T⁻²I⁻²]","[MLT⁻³I⁻²]"],"correctIndex":0,"topic":"Magnetism","difficulty":"Hard","solution":"From magnetic force law, derive [μ₀]."},
  {"id":36,"question":"The dimensions of stress are:","options":["[ML⁻¹T⁻²]","[MLT⁻²]","[ML²T⁻²]","[MT⁻²]"],"correctIndex":0,"topic":"Mechanics","difficulty":"Medium","solution":"Force/area = [MLT⁻²]/[L²] = [ML⁻¹T⁻²]."},
  {"id":37,"question":"Kinetic energy has dimensional formula:","options":["[ML²T⁻²]","[MLT⁻²]","[ML²T⁻¹]","[M²L²T⁻²]"],"correctIndex":0,"topic":"Energy","difficulty":"Easy","solution":"½mv² = [M][LT⁻¹]² = [ML²T⁻²]."},
  {"id":38,"question":"The dimensions of electric flux are:","options":["[ML³T⁻³I⁻¹]","[ML²T⁻³I⁻¹]","[MLT⁻³I⁻¹]","[ML⁴T⁻³I⁻¹]"],"correctIndex":0,"topic":"Electricity","difficulty":"Hard","solution":"Electric field × area = [MLT⁻³I⁻¹][L²]."},
  {"id":39,"question":"Wavelength has dimensions:","options":["[L]","[LT⁻¹]","[T]","[M⁰L¹T⁰]"],"correctIndex":3,"topic":"Waves","difficulty":"Easy","solution":"Wavelength is a length = [L]."},
  {"id":40,"question":"The dimensional formula for force constant is:","options":["[MT⁻²]","[MLT⁻²]","[ML²T⁻²]","[M²T⁻²]"],"correctIndex":0,"topic":"Oscillations","difficulty":"Medium","solution":"Force/displacement = [MLT⁻²]/[L] = [MT⁻²]."},
  {"id":41,"question":"Coefficient of linear expansion has dimensions:","options":["[K⁻¹]","[LK⁻¹]","[M⁰L⁰T⁰K⁻¹]","[MLK⁻¹]"],"correctIndex":2,"topic":"Thermal Expansion","difficulty":"Medium","solution":"Fractional change in length per unit temperature change."},
  {"id":42,"question":"The dimensions of electric charge are:","options":["[I]","[IT]","[MLT⁻¹]","[ML²T⁻²]"],"correctIndex":1,"topic":"Electricity","difficulty":"Easy","solution":"Current × time = [I][T] = [IT]."},
  {"id":43,"question":"Entropy has dimensional formula:","options":["[ML²T⁻²K⁻¹]","[MLT⁻²K⁻¹]","[ML³T⁻²K⁻¹]","[M²L²T⁻²K⁻¹]"],"correctIndex":0,"topic":"Thermodynamics","difficulty":"Hard","solution":"Energy/temperature = [ML²T⁻²]/[K]."},
  {"id":44,"question":"The dimensions of momentum are:","options":["[MLT⁻¹]","[ML²T⁻¹]","[MLT⁻²]","[M²LT⁻¹]"],"correctIndex":0,"topic":"Mechanics","difficulty":"Easy","solution":"Mass × velocity = [M][LT⁻¹] = [MLT⁻¹]."},
  {"id":45,"question":"Electric field intensity has dimensions:","options":["[MLT⁻³I⁻¹]","[ML²T⁻³I⁻¹]","[MLT⁻²I⁻¹]","[M²LT⁻³I⁻¹]"],"correctIndex":0,"topic":"Electricity","difficulty":"Medium","solution":"Force per unit charge = [MLT⁻²]/[IT]."},
  {"id":46,"question":"The dimensional formula for angular acceleration is:","options":["[T⁻²]","[LT⁻²]","[M⁰L⁰T⁻²]","[MLT⁻²]"],"correctIndex":2,"topic":"Rotational Motion","difficulty":"Medium","solution":"Angular velocity/time = [T⁻¹]/[T] = [T⁻²]."},
  {"id":47,"question":"Latent heat has dimensions:","options":["[L²T⁻²]","[ML²T⁻²]","[MLT⁻²]","[M⁻¹L²T⁻²]"],"correctIndex":0,"topic":"Heat","difficulty":"Medium","solution":"Energy per unit mass = [ML²T⁻²]/[M] = [L²T⁻²]."},
  {"id":48,"question":"The dimensions of pressure are:","options":["[ML⁻¹T⁻²]","[MLT⁻²]","[ML²T⁻²]","[M²LT⁻²]"],"correctIndex":0,"topic":"Fluid Mechanics","difficulty":"Easy","solution":"Force per unit area = [MLT⁻²]/[L²]."},
  {"id":49,"question":"Velocity gradient has dimensions:","options":["[T⁻¹]","[LT⁻²]","[M⁰L⁰T⁻¹]","[LT⁻¹]"],"correctIndex":2,"topic":"Fluid Flow","difficulty":"Medium","solution":"Velocity/distance = [LT⁻¹]/[L] = [T⁻¹]."},
  {"id":50,"question":"The dimensional formula for capacitance is:","options":["[M⁻¹L⁻²T⁴I²]","[ML⁻²T⁴I²]","[M⁻¹LT⁴I²]","[ML⁻³T⁴I²]"],"correctIndex":0,"topic":"Electricity","difficulty":"Hard","solution":"Charge/potential = [IT]/[ML²T⁻³I⁻¹] = [M⁻¹L⁻²T⁴I²]."}
];

// Application State
let state = {
  answers: Array(50).fill(null),
  bookmarked: Array(50).fill(false),
  timeSpent: Array(50).fill(0),
  currentQ: 0,
  testStart: null,
  testEnd: null,
  testDuration: 60, // minutes
  isRRBMode: false,
  isDarkMode: false,
  enhancedTimer: false,
  reviewCurrentQ: 0,
  results: null,
  questionSource: 'default',
  customQuestions: null
};

// Timers and managers
let mainTimer = null;
let questionTimer = null;
let questionStartTime = null;
let autoSaveInterval = null;
let customMainTimer = null;
let customQuestionTimer = null;
let questionManager = null;

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
  try {
    // Initialize question manager
    questionManager = new QuestionManager();
    
    loadState();
    setupEventListeners();
    updateLandingView();
    
    // Check if there's a saved test in progress
    if (state.testStart && !state.testEnd) {
      document.getElementById('resume-test-btn').classList.remove('hidden');
    }
  } catch (error) {
    console.error('Initialization error:', error);
  }
});

// Event Listeners
function setupEventListeners() {
  try {
    // Landing view
    document.getElementById('start-test-btn').addEventListener('click', startTest);
    document.getElementById('resume-test-btn').addEventListener('click', resumeTest);
    document.getElementById('reset-test-btn').addEventListener('click', resetTest);
    document.getElementById('test-duration').addEventListener('change', updateTestDuration);
    document.getElementById('rrb-mode').addEventListener('change', toggleRRBMode);
    document.getElementById('dark-mode').addEventListener('change', toggleDarkMode);
    document.getElementById('enhanced-timer').addEventListener('change', toggleEnhancedTimer);
    document.getElementById('question-source').addEventListener('change', toggleQuestionSource);
    document.getElementById('json-file').addEventListener('change', handleJSONUpload);
    document.getElementById('download-example-btn').addEventListener('click', downloadExampleJSON);

    // Test view
    document.getElementById('bookmark-btn').addEventListener('click', toggleBookmark);
    document.getElementById('clear-answer-btn').addEventListener('click', clearAnswer);
    document.getElementById('prev-btn').addEventListener('click', () => navigateQuestion(-1));
    document.getElementById('next-btn').addEventListener('click', () => navigateQuestion(1));
    document.getElementById('review-panel-btn').addEventListener('click', showReviewPanel);
    document.getElementById('submit-test-btn').addEventListener('click', submitTest);

    // Review panel
    document.getElementById('close-review-btn').addEventListener('click', hideReviewPanel);
    document.getElementById('submit-from-review-btn').addEventListener('click', submitTest);
    document.querySelector('.modal-close').addEventListener('click', hideReviewPanel);
    document.querySelector('.modal-backdrop').addEventListener('click', hideReviewPanel);

    // Result view
    document.getElementById('review-answers-btn').addEventListener('click', showReviewAnswers);
    document.getElementById('view-solutions-btn').addEventListener('click', showReviewAnswers);
    document.getElementById('export-results-btn').addEventListener('click', exportResults);
    document.getElementById('new-test-btn').addEventListener('click', startNewTest);

    // Review answers view
    document.getElementById('back-to-results-btn').addEventListener('click', showResults);
    document.getElementById('review-prev-btn').addEventListener('click', () => navigateReview(-1));
    document.getElementById('review-next-btn').addEventListener('click', () => navigateReview(1));

    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboard);
  } catch (error) {
    console.error('Event listener setup error:', error);
  }
}

// Keyboard handling
function handleKeyboard(e) {
  if (!document.getElementById('test-view').classList.contains('active')) return;
  
  switch(e.key) {
    case 'ArrowLeft':
      e.preventDefault();
      navigateQuestion(-1);
      break;
    case 'ArrowRight':
    case 'Enter':
      e.preventDefault();
      navigateQuestion(1);
      break;
    case 'b':
    case 'B':
      e.preventDefault();
      toggleBookmark();
      break;
    case 'c':
    case 'C':
      e.preventDefault();
      clearAnswer();
      break;
    case '1':
    case '2':
    case '3':
    case '4':
      e.preventDefault();
      selectOption(parseInt(e.key) - 1);
      break;
  }
}

// State management
function saveState() {
  try {
    localStorage.setItem('dimensionalMockState', JSON.stringify(state));
  } catch (error) {
    console.error('Save state error:', error);
  }
}

function loadState() {
  try {
    const saved = localStorage.getItem('dimensionalMockState');
    if (saved) {
      const loadedState = JSON.parse(saved);
      state = { ...state, ...loadedState };
    }
  } catch (error) {
    console.error('Load state error:', error);
  }
}

function resetState() {
  state = {
    answers: Array(50).fill(null),
    bookmarked: Array(50).fill(false),
    timeSpent: Array(50).fill(0),
    currentQ: 0,
    testStart: null,
    testEnd: null,
    testDuration: 60,
    isRRBMode: false,
    isDarkMode: false,
    enhancedTimer: false,
    reviewCurrentQ: 0,
    results: null,
    questionSource: 'default',
    customQuestions: null
  };
  saveState();
}

// View management
function showView(viewName) {
  const views = ['landing', 'test', 'result', 'reviewAnswers'];
  views.forEach(view => {
    const element = document.getElementById(`${view}-view`);
    if (element) {
      element.classList.remove('active');
    }
  });
  
  const targetView = document.getElementById(`${viewName}-view`);
  if (targetView) {
    targetView.classList.add('active');
  }
}

function updateLandingView() {
  try {
    document.getElementById('test-duration').value = state.testDuration;
    document.getElementById('rrb-mode').checked = state.isRRBMode;
    document.getElementById('dark-mode').checked = state.isDarkMode;
    document.getElementById('enhanced-timer').checked = state.enhancedTimer;
    document.getElementById('question-source').value = state.questionSource;
    
    // Update question count display
    updateQuestionCount();
    
    // Show/hide JSON upload section
    toggleQuestionSource();
    
    if (state.isRRBMode) {
      document.body.setAttribute('data-rrb-mode', 'true');
    }
    
    if (state.isDarkMode) {
      document.body.setAttribute('data-color-scheme', 'dark');
    }
  } catch (error) {
    console.error('Update landing view error:', error);
  }
}

// Test flow functions
function startTest() {
  try {
    state.testStart = Date.now();
    state.testEnd = null;
    state.currentQ = 0;
    saveState();
    
    showView('test');
    startMainTimer();
    startAutoSave();
    displayQuestion();
  } catch (error) {
    console.error('Start test error:', error);
  }
}

function resumeTest() {
  try {
    showView('test');
    startMainTimer();
    startAutoSave();
    displayQuestion();
  } catch (error) {
    console.error('Resume test error:', error);
  }
}

function resetTest() {
  if (confirm('Are you sure you want to reset your test progress? This cannot be undone.')) {
    try {
      localStorage.removeItem('dimensionalMockState');
      location.reload();
    } catch (error) {
      console.error('Reset test error:', error);
    }
  }
}

function updateTestDuration() {
  try {
    state.testDuration = parseInt(document.getElementById('test-duration').value);
    saveState();
  } catch (error) {
    console.error('Update test duration error:', error);
  }
}

function toggleRRBMode() {
  try {
    state.isRRBMode = document.getElementById('rrb-mode').checked;
    if (state.isRRBMode) {
      document.getElementById('test-duration').value = 90;
      state.testDuration = 90;
      document.body.setAttribute('data-rrb-mode', 'true');
    } else {
      document.body.removeAttribute('data-rrb-mode');
    }
    saveState();
  } catch (error) {
    console.error('Toggle RRB mode error:', error);
  }
}

function toggleDarkMode() {
  try {
    state.isDarkMode = document.getElementById('dark-mode').checked;
    if (state.isDarkMode) {
      document.body.setAttribute('data-color-scheme', 'dark');
    } else {
      document.body.setAttribute('data-color-scheme', 'light');
    }
    saveState();
  } catch (error) {
    console.error('Toggle dark mode error:', error);
  }
}

function toggleEnhancedTimer() {
  try {
    state.enhancedTimer = document.getElementById('enhanced-timer').checked;
    saveState();
  } catch (error) {
    console.error('Toggle enhanced timer error:', error);
  }
}

function toggleQuestionSource() {
  try {
    const questionSource = document.getElementById('question-source').value;
    const jsonSection = document.getElementById('json-upload-section');
    
    state.questionSource = questionSource;
    
    if (questionSource === 'json') {
      jsonSection.classList.remove('hidden');
    } else {
      jsonSection.classList.add('hidden');
      // Clear any previous JSON status
      document.getElementById('json-status').classList.add('hidden');
    }
    
    saveState();
  } catch (error) {
    console.error('Toggle question source error:', error);
  }
}

async function handleJSONUpload(event) {
  const file = event.target.files[0];
  const statusElement = document.getElementById('json-status');
  
  if (!file) {
    statusElement.classList.add('hidden');
    return;
  }
  
  try {
    statusElement.classList.remove('hidden', 'success', 'error');
    statusElement.innerHTML = '<div>Processing JSON file...</div>';
    
    const result = await questionManager.loadFromFile(file);
    
    if (result.success) {
      state.customQuestions = result.questions;
      // Update state to reflect new question count
      state.answers = Array(result.questions.length).fill(null);
      state.bookmarked = Array(result.questions.length).fill(false);
      state.timeSpent = Array(result.questions.length).fill(0);
      
      statusElement.classList.add('success');
      statusElement.innerHTML = `
        <div>✅ Successfully loaded ${result.count} questions from JSON file</div>
      `;
      
      updateQuestionCount();
      saveState();
    }
  } catch (error) {
    statusElement.classList.add('error');
    statusElement.innerHTML = `
      <div>❌ Failed to load JSON file:</div>
      <ul><li>${error.error || error.message}</li></ul>
    `;
    
    // Reset to default questions
    state.questionSource = 'default';
    document.getElementById('question-source').value = 'default';
    state.customQuestions = null;
    updateQuestionCount();
  }
}

function downloadExampleJSON() {
  try {
    const exampleData = questionManager.getExampleJSON();
    const dataStr = JSON.stringify(exampleData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = 'example-questions.json';
    link.click();
  } catch (error) {
    console.error('Download example JSON error:', error);
  }
}

function updateQuestionCount() {
  try {
    const totalQuestions = getCurrentQuestions().length;
    // Update test info to show current question count
    const testInfo = document.querySelector('.test-info p');
    if (testInfo) {
      const sourceText = state.questionSource === 'json' ? 'Custom JSON' : 'Default';
      testInfo.textContent = `${totalQuestions} Questions • Mixed Difficulty • ${sourceText} • Complete Analysis`;
    }
  } catch (error) {
    console.error('Update question count error:', error);
  }
}

function getCurrentQuestions() {
  return state.customQuestions || QUESTIONS;
}

// Timer functions
function startMainTimer() {
  try {
    if (state.enhancedTimer) {
      startEnhancedMainTimer();
    } else {
      startBasicMainTimer();
    }
  } catch (error) {
    console.error('Start main timer error:', error);
  }
}

function startEnhancedMainTimer() {
  // Stop any existing timer
  if (customMainTimer) {
    customMainTimer.stop();
  }
  
  const timerElement = document.getElementById('main-timer');
  const progressElement = document.getElementById('main-timer-progress');
  
  // Show progress bar for enhanced timer
  progressElement.classList.remove('hidden');
  
  customMainTimer = new CustomTimer({
    duration: state.testDuration,
    element: timerElement,
    progressElement: progressElement,
    audioAlert: true,
    visualAlert: true,
    warningThresholds: [10, 5, 2],
    onComplete: () => {
      submitTest();
    },
    onWarning: (threshold) => {
      console.log(`Timer warning: ${threshold} minutes remaining`);
    }
  });
  
  customMainTimer.start();
}

function startBasicMainTimer() {
  if (mainTimer) clearInterval(mainTimer);
  
  mainTimer = setInterval(() => {
    const elapsed = Date.now() - state.testStart;
    const remaining = (state.testDuration * 60 * 1000) - elapsed;
    
    if (remaining <= 0) {
      submitTest();
      return;
    }
    
    const hours = Math.floor(remaining / (1000 * 60 * 60));
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
    
    const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    document.getElementById('main-timer').textContent = timeString;
    
    // Add warning classes
    const timerElement = document.getElementById('main-timer');
    timerElement.classList.remove('warning', 'danger');
    if (remaining < 5 * 60 * 1000) { // Last 5 minutes
      timerElement.classList.add('danger');
    } else if (remaining < 10 * 60 * 1000) { // Last 10 minutes
      timerElement.classList.add('warning');
    }
  }, 1000);
}

function startQuestionTimer() {
  try {
    if (state.enhancedTimer) {
      startEnhancedQuestionTimer();
    } else {
      startBasicQuestionTimer();
    }
  } catch (error) {
    console.error('Start question timer error:', error);
  }
}

function startEnhancedQuestionTimer() {
  // Stop any existing timer
  if (customQuestionTimer) {
    customQuestionTimer.stop();
  }
  
  const timerElement = document.getElementById('question-timer');
  const progressElement = document.getElementById('question-timer-progress');
  
  // Show progress bar for enhanced timer
  progressElement.classList.remove('hidden');
  
  // Get time limit for current question (if available)
  const currentQuestions = getCurrentQuestions();
  const currentQuestion = currentQuestions[state.currentQ];
  const timeLimit = (currentQuestion && currentQuestion.timeLimit) ? 
    currentQuestion.timeLimit / 60 : 5; // Default 5 minutes per question
  
  questionStartTime = Date.now();
  
  customQuestionTimer = new CustomTimer({
    duration: timeLimit,
    element: timerElement,
    progressElement: progressElement,
    audioAlert: false, // Don't compete with main timer alerts
    visualAlert: true,
    warningThresholds: [2, 1],
    onTick: (remaining) => {
      // Update time spent tracking
      const elapsed = Math.floor((Date.now() - questionStartTime) / 1000);
      state.timeSpent[state.currentQ] = elapsed;
    }
  });
  
  customQuestionTimer.start();
}

function startBasicQuestionTimer() {
  questionStartTime = Date.now();
  
  if (questionTimer) clearInterval(questionTimer);
  
  questionTimer = setInterval(() => {
    const elapsed = Math.floor((Date.now() - questionStartTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    
    document.getElementById('question-timer').textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, 1000);
}

function stopQuestionTimer() {
  try {
    if (state.enhancedTimer && customQuestionTimer) {
      customQuestionTimer.stop();
      customQuestionTimer = null;
      // Hide progress bar
      document.getElementById('question-timer-progress').classList.add('hidden');
    } else {
      if (questionTimer) {
        clearInterval(questionTimer);
        questionTimer = null;
      }
    }
    
    if (questionStartTime) {
      const elapsed = Math.floor((Date.now() - questionStartTime) / 1000);
      state.timeSpent[state.currentQ] += elapsed;
      questionStartTime = null;
    }
  } catch (error) {
    console.error('Stop question timer error:', error);
  }
}

function startAutoSave() {
  try {
    if (autoSaveInterval) clearInterval(autoSaveInterval);
    
    autoSaveInterval = setInterval(() => {
      saveState();
    }, 5000); // Save every 5 seconds
  } catch (error) {
    console.error('Start auto save error:', error);
  }
}

// Question display and navigation
function displayQuestion() {
  try {
    const currentQuestions = getCurrentQuestions();
    const question = currentQuestions[state.currentQ];
    
    // Stop previous question timer
    stopQuestionTimer();
    
    // Update question info
    document.getElementById('current-q-num').textContent = state.currentQ + 1;
    document.getElementById('question-text').textContent = question.question;
    document.getElementById('difficulty-badge').textContent = question.difficulty;
    
    const difficultyBadge = document.getElementById('difficulty-badge');
    difficultyBadge.className = `status status--${question.difficulty.toLowerCase() === 'easy' ? 'success' : question.difficulty.toLowerCase() === 'medium' ? 'warning' : 'error'}`;
    document.getElementById('topic-badge').textContent = question.topic;
    
    // Update bookmark button
    document.getElementById('bookmark-btn').classList.toggle('bookmarked', state.bookmarked[state.currentQ]);
    
    // Display options
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    question.options.forEach((option, index) => {
      const optionElement = document.createElement('div');
      optionElement.className = 'option-item';
      if (state.answers[state.currentQ] === index) {
        optionElement.classList.add('selected');
      }
      
      optionElement.innerHTML = `
        <input type="radio" class="option-radio" name="answer" value="${index}" ${state.answers[state.currentQ] === index ? 'checked' : ''}>
        <span class="option-text">${option}</span>
      `;
      
      optionElement.addEventListener('click', () => selectOption(index));
      optionsContainer.appendChild(optionElement);
    });
    
    // Update navigation buttons
    document.getElementById('prev-btn').disabled = state.currentQ === 0;
    const totalQuestions = currentQuestions.length;
    document.getElementById('next-btn').textContent = state.currentQ === totalQuestions - 1 ? 'Finish →' : 'Next →';
    
    // Update question number display
    document.querySelector('.question-number').innerHTML = `Question <span id="current-q-num">${state.currentQ + 1}</span> of ${totalQuestions}`;
    
    // Start question timer
    startQuestionTimer();
  } catch (error) {
    console.error('Display question error:', error);
  }
}

function selectOption(optionIndex) {
  try {
    state.answers[state.currentQ] = optionIndex;
    saveState();
    
    // Update visual selection
    document.querySelectorAll('.option-item').forEach((item, index) => {
      item.classList.toggle('selected', index === optionIndex);
      const radio = item.querySelector('input[type="radio"]');
      radio.checked = index === optionIndex;
    });
  } catch (error) {
    console.error('Select option error:', error);
  }
}

function navigateQuestion(direction) {
  try {
    const currentQuestions = getCurrentQuestions();
    const newQ = state.currentQ + direction;
    if (newQ >= 0 && newQ < currentQuestions.length) {
      state.currentQ = newQ;
      saveState();
      displayQuestion();
    } else if (newQ >= currentQuestions.length) {
      submitTest();
    }
  } catch (error) {
    console.error('Navigate question error:', error);
  }
}

function toggleBookmark() {
  try {
    state.bookmarked[state.currentQ] = !state.bookmarked[state.currentQ];
    document.getElementById('bookmark-btn').classList.toggle('bookmarked', state.bookmarked[state.currentQ]);
    saveState();
  } catch (error) {
    console.error('Toggle bookmark error:', error);
  }
}

function clearAnswer() {
  try {
    state.answers[state.currentQ] = null;
    saveState();
    
    // Update visual selection
    document.querySelectorAll('.option-item').forEach(item => {
      item.classList.remove('selected');
      const radio = item.querySelector('input[type="radio"]');
      radio.checked = false;
    });
  } catch (error) {
    console.error('Clear answer error:', error);
  }
}

// Review panel
function showReviewPanel() {
  try {
    updateReviewGrid();
    document.getElementById('review-panel').classList.remove('hidden');
  } catch (error) {
    console.error('Show review panel error:', error);
  }
}

function hideReviewPanel() {
  try {
    document.getElementById('review-panel').classList.add('hidden');
  } catch (error) {
    console.error('Hide review panel error:', error);
  }
}

function updateReviewGrid() {
  try {
    const reviewGrid = document.getElementById('review-grid');
    const currentQuestions = getCurrentQuestions();
    reviewGrid.innerHTML = '';
    
    for (let i = 0; i < currentQuestions.length; i++) {
      const item = document.createElement('div');
      item.className = 'review-item';
      item.textContent = i + 1;
      
      if (i === state.currentQ) {
        item.classList.add('current');
      }
      
      if (state.answers[i] !== null) {
        item.classList.add('answered');
      } else {
        item.classList.add('unanswered');
      }
      
      if (state.bookmarked[i]) {
        item.classList.add('bookmarked');
      }
      
      item.addEventListener('click', () => {
        state.currentQ = i;
        hideReviewPanel();
        displayQuestion();
        saveState();
      });
      
      reviewGrid.appendChild(item);
    }
  } catch (error) {
    console.error('Update review grid error:', error);
  }
}

// Test submission and results
function submitTest() {
  if (!confirm('Are you sure you want to submit your test? You cannot change your answers after submission.')) {
    return;
  }
  
  try {
    state.testEnd = Date.now();
    stopQuestionTimer();
    
    // Stop timers
    if (state.enhancedTimer) {
      if (customMainTimer) {
        customMainTimer.stop();
        customMainTimer = null;
      }
      if (customQuestionTimer) {
        customQuestionTimer.stop();
        customQuestionTimer = null;
      }
      // Hide progress bars
      document.getElementById('main-timer-progress').classList.add('hidden');
      document.getElementById('question-timer-progress').classList.add('hidden');
    } else {
      if (mainTimer) clearInterval(mainTimer);
    }
    
    if (autoSaveInterval) clearInterval(autoSaveInterval);
    
    saveState();
    calculateResults();
    showResults();
  } catch (error) {
    console.error('Submit test error:', error);
  }
}

function calculateResults() {
  try {
    const currentQuestions = getCurrentQuestions();
    const totalQuestions = currentQuestions.length;
    
    const results = {
      score: 0,
      totalQuestions: totalQuestions,
      totalTime: state.testEnd - state.testStart,
      questionResults: [],
      topicStats: {},
      difficultyStats: {}
    };
    
    // Calculate score and detailed results
    for (let i = 0; i < totalQuestions; i++) {
      const question = currentQuestions[i];
      const userAnswer = state.answers[i];
      const isCorrect = userAnswer !== null && userAnswer === question.correctIndex;
      const timeSpent = state.timeSpent[i];
      
      if (isCorrect) results.score++;
      
      results.questionResults.push({
        questionId: i + 1,
        question: question.question,
        topic: question.topic,
        difficulty: question.difficulty,
        userAnswer: userAnswer,
        correctAnswer: question.correctIndex,
        isCorrect: isCorrect,
        timeSpent: timeSpent,
        status: userAnswer === null ? 'unanswered' : (isCorrect ? 'correct' : 'incorrect')
      });
      
      // Topic stats
      if (!results.topicStats[question.topic]) {
        results.topicStats[question.topic] = { attempted: 0, correct: 0, timeTotal: 0 };
      }
      if (userAnswer !== null) {
        results.topicStats[question.topic].attempted++;
        if (isCorrect) results.topicStats[question.topic].correct++;
      }
      results.topicStats[question.topic].timeTotal += timeSpent;
      
      // Difficulty stats
      if (!results.difficultyStats[question.difficulty]) {
        results.difficultyStats[question.difficulty] = { attempted: 0, correct: 0, timeTotal: 0 };
      }
      if (userAnswer !== null) {
        results.difficultyStats[question.difficulty].attempted++;
        if (isCorrect) results.difficultyStats[question.difficulty].correct++;
      }
      results.difficultyStats[question.difficulty].timeTotal += timeSpent;
    }
    
    state.results = results;
    saveState();
  } catch (error) {
    console.error('Calculate results error:', error);
  }
}

function showResults() {
  try {
    showView('result');
    displayResults();
  } catch (error) {
    console.error('Show results error:', error);
  }
}

function displayResults() {
  try {
    const results = state.results;
    const scorePercentage = Math.round((results.score / results.totalQuestions) * 100);
    
    // Update score display
    document.getElementById('score-percentage').textContent = `${scorePercentage}%`;
    document.getElementById('correct-answers').textContent = `${results.score}/${results.totalQuestions}`;
    document.getElementById('total-time').textContent = formatTime(results.totalTime);
    document.getElementById('avg-time').textContent = formatTime(Math.round(results.totalTime / results.totalQuestions));
    
    // Setup and draw charts
    setupCharts();
    drawTopicChart(results.topicStats);
    drawDifficultyChart(results.difficultyStats);
    
    // Display analysis
    displayAnalysis(results);
    
    // Populate results table
    populateResultsTable(results.questionResults);
  } catch (error) {
    console.error('Display results error:', error);
  }
}

function setupCharts() {
  try {
    [document.getElementById('topic-chart'), document.getElementById('difficulty-chart')].forEach(canvas => {
      const container = canvas.parentElement;
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    });
  } catch (error) {
    console.error('Setup charts error:', error);
  }
}

function drawTopicChart(topicStats) {
  try {
    const canvas = document.getElementById('topic-chart');
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 20;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const topics = Object.keys(topicStats);
    const colors = ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545', '#D2BA4C', '#964325'];
    
    let total = 0;
    topics.forEach(topic => {
      if (topicStats[topic].attempted > 0) {
        total += topicStats[topic].attempted;
      }
    });
    
    if (total === 0) return;
    
    let currentAngle = -Math.PI / 2;
    
    topics.forEach((topic, index) => {
      if (topicStats[topic].attempted > 0) {
        const percentage = topicStats[topic].attempted / total;
        const sliceAngle = percentage * 2 * Math.PI;
        const accuracy = topicStats[topic].correct / topicStats[topic].attempted * 100;
        
        // Draw slice
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
        ctx.closePath();
        ctx.fillStyle = colors[index % colors.length];
        ctx.fill();
        
        // Draw label
        const labelAngle = currentAngle + sliceAngle / 2;
        const labelX = centerX + Math.cos(labelAngle) * (radius * 0.7);
        const labelY = centerY + Math.sin(labelAngle) * (radius * 0.7);
        
        ctx.fillStyle = '#000';
        ctx.font = '12px Roboto';
        ctx.textAlign = 'center';
        ctx.fillText(`${topic}`, labelX, labelY - 5);
        ctx.fillText(`${accuracy.toFixed(0)}%`, labelX, labelY + 10);
        
        currentAngle += sliceAngle;
      }
    });
  } catch (error) {
    console.error('Draw topic chart error:', error);
  }
}

function drawDifficultyChart(difficultyStats) {
  try {
    const canvas = document.getElementById('difficulty-chart');
    const ctx = canvas.getContext('2d');
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const difficulties = ['Easy', 'Medium', 'Hard'];
    const colors = ['#1FB8CD', '#FFC185', '#B4413C'];
    const barWidth = canvas.width / difficulties.length - 40;
    const maxHeight = canvas.height - 60;
    
    let maxValue = 0;
    difficulties.forEach(diff => {
      if (difficultyStats[diff] && difficultyStats[diff].attempted > 0) {
        const accuracy = difficultyStats[diff].correct / difficultyStats[diff].attempted;
        maxValue = Math.max(maxValue, accuracy);
      }
    });
    
    if (maxValue === 0) maxValue = 1;
    
    difficulties.forEach((diff, index) => {
      const stats = difficultyStats[diff];
      if (stats && stats.attempted > 0) {
        const accuracy = stats.correct / stats.attempted;
        const barHeight = (accuracy / maxValue) * maxHeight;
        const x = 20 + index * (barWidth + 20);
        const y = canvas.height - 40 - barHeight;
        
        // Draw bar
        ctx.fillStyle = colors[index];
        ctx.fillRect(x, y, barWidth, barHeight);
        
        // Draw label
        ctx.fillStyle = '#000';
        ctx.font = '14px Roboto';
        ctx.textAlign = 'center';
        ctx.fillText(diff, x + barWidth / 2, canvas.height - 20);
        ctx.fillText(`${(accuracy * 100).toFixed(0)}%`, x + barWidth / 2, y - 5);
      }
    });
  } catch (error) {
    console.error('Draw difficulty chart error:', error);
  }
}

function displayAnalysis(results) {
  try {
    // Strengths and weaknesses
    const topics = Object.entries(results.topicStats)
      .filter(([topic, stats]) => stats.attempted > 0)
      .map(([topic, stats]) => ({
        topic,
        accuracy: stats.correct / stats.attempted,
        avgTime: stats.timeTotal / stats.attempted
      }))
      .sort((a, b) => b.accuracy - a.accuracy);
    
    // Strengths (accuracy > 80%)
    const strengths = topics.filter(t => t.accuracy > 0.8);
    document.getElementById('strengths-list').innerHTML = strengths.length === 0 
      ? '<li>Work on improving accuracy to identify strengths</li>'
      : strengths.map(t => `<li>${t.topic}: ${(t.accuracy * 100).toFixed(0)}% accuracy</li>`).join('');
    
    // Weaknesses (accuracy < 60%)
    const weaknesses = topics.filter(t => t.accuracy < 0.6);
    document.getElementById('weaknesses-list').innerHTML = weaknesses.length === 0
      ? '<li>Great job! No major weak areas identified</li>'
      : weaknesses.map(t => `<li>${t.topic}: ${(t.accuracy * 100).toFixed(0)}% accuracy</li>`).join('');
    
    // Study recommendations
    const studyActions = [];
    
    // Top 3 weakest topics
    const topWeaknesses = topics.slice(-3).reverse();
    topWeaknesses.forEach((topic, index) => {
      if (topic.accuracy < 0.7) {
        studyActions.push(`Focus on ${topic.topic} - Review NCERT Physics Chapter on Units & Measurements`);
      }
    });
    
    // Topics with high time consumption
    const slowTopics = topics.filter(t => t.avgTime > 90).slice(0, 2);
    slowTopics.forEach(topic => {
      studyActions.push(`Practice more ${topic.topic} problems to improve speed`);
    });
    
    // Generic recommendations
    if (studyActions.length < 5) {
      const generic = [
        'Practice dimensional analysis shortcuts and tricks',
        'Memorize common dimensional formulas',
        'Solve 20 additional practice problems daily',
        'Take more timed mock tests',
        'Review solutions for all incorrect answers'
      ];
      
      generic.forEach(action => {
        if (studyActions.length < 5) {
          studyActions.push(action);
        }
      });
    }
    
    document.getElementById('study-actions').innerHTML = studyActions
      .slice(0, 5)
      .map(action => `<li>${action}</li>`)
      .join('');
  } catch (error) {
    console.error('Display analysis error:', error);
  }
}

function populateResultsTable(questionResults) {
  try {
    const tbody = document.getElementById('results-table').getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';
    
    questionResults.forEach(result => {
      const row = tbody.insertRow();
      row.innerHTML = `
        <td>${result.questionId}</td>
        <td>${result.topic}</td>
        <td>${result.difficulty}</td>
        <td class="${result.status}-status">${result.status.charAt(0).toUpperCase() + result.status.slice(1)}</td>
        <td>${formatTime(result.timeSpent * 1000)}</td>
      `;
    });
  } catch (error) {
    console.error('Populate results table error:', error);
  }
}

// Review answers functionality
function showReviewAnswers() {
  try {
    state.reviewCurrentQ = 0;
    showView('reviewAnswers');
    displayReviewQuestion();
  } catch (error) {
    console.error('Show review answers error:', error);
  }
}

function displayReviewQuestion() {
  try {
    const qIndex = state.reviewCurrentQ;
    const currentQuestions = getCurrentQuestions();
    const question = currentQuestions[qIndex];
    const result = state.results.questionResults[qIndex];
    
    document.getElementById('review-q-num').textContent = qIndex + 1;
    document.getElementById('review-question-text').textContent = question.question;
    
    // User answer
    const userAnswerText = result.userAnswer !== null 
      ? question.options[result.userAnswer] 
      : 'Not answered';
    document.getElementById('user-answer-display').textContent = userAnswerText;
    document.getElementById('user-answer-display').className = `answer-display ${result.status}-status`;
    
    // Correct answer
    document.getElementById('correct-answer-display').textContent = question.options[question.correctIndex];
    document.getElementById('correct-answer-display').className = 'answer-display correct-status';
    
    // Solution
    document.getElementById('solution-text').textContent = question.solution;
    
    // Stats
    document.getElementById('question-time-spent').textContent = formatTime(result.timeSpent * 1000);
    document.getElementById('question-status-display').textContent = result.status.charAt(0).toUpperCase() + result.status.slice(1);
    document.getElementById('question-status-display').className = `stat-value ${result.status}-status`;
    
    // Navigation
    const totalQuestions = currentQuestions.length;
    document.getElementById('review-prev-btn').disabled = qIndex === 0;
    document.getElementById('review-next-btn').disabled = qIndex === totalQuestions - 1;
    
    // Update question count display
    document.querySelector('#review-answers-view .question-number').innerHTML = `Question <span id="review-q-num">${qIndex + 1}</span> of ${totalQuestions}`;
  } catch (error) {
    console.error('Display review question error:', error);
  }
}

function navigateReview(direction) {
  try {
    const currentQuestions = getCurrentQuestions();
    const newQ = state.reviewCurrentQ + direction;
    if (newQ >= 0 && newQ < currentQuestions.length) {
      state.reviewCurrentQ = newQ;
      displayReviewQuestion();
    }
  } catch (error) {
    console.error('Navigate review error:', error);
  }
}

// Utility functions
function formatTime(milliseconds) {
  try {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else {
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
  } catch (error) {
    console.error('Format time error:', error);
    return '00:00';
  }
}

function exportResults() {
  try {
    const exportData = {
      testInfo: {
        date: new Date(state.testStart).toISOString(),
        duration: state.testDuration,
        mode: state.isRRBMode ? 'RRB' : 'Standard'
      },
      results: state.results,
      answers: state.answers,
      timeSpent: state.timeSpent
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `RRB_Mock_Test_Results_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  } catch (error) {
    console.error('Export results error:', error);
  }
}

function startNewTest() {
  if (confirm('Start a new test? This will clear your current results.')) {
    try {
      resetState();
      location.reload();
    } catch (error) {
      console.error('Start new test error:', error);
    }
  }
}