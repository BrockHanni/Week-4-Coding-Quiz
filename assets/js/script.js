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
// vars to pull items from document
var startBtn = document.getElementById("startBtn")
var timerEl = document.querySelector(".timer")
var questionAnswers = document.getElementById('questionAnswers')
var feedback = document.getElementById("feedback")
// sets the score, and starts the question at 0
var score = 0
var questionNumber= 0
// displays the score on page
var scoreDisplay = document.getElementById('score')
scoreDisplay.textContent = `Score: ${score}/5`;
// for loop for questions to move onto the next
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
    // displays the question once start button is clicked
    document.getElementById("score").style.display = "contents"
    // shows score element on screen
    document.getElementById("timer").style.display = "contents"
    // shows timer element on screen
    timerCount= 60;
    // sets the timer to 60 seconds
    startTimer()  
    getQuestions()
    // runs the timer and get questions functions
}
// pulls question onto screen
function getQuestions(){
    var currentQuestion = questionsArray[questionNumber]
    // current question is the current question in the array
    var questionTitle = document.getElementById('questionTitle')
    // The title of the question, so the question
    document.getElementById("questionAnchor").style.display = "flex"
    // sets question title as the title from the array
    questionTitle.textContent = currentQuestion.title
    // for loop to create buttons for each answer
    for(var i=0; i < currentQuestion.choices.length; i++){
        var choice = currentQuestion.choices[i];
        var choicebtn= document.createElement('button')
        // sets the classes for the buttons
        choicebtn.setAttribute('class','answerBtns')
        choicebtn.setAttribute('value', choice)
        choicebtn.textContent= choice
        questionAnswers.appendChild(choicebtn)
    }
}
// When an answer button is clicked, it triggers this function
function answerClick(event){
 var answerBtn = event.target
 document.getElementById("feedbackDiv").style.display="contents"
//  shows the feedback on screen, unhides it
 if (answerBtn.value !== questionsArray[questionNumber].answer){
    // if you don't select the write answer:
    // timer goes down 15 seconds
        timerCount -= 15
        // feedback
        feedback.textContent="Wrong!"
        // disabled the button pushed
        answerBtn.disabled = true
        // if timer hits zero, quiz ends
        if (timerCount < 0){
            timerCount = 0
            endQuiz()
        }
    } 
    if (answerBtn.value === questionsArray[questionNumber].answer) {  
        // if button clicked is the write answer:
        // feedback
        feedback.textContent = "Correct!"
        score++
        // adds one to the score
        }
    scoreDisplay.textContent = `Score: ${score}/5`;
    // updates score
    questionAnswers.innerHTML= ''
    // hides remaining answers
    questionNumber++
    // moves to the next question
    if (questionNumber === questionsArray.length){
         winQuiz()
        //  if you reach the end of the quiz, the winQuiz funtion is triggered
    } else{
        getQuestions()
        // if not, pulls the next question
    }
}

function startTimer(){
    // starts the timer
    timer = setInterval(function(){
        timerCount--;
        timerEl.textContent = timerCount + ' seconds left!'
        // ends timer at 1 second
      if(timerCount < 1){
        endQuiz();
        }
    }, 1000)
    // set to countdown at one second
    
}

function endQuiz(){
    // function when quiz ends
    clearInterval(timer)
    // stops timer, says times up
    timerEl.textContent = "Time's up :("
    // hides questions
    document.getElementById("questionAnchor").style.display = "none"
    // feedback
    feedback.textContent= "Better luck next time"
    // sets and pushes score onto screen
    scoreDisplay.textContent = `Score: ${score}/5`
    saveScore()
}
// function that triggers when you complete the quiz
function winQuiz(){
    clearInterval(timer)
    // stops time, and says you did it
    timerEl.textContent = "You did it!"
    document.getElementById("questionAnchor").style.display = "none"
    // hides questions, feedback
    feedback.textContent= "Congrats"
    // saves and displays score
    scoreDisplay.textContent = `Score: ${score}/5`
    saveScore()
} 

function saveScore(){
    // saves score to local storage into an array, and displays them on screen
    var highscores = JSON.parse(localStorage.getItem('highscores')) || [];
    var newHighscore = {
    initials: prompt('Enter your initials:'),
    score: score
    };
    highscores.push(newHighscore);
    localStorage.setItem('highscores', JSON.stringify(highscores));
    displayHighScores()
    startBtn.disabled= false
    document.getElementById("reset").removeAttribute("class", "hidden")
}



// highscore list
function displayHighScores() {
    var highScores = JSON.parse(localStorage.getItem('highscores')) || [];
    var highScoreList = document.getElementById("highscoreList");
    highScoreList.innerHTML = "<h1>Highscores</h1>";
    // creates an array if one isn't made yet
    if (highScores.length === 0) {
      highScoreList.innerHTML += "<p>No high scores yet</p>";
    } else {
        // adds item to array if its already made
      highScores.forEach(function(score) {
          highScoreList.innerHTML += "<p>" + score.initials + ": " + score.score +"/5" + "</p>";
      });
    }
    // displays highscores
    highScoreList.style.display = "block";
  }
//   Btn to see highscore (I don't need this, but I'm too attached to delete it)
document.getElementById("seeHS").addEventListener("click", displayHighScores())
//   clears highscore list
  var clearStorageBtn = document.getElementById("clearStorage")
  clearStorageBtn.addEventListener("click", clearLocalStorage)
//   function that clears localstorage
  function clearLocalStorage() {
    localStorage.clear();
    location.reload()
  }

// Reset btn, refreshes page
document.getElementById("reset").addEventListener("click",function(){
    location.reload()
})
// event listeners to start the quiz when start button is clicked.
startBtn.addEventListener("click",startQuiz)
questionAnswers.onclick= answerClick