var timerE1 = document.querySelector("#timer")
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