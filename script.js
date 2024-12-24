import { questions } from "./questions.js";
let startBtn=document.querySelector('#start-button');
let enterQuiz=document.querySelector(".quiz_container");
let question=document.querySelector("#question");
let image=document.querySelector("img");
let allAnswers=document.querySelectorAll("ul li p");
let nextBtn=document.querySelector("input[value=Next]");
let time=document.querySelector(".time");
let timeLeft=60;


let isAnswer=false;
nextBtn.disabled=true;
console.log(nextBtn)
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

console.log(questions)
let current_Quiz=0;
let score=0;

function shuffleArray(input) {
    //search
    return input.sort(() => Math.random()-0.5);
}

const shuffledQuestions = shuffleArray(questions);
let timeInterval;

function startTime(){
    timeLeft=60;
    //clear any existing time interval
    clearInterval(timeInterval);
    timeInterval=setInterval(() => {
        if(timeLeft<10){
            time.innerHTML=`00:0${timeLeft--}`;
        }else{
            time.innerHTML=`00:${timeLeft--}`;
        }
       
        if(timeLeft===0){
          clearInterval(timeInterval);
          goToNextQuestion();
        }
        
    }, 1000);
    
 
}
function goToNextQuestion(){
    if(current_Quiz<shuffledQuestions.length-1){
        current_Quiz++;

        loadQuiz();
        isAnswer=false;
        nextBtn.disabled=true;
        startTime();
    }else{
        clearInterval(timeInterval);
        Swal.fire("Quiz Complete!", `You scored ${score} points!`, "success");
    }
}
function loadQuiz(){
     const currentQuizData=shuffledQuestions[current_Quiz];
   question.innerHTML=currentQuizData.question;
   const answers=shuffleArray([
    {
    text:currentQuizData.answer1,
    id:'answer1'
   },
   {
    text:currentQuizData.answer2,
    id:'answer2',
   },
   {
    text:currentQuizData.answer3,
    id:"answer3"
   }
   ])
   
   image.src=currentQuizData.image;
   allAnswers.forEach((answer,index) => {
    answer.innerHTML=answers[index].text;
    
    answer.addEventListener("click",function(){
        if(isAnswer){
           return;
       }
       else if(answers[index].id===currentQuizData.correctAnswer){  
           console.log("correct")
           score++;
           console.log("score",score);
           isAnswer=true;
       } 
     })
    

        
    
    answer.style.backgroundColor = "inherit";
  });
}




startBtn.addEventListener('click', function() {
    enterQuiz.classList.add("show_quiz");
    startBtn.disabled=true;
    startBtn.style.display="none";
    loadQuiz();
    startTime();
  
});

for (let i=0; i<allAnswers.length; i++) {
    allAnswers[i].addEventListener("click", function (event) {
      nextBtn.disabled=false;
      allAnswers.forEach((answer) => (answer.style.backgroundColor = ""));

      event.target.style.backgroundColor = "rgb(248, 204, 109)";
      
    });
  }


nextBtn.addEventListener("click",goToNextQuestion)