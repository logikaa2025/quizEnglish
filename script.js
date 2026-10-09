const questions = [

    {
        question: "Який час означає Present Continuous",
        answers: [
            "дія відбувається саме зараз",
            "дія відбувалась вчора",
            "дія буде відбуватись завтра",
            "дія відбувалась тиждень назад"
        ],
        correct: 0
    },

    {
        question: "What ___ you doing at 7 p.m. yesterday?",
        answers: [
            "was",
            "were",
            "did",
            "are"
        ],
        correct: 1
    },

    {
        question: "She ___ dinner when I came home",
        answers: [
            "cooks",
            "cooked",
            "was cooking",
            "were cooking"
        ],
        correct: 2
    },

    {
        question: "I ___ English for three years",
        answers: [
            "study",
            "am studying",
            "have been studying",
            "studied"
        ],
        correct: 2
    },

    {
        question: "They ___ football since 4 p.m",
        answers: [
            "have been playing",
            "played",
            "are playing",
            "were playing"
        ],
        correct: 0
    },

    {
        question: "At 6 p.m. yesterday, my sister ___ a cake",
        answers: [
            "made",
            "was making",
            "were making",
            "makes"
        ],
        correct: 1
    },

    {
        question: "While I ___ home, I saw an old friend",
        answers: [
            "am walking",
            "walked",
            "were walking",
            "was walking"
        ],
        correct: 3
    },

    {
        question: "I’m sure you ___ this movie",
        answers: [
            "enjoyed",
            "enjoy",
            "will enjoy",
            "enjoying"
        ],
        correct: 2
    },

    {
        question: "___ you call me when you arrive?",
        answers: [
            "Do",
            "Will",
            "Did",
            "Are"
        ],
        correct: 1
    },

    {
        question: "They ___ a new house this month",
        answers: [
            "is building",
            "build",
            "built",
            "are building"
        ],
        correct: 3
    },

    {
        question: "We ___ for our teacher right now",
        answers: [
            "wait",
            "waited",
            "are waiting",
            "is waiting"
        ],
        correct: 2
    }

];


// ========================================
// ЕЛЕМЕНТИ HTML
// ========================================

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");

const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");

const timerDisplay = document.getElementById("timer");
const scoreDisplay = document.getElementById("score-display");

const resultText = document.getElementById("result-text");


// ========================================
// ЗМІННІ
// ========================================

let questionIndex = 0;
let score = 0;

let timer = 15;
let interval = null;


// ========================================
// ПОЧАТОК ГРИ
// ========================================

function startGame() {

    clearInterval(interval);

    questionIndex = 0;
    score = 0;

    scoreDisplay.textContent = "Бали: 0";

    startScreen.classList.add("hide");
    resultScreen.classList.add("hide");
    quizScreen.classList.remove("hide");

    showQuestion();
}


// ========================================
// ПОКАЗ ПИТАННЯ
// ========================================

function showQuestion() {

    clearInterval(interval);

    const question = questions[questionIndex];

    questionText.textContent = question.question;

    answersContainer.innerHTML = "";


    question.answers.forEach((answer, index) => {

        const button = document.createElement("button");

        button.classList.add("answer-btn");

        button.textContent = answer;

        button.addEventListener("click", function () {

            checkAnswer(button, index);

        });

        answersContainer.appendChild(button);

    });


    startTimer();
}


// ========================================
// ТАЙМЕР
// ========================================

function startTimer() {

    timer = 15;

    timerDisplay.textContent = `Час: ${timer}`;

    clearInterval(interval);

    interval = setInterval(function () {

        timer--;

        timerDisplay.textContent = `Час: ${timer}`;


        if (timer <= 0) {

            clearInterval(interval);

            nextQuestion();

        }

    }, 1000);
}


// ========================================
// ПЕРЕВІРКА ВІДПОВІДІ
// ========================================

function checkAnswer(button, answerIndex) {

    clearInterval(interval);

    const correctAnswer =
        questions[questionIndex].correct;

    const allButtons =
        document.querySelectorAll(".answer-btn");


    if (answerIndex === correctAnswer) {

        score++;

        button.classList.add("correct");

    } else {

        button.classList.add("wrong");

        allButtons[correctAnswer]
            .classList.add("correct");

    }


    scoreDisplay.textContent =
        `Бали: ${score}`;


    allButtons.forEach(function (btn) {

        btn.disabled = true;

    });


    setTimeout(function () {

        nextQuestion();

    }, 1000);
}

function nextQuestion() {

    questionIndex++;

    if (questionIndex < questions.length) {

        showQuestion();

    } else {

        clearInterval(interval);

        showResult();

    }
}


// ========================================
// РЕЗУЛЬТАТ
// ========================================

function showResult() {

    clearInterval(interval);

    quizScreen.classList.add("hide");

    resultScreen.classList.remove("hide");


    const percent = Math.round(
        (score / questions.length) * 100
    );


    resultText.textContent =
        `Твій результат: ${score}/${questions.length} (${percent}%)`;
}


startBtn.addEventListener("click", startGame);

restartBtn.addEventListener("click", startGame);
