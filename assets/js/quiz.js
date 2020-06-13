var pageContentE1 = document.querySelector("body");
var introE1 = pageContentE1.querySelector("#intro");
var quizScreenE1 = pageContentE1.querySelector("#quiz");
var doneScreenE1 = pageContentE1.querySelector(".done-screen");
var highScoreScreenE1 = pageContentE1.querySelector(".high-score-screen")
var highScoreLinkE1 = pageContentE1.querySelector("#high-score-link");
var backButtonE1 = highScoreScreenE1.querySelector("#back")
var clearScoresButtonE1 = highScoreScreenE1.querySelector("#clear-score")
var startButtonE1 = pageContentE1.querySelector("#start");
var initialsFormE1 = doneScreenE1.querySelector("form")
var quizButtonsHolder = quizScreenE1.querySelector(".quiz-button-wrapper");
var time = 50;
var score = 0;
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
    var timerE1 = pageContentE1.querySelector("#timer")
    var countDownProcessor = function(){
        // time in the deep negatives means the quiz was ended for a reason besides timing out, 
        // the timer does not need to call endQuiz in those situations
        if (time < -100){
            clearInterval(timerCountdown)
            return
        }
        if (time < 1) {
            clearInterval(timerCountdown)
            endQuiz()
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
};
var evalQuiz = function(button) {
    // checks if there's previous feedback text, removes it if so
    var feedback = pageContentE1.querySelector("#feedback")
    if (feedback){
        feedback.remove()
    }
    //  creates feedback text for user
    feedback = document.createElement("h3")
    feedback.id = "feedback"
    feedback.textContent = "Your last answer was "
    // checks if their answer was right or wrong, changes feedback accordingly
    if (button.getAttribute("data-correct") === 'true'){
        feedback.textContent += "correct!"
    }
    else {
        // if wrong, docks them time
        time -= 10
        feedback.textContent += "incorrect!"
    }
    // puts feedback on page
    pageContentE1.querySelector(".feedback-holder").appendChild(feedback)
    // checks if there are any more questions, ends the quiz if there aren't
    if (questionTracker >= questionHolder.length) {
        endQuiz()
        return
    }
    // goes to the next question
    drawQuiz()
};
var drawQuiz = function(){
    var quizButtons = quizButtonsHolder.children
    var currentQuestion = questionHolder[questionTracker]
    quizScreenE1.querySelector("h2").textContent = currentQuestion.question
    for (x=0;x<4;x++){
        quizButtons[x].textContent = currentQuestion.answers[x].text 
        quizButtons[x].setAttribute("data-correct",currentQuestion.answers[x].correct)
    }
    questionTracker++
};
var startQuiz = function(event){
    introE1.style = "display: none"
    quizScreenE1.style = null
    clockStart()
    drawQuiz()
};
var endQuiz = function(){
    score = time
    time = -200
    quizScreenE1.style = "display: none"
    doneScreenE1.style = null
    pageContentE1.querySelector("#timer").textContent = "Time: 0"
    doneScreenE1.querySelector("p").textContent += (score + ".")
};
var submitScore = function(){
    var userInitials = doneScreenE1.querySelector("input").value
    if (!userInitials){
        return
    }
    var currentScore = {initials:userInitials,score:score}
    var highScores = JSON.parse(localStorage.getItem("scores"))
    if (highScores) {
        highScores.push(currentScore)
        highScores.sort(function(a,b){return b.score - a.score})
    }
    else {
        highScores = [currentScore]
    }
    localStorage.setItem("scores",JSON.stringify(highScores))
    toHighScore()
}
var toHighScore = function(){
    time = -200
    pageContentE1.querySelector("#timer").textContent = "Time: 0"
    introE1.style = "display: none"
    quizScreenE1.style = "display: none"
    doneScreenE1.style = "display: none"
    pageContentE1.querySelector(".feedback-holder").style = "display: none"
    highScoreScreenE1.style = null
    drawHighScores()
};
var drawHighScores = function(){
    var highScores = JSON.parse(localStorage.getItem("scores"))
    var scoreList = highScoreScreenE1.querySelector(".high-score-list")
    if (!highScores) {
        var placeHolder = document.createElement("li")
        placeHolder.textContent = "No scores yet!"
        scoreList.appendChild(placeHolder)
    }
    else {
        for (x=0;x<highScores.length;x++){
            var placeHolder = document.createElement("li")
            placeHolder.textContent = `${x+1}. ${highScores[x].initials} - ${highScores[x].score}`
            scoreList.appendChild(placeHolder)
        }
    }
};
var backButtonHandler = function(){
    location.reload()
}
var clearScores = function(){
    localStorage.clear()
    var oldList = highScoreScreenE1.querySelector("ul").children
    for (x=0;x<oldList.length;x++){
        oldList[x].remove()
    }
    drawHighScores()
};
startButtonE1.addEventListener("click",startQuiz);
quizButtonsHolder.addEventListener("click",quizButtonHandler)
highScoreLinkE1.addEventListener("click",toHighScore)
initialsFormE1.addEventListener("submit",submitScore)
backButtonE1.addEventListener("click",backButtonHandler)
clearScoresButtonE1.addEventListener("click",clearScores)

