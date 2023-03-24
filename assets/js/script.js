// this var creates stores the questions answers and choices in an array
var questionsArray= [
{
    title: "Which brackets are used to make an array?",
    choices: ["(parentheses)","{curly brackets}","[square brackets]",'"quotes"'],
    answer:"[square brackets]",
},
{
    title: "In HTML, which sequence do you use to make a comment",
    choices: ["//","<!-- -->","<--! !-->","{/ /}"],
    answer:"<!-- -->",
},
{
    title: "In javascript, what command is opposite of .setAttribute?",
    choices: [".clearAttribute",".deleteAttribute",".resetAttriubute",".removeAttribute"],
    answer:".removeAttribute",
},
{
    title: "Css can be used to greatly improve the ____ of an HTML form.",
    choices: ["Layout","Apperance","Color","All of the above"],
    answer:"All of the above",
},
{
    title: "When was coding invented",
    choices: ["1883","1917","1956","1993"],
    answer:"1883",
}]
// vars to pull from document
var startBtn = document.getElementById("startBtn")
var timerEl = document.querySelector(".timer")
var questionAnswers = document.getElementById('questionAnswers')
var questionNumber= 0
var feedback = document.getElementById("feedback")
var score = 0

var scoreDisplay = document.getElementById('score')
scoreDisplay.textContent = `Score: ${score}/5`;

for (let i = 0; i<questionsArray.length;i++){
    var currentQuestion = questionsArray[i]
  }

// fuction for start button to start the quiz
function startQuiz(){
    startBtn.disabled= true
    // hides start button
    document.getElementById("start-screen").style.display= "none" 
    // hides starting screen
    document.getElementById("questionAnchor").style.display = "contents"
    
    // shows the question screen
    
    timerCount= 60;
    startTimer()  
    getQuestions()
}
function getQuestions(){
    
    var currentQuestion = questionsArray[questionNumber]
    var questionTitle = document.getElementById('questionTitle')
    
    questionTitle.textContent = currentQuestion.title

    // for loop to create buttons for each answer
    for(var i=0; i < currentQuestion.choices.length; i++){
        var choice = currentQuestion.choices[i];
        var choicebtn= document.createElement('button')
        choicebtn.setAttribute('class','answerBtns')
        choicebtn.setAttribute('value', choice)
        choicebtn.textContent= choice
        questionAnswers.appendChild(choicebtn)
    }
}

function answerClick(event){
 
 var answerBtn = event.target
 if (answerBtn.value !== questionsArray[questionNumber].answer){
        timerCount -= 15
        feedback.textContent="Wrong!"
        answerBtn.disabled = true
        if (timerCount < 0){
            timerCount = 0
            quizEnd()
        }

        
    } 
    if (answerBtn.value === questionsArray[questionNumber].answer) {  
        feedback.textContent = "Correct!"
        score++
        }
    scoreDisplay.textContent = `Score: ${score}/5`;
    questionAnswers.innerHTML= ''
    // hides remaining answers
    questionNumber++

    if (questionNumber === questionsArray.length){
         winQuiz()
    } else{
        getQuestions()
    }
}

function startTimer(){
    timer = setInterval(function(){
        timerCount--;
        timerEl.textContent = timerCount + ' seconds left!'
      if(timerCount < 1){
        endQuiz();
        }
    }, 1000)
    
}

function endQuiz(){
    clearInterval(timer)
    timerEl.textContent = "Time's up :("
    document.getElementById("questionAnchor").style.display = "none"
    feedback.textContent= "Better luck next time"
    scoreDisplay.textContent = `Score: ${score}/5`;
}
function winQuiz(){
    clearInterval(timer)
    timerEl.textContent = "You did it!"
    document.getElementById("questionAnchor").style.display = "none"
    feedback.textContent= "Congrats"
    scoreDisplay.textContent = `Score: ${score}/5`;
}
startBtn.addEventListener("click",startQuiz)
questionAnswers.onclick= answerClick