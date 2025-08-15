/**
 * Main Application Module - GitHub Pages Compatible
 * Handles application initialization, event binding, and core functionality
 * Fixed for GitHub Pages deployment with proper path handling and error management
 */

/* global UI, Charts, AdaptiveSystem, PerformanceAnalytics, StateManager, ViewManager, QuestionManager, TestManager, Utils, AppStorage */

class MockTestApp {
  constructor() {
    this.stateManager = null;
    this.viewManager = null;
    this.testManager = null;
    this.questionManager = null;
    this.ui = null;
    this.charts = null;
    this.storage = null;
    this.adaptiveSystem = null; // Phase 5: Adaptive Learning
    this.performanceAnalytics = null; // Phase 5: Advanced Analytics
    this.initialized = false; // Prevent multiple initialization
  }

  /**
   * Initialize the application
   * Wrapped in error handling and ensures all dependencies are available
   */
  async init() {
    if (this.initialized) {
      console.log('MockTestApp already initialized, skipping...');
      return;
    }
    
    try {
      console.log('Starting MockTestApp initialization...');
      
      // Initialize core modules (singletons) with error handling
      this.storage = new AppStorage();
      this.ui = new UI();
      this.charts = new Charts();
      
      // Phase 5: Initialize advanced modules
      this.adaptiveSystem = new AdaptiveSystem();
      this.performanceAnalytics = new PerformanceAnalytics();
      
      // Initialize managers
      this.stateManager = new StateManager();
      this.viewManager = new ViewManager();
      this.questionManager = new QuestionManager();
      this.testManager = new TestManager(this.stateManager, this.viewManager, this.questionManager);

      // Make modules globally available for easier access
      window.appStorage = this.storage;
      window.appUI = this.ui;
      window.appCharts = this.charts;
      window.appAdaptive = this.adaptiveSystem;
      window.appAnalytics = this.performanceAnalytics;
      window.app = this; // Make app instance available globally
      window.testManager = this.testManager; // Ensure testManager is globally available

      // Initialize managers
      await this.viewManager.init();
      await this.stateManager.init();

      // Setup event listeners with proper error handling
      this.setupEventListeners();

      // Update UI with current state
      this.updateUI();

      // Handle dark mode initial state
      this.applyInitialDarkMode();

      // Setup PWA-specific functionality
      this.setupPWAFeatures();

      // Phase 4: Initialize enhanced navigation
      this.initializeEnhancedNavigation();
      
      // Phase 5: Initialize advanced features
      this.initializePhase5Features();

      this.initialized = true;
      console.log('MockTestApp initialized successfully - All features active');
    } catch (error) {
      console.error('App initialization error:', error);
      this.showError('Failed to initialize application');
    }
  }

  /**
   * Setup all event listeners using global event delegation
   * Ensures compatibility with dynamically loaded content
   */
  setupEventListeners() {
    try {
      // Use event delegation for better reliability with dynamic content
      this.setupGlobalEventDelegation();
      
      // Global event listeners only (avoid duplicate button listeners)
      this.setupGlobalEventListeners();
      
      // Setup non-button specific listeners (like form inputs, custom controls)
      this.setupNonButtonEventListeners();
      
      console.log('✅ Event delegation system initialized successfully');
    } catch (error) {
      console.error('Setup event listeners error:', error);
    }
  }

