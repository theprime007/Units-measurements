// Main Application Module - Simplified and Modular
// Coordinates all other modules and handles application lifecycle

class MockTestApp {
  constructor() {
    // Module instances
    this.stateManager = null;
    this.viewManager = null;
    this.questionManager = null;
    this.testManager = null;
    
    // Default questions data (loaded from external file)
    this.DEFAULT_QUESTIONS = typeof DEFAULT_QUESTIONS !== 'undefined' ? DEFAULT_QUESTIONS : [];
  }

  // Initialize the application
  async init() {
    try {
      // Initialize modules
      this.stateManager = new StateManager();
      this.viewManager = new ViewManager();
      this.questionManager = new QuestionManager();
      
      // Load state and initialize view manager
      this.stateManager.loadState();
      
      // Set default questions if none are set or if they have wrong count
      const state = this.stateManager.getState();
      if (!state.customQuestions || state.customQuestions.length !== this.DEFAULT_QUESTIONS.length) {
        this.stateManager.setCustomQuestions(this.DEFAULT_QUESTIONS);
      }
      
      // Initialize test manager with dependencies
      this.testManager = new TestManager(this.stateManager, this.viewManager, this.questionManager);
      
      await this.viewManager.init();
      
      // Setup event listeners
      this.setupEventListeners();
      
      // Update landing view with current state
      this.viewManager.updateLandingView(this.stateManager.getState());
      
      console.log('MockTestApp initialized successfully');
    } catch (error) {
      console.error('App initialization error:', error);
      Utils.showError('Failed to initialize application');
    }
  }

  // Setup all event listeners
  setupEventListeners() {
    try {
      // Landing view events
      this.bindLandingEvents();
      
      // Test view events - delegate to TestManager
      this.bindTestEvents();
      
      // Review panel events - delegate to TestManager
      this.bindReviewEvents();
      
      // Result view events
      this.bindResultEvents();
      
      // Review answers events
      this.bindReviewAnswersEvents();
      
      // Keyboard navigation - delegate to TestManager
      this.bindKeyboardEvents();
      
      console.log('Event listeners setup complete');
    } catch (error) {
      console.error('Event listener setup error:', error);
    }
  }

  // Bind landing view events
  bindLandingEvents() {
    const elements = {
      'start-test-btn': () => this.startTest(),
      'resume-test-btn': () => this.resumeTest(),
      'reset-test-btn': () => this.resetTest(),
      'test-duration': () => this.updateTestDuration(),
      'custom-minutes': () => this.validateCustomDuration(),
      'custom-seconds': () => this.validateCustomDuration(),
      'rrb-mode': () => this.toggleRRBMode(),
      'dark-mode': () => this.toggleDarkMode(),
      'enhanced-timer': () => this.toggleEnhancedTimer(),
      'question-source': () => this.toggleQuestionSource(),
      'json-file': (e) => this.handleJSONUpload(e),
      'download-example-btn': () => this.downloadExampleJSON()
    };

    this.bindElements(elements);
  }

  // Bind test view events
  bindTestEvents() {
    const elements = {
      'bookmark-btn': () => this.testManager.toggleBookmark(),
      'clear-answer-btn': () => this.testManager.clearAnswer(),
      'prev-btn': () => this.testManager.navigateQuestion(-1),
      'next-btn': () => this.testManager.navigateQuestion(1),
      'review-panel-btn': () => this.testManager.showReviewPanel(),
      'submit-test-btn': () => this.testManager.submitTest()
    };

    this.bindElements(elements, 'click');
  }

  // Bind review panel events
  bindReviewEvents() {
    const elements = {
      'close-review-btn': () => this.testManager.hideReviewPanel(),
      'submit-from-review-btn': () => this.testManager.submitTest()
    };

    this.bindElements(elements, 'click');

    // Modal backdrop and close button
    const modalClose = document.querySelector('.modal-close');
    const modalBackdrop = document.querySelector('.modal-backdrop');
    
    if (modalClose) {
      Utils.addEventListener(modalClose, 'click', () => this.testManager.hideReviewPanel());
    }
    if (modalBackdrop) {
      Utils.addEventListener(modalBackdrop, 'click', () => this.testManager.hideReviewPanel());
    }
  }

