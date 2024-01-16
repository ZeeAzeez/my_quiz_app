
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