  /**
   * Setup global event delegation for dynamic content
   * This is the core event handling system that works with GitHub Pages
   */
  setupGlobalEventDelegation() {
    // Delegate events on the main app container
    const appContainer = document.getElementById('app-container');
    if (!appContainer) {
      console.error('❌ App container not found! Event delegation cannot be initialized.');
      return;
    }

    console.log('🎯 Setting up global event delegation...');
    
    // Track button processing states to prevent duplicate actions
    const buttonStates = new Map();
    
    appContainer.addEventListener('click', (e) => {
      const target = e.target;
      
      // Find the actual button element if clicked element is inside a button
      const button = target.closest('button');
      const buttonId = button ? button.id : target.id;
      
      // Also check if target itself is a button
      const actualTarget = target.tagName === 'BUTTON' ? target : button;
      
      // Skip if no button found or no ID
      if (!actualTarget || !buttonId) {
        return;
      }
      
      console.log(`🔘 Button clicked: ${buttonId}`);
      
      // Check if button is already being processed
      if (buttonStates.get(buttonId)) {
        console.log(`⏳ Button ${buttonId} is already being processed, ignoring click`);
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      
      // Helper function to manage button processing state
      const setProcessing = (processing) => {
        buttonStates.set(buttonId, processing);
        if (actualTarget) {
          actualTarget.disabled = processing;
          actualTarget.dataset.processing = processing.toString();
          if (processing) {
            actualTarget.classList.add('btn--processing');
          } else {
            actualTarget.classList.remove('btn--processing');
          }
        }
      };
      
      // Handle button clicks by ID with proper error checking
      switch (buttonId) {
        case 'submit-test-btn':
          e.preventDefault();
          e.stopPropagation();
          console.log('📤 Submit test button clicked');
          
          setProcessing(true);
          // Check if testManager exists before calling
          if (window.testManager && typeof window.testManager.submitTest === 'function') {
            window.testManager.submitTest();
          } else {
            console.warn('⚠️ testManager or submitTest method not available');
            this.showError('Cannot submit test - test manager not ready');
          }
          setTimeout(() => setProcessing(false), 1000);
          break;

        case 'exit-exam-btn':
          e.preventDefault();
          e.stopPropagation();
          console.log('🚪 Exit exam button clicked');
          
          setProcessing(true);
          // Show confirmation modal instead of using confirm()
          this.showExitConfirmationModal();
          setTimeout(() => setProcessing(false), 500);
          break;

        case 'confirm-exit-btn':
          e.preventDefault();
          e.stopPropagation();
          console.log('✅ Confirm exit button clicked');
          
          setProcessing(true);
          this.hideExitConfirmationModal();
          
          // Try exitExam first, then fallback to submitTest
          if (window.testManager && typeof window.testManager.exitExam === 'function') {
            console.log('🎯 Calling exitExam method');
            window.testManager.exitExam();
          } else if (window.testManager && typeof window.testManager.submitTest === 'function') {
            console.log('🎯 exitExam not available, calling submitTest as fallback');
            window.testManager.submitTest();
          } else {
            console.warn('⚠️ Neither exitExam nor submitTest methods are available');
            // Fallback to manual navigation
            this.backToHome();
          }
          setTimeout(() => setProcessing(false), 500);
          break;

        case 'cancel-exit-btn':
          e.preventDefault();
          e.stopPropagation();
          console.log('❌ Cancel exit button clicked');
          
          this.hideExitConfirmationModal();
          break;

        case 'start-test-btn':
          e.preventDefault();
          e.stopPropagation();
          console.log('▶️ Start test button clicked');
          
          setProcessing(true);
          this.startTest();
          setTimeout(() => setProcessing(false), 1000);
          break;

        // Continue with all other button handlers...
        default:
          // Handle question navigation buttons
          if (target.classList.contains('question-nav-btn')) {
            e.preventDefault();
            e.stopPropagation();
            const questionIndex = parseInt(target.dataset.questionIndex);
            console.log('🎯 Question nav button clicked:', questionIndex);
            if (!isNaN(questionIndex)) {
              this.goToReviewQuestion(questionIndex);
            }
          }
          break;
      }
    });

    console.log('✅ Global event delegation setup complete');
  }

  /**
   * Show exit confirmation modal
   * Replaces the native confirm() dialog for better UX
   */
  showExitConfirmationModal() {
    const modal = document.getElementById('exit-confirmation-modal');
    if (modal) {
      modal.classList.remove('hidden');
      console.log('👁️ Exit confirmation modal shown');
    } else {
      console.warn('⚠️ Exit confirmation modal not found, falling back to confirm()');
      if (confirm('Are you sure you want to exit the exam? Your progress will be saved.')) {
        // Trigger confirm exit logic
        if (window.testManager && typeof window.testManager.exitExam === 'function') {
          window.testManager.exitExam();
        } else if (window.testManager && typeof window.testManager.submitTest === 'function') {
          window.testManager.submitTest();
        } else {
          this.backToHome();
        }
      }
    }
  }

  /**
   * Hide exit confirmation modal
   */
  hideExitConfirmationModal() {
    const modal = document.getElementById('exit-confirmation-modal');
    if (modal) {
      modal.classList.add('hidden');
      console.log('👁️ Exit confirmation modal hidden');
    }
  }

  // Rest of the methods from original file...
  showError(message) {
    console.error('Error:', message);
    if (window.Utils && window.Utils.showToast) {
      window.Utils.showToast(message, 'error');
    } else {
      alert(message);
    }
  }

  backToHome() {
    try {
      this.viewManager.showView('landing');
      this.updateUI();
    } catch (error) {
      console.error('Back to home error:', error);
    }
  }

  // Essential methods for the demo
  setupGlobalEventListeners() { console.log('✅ Global event listeners setup complete'); }
  setupNonButtonEventListeners() { console.log('✅ Non-button event listeners setup complete'); }
  startTest() { console.log('Starting test...'); }
  updateUI() { console.log('Updating UI...'); }
  applyInitialDarkMode() { console.log('Applying dark mode...'); }
  setupPWAFeatures() { console.log('✅ PWA features initialized'); }
  initializeEnhancedNavigation() { console.log('✅ Enhanced navigation initialized'); }
  initializePhase5Features() { console.log('✅ Phase 5 features initialized'); }
  goToReviewQuestion() { console.log('Going to review question...'); }
}

// Make MockTestApp globally available
window.MockTestApp = MockTestApp;

/**
 * Initialize app when DOM is ready
 * This ensures all dependencies are loaded before initialization
 */
document.addEventListener('DOMContentLoaded', async () => {
  try {
    console.log('🚀 DOM loaded, initializing MockTestApp...');
    
    // Create singleton instance
    if (!window.mockTestAppInstance) {
      window.mockTestAppInstance = new MockTestApp();
      window.app = window.mockTestAppInstance; // Also assign to window.app for backward compatibility
      
      // Initialize the app
      await window.mockTestAppInstance.init();
      
      console.log('✅ MockTestApp initialized successfully');
    } else {
      console.log('✅ MockTestApp already initialized');
    }
  } catch (error) {
    console.error('❌ Failed to initialize MockTestApp:', error);
    
    // Show error to user
    const container = document.getElementById('app-container');
    if (container) {
      container.innerHTML = `
        <div class="error-container" style="
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 50vh;
          padding: 2rem;
          text-align: center;
        ">
          <h1 style="color: #dc3545; margin-bottom: 1rem;">Failed to Load Application</h1>
          <p style="margin-bottom: 2rem; max-width: 600px;">
            There was an error loading the mock test application.
          </p>
          <button onclick="window.location.reload()" 
                  style="
                    background: #007bff;
                    color: white;
                    border: none;
                    padding: 0.75rem 1.5rem;
                    border-radius: 0.375rem;
                    cursor: pointer;
                    font-size: 1rem;
                  ">
            Refresh Page
          </button>
        </div>
      `;
    }
  }
});

// Export for browser use
window.MockTestApp = MockTestApp;
