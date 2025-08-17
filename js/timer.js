// Custom Timer Component for Units-measurements Application
// Provides reusable timer functionality with audio/visual alerts and progress indicators

class CustomTimer {
  constructor(options = {}) {
    // FIXED: Accept duration in seconds for consistency, but maintain backward compatibility
    this.duration = options.duration || 60; // Duration in seconds (changed from minutes)
    this.isLegacyMode = options.legacyMinutes || false; // Support old minute-based calls
    
    // Convert legacy minute values to seconds
    if (this.isLegacyMode || this.duration > 600) { // Assume > 10 minutes means legacy mode
      this.duration = this.duration * 60; // Convert minutes to seconds
    }
    
    this.element = options.element || null; // DOM element to display timer
    this.progressElement = options.progressElement || null; // Progress indicator element
    this.onTick = options.onTick || null; // Callback for each tick
    this.onComplete = options.onComplete || null; // Callback when timer completes
    this.onWarning = options.onWarning || null; // Callback for warning thresholds
    this.warningThresholds = options.warningThresholds || [10, 5]; // Warning thresholds in seconds
    this.audioAlert = options.audioAlert !== false; // Enable audio alerts (default: true)
    this.visualAlert = options.visualAlert !== false; // Enable visual alerts (default: true)
    
    this.isRunning = false;
    this.isPaused = false;
    this.remainingTime = this.duration * 1000; // FIXED: Duration now in seconds, convert to milliseconds
    this.startTime = null;
    this.pausedTime = 0;
    this.interval = null;
    this.warningsTriggered = new Set();
    
    // FIXED: Audio context initialization with better error handling
    this.audioContextReady = false;
    
    this.init();
  }
  
  init() {
    // FIXED: Create audio context with user interaction detection
    if (this.audioAlert && typeof AudioContext !== 'undefined') {
      this.initializeAudioContext();
    }
    
    // Initialize display
    this.updateDisplay();
  }
  
