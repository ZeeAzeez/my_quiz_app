
const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "Hyper Text Markup Language", correct: true },
            { text: "Hyperlinks and Text Markup Language", correct: false },
            { text: "Home Tool Markup Language", correct: false },
            { text: "HyperTransfer Markup Language", correct: false }
        ] 
    },
    {
        question: "What does the HTML <img> tag stand for?",
        answers: [
            { text: "Inline Media Graphics", correct: false },
            { text: "Image Source", correct: false },
            { text: "Image", correct: true },
            { text: "Insert Media", correct: false }
        ] 
    },
    {
        question: "Which HTML tag is used for creating an ordered list?",
        answers: [
            { text: " < ul > ", correct: false },
            { text: " < ol > ", correct: true },
            { text: " < list > ", correct: false },
            { text: " < order >", correct: false }
        ]  
    },
    {
        question: "What is the purpose of the HTML <head> tag?",
        answers: [
            { text: "It defines the main content of the HTML document.", correct: false },
            { text: "It defines a header for the document.", correct: false },
            { text: "It contains metadata about the HTML document.", correct: true },
            { text: "It defines a hyperlink.", correct: false }
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