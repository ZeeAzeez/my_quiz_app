//html quiz questions to be answered
const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "A.  Hyper Text Markup Language", correct: true },
            { text: "B.  Hyperlinks and Text Markup Language", correct: false },
            { text: "C.  Home Tool Markup Language", correct: false },
            { text: "D.  HyperTransfer Markup Language", correct: false }
        ] 
    },
    {
        question: "What does the HTML < img > tag stand for?",
        answers: [
            { text: "A.  Inline Media Graphics", correct: false },
            { text: "B.  Image Source", correct: false },
            { text: "C.  Image", correct: true },
            { text: "D.  Insert Media", correct: false }
        ] 
    },
    {
        question: "Which HTML tag is used for creating an ordered list?",
        answers: [
            { text: "A.   < ul > ", correct: false },
            { text: "B.  < ol > ", correct: true },
            { text: "C.   < list > ", correct: false },
            { text: "D.   < order >", correct: false }
        ]  
    },
    {
        question: "What is the purpose of the HTML < head > tag?",
        answers: [
            { text: "A.  It defines the main content of the HTML document.", correct: false },
            { text: "B.  It defines a header for the document.", correct: false },
            { text: "C.  It contains metadata about the HTML document.", correct: true },
            { text: "D.  It defines a hyperlink.", correct: false }
        ] 
    },
    {
        question: "Which HTML tag is used for creating hyperlinks?",
        answers: [
            { text: "A.  < link > ", correct: false },
            { text: "B.  < a > ", correct: true },
            { text: "C.  < hlink >", correct: false },
            { text: "D.  < url >", correct: false }
        ] 
    },
    {
        question: "Which HTML tag is used to create a hyperlink to another website?",
        answers: [
            { text: "A.  < link > ", correct: false },
            { text: "B.  < a > ", correct: true },
            { text: "C.  < url > ", correct: false },
            { text: "D.  < web > ", correct: false }
        ] 
    },
    {
        question: "In HTML, what does the acronym DOCTYPE stand for?",
        answers: [
            { text: "A.  Document Type", correct: true },
            { text: "B.  Document Text", correct: false },
            { text: "C.  Document Template", correct: false },
            { text: "D.  Document Title", correct: false }
        ] 
    },
    {
        question: "What is the purpose of the HTML < footer > tag?",
        answers: [
            { text: "A.  To define a section in a document", correct: false },
            { text: "B.  To define a header for a document", correct: false },
            { text: "C.  To define the main content of a document", correct: false },
            { text: "D.  To define a footer for a document", correct: true }
        ] 
    },
    {
        question: "Which HTML tag is used to define a table row?",
        answers: [
            { text: "A.  < tr > ", correct: true },
            { text: "B.  < row > ", correct: false },
            { text: "C.  < td > ", correct: false },
            { text: "D.  < table-row > ", correct: false }
        ] 
    },
    {
        question: "What does the HTML < br > tag represent?",
        answers: [
            { text: "A.  Bold ", correct: false },
            { text: "B.  Bullet", correct: false },
            { text: "C.  Break", correct: true },
            { text: "D.  Blockquote", correct: false }
        ] 
    }
];

// this is to select the elements from the html file
const questionElement = document.getElementById("questions");
const answerButton = document.getElementById("answer-buttons-html");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;
let timerInterval;


// this function is to start the timer
function startTimer(durationInSeconds, displayElement, callback) {
    let timer = durationInSeconds;
    timerInterval = setInterval(function () {
        const minutes = Math.floor(timer / 60);
        const seconds = timer % 60;

        displayElement.textContent = `${minutes}:${seconds}`;

        if (--timer < 0) {
            clearInterval(timerInterval);
            // Call the callback function when the timer reaches 0
            if (callback) {
                callback();
            }
        }
    }, 1000);
}
// this function is to start the quiz and timer
function startQuizWithTimer() {
    const durationInSeconds = 60 * 5; 
    const timerDisplayElement = document.getElementById("timer");
    
    // this starts the timer with a callback to start the quiz when the timer ends
    startTimer(durationInSeconds, timerDisplayElement, showTimeUpMessage);
}
// this function is to show a message when the time is up
function showTimeUpMessage() {
    const timerDisplayElement = document.getElementById("timer");
    timerDisplayElement.style.display = "none";
    questionElement.innerHTML = "Oops! Time's up. Try again!";
    nextButton.innerHTML = "Start Again";
    nextButton.style.display = "block";
    nextButton.addEventListener("click", startQuiz);
}

// this function is to start the quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();

    //to show the timer
    const timerDisplayElement = document.getElementById("timer");
    timerDisplayElement.style.display = "block";

    // Start the quiz with timer
    startQuizWithTimer();
}

//function to update the question number display
function updateQuestionNumber() {
    const questionNumberElement = document.getElementById("question-number");
    questionNumberElement.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
}
// this function is to show the questions
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    updateQuestionNumber(); //function to update question number display

    // this code is to show the answers
    currentQuestion.answers.forEach(answer=> {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
     });
}
// this function is to reset the the quiz so the user can retake if they want to
function resetState(){
nextButton.style.display = "none";
while(answerButton.firstChild){
    answerButton.removeChild(answerButton.firstChild);
}
}
// this function is to select the answer
function selectAnswer(e){
    const selectedBtn = e.target;
    const itsCorrect = selectedBtn.dataset.correct === "true";
    if(itsCorrect){
        selectedBtn.classList.add("correctAnswer");
        score++;
    } else{
        selectedBtn.classList.add("wrongAnswer");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correctAnswer");
        }
        // this is to disable the buttons after the user has selected an answer
        button.disabled = true;
    });
    // this code is to show the next button after the user has selected an answer
    nextButton.style.display = "block";
}

// this function is to show the score after the user has answered all the questions
function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length} questions correctly. Think you can do better? Give it a try!`;
    nextButton.innerHTML = "Start Again";
    nextButton.style.display = "block";
    // Stop the timer when the quiz ends
    clearInterval(timerInterval);
}

// this function is to show what happens after the user has answered all the questions
function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

// this code is to show the next button after the user has selected an answer
nextButton.addEventListener("click", () => {
   if(currentQuestionIndex < questions.length){
       handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();