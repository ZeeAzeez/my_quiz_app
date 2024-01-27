
const questions = [
    {
        question: "What is JavaScript primarily used for in web development?",
        answers: [
            { text: "A.  Styling", correct: false },
            { text: "B.  Database Management", correct: false },
            { text: "C.  Client-Side Scripting", correct: true },
            { text: "D.  Server-Side Scripting", correct: false }
        ] 
    },
    {
        question: "How do you declare a variable in JavaScript?",
        answers: [
            { text: "A.  var myVar;", correct: false },
            { text: "B.  variable myVar;", correct: false },
            { text: "C.  v myVar;", correct: false },
            { text: "D.  let myVar;", correct: true }
        ] 
    },
    {
        question: "What will the following code output? console.log(2 + '2');",
        answers: [
            { text: "A.   4 ", correct: false },
            { text: "B.   22", correct: false },
            { text: "C.   2 ", correct: false },
            { text: "D.   '22'", correct: true }
        ]  
    },
    {
        question: "How do you comment in JavaScript?",
        answers: [
            { text: "A.  // This is a comment", correct: true },
            { text: "B.  < ! -- This is a comment -- > ", correct: false },
            { text: "C.  /* This is a comment */", correct: false },
            { text: "D.  # This is a comment", correct: false }
        ] 
    },
    {
        question: "What is the purpose of the else statement in JavaScript?",
        answers: [
            { text: "A.  To execute code if a condition is true", correct: false },
            { text: "B.  To define a loop", correct: false },
            { text: "C.  To execute code if a condition is false", correct: true },
            { text: "D.  To declare a function", correct: false }
        ] 
    },
    {
        question: "What is the purpose of the typeof operator in JavaScript?",
        answers: [
            { text: "A.  Checks if a variable is defined", correct: false },
            { text: "B.  Converts a variable to a string", correct: false },
            { text: "C.  Returns the data type of a variable", correct: true },
            { text: "D.  Adds two numbers together", correct: false }
        ] 
    },
    {
        question: "How do you create a function in JavaScript?",
        answers: [
            { text: "A.  function: myFunction( ) { }", correct: false },
            { text: "B.  def myFunction( ) { }", correct: false },
            { text: "C.  func myFunction() {}", correct: false },
            { text: "D.  function myFunction() {}", correct: true }
        ] 
    },
    {
        question: "What is the purpose of the JavaScript let keyword?",
        answers: [
            { text: "A.  Declares a variable with block scope ", correct: true },
            { text: "B.  Declares a variable with global scope", correct: false },
            { text: "C.  Declares a constant variable", correct: false },
            { text: "D.  Declares a variable with function scope", correct: false }
        ] 
    },
    {
        question: "What will the following code output? console.log(10 % 3);",
        answers: [
            { text: "A.  3", correct: false },
            { text: "B.  0", correct: false },
            { text: "C.  1", correct: true },
            { text: "D.  2", correct: false }
        ] 
    },
    {
        question: "In JavaScript, how do you check if a variable is an array?",
        answers: [
            { text: "A.  isArray(myVariable)", correct: false },
            { text: "B.  myVariable.typeOf() === 'array' ", correct: false },
            { text: "C.  Array.check(myVariable)", correct: false },
            { text: "D.  Array.isArray(myVariable)", correct: true }
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