  // FIXED: Better audio context initialization
  initializeAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      // Handle suspended audio context (browser policy)
      if (this.audioContext.state === 'suspended') {
        // Wait for user interaction to enable audio
        const enableAudio = () => {
          this.audioContext.resume().then(() => {
            this.audioContextReady = true;
            document.removeEventListener('click', enableAudio);
            document.removeEventListener('keydown', enableAudio);
          }).catch(err => {
            console.warn('Could not resume audio context:', err);
          });
        };
        
        document.addEventListener('click', enableAudio, { once: true });
        document.addEventListener('keydown', enableAudio, { once: true });
      } else {
        this.audioContextReady = true;
      }
    } catch (error) {
      console.warn('Audio context initialization failed:', error);
      this.audioAlert = false; // Disable audio alerts if initialization fails
    }
  }
  
  start() {
    if (this.isRunning && !this.isPaused) return;
    
    this.isRunning = true;
    this.isPaused = false;
    this.startTime = Date.now() - this.pausedTime;
    
    this.interval = setInterval(() => {
      this.tick();
    }, 1000);
    
    this.updateDisplay();
  }
  
  pause() {
    if (!this.isRunning || this.isPaused) return;
    
    this.isPaused = true;
    this.pausedTime = Date.now() - this.startTime;
    
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
    
    this.updateDisplay();
  }
  
  resume() {
    if (!this.isRunning || !this.isPaused) return;
    
    this.isPaused = false;
    this.startTime = Date.now() - this.pausedTime;
    
    this.interval = setInterval(() => {
      this.tick();
    }, 1000);
    
    this.updateDisplay();
  }
  
  reset() {
    this.stop();
    this.remainingTime = this.duration * 1000; // FIXED: Use seconds
    this.pausedTime = 0;
    this.warningsTriggered.clear();
    this.updateDisplay();
  }
  
  stop() {
    this.isRunning = false;
    this.isPaused = false;
    
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
  
  tick() {
    const elapsed = Date.now() - this.startTime;
    this.remainingTime = Math.max(0, (this.duration * 1000) - elapsed); // FIXED: Use seconds
    
    this.updateDisplay();
    this.checkWarnings();
    
    if (this.onTick) {
      this.onTick(this.remainingTime);
    }
    
    if (this.remainingTime <= 0) {
      this.complete();
    }
  }
  
  complete() {
    this.stop();
    this.triggerAlert('complete');
    
    if (this.onComplete) {
      this.onComplete();
    }
  }
  
  checkWarnings() {
    const remainingSeconds = Math.ceil(this.remainingTime / 1000); // FIXED: Use seconds
    
    this.warningThresholds.forEach(threshold => {
      if (remainingSeconds <= threshold && !this.warningsTriggered.has(threshold)) {
        this.warningsTriggered.add(threshold);
        this.triggerAlert('warning', threshold);
        
        if (this.onWarning) {
          this.onWarning(threshold, this.remainingTime);
        }
      }
    });
  }
  
  triggerAlert(type, threshold = null) {
    if (this.audioAlert) {
      this.playAudioAlert(type, threshold);
    }
    
    if (this.visualAlert) {
      this.showVisualAlert(type, threshold);
    }
  }
  
  // FIXED: Better audio alert with error handling
  playAudioAlert(type, threshold) {
    if (!this.audioContext || !this.audioContextReady) {
      console.warn('Audio context not ready, skipping audio alert');
      return;
    }
    
    try {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      // Different frequencies for different alert types
      if (type === 'complete') {
        oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
        oscillator.frequency.setValueAtTime(600, this.audioContext.currentTime + 0.1);
        oscillator.frequency.setValueAtTime(400, this.audioContext.currentTime + 0.2);
        gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.5);
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.5);
      } else if (type === 'warning') {
        const frequency = threshold <= 5 ? 600 : 400; // Higher frequency for more urgent warnings
        oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.3);
      }
    } catch (error) {
      console.warn('Audio alert failed:', error);
    }
  }
  
  showVisualAlert(type, threshold) {
    if (!this.element) return;
    
    const alertClass = type === 'complete' ? 'timer-complete' : 
                     threshold <= 5 ? 'timer-danger' : 'timer-warning';
    
    this.element.classList.add(alertClass, 'timer-alert');
    
    setTimeout(() => {
      this.element.classList.remove('timer-alert');
    }, 1000);
  }
  
  updateDisplay() {
    if (this.element) {
      this.element.textContent = this.formatTime(this.remainingTime);
      
      // Update CSS classes for visual feedback
      this.element.classList.remove('warning', 'danger', 'paused');
      
      if (this.isPaused) {
        this.element.classList.add('paused');
      } else {
        const remainingSeconds = this.remainingTime / 1000; // FIXED: Use seconds
        if (remainingSeconds <= 5) {
          this.element.classList.add('danger');
        } else if (remainingSeconds <= 10) {
          this.element.classList.add('warning');
        }
      }
    }
    
    if (this.progressElement) {
      this.updateProgress();
    }
  }
  
  updateProgress() {
    const totalTime = this.duration * 1000; // FIXED: Use seconds
    const progress = Math.max(0, Math.min(100, ((totalTime - this.remainingTime) / totalTime) * 100));
    
    if (this.progressElement.tagName === 'PROGRESS') {
      this.progressElement.value = progress;
    } else {
      // Assume it's a div with progress bar styling
      const progressBar = this.progressElement.querySelector('.progress-bar') || this.progressElement;
      progressBar.style.width = `${progress}%`;
      
      // Update color based on remaining time
      const remainingSeconds = this.remainingTime / 1000; // FIXED: Use seconds
      progressBar.classList.remove('progress-warning', 'progress-danger');
      
      if (remainingSeconds <= 5) {
        progressBar.classList.add('progress-danger');
      } else if (remainingSeconds <= 10) {
        progressBar.classList.add('progress-warning');
      }
    }
  }
  
  formatTime(milliseconds) {
    const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000));
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else {
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
  }
  
  // Getter methods for current state
  getRemainingTime() {
    return this.remainingTime;
  }
  
  getRemainingSeconds() { // FIXED: Added method for seconds
    return Math.ceil(this.remainingTime / 1000);
  }
  
  getRemainingMinutes() {
    return Math.ceil(this.remainingTime / (60 * 1000));
  }
  
  getProgress() {
    const totalTime = this.duration * 1000; // FIXED: Use seconds
    return ((totalTime - this.remainingTime) / totalTime) * 100;
  }
  
  isActive() {
    return this.isRunning && !this.isPaused;
  }
  
  // Setter methods for dynamic configuration
  setDuration(seconds) { // FIXED: Parameter name changed to seconds
    if (!this.isRunning) {
      this.duration = seconds;
      this.remainingTime = this.duration * 1000;
      this.updateDisplay();
    }
  }
  
  setWarningThresholds(thresholds) {
    this.warningThresholds = thresholds; // Now expects seconds
    this.warningsTriggered.clear();
  }
  
  enableAudio(enabled = true) {
    this.audioAlert = enabled;
    if (enabled && !this.audioContext) {
      this.initializeAudioContext();
    }
  }
  
  enableVisual(enabled = true) {
    this.visualAlert = enabled;
  }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CustomTimer;
}
