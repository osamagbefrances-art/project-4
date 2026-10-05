// Question Data Object Array
const quizQuestions = [
  {
    question: "Which keyword is used to declare a block-scoped variable in JavaScript?",
    options: ["var", "let", "global", "define"],
    correctIndex: 1
  },
  {
    question: "What array method adds one or more elements to the end of an array?",
    options: ["unshift()", "shift()", "push()", "pop()"],
    correctIndex: 2
  },
  {
    question: "Which of the following is NOT a JavaScript data type?",
    options: ["Boolean", "String", "Float", "Symbol"],
    correctIndex: 2
  },
  {
    question: "What method is used to write text into the browser local storage?",
    options: ["localStorage.setItem()", "localStorage.save()", "localStorage.push()", "localStorage.write()"],
    correctIndex: 0
  },
  {
    question: "Which CSS property is used to create space around elements, outside of any defined borders?",
    options: ["padding", "margin", "border-spacing", "gap"],
    correctIndex: 1
  }
];

// State Variables
let currentQuestionIndex = 0;
let score = 0;
let answerSelected = false;

// DOM Elements
const questionCountEl = document.getElementById('question-count');
const scoreTrackerEl = document.getElementById('score-tracker');
const progressBarEl = document.getElementById('progress-bar');
const questionTextEl = document.getElementById('question-text');
const optionsContainerEl = document.getElementById('options-container');
const feedbackMsgEl = document.getElementById('feedback-msg');
const nextBtn = document.getElementById('next-btn');

const quizCard = document.getElementById('quiz-card');
const resultsScreen = document.getElementById('results-screen');
const finalScoreEl = document.getElementById('final-score');
const scorePercentageEl = document.getElementById('score-percentage');
const performanceMsgEl = document.getElementById('performance-msg');
const restartBtn = document.getElementById('restart-btn');

// Initialize Quiz
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  quizCard.classList.remove('hidden');
  resultsScreen.classList.add('hidden');
  updateScoreDisplay();
  loadQuestion();
}

// Update Header Displays
function updateScoreDisplay() {
  scoreTrackerEl.textContent = `Score: ${score}`;
}

function updateProgress() {
  const total = quizQuestions.length;
  questionCountEl.textContent = `Question ${currentQuestionIndex + 1} of ${total}`;
  const percentage = ((currentQuestionIndex + 1) / total) * 100;
  progressBarEl.style.width = `${percentage}%`;
}

// Load Current Question
function loadQuestion() {
  answerSelected = false;
  feedbackMsgEl.classList.add('hidden');
  nextBtn.classList.add('hidden');
  optionsContainerEl.innerHTML = '';

  updateProgress();

  const currentQ = quizQuestions[currentQuestionIndex];
  questionTextEl.textContent = currentQ.question;

  // Dynamically render options
  currentQ.options.forEach((optionText, index) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = optionText;
    btn.addEventListener('click', () => handleOptionClick(index));
    optionsContainerEl.appendChild(btn);
  });
}

// Handle Answer Selection with Instant Feedback
function handleOptionClick(selectedIndex) {
  if (answerSelected) return; // Prevent multiple clicks
  answerSelected = true;

  const currentQ = quizQuestions[currentQuestionIndex];
  const optionButtons = optionsContainerEl.querySelectorAll('.option-btn');

  // Disable all buttons after selection
  optionButtons.forEach(btn => btn.disabled = true);

  if (selectedIndex === currentQ.correctIndex) {
    score++;
    updateScoreDisplay();
    optionButtons[selectedIndex].classList.add('correct');
    showFeedback('Correct Answer!', true);
  } else {
    optionButtons[selectedIndex].classList.add('wrong');
    optionButtons[currentQ.correctIndex].classList.add('correct'); // Reveal correct answer
    showFeedback('Incorrect Answer!', false);
  }

  nextBtn.classList.remove('hidden');
}

// Display Instant Feedback
function showFeedback(message, isCorrect) {
  feedbackMsgEl.textContent = message;
  feedbackMsgEl.className = `feedback-msg ${isCorrect ? 'correct' : 'wrong'}`;
}

// Next Question or End Quiz
nextBtn.addEventListener('click', () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizQuestions.length) {
    loadQuestion();
  } else {
    showResults();
  }
});

// Render Results Summary Screen
function showResults() {
  quizCard.classList.add('hidden');
  resultsScreen.classList.remove('hidden');

  const total = quizQuestions.length;
  const percentage = Math.round((score / total) * 100);

  finalScoreEl.textContent = `${score}/${total}`;
  scorePercentageEl.textContent = `${percentage}%`;

  if (percentage === 100) {
    performanceMsgEl.textContent = "Perfect score! Outstanding work!";
  } else if (percentage >= 70) {
    performanceMsgEl.textContent = "Great job! You have a solid understanding.";
  } else if (percentage >= 50) {
    performanceMsgEl.textContent = "Good attempt! Room for improvement.";
  } else {
    performanceMsgEl.textContent = "Keep practicing, you'll get better!";
  }
}

// Restart Quiz Listener
restartBtn.addEventListener('click', startQuiz);

// App Entry Point
startQuiz();