  // Bind result view events
  bindResultEvents() {
    const elements = {
      'review-answers-btn': () => this.showReviewAnswers(),
      'view-solutions-btn': () => this.showReviewAnswers(),
      'export-results-btn': () => this.exportResults(),
      'new-test-btn': () => this.startNewTest()
    };

    this.bindElements(elements, 'click');
  }

  // Bind review answers events
  bindReviewAnswersEvents() {
    const elements = {
      'back-to-results-btn': () => this.showResults(),
      'review-prev-btn': () => this.navigateReview(-1),
      'review-next-btn': () => this.navigateReview(1)
    };

    this.bindElements(elements, 'click');
  }

  // Bind keyboard events
  bindKeyboardEvents() {
    Utils.addEventListener(document, 'keydown', (e) => this.handleKeyboard(e));
  }

  // Helper method to bind multiple elements
  bindElements(elements, defaultEventType = null) {
    Object.entries(elements).forEach(([id, handler]) => {
      const element = document.getElementById(id);
      if (element) {
        const eventType = defaultEventType || 
                         (element.type === 'file' ? 'change' :
                          element.tagName === 'SELECT' ? 'change' :
                          element.type === 'checkbox' ? 'change' : 'click');
        Utils.addEventListener(element, eventType, handler);
      }
    });
  }

  // Landing view methods
  startTest() {
    try {
      this.stateManager.setTestStart();
      this.stateManager.setCurrentQuestion(0);
      
      this.viewManager.showView('test');
      this.testManager.startMainTimer();
      this.testManager.startAutoSave();
      this.testManager.displayQuestion();
    } catch (error) {
      console.error('Start test error:', error);
      Utils.showError('Failed to start test');
    }
  }

  resumeTest() {
    try {
      this.viewManager.showView('test');
      this.testManager.startMainTimer();
      this.testManager.startAutoSave();
      this.testManager.displayQuestion();
    } catch (error) {
      console.error('Resume test error:', error);
      Utils.showError('Failed to resume test');
    }
  }

  resetTest() {
    if (confirm('Are you sure you want to reset your test progress? This cannot be undone.')) {
      try {
        this.stateManager.resetState();
        location.reload();
      } catch (error) {
        console.error('Reset test error:', error);
        Utils.showError('Failed to reset test');
      }
    }
  }

  // Settings management
  updateTestDuration() {
    try {
      const durationSelect = document.getElementById('test-duration');
      const customSection = document.getElementById('custom-duration-section');
      
      if (durationSelect.value === 'custom') {
        customSection.classList.remove('hidden');
        const customDuration = this.getCustomDuration();
        if (customDuration > 0) {
          this.stateManager.updateState({ testDuration: customDuration });
        }
      } else {
        customSection.classList.add('hidden');
        this.stateManager.updateState({ testDuration: parseInt(durationSelect.value) });
      }
    } catch (error) {
      console.error('Update test duration error:', error);
    }
  }

  getCustomDuration() {
    try {
      const minutes = parseInt(document.getElementById('custom-minutes').value) || 0;
      const seconds = parseInt(document.getElementById('custom-seconds').value) || 0;
      return Utils.convertToTotalMinutes(minutes, seconds);
    } catch (error) {
      console.error('Get custom duration error:', error);
      return 0;
    }
  }

  validateCustomDuration() {
    try {
      const minutesInput = document.getElementById('custom-minutes');
      const secondsInput = document.getElementById('custom-seconds');
      const minutes = parseInt(minutesInput.value) || 0;
      const seconds = parseInt(secondsInput.value) || 0;
      
      const validation = Utils.validateCustomDuration(minutes, seconds);
      
      minutesInput.classList.toggle('invalid', !validation.minutes);
      secondsInput.classList.toggle('invalid', !validation.seconds);
      
      if (validation.isValid) {
        const customDuration = Utils.convertToTotalMinutes(minutes, seconds);
        if (document.getElementById('test-duration').value === 'custom') {
          this.stateManager.updateState({ testDuration: customDuration });
        }
      }
    } catch (error) {
      console.error('Validate custom duration error:', error);
    }
  }

