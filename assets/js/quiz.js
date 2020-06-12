var pageContentE1 = document.querySelector("body")
var highScoreButtonE1 = pageContentE1.querySelector("#high-score")
var timerE1 = pageContentE1.querySelector("#timer")
var startButtonE1 = pageContentE1.querySelector("#start")
var introE1 = pageContentE1.querySelector("#intro")
var quizE1 = pageContentE1.querySelector("#quiz")
var doneScreenE1 = pageContentE1.querySelector("#done")
var time = 5
var questionHolder = [
    {
        question: "Which of the following is not a data type in JavaScript?",
        answer1: "String",
        answer2: "Array",
        answer3: "Float",
        answer4: "Boolean",
        correctAnswer: "answer3"
    },
    {
        question: "Which of the following could be used to turn a string into an array?",
        answer1: "string.split()",
        answer2: "string.toArray()",
        answer3: "toArray(string)",
        answer4: "split(string)",
        correctAnswer: "answer1"
    }
]
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
}
var startQuiz = function(){
    introE1.style = "display: none"
    quizE1.style = null
    clockStart()
}

startButtonE1.addEventListener("click",startQuiz)
