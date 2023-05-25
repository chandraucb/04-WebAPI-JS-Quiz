var viewHighScoreElement = document.getElementById('high-score')
var highScoreSection = document.getElementById('high-score-section')
var introScoreSection = document.getElementById('intro-section')
var quizSection = document.getElementById('quiz-section')
var startQuiz = document.getElementById('startQuiz')
var goBack = document.getElementById ('goBack')

/* function to create or update quiz questions and choices to quiz section article */
function createUpdateQuizQuestion (question, choices) {

    var quizArticle = document.getElementById('quizArticle')
    // Remove any existing child nodes to remove if any previous questions are present
    if (quizArticle.hasChildNodes()) {
        for (let index = 0; index < quizArticle.childNodes.length; index++) {
            quizArticle.removeChild(quizArticle.childNodes[index])
        }
    }

    //Element to show question
    var createQuestion = document.createElement('h1')
    var textNode = document.createTextNode(question)
    createQuestion.appendChild(textNode)

    //OL element to show answer choices
    var createOl = document.createElement('ol')

    for (let index = 0; index < choices.length; index++) {
        const choice = choices[index];
        const createLi = document.createElement('li')
        const createButton = document.createElement ('button')
        createButton.textContent = choice;
        createButton.className = 'choice'
        createLi.appendChild(createButton)
        createOl.appendChild(createLi)
        
    }

    //Append the question and choices element to
    quizArticle.appendChild(createQuestion)
    quizArticle.appendChild(createOl)

}

startQuiz.addEventListener('click',function(event){
    introScoreSection.style.display = 'none'
    quizSection.style.display = 'block'
    var choices = ['Numbers and strings','Other Arrays','Booleans','All of the above']
    createUpdateQuizQuestion ('Array in Javascript can be used to store ___________ .', choices )

    
})

goBack.addEventListener('click', function(event){
    introScoreSection.style.display = 'block'
    highScoreSection.style.display = 'none'
})

viewHighScoreElement.addEventListener('click',function(event){
    introScoreSection.style.display = 'none'
    quizSection.style.display = 'none'
    highScoreSection.style.display = 'block'
})

