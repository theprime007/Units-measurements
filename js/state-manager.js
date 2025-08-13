// State Management Module
// Handles application state, local storage, and state transitions

class StateManager {
  constructor() {
    this.state = this.getInitialState();
    this.storageKey = 'dimensionalMockState';
  }

  getInitialState() {
    return {
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
  }

  // Load state from localStorage
  loadState() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved) {
        const loadedState = JSON.parse(saved);
        this.state = { ...this.state, ...loadedState };
      }
    } catch (error) {
      console.error('Load state error:', error);
    }
  }

  // Save state to localStorage
  saveState() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.state));
    } catch (error) {
      console.error('Save state error:', error);
    }
  }

  // Reset state to initial values
  resetState() {
    this.state = this.getInitialState();
    this.saveState();
  }

  // Update specific state properties
  updateState(updates) {
    this.state = { ...this.state, ...updates };
    this.saveState();
  }

  // Getters for state properties
  getState() {
    return this.state;
  }

  getCurrentQuestion() {
    return this.state.currentQ;
  }

  getAnswers() {
    return this.state.answers;
  }

  getBookmarked() {
    return this.state.bookmarked;
  }

  getTimeSpent() {
    return this.state.timeSpent;
  }

  getTestDuration() {
    return this.state.testDuration;
  }

  getResults() {
    return this.state.results;
  }

  // Setters for common state changes
  setCurrentQuestion(questionIndex) {
    this.updateState({ currentQ: questionIndex });
  }

  setAnswer(questionIndex, answerIndex) {
    const answers = [...this.state.answers];
    answers[questionIndex] = answerIndex;
    this.updateState({ answers });
  }

  toggleBookmark(questionIndex) {
    const bookmarked = [...this.state.bookmarked];
    bookmarked[questionIndex] = !bookmarked[questionIndex];
    this.updateState({ bookmarked });
  }

  clearAnswer(questionIndex) {
    const answers = [...this.state.answers];
    answers[questionIndex] = null;
    this.updateState({ answers });
  }

  updateTimeSpent(questionIndex, timeSpent) {
    const timeSpentArray = [...this.state.timeSpent];
    timeSpentArray[questionIndex] = timeSpent;
    this.updateState({ timeSpent: timeSpentArray });
  }

  setTestStart(timestamp = Date.now()) {
    this.updateState({ testStart: timestamp, testEnd: null });
  }

  setTestEnd(timestamp = Date.now()) {
    this.updateState({ testEnd: timestamp });
  }

  setResults(results) {
    this.updateState({ results });
  }

  setCustomQuestions(questions) {
    // Update arrays to match new question count
    const questionCount = questions ? questions.length : 50;
    this.updateState({
      customQuestions: questions,
      answers: Array(questionCount).fill(null),
      bookmarked: Array(questionCount).fill(false),
      timeSpent: Array(questionCount).fill(0),
      currentQ: 0
    });
  }

  // Utility methods
  isTestInProgress() {
    return this.state.testStart && !this.state.testEnd;
  }

  getTotalQuestions() {
    return this.state.customQuestions ? this.state.customQuestions.length : 50;
  }

  getAnsweredCount() {
    return this.state.answers.filter(answer => answer !== null).length;
  }

  getBookmarkedCount() {
    return this.state.bookmarked.filter(Boolean).length;
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = StateManager;
}