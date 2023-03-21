// this var creates stores the questions answers and choices in an array
var questions = [
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



// fuction for start button to start the quiz
function startQuiz(){
    startBtn.disabled= true
    document.getElementById("start-screen").style.display= "none"
    
    timerCount= 5;
    startTimer()
    
}

function startTimer(){
    timer = setInterval(function(){
        timerCount--;
        timerEl.textContent = timerCount;

       
    }, 1000)
    if(timerCount <= 0){
    endQuiz();
}}


function endQuiz(){
    clearInterval(timerEl)
}
startBtn.addEventListener("click",startQuiz)