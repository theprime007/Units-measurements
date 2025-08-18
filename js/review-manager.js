// ReviewAnswersManager Class - Add this to a new file or to your main app.js

class ReviewAnswersManager {
    constructor() {
        this.currentReviewIndex = 0;
        this.reviewData = null;
        this.questions = null;
        this.stateManager = null;
        this.initialized = false;
    }

    initialize(testResults, questionsData) {
        this.reviewData = testResults;
        this.questions = questionsData;
        this.stateManager = window.app?.stateManager || window.stateManager;
        this.currentReviewIndex = this.stateManager?.getReviewCurrentQuestion() || 0;
        
        if (!this.initialized) {
            this.setupEventListeners();
            this.initialized = true;
        }
        
        this.populateReviewSidebar();
        this.loadReviewQuestion(this.currentReviewIndex);
        
        // Update total questions display
        const totalQElement = document.getElementById('total-questions');
        if (totalQElement && this.questions) {
            totalQElement.textContent = this.questions.length;
        }
    }

    setupEventListeners() {
        // Toggle sidebar button
        const toggleBtn = document.getElementById("toggleReviewSidebar");
        const sidebar = document.getElementById("reviewSidebar");
        const overlay = document.getElementById("sidebarOverlay");
        const closeBtn = document.getElementById("closeSidebar");
        
        if (toggleBtn && sidebar) {
            toggleBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                this.toggleSidebar();
            });
        }
        
        if (closeBtn) {
            closeBtn.addEventListener("click", () => {
                this.closeSidebar();
            });
        }
        
        if (overlay) {
            overlay.addEventListener("click", () => {
                this.closeSidebar();
            });
        }

        // Navigation buttons
        const prevBtn = document.getElementById("review-prev-btn");
        const nextBtn = document.getElementById("review-next-btn");
        const backBtn = document.getElementById("back-to-results-btn");

        if (prevBtn) {
            prevBtn.addEventListener("click", () => this.previousQuestion());
        }
        if (nextBtn) {
            nextBtn.addEventListener("click", () => this.nextQuestion());
        }
        if (backBtn) {
            backBtn.addEventListener("click", () => this.backToResults());
        }

        // Keyboard navigation
        document.addEventListener("keydown", (e) => {
            if (window.app?.viewManager?.getCurrentView() === 'review-answers') {
                switch(e.key) {
                    case 'ArrowLeft':
                        e.preventDefault();
                        this.previousQuestion();
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        this.nextQuestion();
                        break;
                    case 'Escape':
                        this.closeSidebar();
                        break;
                }
            }
        });
    }

    toggleSidebar() {
        const sidebar = document.getElementById("reviewSidebar");
        const overlay = document.getElementById("sidebarOverlay");
        
        if (sidebar && overlay) {
            const isActive = sidebar.classList.contains("active");
            
            if (isActive) {
                this.closeSidebar();
            } else {
                this.openSidebar();
            }
        }
    }
    
    openSidebar() {
        const sidebar = document.getElementById("reviewSidebar");
        const overlay = document.getElementById("sidebarOverlay");
        
        if (sidebar && overlay) {
            sidebar.classList.add("active");
            overlay.classList.add("active");
            document.body.style.overflow = 'hidden';
        }
    }
    
    closeSidebar() {
        const sidebar = document.getElementById("reviewSidebar");
        const overlay = document.getElementById("sidebarOverlay");
        
        if (sidebar && overlay) {
            sidebar.classList.remove("active");
            overlay.classList.remove("active");
            document.body.style.overflow = '';
        }
    }

    populateReviewSidebar() {
        const list = document.getElementById("reviewSidebarList");
        
        if (!list || !this.questions) return;

        list.innerHTML = "";
        
        this.questions.forEach((question, index) => {
            const li = document.createElement("li");
            const preview = this.truncateText(question.text, 50);
            const userAnswer = this.reviewData?.answers?.[index];
            const isCorrect = userAnswer !== null && userAnswer !== undefined && userAnswer === question.correct;
            const isAnswered = userAnswer !== null && userAnswer !== undefined;
            
            let status, statusClass;
            if (!isAnswered) {
                status = "⚬";
                statusClass = "unanswered";
            } else if (isCorrect) {
                status = "✓";
                statusClass = "correct";
            } else {
                status = "✗";
                statusClass = "incorrect";
            }

            li.innerHTML = `
                <div class="question-preview">
                    <span class="question-status ${statusClass}">${status}</span>
                    <strong>Q${index + 1}:</strong>
                    <span class="question-text">${preview}</span>
                </div>
            `;
            
            li.addEventListener("click", () => {
                this.loadReviewQuestion(index);
                this.closeSidebar();
            });
            
            list.appendChild(li);
        });
    }

    loadReviewQuestion(index) {
        if (!this.questions || index < 0 || index >= this.questions.length) {
            return;
        }

        this.currentReviewIndex = index;
        
        // Save current review question to state
        if (this.stateManager) {
            this.stateManager.setReviewCurrentQuestion(index);
        }
        
        const question = this.questions[index];
        const userAnswer = this.reviewData?.answers?.[index];
        const timeSpent = this.reviewData?.timeSpent?.[index] || 0;

        // Update question number
        const qNumElement = document.getElementById("review-q-num");
        if (qNumElement) {
            qNumElement.textContent = index + 1;
        }

        // Update question text
        const questionTextElement = document.getElementById("review-question-text");
        if (questionTextElement) {
            questionTextElement.innerHTML = `
                <h3>Question ${index + 1}</h3>
                <p>${question.text}</p>
                ${question.image ? `<img src="${question.image}" alt="Question image" class="question-image">` : ''}
                <div class="options">
                    ${question.options.map((option, i) => 
                        `<div class="option">${String.fromCharCode(65 + i)}. ${option}</div>`
                    ).join('')}
                </div>
            `;
        }

        // Update user answer
        const userAnswerElement = document.getElementById("user-answer-display");
        if (userAnswerElement) {
            if (userAnswer !== undefined && userAnswer !== null) {
                const optionLetter = String.fromCharCode(65 + userAnswer);
                const optionText = question.options[userAnswer];
                const isCorrect = userAnswer === question.correct;
                userAnswerElement.innerHTML = `
                    <span class="answer-option ${isCorrect ? 'correct' : 'incorrect'}">
                        ${optionLetter}. ${optionText}
                    </span>
                `;
            } else {
                userAnswerElement.innerHTML = `<span class="answer-option unanswered">Not answered</span>`;
            }
        }

        // Update correct answer
        const correctAnswerElement = document.getElementById("correct-answer-display");
        if (correctAnswerElement) {
            const correctLetter = String.fromCharCode(65 + question.correct);
            const correctText = question.options[question.correct];
            correctAnswerElement.innerHTML = `
                <span class="answer-option correct">
                    ${correctLetter}. ${correctText}
                </span>
            `;
        }

        // Update solution
        const solutionElement = document.getElementById("solution-text");
        if (solutionElement) {
            solutionElement.innerHTML = question.solution || question.explanation || "Solution not available for this question.";
        }

        // Update time spent
        const timeElement = document.getElementById("question-time-spent");
        if (timeElement) {
            const minutes = Math.floor(timeSpent / 60);
            const seconds = timeSpent % 60;
            timeElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }

        // Update status
        const statusElement = document.getElementById("question-status-display");
        if (statusElement) {
            let status, statusClass;
            if (userAnswer === undefined || userAnswer === null) {
                status = "Not Answered";
                statusClass = "unanswered";
            } else if (userAnswer === question.correct) {
                status = "Correct";
                statusClass = "correct";
            } else {
                status = "Incorrect";
                statusClass = "incorrect";
            }
            statusElement.textContent = status;
            statusElement.className = `stat-value ${statusClass}`;
        }

        // Update navigation buttons
        const prevBtn = document.getElementById("review-prev-btn");
        const nextBtn = document.getElementById("review-next-btn");
        
        if (prevBtn) {
            prevBtn.disabled = index === 0;
        }
        if (nextBtn) {
            nextBtn.disabled = index === this.questions.length - 1;
        }
    }

    previousQuestion() {
        if (this.currentReviewIndex > 0) {
            this.loadReviewQuestion(this.currentReviewIndex - 1);
        }
    }

    nextQuestion() {
        if (this.currentReviewIndex < this.questions.length - 1) {
            this.loadReviewQuestion(this.currentReviewIndex + 1);
        }
    }

    backToResults() {
        // Navigate back to results view
        if (window.app && window.app.viewManager) {
            window.app.viewManager.showView('result');
        }
    }

    truncateText(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + "...";
    }
}

// Make it available globally
window.ReviewAnswersManager = ReviewAnswersManager;
