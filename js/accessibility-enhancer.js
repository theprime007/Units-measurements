// Phase 6: Advanced Accessibility Features
// Comprehensive accessibility enhancements for inclusive learning

class AccessibilityEnhancer {
  constructor() {
    // Prevent duplicate initialization
    if (AccessibilityEnhancer.instance) {
      return AccessibilityEnhancer.instance;
    }
    
    this.settings = {
      highContrast: false,
      largeText: false,
      reducedMotion: false,
      screenReaderMode: false,
      keyboardNavigation: true,
      focusIndicators: true,
      audioFeedback: false,
      colorBlindMode: 'none' // none, deuteranopia, protanopia, tritanopia
    };
    
    this.focusHistory = [];
    this.announcements = [];
    
    this.init();
    AccessibilityEnhancer.instance = this;
  }
  
  init() {
    this.loadAccessibilitySettings();
    this.setupAccessibilityControls();
    this.enhanceKeyboardNavigation();
    this.setupScreenReaderSupport();
    this.applyAccessibilitySettings();
    console.log('Accessibility Enhancer initialized');
  }
  
  // Load accessibility settings
  loadAccessibilitySettings() {
    try {
      const saved = localStorage.getItem('accessibilitySettings');
      if (saved) {
        this.settings = { ...this.settings, ...JSON.parse(saved) };
      }
      
      // Check for system preferences
      if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        this.settings.reducedMotion = true;
      }
      
      if (window.matchMedia && window.matchMedia('(prefers-contrast: high)').matches) {
        this.settings.highContrast = true;
      }
    } catch (error) {
      console.warn('Failed to load accessibility settings:', error);
    }
  }
  
  // Save accessibility settings
  saveAccessibilitySettings() {
    try {
      localStorage.setItem('accessibilitySettings', JSON.stringify(this.settings));
    } catch (error) {
      console.warn('Failed to save accessibility settings:', error);
    }
  }
  
  // Setup accessibility control panel
  setupAccessibilityControls() {
    const controlsHTML = `
      <div class="accessibility-controls glass-panel" id="accessibility-panel">
        <div class="accessibility-header">
          <h3>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zM21 9h-6l-2-5-2 5H5a1 1 0 0 0-1 1v3a2 2 0 0 0 2 2h4v7.5a1.5 1.5 0 0 0 3 0V15h2v7.5a1.5 1.5 0 0 0 3 0V15h4a2 2 0 0 0 2-2v-3a1 1 0 0 0-1-1z"/>
            </svg>
            Accessibility Settings
          </h3>
          <button class="accessibility-toggle" id="accessibility-toggle" aria-label="Toggle accessibility panel">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            </svg>
          </button>
        </div>
        <div class="accessibility-content">
          <div class="accessibility-section">
            <h4>Visual</h4>
            <div class="accessibility-options">
              <label class="accessibility-option">
                <input type="checkbox" id="high-contrast" ${this.settings.highContrast ? 'checked' : ''}>
                <span class="option-label">High Contrast Mode</span>
                <span class="option-description">Enhance text and background contrast</span>
              </label>
              <label class="accessibility-option">
                <input type="checkbox" id="large-text" ${this.settings.largeText ? 'checked' : ''}>
                <span class="option-label">Large Text</span>
                <span class="option-description">Increase font size for better readability</span>
              </label>
              <label class="accessibility-option">
                <input type="checkbox" id="reduced-motion" ${this.settings.reducedMotion ? 'checked' : ''}>
                <span class="option-label">Reduce Motion</span>
                <span class="option-description">Minimize animations and transitions</span>
              </label>
              <div class="accessibility-option">
                <label for="color-blind-mode">Color Blind Support</label>
                <select id="color-blind-mode">
                  <option value="none" ${this.settings.colorBlindMode === 'none' ? 'selected' : ''}>None</option>
                  <option value="deuteranopia" ${this.settings.colorBlindMode === 'deuteranopia' ? 'selected' : ''}>Deuteranopia (Red-Green)</option>
                  <option value="protanopia" ${this.settings.colorBlindMode === 'protanopia' ? 'selected' : ''}>Protanopia (Red-Green)</option>
                  <option value="tritanopia" ${this.settings.colorBlindMode === 'tritanopia' ? 'selected' : ''}>Tritanopia (Blue-Yellow)</option>
                </select>
              </div>
            </div>
          </div>
          
          <div class="accessibility-section">
            <h4>Navigation</h4>
            <div class="accessibility-options">
              <label class="accessibility-option">
                <input type="checkbox" id="keyboard-navigation" ${this.settings.keyboardNavigation ? 'checked' : ''}>
                <span class="option-label">Enhanced Keyboard Navigation</span>
                <span class="option-description">Improve tab order and keyboard shortcuts</span>
              </label>
              <label class="accessibility-option">
                <input type="checkbox" id="focus-indicators" ${this.settings.focusIndicators ? 'checked' : ''}>
                <span class="option-label">Enhanced Focus Indicators</span>
                <span class="option-description">Make focused elements more visible</span>
              </label>
            </div>
          </div>
          
          <div class="accessibility-section">
            <h4>Audio & Screen Reader</h4>
            <div class="accessibility-options">
              <label class="accessibility-option">
                <input type="checkbox" id="screen-reader-mode" ${this.settings.screenReaderMode ? 'checked' : ''}>
                <span class="option-label">Screen Reader Mode</span>
                <span class="option-description">Optimize for screen reader users</span>
              </label>
              <label class="accessibility-option">
                <input type="checkbox" id="audio-feedback" ${this.settings.audioFeedback ? 'checked' : ''}>
                <span class="option-label">Audio Feedback</span>
                <span class="option-description">Play sounds for interactions</span>
              </label>
            </div>
          </div>
          
          <div class="accessibility-section">
            <h4>Quick Actions</h4>
            <div class="accessibility-actions">
              <button class="accessibility-action-btn" id="skip-to-content">Skip to Main Content</button>
              <button class="accessibility-action-btn" id="read-question">Read Current Question</button>
              <button class="accessibility-action-btn" id="keyboard-shortcuts">View Keyboard Shortcuts</button>
            </div>
          </div>
        </div>
      </div>
    `;
    
    this.controlsHTML = controlsHTML;
  }
  
  // Apply accessibility settings
  applyAccessibilitySettings() {
    const body = document.body;
    
    // High contrast mode
    if (this.settings.highContrast) {
      body.classList.add('high-contrast');
    } else {
      body.classList.remove('high-contrast');
    }
    
    // Large text mode
    if (this.settings.largeText) {
      body.classList.add('large-text');
    } else {
      body.classList.remove('large-text');
    }
    
    // Reduced motion
    if (this.settings.reducedMotion) {
      body.classList.add('reduced-motion');
    } else {
      body.classList.remove('reduced-motion');
    }
    
    // Screen reader mode
    if (this.settings.screenReaderMode) {
      body.classList.add('screen-reader-mode');
    } else {
      body.classList.remove('screen-reader-mode');
    }
    
    // Color blind mode
    body.classList.remove('deuteranopia', 'protanopia', 'tritanopia');
    if (this.settings.colorBlindMode !== 'none') {
      body.classList.add(this.settings.colorBlindMode);
    }
    
    // Focus indicators
    if (this.settings.focusIndicators) {
      body.classList.add('enhanced-focus');
    } else {
      body.classList.remove('enhanced-focus');
    }
  }
  
  // Enhanced keyboard navigation
  enhanceKeyboardNavigation() {
    const keyboardShortcuts = {
      'Alt+1': () => this.skipToContent(),
      'Alt+2': () => this.skipToNavigation(),
      'Alt+3': () => this.skipToMain(),
      'Escape': () => this.handleEscape(),
      'Tab': (e) => this.enhancedTabNavigation(e),
      'Shift+Tab': (e) => this.enhancedTabNavigation(e),
      'Space': (e) => this.handleSpaceKey(e),
      'Enter': (e) => this.handleEnterKey(e),
      'r': () => this.readCurrentElement(),
      'q': () => this.readCurrentQuestion(),
      'n': () => this.goToNextQuestion(),
      'p': () => this.goToPreviousQuestion()
    };
    
    document.addEventListener('keydown', (e) => {
      if (!this.settings.keyboardNavigation) return;
      
      const key = this.getKeyCombo(e);
      if (keyboardShortcuts[key]) {
        keyboardShortcuts[key](e);
      }
    });
    
    // Add skip links
    this.addSkipLinks();
  }
  
  // Get key combination string
  getKeyCombo(e) {
    const parts = [];
    if (e.ctrlKey) parts.push('Ctrl');
    if (e.altKey) parts.push('Alt');
    if (e.shiftKey) parts.push('Shift');
    if (e.metaKey) parts.push('Meta');
    parts.push(e.key);
    return parts.join('+');
  }
  
  // Add skip links for keyboard navigation
  addSkipLinks() {
    const skipLinks = document.createElement('div');
    skipLinks.className = 'skip-links';
    skipLinks.innerHTML = `
      <a href="#main-content" class="skip-link">Skip to main content</a>
      <a href="#navigation" class="skip-link">Skip to navigation</a>
      <a href="#accessibility-panel" class="skip-link">Skip to accessibility settings</a>
    `;
    
    document.body.insertBefore(skipLinks, document.body.firstChild);
  }
  
  // Enhanced tab navigation
  enhancedTabNavigation(e) {
    const focusableElements = this.getFocusableElements();
    const currentIndex = focusableElements.indexOf(document.activeElement);
    
    if (e.shiftKey) {
      // Shift+Tab - previous element
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : focusableElements.length - 1;
      focusableElements[prevIndex]?.focus();
    } else {
      // Tab - next element
      const nextIndex = currentIndex < focusableElements.length - 1 ? currentIndex + 1 : 0;
      focusableElements[nextIndex]?.focus();
    }
    
    // Track focus history
    this.focusHistory.push(document.activeElement);
    if (this.focusHistory.length > 10) {
      this.focusHistory.shift();
    }
  }
  
  // Get all focusable elements
  getFocusableElements() {
    const selector = 'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])';
    return Array.from(document.querySelectorAll(selector)).filter(el => {
      return !el.disabled && !el.hidden && el.offsetWidth > 0 && el.offsetHeight > 0;
    });
  }
  
  // Screen reader support
  setupScreenReaderSupport() {
    // Create live region for announcements
    const liveRegion = document.createElement('div');
    liveRegion.id = 'accessibility-announcements';
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    document.body.appendChild(liveRegion);
    
    // Enhanced ARIA labels and descriptions
    this.enhanceARIASupport();
    
    // Question reading functionality
    this.setupQuestionReader();
  }
  
  // Enhance ARIA support
  enhanceARIASupport() {
    // Add ARIA landmarks
    const main = document.querySelector('#app-container');
    if (main && !main.getAttribute('role')) {
      main.setAttribute('role', 'main');
    }
    
    // Enhance button descriptions
    document.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON' && this.settings.screenReaderMode) {
        this.announceAction(`Button ${e.target.textContent || e.target.getAttribute('aria-label')} activated`);
      }
    });
    
    // Add progress announcements
    this.setupProgressAnnouncements();
  }
  
  // Setup question reader
  setupQuestionReader() {
    if (!('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported');
      return;
    }
    
    this.speechSynth = window.speechSynthesis;
    this.voices = [];
    
    // Load voices
    const loadVoices = () => {
      this.voices = this.speechSynth.getVoices();
    };
    
    loadVoices();
    if (this.speechSynth.onvoiceschanged !== undefined) {
      this.speechSynth.onvoiceschanged = loadVoices;
    }
  }
  
  // Read text aloud
  readAloud(text, priority = 'normal') {
    if (!this.settings.audioFeedback && !this.settings.screenReaderMode) return;
    
    // Cancel previous speech
    this.speechSynth.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.8;
    utterance.pitch = 1;
    utterance.volume = 0.7;
    
    // Select appropriate voice
    const englishVoice = this.voices.find(voice => voice.lang.startsWith('en'));
    if (englishVoice) {
      utterance.voice = englishVoice;
    }
    
    this.speechSynth.speak(utterance);
  }
  
  // Announce to screen readers
  announceToScreenReader(message, priority = 'polite') {
    const announcements = document.getElementById('accessibility-announcements');
    if (announcements) {
      announcements.setAttribute('aria-live', priority);
      announcements.textContent = message;
      
      // Clear after announcement
      setTimeout(() => {
        announcements.textContent = '';
      }, 1000);
    }
  }
  
  // Setup progress announcements
  setupProgressAnnouncements() {
    // Announce test progress
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' || mutation.type === 'characterData') {
          const target = mutation.target;
          
          // Announce timer updates
          if (target.classList && target.classList.contains('timer-display')) {
            const timeText = target.textContent;
            if (timeText.includes('0:30') || timeText.includes('0:10')) {
              this.announceToScreenReader(`Time remaining: ${timeText}`, 'assertive');
            }
          }
          
          // Announce question changes
          if (target.classList && target.classList.contains('question-number')) {
            this.announceToScreenReader(target.textContent);
          }
        }
      });
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true
    });
  }
  
  // Keyboard shortcut handlers
  skipToContent() {
    const main = document.querySelector('#main-content, main, [role="main"]');
    if (main) {
      main.focus();
      this.announceToScreenReader('Skipped to main content');
    }
  }
  
  skipToNavigation() {
    const nav = document.querySelector('nav, [role="navigation"]');
    if (nav) {
      nav.focus();
      this.announceToScreenReader('Skipped to navigation');
    }
  }
  
  readCurrentElement() {
    const focused = document.activeElement;
    if (focused) {
      const text = focused.textContent || focused.getAttribute('aria-label') || focused.value;
      this.readAloud(text);
    }
  }
  
  readCurrentQuestion() {
    const question = document.querySelector('.question-text, .current-question');
    if (question) {
      const questionText = question.textContent;
      const questionNumber = document.querySelector('.question-number')?.textContent || '';
      this.readAloud(`${questionNumber}. ${questionText}`);
    }
  }
  
  goToNextQuestion() {
    const nextBtn = document.querySelector('.next-btn, [data-action="next"]');
    if (nextBtn && !nextBtn.disabled) {
      nextBtn.click();
      this.announceToScreenReader('Moved to next question');
    }
  }
  
  goToPreviousQuestion() {
    const prevBtn = document.querySelector('.prev-btn, [data-action="previous"]');
    if (prevBtn && !prevBtn.disabled) {
      prevBtn.click();
      this.announceToScreenReader('Moved to previous question');
    }
  }
  
  handleEscape() {
    // Close modals or return to main content
    const modal = document.querySelector('.modal.show, .popup.show');
    if (modal) {
      const closeBtn = modal.querySelector('.close-btn, [data-action="close"]');
      if (closeBtn) {
        closeBtn.click();
      }
    }
  }
  
  // Setup event listeners for accessibility controls
  setupEventListeners() {
    document.addEventListener('change', (e) => {
      const target = e.target;
      
      if (target.id === 'high-contrast') {
        this.settings.highContrast = target.checked;
        this.applyAccessibilitySettings();
        this.saveAccessibilitySettings();
      }
      
      if (target.id === 'large-text') {
        this.settings.largeText = target.checked;
        this.applyAccessibilitySettings();
        this.saveAccessibilitySettings();
      }
      
      if (target.id === 'reduced-motion') {
        this.settings.reducedMotion = target.checked;
        this.applyAccessibilitySettings();
        this.saveAccessibilitySettings();
      }
      
      if (target.id === 'screen-reader-mode') {
        this.settings.screenReaderMode = target.checked;
        this.applyAccessibilitySettings();
        this.saveAccessibilitySettings();
      }
      
      if (target.id === 'keyboard-navigation') {
        this.settings.keyboardNavigation = target.checked;
        this.saveAccessibilitySettings();
      }
      
      if (target.id === 'focus-indicators') {
        this.settings.focusIndicators = target.checked;
        this.applyAccessibilitySettings();
        this.saveAccessibilitySettings();
      }
      
      if (target.id === 'audio-feedback') {
        this.settings.audioFeedback = target.checked;
        this.saveAccessibilitySettings();
      }
      
      if (target.id === 'color-blind-mode') {
        this.settings.colorBlindMode = target.value;
        this.applyAccessibilitySettings();
        this.saveAccessibilitySettings();
      }
    });
    
    document.addEventListener('click', (e) => {
      if (e.target.id === 'accessibility-toggle') {
        this.toggleAccessibilityPanel();
      }
      
      if (e.target.id === 'skip-to-content') {
        this.skipToContent();
      }
      
      if (e.target.id === 'read-question') {
        this.readCurrentQuestion();
      }
      
      if (e.target.id === 'keyboard-shortcuts') {
        this.showKeyboardShortcuts();
      }
    });
  }
  
  // Toggle accessibility panel
  toggleAccessibilityPanel() {
    const panel = document.getElementById('accessibility-panel');
    if (panel) {
      panel.classList.toggle('expanded');
      const isExpanded = panel.classList.contains('expanded');
      
      const toggleBtn = document.getElementById('accessibility-toggle');
      if (toggleBtn) {
        toggleBtn.setAttribute('aria-expanded', isExpanded);
        toggleBtn.innerHTML = isExpanded 
          ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13H5v-2h14v2z"/></svg>'
          : '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>';
      }
      
      this.announceToScreenReader(`Accessibility panel ${isExpanded ? 'expanded' : 'collapsed'}`);
    }
  }
  
  // Show keyboard shortcuts help
  showKeyboardShortcuts() {
    const shortcuts = [
      { key: 'Alt + 1', action: 'Skip to main content' },
      { key: 'Alt + 2', action: 'Skip to navigation' },
      { key: 'Tab', action: 'Navigate to next element' },
      { key: 'Shift + Tab', action: 'Navigate to previous element' },
      { key: 'Space', action: 'Activate button or checkbox' },
      { key: 'Enter', action: 'Activate button or link' },
      { key: 'Escape', action: 'Close modal or return to main' },
      { key: 'R', action: 'Read current element' },
      { key: 'Q', action: 'Read current question' },
      { key: 'N', action: 'Go to next question' },
      { key: 'P', action: 'Go to previous question' }
    ];
    
    const helpModal = document.createElement('div');
    helpModal.className = 'keyboard-shortcuts-modal modal show glass-panel';
    helpModal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h3>Keyboard Shortcuts</h3>
          <button class="close-btn" aria-label="Close shortcuts help">&times;</button>
        </div>
        <div class="modal-body">
          <div class="shortcuts-list">
            ${shortcuts.map(shortcut => `
              <div class="shortcut-item">
                <kbd class="shortcut-key">${shortcut.key}</kbd>
                <span class="shortcut-action">${shortcut.action}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(helpModal);
    
    // Close functionality
    helpModal.querySelector('.close-btn').addEventListener('click', () => {
      document.body.removeChild(helpModal);
    });
    
    // Focus management
    helpModal.querySelector('.close-btn').focus();
  }
  
  // Get accessibility controls HTML
  getAccessibilityControlsHTML() {
    return this.controlsHTML;
  }
  
  // Announce action for screen readers
  announceAction(message) {
    this.announceToScreenReader(message);
    
    if (this.settings.audioFeedback) {
      // Play a brief tone for audio feedback
      this.playTone(200, 100); // 200Hz for 100ms
    }
  }
  
  // Play audio tone
  playTone(frequency, duration) {
    if (!window.AudioContext && !window.webkitAudioContext) return;
    
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration / 1000);
  }
}

// Export for global access
window.AccessibilityEnhancer = AccessibilityEnhancer;