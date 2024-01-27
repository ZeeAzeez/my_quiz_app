//CSS quiz questions
const questions = [
    {
        question: "What does CSS stand for?",
        answers: [
            { text: "A.  Computer Style Sheets", correct: false },
            { text: "B.  Creative Style Sheets", correct: false },
            { text: "C.  Cascading Style Sheets", correct: true },
            { text: "D.  Colorful Style Sheets", correct: false }
        ] 
    },
    {
        question: "How do you select an element with the id 'example' in CSS",
        answers: [
            { text: "A.  #example", correct: true },
            { text: "B.  .example", correct: false },
            { text: "C.  *example", correct: false },
            { text: "D.  @example", correct: false }
        ] 
    },
    {
        question: "What property is used to set the text color in CSS",
        answers: [
            { text: "A.   text-color ", correct: false },
            { text: "B.   font-color", correct: false },
            { text: "C.   color ", correct: true },
            { text: "D.   text-style", correct: false }
        ]  
    },
    {
        question: "Which of the following CSS values represents a transparent background?",
        answers: [
            { text: "A.  rgba(255, 255, 255, 0)", correct: false },
            { text: "B.  #000000", correct: false },
            { text: "C.  hsl(0, 100%, 50%)", correct: false },
            { text: "D.  transparent", correct: true }
        ] 
    },
    {
        question: "What is the default display property for a <div> element in CSS",
        answers: [
            { text: "A.  inline", correct: false },
            { text: "B.  block", correct: true },
            { text: "C.  inline-block", correct: false },
            { text: "D.  flex", correct: false }
        ] 
    },
    {
        question: "What is the purpose of the CSS property padding?",
        answers: [
            { text: "A.  To add space outside an element", correct: false },
            { text: "B.  To set the font size", correct: false },
            { text: "C.  To add space inside an element", correct: true },
            { text: "D.  To set the background color", correct: false }
        ] 
    },
    {
        question: "In CSS, what is a pseudo-class?",
        answers: [
            { text: "A.  A class defined in JavaScript", correct: false },
            { text: "B.  A class with a double colon (::) prefix ", correct: true },
            { text: "C.  A class for styling list items", correct: false },
            { text: "D.  A class for styling paragraphs", correct: false }
        ] 
    },
    {
        question: "What does the CSS property display: none; do?",
        answers: [
            { text: "A.  Displays the element as a block-level element", correct: false },
            { text: "B.  Hides the element", correct: true },
            { text: "C.  Changes the element's background color", correct: false },
            { text: "D.  Floats the element to the right", correct: false }
        ] 
    },
    {
        question: "What is the purpose of the CSS property 'box-sizing'?",
        answers: [
            { text: "A.  Adds a shadow to the element", correct: false },
            { text: "B.  Specifies the padding of the element", correct: false },
            { text: "C.  Specifies how the total width and height of an element are calculated ", correct: false },
            { text: "D.  Changes the element's box model", correct: true }
        ] 
    },
    {
        question: "How do you center an element horizontally in CSS?",
        answers: [
            { text: "A.  text-align: center;", correct: false },
            { text: "B.  margin: auto;", correct: true },
            { text: "C.  align: center;", correct: false },
            { text: "D.  horizontal-align: center;", correct: false }
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