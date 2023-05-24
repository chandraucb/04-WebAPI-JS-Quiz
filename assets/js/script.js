var viewHighScoreElement = document.getElementById('high-score')
var highScorePage = document.getElementById('high-score-view')
var introScorePage = document.getElementById('intro-view')

var goBack = document.getElementById ('goback')

goBack.addEventListener('click', function(event){
    introScorePage.style.display = 'block'
    highScorePage.style.display = 'none'
})

viewHighScoreElement.addEventListener('click',function(event){
    introScorePage.style.display = 'none'
    highScorePage.style.display = 'block'
})