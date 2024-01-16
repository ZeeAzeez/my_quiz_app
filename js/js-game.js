
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
    }
];
const questionElement = document.getElementById("questions");
const answerButton = document.getElementById("answer-buttons-html");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

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

function resetState(){
nextButton.style.display = "none";
while(answerButton.firstChild){
    answerButton.removeChild(answerButton.firstChild);
}
}

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

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length} questions correctly. Keep it up!`;
    nextButton.innerHTML = "Start Again";
    nextButton.style.display = "block";
}

// this function is to show what happens after the user has answered all the questions
function handleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length){
      showQuestion();
  } else{
    showScore();
  }
}

nextButton.addEventListener("click", () => {
   if(currentQuestionIndex < questions.length){
       handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();