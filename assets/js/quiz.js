var pageContentE1 = document.querySelector("body");
var highScoreButtonE1 = pageContentE1.querySelector("#high-score");
var timerE1 = pageContentE1.querySelector("#timer");
var startButtonE1 = pageContentE1.querySelector("#start");
var introE1 = pageContentE1.querySelector("#intro");
var quizE1 = pageContentE1.querySelector("#quiz");
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
            quizE1.style = "display: none"
            doneScreenE1.style = null
            
        }
        timerE1.textContent = "Time: " + time
        time --
    }
    var timerCountdown = setInterval(countDownProcessor,1000)
};
var drawQuiz = function(){
    if (questionTracker >= questionHolder.length) {
        time = 0
        return
    }
    var quizButtons = quizE1.querySelector(".quiz-button-wrapper").children
    var currentQuestion = questionHolder[questionTracker]
    quizE1.querySelector("h2").textContent = currentQuestion.question
    for (x=0;x<4;x++){
        quizButtons[x].textContent = currentQuestion.answers[x].text 
        quizButtons[x].setAttribute("data-correct",currentQuestion.answers[x].correct)
        console.log(quizButtons[x].getAttribute("data-correct"))
    }
}
var startQuiz = function(){
    introE1.style = "display: none"
    quizE1.style = null
    clockStart()
    drawQuiz()
};

startButtonE1.addEventListener("click",startQuiz);
