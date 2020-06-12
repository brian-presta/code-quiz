var pageContentE1 = document.querySelector("body");
var highScoreButtonE1 = pageContentE1.querySelector("#high-score");
var timerE1 = pageContentE1.querySelector("#timer");
var startButtonE1 = pageContentE1.querySelector("#start");
var introE1 = pageContentE1.querySelector("#intro");
var quizScreenE1 = pageContentE1.querySelector("#quiz");
var quizButtonsHolder = quizScreenE1.querySelector(".quiz-button-wrapper");
var doneScreenE1 = pageContentE1.querySelector("#done");
var time = 50;
var questionTracker = 0;
var questionHolder = [
    {
        question: "Which of the following is not a data type in JavaScript?",
        answers: [
            {text:"1. String", correct:false},
            {text:"2. Array", correct:false},
            {text:"3. Float", correct:true},
            {text:"4. Boolean", correct:false}
        ]
    },
    {
        question: "Which of the following could be used to turn a string into an array?",
        answers: [
            {text:"1. string.split()", correct:true},
            {text:"2. string.toArray()", correct:false},
            {text:"3. toArray(string)", correct:false},
            {text:"4. split(string)", correct:false}
        ]
    }
];
var clockStart = function(){    
    var countDownProcessor = function(){
        if (time < 1) {
            timerE1.textContent = "Time: 0"
            clearInterval(timerCountdown)
            quizScreenE1.style = "display: none"
            doneScreenE1.style = null
            
        }
        timerE1.textContent = "Time: " + time
        time --
    }
    var timerCountdown = setInterval(countDownProcessor,1000)
};
var quizButtonHandler = function(event) {
    var button = event.target.closest(".button")
    if (!button){
        return
    }
    evalQuiz(button)
}
var evalQuiz = function(button) {
    var feedback = pageContentE1.querySelector("#feedback")
    if (feedback){
        feedback.remove()
    }
    feedback = document.createElement("h3")
    feedback.id = "feedback"
    feedback.textContent = "Your last answer was "
    if (button.getAttribute("data-correct") === 'true'){
        feedback.textContent += "correct!"
    }
    else {
        time -= 20
        feedback.textContent += "incorrect!"
    }
    pageContentE1.querySelector(".feedback-holder").appendChild(feedback)

    if (questionTracker >= questionHolder.length) {
        time = 0
        return
    }
    drawQuiz()
}
var drawQuiz = function(){
    var quizButtons = quizButtonsHolder.children
    var currentQuestion = questionHolder[questionTracker]
    quizScreenE1.querySelector("h2").textContent = currentQuestion.question
    for (x=0;x<4;x++){
        quizButtons[x].textContent = currentQuestion.answers[x].text 
        quizButtons[x].setAttribute("data-correct",currentQuestion.answers[x].correct)
    }
    questionTracker++
}
var startQuiz = function(event){
    introE1.style = "display: none"
    quizScreenE1.style = null
    clockStart()
    drawQuiz()
};

startButtonE1.addEventListener("click",startQuiz);
quizButtonsHolder.addEventListener("click",quizButtonHandler)