  toggleRRBMode() {
    try {
      const isRRBMode = document.getElementById('rrb-mode').checked;
      if (isRRBMode) {
        document.getElementById('test-duration').value = 90;
        this.stateManager.updateState({ testDuration: 90, isRRBMode: true });
        document.body.setAttribute('data-rrb-mode', 'true');
      } else {
        document.body.removeAttribute('data-rrb-mode');
        this.stateManager.updateState({ isRRBMode: false });
      }
    } catch (error) {
      console.error('Toggle RRB mode error:', error);
    }
  }

  toggleDarkMode() {
    try {
      const isDarkMode = document.getElementById('dark-mode').checked;
      this.stateManager.updateState({ isDarkMode });
      document.body.setAttribute('data-color-scheme', isDarkMode ? 'dark' : 'light');
    } catch (error) {
      console.error('Toggle dark mode error:', error);
    }
  }

  toggleEnhancedTimer() {
    try {
      const enhancedTimer = document.getElementById('enhanced-timer').checked;
      this.stateManager.updateState({ enhancedTimer });
    } catch (error) {
      console.error('Toggle enhanced timer error:', error);
    }
  }

  toggleQuestionSource() {
    try {
      const questionSource = document.getElementById('question-source').value;
      this.stateManager.updateState({ questionSource });
      this.viewManager.toggleQuestionSourceSection(questionSource);
    } catch (error) {
      console.error('Toggle question source error:', error);
    }
  }

  async handleJSONUpload(event) {
    const file = event.target.files[0];
    const statusElement = document.getElementById('json-status');
    
    if (!file) {
      statusElement.classList.add('hidden');
      return;
    }
    
    try {
      statusElement.classList.remove('hidden', 'success', 'error');
      statusElement.innerHTML = '<div>Processing JSON file...</div>';
      
      const result = await this.questionManager.loadFromFile(file);
      
      if (result.success) {
        this.stateManager.setCustomQuestions(result.questions);
        
        statusElement.classList.add('success');
        statusElement.innerHTML = `<div>✅ Successfully loaded ${result.count} questions from JSON file</div>`;
        
        this.viewManager.updateQuestionCount(this.stateManager.getState());
      }
    } catch (error) {
      statusElement.classList.add('error');
      statusElement.innerHTML = `
        <div>❌ Failed to load JSON file:</div>
        <ul><li>${error.error || error.message}</li></ul>
      `;
      
      // Reset to default questions
      this.stateManager.updateState({ questionSource: 'default', customQuestions: null });
      document.getElementById('question-source').value = 'default';
      this.viewManager.updateQuestionCount(this.stateManager.getState());
    }
  }

  downloadExampleJSON() {
    try {
      const exampleData = this.questionManager.getExampleJSON();
      Utils.exportJSON(exampleData, 'example-questions.json');
    } catch (error) {
      console.error('Download example JSON error:', error);
      Utils.showError('Failed to download example JSON');
    }
  }

  // Keyboard handling
  handleKeyboard(e) {
    if (this.viewManager.getCurrentView() !== 'test') return;
    
    switch(e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        this.testManager.navigateQuestion(-1);
        break;
      case 'ArrowRight':
      case 'Enter':
        e.preventDefault();
        this.testManager.navigateQuestion(1);
        break;
      case 'b':
      case 'B':
        e.preventDefault();
        this.testManager.toggleBookmark();
        break;
      case 'c':
      case 'C':
        e.preventDefault();
        this.testManager.clearAnswer();
        break;
      case '1':
      case '2':
      case '3':
      case '4':
        e.preventDefault();
        this.testManager.selectOption(parseInt(e.key) - 1);
        break;
    }
  }

  // Result and review methods
  showReviewAnswers() {
    try {
      this.stateManager.updateState({ reviewCurrentQ: 0 });
      this.viewManager.showView('review-answers');
      this.displayReviewQuestion();
    } catch (error) {
      console.error('Show review answers error:', error);
      Utils.showError('Failed to show review answers');
    }
  }

