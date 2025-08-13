// View Manager Module
// Handles view switching, component loading, and UI state management

class ViewManager {
  constructor() {
    this.currentView = 'landing';
    this.views = ['landing', 'test', 'result', 'review-answers'];
    this.componentCache = {};
  }

  // Initialize view manager
  async init() {
    try {
      // Load initial components
      await this.loadAllComponents();
      this.showView('landing');
    } catch (error) {
      console.error('ViewManager initialization error:', error);
    }
  }

  // Load all view components
  async loadAllComponents() {
    const componentPromises = [
      this.loadComponent('landing-view'),
      this.loadComponent('test-view'),
      this.loadComponent('result-view'),
      this.loadComponent('review-answers-view'),
      this.loadComponent('review-panel')
    ];

    try {
      await Promise.all(componentPromises);
    } catch (error) {
      console.error('Error loading components:', error);
      throw error;
    }
  }

  // Load a single component
  async loadComponent(componentName) {
    if (this.componentCache[componentName]) {
      return this.componentCache[componentName];
    }

    try {
      const response = await fetch(`components/${componentName}.html`);
      if (!response.ok) {
        throw new Error(`Failed to load component: ${componentName}`);
      }
      
      const html = await response.text();
      this.componentCache[componentName] = html;
      
      // Insert component into DOM if it's a view
      if (componentName.includes('view') || componentName === 'review-panel') {
        const container = document.getElementById('app-container');
        if (container) {
          container.insertAdjacentHTML('beforeend', html);
        }
      }
      
      return html;
    } catch (error) {
      console.error(`Error loading component ${componentName}:`, error);
      throw error;
    }
  }

  // Show specific view
  showView(viewName) {
    try {
      // Hide all views
      this.views.forEach(view => {
        const element = document.getElementById(`${view}-view`);
        if (element) {
          element.classList.remove('active');
        }
      });
      
      // Show target view
      const targetView = document.getElementById(`${viewName}-view`);
      if (targetView) {
        targetView.classList.add('active');
        this.currentView = viewName;
      } else {
        console.error(`View ${viewName} not found`);
      }
    } catch (error) {
      console.error('Show view error:', error);
    }
  }

  // Get current active view
  getCurrentView() {
    return this.currentView;
  }

  // Update landing view with current state
  updateLandingView(state) {
    try {
      const durationSelect = document.getElementById('test-duration');
      const customSection = document.getElementById('custom-duration-section');
      
      if (!durationSelect || !customSection) return;

      // Check if current duration matches a preset value
      const isCustomDuration = ![60, 90, 120].includes(state.testDuration);
      
      if (isCustomDuration) {
        durationSelect.value = 'custom';
        customSection.classList.remove('hidden');
        
        // Set custom input values from state
        const totalMinutes = state.testDuration;
        const minutes = Math.floor(totalMinutes);
        const seconds = Math.round((totalMinutes - minutes) * 60);
        
        const minutesInput = document.getElementById('custom-minutes');
        const secondsInput = document.getElementById('custom-seconds');
        if (minutesInput) minutesInput.value = minutes;
        if (secondsInput) secondsInput.value = seconds;
      } else {
        durationSelect.value = state.testDuration;
        customSection.classList.add('hidden');
      }
      
      // Update checkboxes
      const checkboxes = {
        'rrb-mode': state.isRRBMode,
        'dark-mode': state.isDarkMode,
        'enhanced-timer': state.enhancedTimer
      };
      
      Object.entries(checkboxes).forEach(([id, checked]) => {
        const element = document.getElementById(id);
        if (element) element.checked = checked;
      });
      
      const questionSource = document.getElementById('question-source');
      if (questionSource) questionSource.value = state.questionSource;
      
      // Update question count display
      this.updateQuestionCount(state);
      
      // Show/hide JSON upload section
      this.toggleQuestionSourceSection(state.questionSource);
      
      // Apply theme modes
      if (state.isRRBMode) {
        document.body.setAttribute('data-rrb-mode', 'true');
      }
      
      if (state.isDarkMode) {
        document.body.setAttribute('data-color-scheme', 'dark');
      }

      // Show resume button if test is in progress
      const resumeBtn = document.getElementById('resume-test-btn');
      if (resumeBtn) {
        if (state.testStart && !state.testEnd) {
          resumeBtn.classList.remove('hidden');
        } else {
          resumeBtn.classList.add('hidden');
        }
      }
    } catch (error) {
      console.error('Update landing view error:', error);
    }
  }

  // Toggle question source section visibility
  toggleQuestionSourceSection(questionSource) {
    const jsonSection = document.getElementById('json-upload-section');
    if (jsonSection) {
      if (questionSource === 'json') {
        jsonSection.classList.remove('hidden');
      } else {
        jsonSection.classList.add('hidden');
        // Clear any previous JSON status
        const statusElement = document.getElementById('json-status');
        if (statusElement) statusElement.classList.add('hidden');
      }
    }
  }

  // Update question count display
  updateQuestionCount(state) {
    try {
      const totalQuestions = state.customQuestions ? state.customQuestions.length : 50;
      const testInfo = document.querySelector('.test-info p');
      if (testInfo) {
        const sourceText = state.questionSource === 'json' ? 'Custom JSON' : 'Default';
        testInfo.textContent = `${totalQuestions} Questions • Mixed Difficulty • ${sourceText} • Complete Analysis`;
      }
    } catch (error) {
      console.error('Update question count error:', error);
    }
  }

  // Show/hide modal
  showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('hidden');
    }
  }

  hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('hidden');
    }
  }

  // Update element content safely
  updateElement(id, content, property = 'textContent') {
    const element = document.getElementById(id);
    if (element) {
      element[property] = content;
    }
  }

  // Update element class safely
  updateElementClass(id, className, add = true) {
    const element = document.getElementById(id);
    if (element) {
      if (add) {
        element.classList.add(className);
      } else {
        element.classList.remove(className);
      }
    }
  }

  // Toggle element class safely
  toggleElementClass(id, className, force) {
    const element = document.getElementById(id);
    if (element) {
      element.classList.toggle(className, force);
    }
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ViewManager;
}