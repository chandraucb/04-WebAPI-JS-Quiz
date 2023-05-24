var viewHighScoreElement = document.getElementById('high-score')
var highScoreSection = document.getElementById('high-score-section')
var introScoreSection = document.getElementById('intro-section')
var quizSection = document.getElementById('quiz-section')
var startQuiz = document.getElementById('startQuiz')
var goBack = document.getElementById ('goBack')

startQuiz.addEventListener('click',function(event){
    introScoreSection.style.display = 'none'
    quizSection.style.display = 'block'
})

goBack.addEventListener('click', function(event){
    introScoreSection.style.display = 'block'
    highScoreSection.style.display = 'none'
})

viewHighScoreElement.addEventListener('click',function(event){
    introScoreSection.style.display = 'none'
    highScoreSection.style.display = 'block'
})