  // Display current review question
  displayReviewQuestion() {
    try {
      const state = this.stateManager.getState();
      const qIndex = state.reviewCurrentQ;
      const currentQuestions = this.getCurrentQuestions();
      const question = currentQuestions[qIndex];
      const result = state.results.questionResults[qIndex];
      
      // Update question count and content
      this.viewManager.updateElement('review-q-num', qIndex + 1);
      this.viewManager.updateElement('review-question-text', question.question);
      
      // User answer
      const userAnswerText = result.userAnswer !== null 
        ? question.options[result.userAnswer] 
        : 'Not answered';
      const userAnswerDisplay = document.getElementById('user-answer-display');
      if (userAnswerDisplay) {
        userAnswerDisplay.textContent = userAnswerText;
        userAnswerDisplay.className = `answer-display ${result.status}-status`;
      }
      
      // Correct answer
      const correctAnswerDisplay = document.getElementById('correct-answer-display');
      if (correctAnswerDisplay) {
        correctAnswerDisplay.textContent = question.options[question.correctIndex];
        correctAnswerDisplay.className = 'answer-display correct-status';
      }
      
      // Solution
      this.viewManager.updateElement('solution-text', question.solution);
      
      // Stats
      this.viewManager.updateElement('question-time-spent', Utils.formatTime(result.timeSpent * 1000));
      const statusDisplay = document.getElementById('question-status-display');
      if (statusDisplay) {
        statusDisplay.textContent = result.status.charAt(0).toUpperCase() + result.status.slice(1);
        statusDisplay.className = `stat-value ${result.status}-status`;
      }
      
      // Navigation
      const totalQuestions = currentQuestions.length;
      const prevBtn = document.getElementById('review-prev-btn');
      const nextBtn = document.getElementById('review-next-btn');
      
      if (prevBtn) prevBtn.disabled = qIndex === 0;
      if (nextBtn) nextBtn.disabled = qIndex === totalQuestions - 1;
      
      // Update question count in header
      const questionNumberElement = document.querySelector('#review-answers-view .question-number');
      if (questionNumberElement) {
        questionNumberElement.innerHTML = `Question <span id="review-q-num">${qIndex + 1}</span> of ${totalQuestions}`;
      }
    } catch (error) {
      console.error('Display review question error:', error);
    }
  }

  // Get current questions (helper method)
  getCurrentQuestions() {
    const state = this.stateManager.getState();
    return state.customQuestions || DEFAULT_QUESTIONS || [];
  }

  navigateReview(direction) {
    try {
      const state = this.stateManager.getState();
      const currentQuestions = this.getCurrentQuestions();
      const newQ = state.reviewCurrentQ + direction;
      
      if (newQ >= 0 && newQ < currentQuestions.length) {
        this.stateManager.updateState({ reviewCurrentQ: newQ });
        this.displayReviewQuestion();
      }
    } catch (error) {
      console.error('Navigate review error:', error);
    }
  }

  exportResults() {
    try {
      const state = this.stateManager.getState();
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
      
      const filename = `RRB_Mock_Test_Results_${new Date().toISOString().split('T')[0]}.json`;
      Utils.exportJSON(exportData, filename);
    } catch (error) {
      console.error('Export results error:', error);
      Utils.showError('Failed to export results');
    }
  }

  startNewTest() {
    if (confirm('Start a new test? This will clear your current results.')) {
      try {
        this.stateManager.resetState();
        location.reload();
      } catch (error) {
        console.error('Start new test error:', error);
        Utils.showError('Failed to start new test');
      }
    }
  }

  showResults() {
    this.viewManager.showView('result');
  }
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', async function() {
  try {
    const app = new MockTestApp();
    await app.init();
    
    // Make app globally available for debugging
    window.mockTestApp = app;
  } catch (error) {
    console.error('Failed to initialize application:', error);
    Utils.showError('Application failed to load. Please refresh the page.');
  }
});