var viewHighScoreNav = document.getElementById('high-score')
var highScoreSection = document.getElementById('high-score-section')
var introScoreSection = document.getElementById('intro-section')
var quizSection = document.getElementById('quiz-section')
var startQuiz = document.getElementById('startQuiz')
var goBack = document.getElementById ('goBack')
var quizArticle = document.getElementById('quizArticle')

// call createUpdateQuizQuestion with next question
function loadNextQuestion () {
    //Array with list of questions with its choices and answer
    var questions = [
        {
            question : 'Which object in Javascript doesn’t have a prototype?',
            choices : ['Base Object','All objects have prototype','None of the objects have prototype','None of the above'],
            answer : 'Base Object'
        },
        {
            question : 'Which of the following are not server-side Javascript objects',
            choices : ['Date','FileUpload','Function','All of the above'],
            answer : 'All of the above'
        },
        {
            question : 'How do we write a comment in javascript?',
            choices : ['<!-- -->','//','#','$$'],
            answer : '//'
        }
    ]

    //random index selector
    var randNum = Math.floor(Math.random() * questions.length);

    // create question article with selected index question object 
    createUpdateQuizQuestion ( questions[randNum].question, questions[randNum].choices, questions[randNum].answer )
}

// display result of last answered question
function showResult(answer,parentElement) {
    var createResultDiv = document.createElement('div')
    createResultDiv.setAttribute('style', 'white-space: pre;');
    createResultDiv.textContent = '__________________________________________  \r\n' + answer
    parentElement.appendChild(createResultDiv)

}

/* function to create or update quiz questions and choices to quiz section article */
function createUpdateQuizQuestion (question, choices, answer) {
    
    // Remove any existing child nodes to remove if any previous questions are present
    while (quizArticle.children[0]) {
        quizArticle.removeChild(quizArticle.children[0])
    }

    //Element to show question
    var createQuestion = document.createElement('h2')
    var textNode = document.createTextNode(question)
    createQuestion.appendChild(textNode)

    // function to act on user picked answer, 
    var selectAnswer = function (event) {
        console.log(event.target)
        var result = "Wrong!"
        if (event.target.textContent === answer) {
            result = "Correct!"
        }

        loadNextQuestion()

        showResult(result, quizArticle)
    }

    //OL element to show answer choices
    var createOl = document.createElement('ol')

    //Create list item for each choice option and append it to order list
    for (let index = 0; index < choices.length; index++) {
        
        //Create button with click event listener
        const createButton = document.createElement ('button')
        createButton.textContent = choices[index];;
        createButton.className = 'choice'    
        createButton.addEventListener('click' , selectAnswer)

        //Create list item to add the button
        const createLi = document.createElement('li')
        createLi.appendChild(createButton)

        //Append list item to order list
        createOl.appendChild(createLi)
    }

    //Append the question and choices element to
    quizArticle.appendChild(createQuestion)
    quizArticle.appendChild(createOl)

}

//Intro Section Start Quiz event listener 
startQuiz.addEventListener('click',function(event){
    introScoreSection.style.display = 'none'
    quizSection.style.display = 'block'
    loadNextQuestion () // loads next question be to answered
})

//View High Score section Go Back event listener 
goBack.addEventListener('click', function(event){
    introScoreSection.style.display = 'block'
    highScoreSection.style.display = 'none'
})

//View High Score link navigation event listener 
viewHighScoreNav.addEventListener('click',function(event){
    introScoreSection.style.display = 'none'
    quizSection.style.display = 'none'
    highScoreSection.style.display = 'block'
})



