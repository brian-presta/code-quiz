var pageContentE1 = document.querySelector("body")
var highScoreButtonE1 = pageContentE1.querySelector("#high-score")
var timerE1 = pageContentE1.querySelector("#timer")
var startButtonE1 = pageContentE1.querySelector("#start")
var time = 5

var clockStart = function(){    
    var countDownProcessor = function(){
        timerE1.textContent = "Time: " + time
        time --
        if (time < 0) {
            clearInterval(timerCountdown)
        }
    }
    var timerCountdown = setInterval(countDownProcessor,1000)
}
var startQuiz = function(){
    pageContentE1.querySelector("#intro").style = "display: none"
    pageContentE1.querySelector("#quiz").style = null
    clockStart()
}

startButtonE1.addEventListener("click",startQuiz)
