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
    answer:"",
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

for (let i = 0; i<questionsArray.length;i++){
    var currentQuestion = questionsArray[i]

    // for (var i = 0; i < currentQuestion.choices.length; i++) {
      
    //   var choice = currentQuestion.choices[i];
      
    //   console.log(choice);
    // }
   
  }

// fuction for start button to start the quiz
function startQuiz(){
    startBtn.disabled= true
    // hides start button
    document.getElementById("start-screen").style.display= "none" 
    // hides starting screen
    document.getElementById("questionAnchor").style.display = "contents"
    // shows the question screen
    
    timerCount= 5;
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

 if (!answerBtn.matches('.choice')){
        return
 }
    // does nothing if user doesn't click on a button

 if(answerBtn.value = questionsArray[questionNumber].answer){
        feedback.textContent = "Correct!"
    } else {
        timer -= 10

        if (timer < 0){
            timer = 0
        }

        timerCount.textContent= timer
        feedback.textContent="Wrong!"
 }
    // setInterval to show feedback for a second
    questionNumber++

}

function startTimer(){
    timer = setInterval(function(){
        timerCount--;
        timerEl.textContent = timerCount
      
    }, 1000)
    if(timerCount <= 0){
    endQuiz();
}}


function endQuiz(){
    clearInterval(timerEl)
}
startBtn.addEventListener("click",startQuiz)
questionAnswers.onclick= answerClick