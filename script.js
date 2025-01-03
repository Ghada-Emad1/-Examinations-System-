import { questions } from "./questions.js";
let startBtn=document.querySelector('#start-button');
let enterQuiz=document.querySelector(".quiz_container");
let question=document.querySelector("#question");
let image=document.querySelector("img");
let allAnswers=document.querySelectorAll("ul li p");
let nextBtn=document.querySelector("input[value=Next]");
let result=document.querySelector(".result");
let resultText=document.querySelector(".percentage");
let scoringResult=document.querySelector(".scoring");
const timerBar = document.querySelector('#timer-bar');
let totalTime = 60;
let timeLeft = totalTime;
let current_Quiz=0;
let score=0;
let percentageResult=0;
nextBtn.disabled=true;
let studentName = "";

Swal.fire({
  title: 'Enter your name',
  input: 'text',
  inputPlaceholder: 'Type your name here',
  showCancelButton: false,
  confirmButtonText: 'Submit',
  allowOutsideClick: false,
  inputValidator: (value) => {
    if (!value) {
      return 'You need to enter your name!';
    }
  }
}).then((result) => {
  if (result.isConfirmed) {
    studentName = result.value; 
    startBtn.disabled = false; 
    startBtn.style.display = "inline-block";
    Swal.fire(`Welcome, ${studentName}!`, 'Click "Start" to proceed.', 'success');
  }
});



function shuffleArray(input) {
    return input.sort(() => Math.random()-0.5);
}

const shuffledQuestions = shuffleArray(questions);

let timerInterval;
function goToNextQuestion(){
    if(current_Quiz<shuffledQuestions.length-1){
        current_Quiz++;
        loadQuiz();
        nextBtn.disabled=true;
    }else{
        clearInterval(timerInterval);
        showResult();
 }
}
function loadQuiz(){
    const currentQuizData=shuffledQuestions[current_Quiz];
    question.innerHTML=currentQuizData.question;
    const answers=shuffleArray([
    {
    text:currentQuizData.answer1,
   },
   {
    text:currentQuizData.answer2,
   },
   {
    text:currentQuizData.answer3,
   }
   ])
   image.src=currentQuizData.image;
   allAnswers.forEach((answer,index) => {
    answer.innerHTML=answers[index].text;
    answer.style.backgroundColor = "inherit";
  });
}




startBtn.addEventListener('click', function() {
    enterQuiz.classList.add("show_quiz");
    startBtn.disabled=true;
    startBtn.style.display="none";
    loadQuiz();
    startTimer();
  
});

let selectAnswer=undefined;
allAnswers.forEach((answer)=>{
  answer.addEventListener("click",function(event){
    selectAnswer=event.target.innerText;
    nextBtn.disabled=false;
    allAnswers.forEach((answer)=>answer.style.backgroundColor="");
    event.target.style.backgroundColor="rgb(248, 204, 109)";
    
  })
})

nextBtn.addEventListener("click",function(){
  const current_Quiz_Data=shuffledQuestions[current_Quiz];
  if(selectAnswer===current_Quiz_Data.correctAnswer){
    score++;
    percentageResult+=10;
    console.log(percentageResult,score)
  }
  selectAnswer=undefined;
  goToNextQuestion();
})

function showResult(){
  enterQuiz.classList.remove("show_quiz");
  result.classList.remove("result");
  result.classList.add("show_result");
  resultText.innerText=`${percentageResult}%`
  if (percentageResult > 0) resultText.style.borderTopColor = "green";
  if (percentageResult >= 50) resultText.style.borderRightColor = "green";
  if (percentageResult >= 70) resultText.style.borderBottomColor = "green"; 
  if (percentageResult === 100) resultText.style.borderLeftColor = "green";
  scoringResult.innerText=`You have ${score} out of ${questions.length} correct Answers, ${studentName}`;
  let tryagainButton=document.createElement("button");
  tryagainButton.innerText="Try Again";
  scoringResult.append(tryagainButton);
  tryagainButton.addEventListener("click",function(){
    location.reload();
  })

  
}

function startTimer() {
    timeLeft = totalTime; 
    timerBar.style.width = '0%'; 

    timerInterval = setInterval(() => {
        timeLeft--;
        const percentage = ((totalTime - timeLeft) / totalTime) * 100;
        timerBar.style.width = percentage + '%';
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            showResult();
        }
    }, 1000); 
}
