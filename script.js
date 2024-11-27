const questions = [
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "Hyper Text Markup Language", correct: true },
      { text: "High Text Machine Learning", correct: false },
      { text: "Hyperlink Text Markup Language", correct: false },
      { text: "Home Tool Markup Language", correct: false },
    ],
  },
  {
    question: "What does CSS stand for?",
    answers: [
      { text: "Creative Style Sheets", correct: false },
      { text: "Cascading Style Sheets", correct: true },
      { text: "Computer Style Sheets", correct: false },
      { text: "Colorful Style Sheets", correct: false },
    ],
  },
  {
    question: "What does JS stand for?",
    answers: [
      { text: "JavaScript", correct: true },
      { text: "JavaSource", correct: false },
      { text: "JustScript", correct: false },
      { text: "JQueryScript", correct: false },
    ],
  },
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 15;

const questionContainer = document.getElementById("question-container");
const answerButtons = document.getElementById("answer-buttons");
const submitBtn = document.getElementById("submit-btn");
const nextBtn = document.getElementById("next-btn");
const scoreContainer = document.getElementById("score-container");
const scoreDisplay = document.getElementById("score");
const feedback = document.getElementById("feedback");
const timerDisplay = document.getElementById("time");

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  scoreContainer.classList.add("hide");
  submitBtn.classList.remove("hide");
  nextBtn.classList.add("hide");
  showQuestion();
  resetTimer();
  startTimer();
}

function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  questionContainer.textContent = currentQuestion.question;
  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("btn");
    if (answer.correct) button.dataset.correct = answer.correct;
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
}

function resetState() {
  clearTimeout(timer);
  resetTimer();
  nextBtn.classList.add("hide");
  answerButtons.innerHTML = "";
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct === "true";
  if (correct) score++;
  document.querySelectorAll(".btn").forEach((button) => {
    button.disabled = true;
    if (button.dataset.correct === "true") button.style.background = "#28a745"; // green
    else button.style.background = "#dc3545"; // red
  });
  submitBtn.classList.add("hide");
  nextBtn.classList.remove("hide");
  clearTimeout(timer);
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearTimeout(timer);
      selectAnswer({ target: document.querySelector(".btn[data-correct]") });
    }
  }, 1000);
}

function resetTimer() {
  timeLeft = 15;
  timerDisplay.textContent = timeLeft;
}

function showResults() {
  scoreContainer.classList.remove("hide");
  submitBtn.classList.add("hide");
  nextBtn.classList.add("hide");
  scoreDisplay.textContent = `${score}/${questions.length}`;
  feedback.textContent =
    score === questions.length
      ? "Great job!"
      : score >= questions.length / 2
      ? "Good effort!"
      : "Keep practicing!";
}

nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
    resetTimer();
    startTimer();
  } else {
    showResults();
  }
});

document.getElementById("restart-btn").addEventListener("click", startQuiz);

document.addEventListener("DOMContentLoaded", startQuiz);
