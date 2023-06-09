//Document sections
var viewHighScoreNav = document.getElementById("high-score");
var highScoreSection = document.getElementById("high-score-section");
var introScoreSection = document.getElementById("intro-section");
var quizSection = document.getElementById("quiz-section");
var resultSection = document.getElementById("result-section");
//Buttons
var startQuiz = document.getElementById("startQuiz");
var goBack = document.getElementById("goBack");
//Dynamic display contents
var quizArticle = document.getElementById("quizArticle");
var timerCount = document.getElementById("timerCount");

//Score and timer variables
var currentScore = 0;
var remainingTime = 30;
var remainQuestion = 5;
var intervalRef = "";

//Array with list of questions with its choices and answer
const questions = [
  {
    question: "Which object in Javascript doesn’t have a prototype?",
    choices: [
      "Base Object",
      "All objects have prototype",
      "None of the objects have prototype",
      "None of the above",
    ],
    answer: "Base Object",
  },
  {
    question: "Which of the following are not server-side Javascript objects",
    choices: ["Date", "FileUpload", "Function", "All of the above"],
    answer: "All of the above",
  },
  {
    question: "How do we write a comment in javascript?",
    choices: ["<!-- -->", "//", "#", "$$"],
    answer: "//",
  },
  {
    question:
      "How are objects compared when they are checked with the strict equality operator?",
    choices: [
      "The contents of the objects are compared",
      "Their references are compared",
      "Both A and B",
      "None of the above",
    ],
    answer: "Their references are compared",
  },
  {
    question: "What does … operator do in JS?",
    choices: [
      "It is used to spread iterables to individual elements",
      "It is used to define a datatype of undefined size",
      "No such operator exists",
      "None of the above",
    ],
    answer: "It is used to spread iterables to individual elements",
  },
  {
    question: "How to stop an interval timer in Javascript?",
    choices: [
      "clearInterval",
      "clearTimer",
      "intervalOver",
      "None of the above",
    ],
    answer: "clearInterval",
  },
  {
    question: "Which of the following are closures in Javascript?",
    choices: ["Variables", "Functions", "Objects", "All of the above"],
    answer: "All of the above",
  },
  {
    question:
      "Which function is used to serialize an object into a JSON string in Javascript?",
    choices: ["parse()", "stringify()", "convert()", "None of the above"],
    answer: "stringify()",
  },
  {
    question: "What is the output of print(NaN === NaN); ?",
    choices: ["true", "false", "undefined", "Error"],
    answer: "false",
  },
  {
    question: "What does the Javascript “debugger” statement do?",
    choices: [
      "It will debug all the errors in the program at runtime",
      "It acts as a breakpoint in a program",
      "It will debug error in the current statement if any",
      "All of the above",
    ],
    answer: "It acts as a breakpoint in a program",
  },
];
//To keep track of used questions
var usedQuestionIndex = [];

// function to show result section with final score.
function loadResultSection() {
  clearInterval(intervalRef);

  quizSection.style.display = "none";
  resultSection.style.display = "block";
  var finalScore = document.getElementById("finalScore");
  finalScore.innerHTML = "Your final score is " + currentScore;

  //initials input field focus event listener
  var initial = document.getElementById("inputInitial");
  initial.addEventListener("mouseover", function () {
    var result = document.getElementById("lastresult");
    if (result) {
      result.parentNode.removeChild(result);
    }
  });

  //Submit Button on click event listener
  var submitButton = document.getElementById("submit");
  submitButton.style.lineHeight = "8px";
  submitButton.addEventListener("click", function () {
    if (!initial.value) {
      alert("Please enter inital to save the score !!!");
      return;
    }
    var resultList = [];

    if (localStorage.getItem("highScoresList")) {
      resultList = JSON.parse(localStorage.getItem("highScoresList"));
    }

    var result = { initial: initial.value, score: currentScore };

    resultList.push(result);

    localStorage.setItem("highScoresList", JSON.stringify(resultList));
    loadHighScoreSection();
  });
}

// function to load next question, called from createUpdateQuizQuestion
function loadNextQuestion() {
  //No questions or if all questions used just return
  if (questions.length <= 0 || usedQuestionIndex.length === questions.length)
    return;

  //random index selector
  var randNum = Math.floor(Math.random() * questions.length);

  //Select random index to show questions
  while (usedQuestionIndex.includes(randNum)) {
    randNum = Math.floor(Math.random() * questions.length);
  }
  //keep track of questions shown
  usedQuestionIndex.push(randNum);

  // create question article with selected index question object
  createUpdateQuizQuestion(
    questions[randNum].question,
    questions[randNum].choices,
    questions[randNum].answer
  );
}

// display result of last answered question
function showResult(answer, parentElement) {
  var createResultDiv = document.createElement("div");
  createResultDiv.setAttribute("id", "lastresult");
  createResultDiv.setAttribute("style", "white-space: pre;");
  createResultDiv.textContent =
    "__________________________________________  \r\n" + answer;
  parentElement.appendChild(createResultDiv);
}

/* function to create or update quiz questions and choices to quiz section article */
function createUpdateQuizQuestion(question, choices, answer) {
  // Remove any existing child nodes to remove if any previous questions are present
  while (quizArticle.children[0]) {
    quizArticle.removeChild(quizArticle.children[0]);
  }

  //Element to show question
  var createQuestion = document.createElement("h2");
  var textNode = document.createTextNode(question);
  createQuestion.appendChild(textNode);

  // function to act on user picked answer,
  var selectAnswer = function (event) {
    remainQuestion -= 1;
    var result = "Wrong!";
    if (event.target.textContent === answer) {
      //increment current score if correct
      currentScore += 2;
      result = "Correct!";
    } else {
      //penalize for incorrect answer
      currentScore -= 1;
      remainingTime -= 10;
    }
    //check if max questions or time has exceeded
    if (remainQuestion > 0 && remainingTime > 0) {
      //load next question from the list
      loadNextQuestion();
      showResult(result, quizArticle);
    } else {
      loadResultSection();
      showResult(result, resultSection);
    }
  };

  //OL element to show answer choices
  var createOl = document.createElement("ol");

  //Create list item for each choice option and append it to order list
  for (let index = 0; index < choices.length; index++) {
    //Create button with click event listener
    const createButton = document.createElement("button");
    createButton.textContent = choices[index];
    createButton.className = "choice";
    createButton.addEventListener("click", selectAnswer);

    createButton.addEventListener("mouseover", function () {
      var result = document.getElementById("lastresult");
      if (result) {
        result.parentNode.removeChild(result);
      }
    });

    //Create list item to add the button
    const createLi = document.createElement("li");
    createLi.appendChild(createButton);

    //Append list item to order list
    createOl.appendChild(createLi);
  }

  //Append the question and choices element to
  quizArticle.appendChild(createQuestion);
  quizArticle.appendChild(createOl);
}

//function to load high score section, can be invoked from submit or header navigation for this section
function loadHighScoreSection() {
  //clear interval if user jumps from quiz section
  clearInterval(intervalRef);

  introScoreSection.style.display = "none";
  quizSection.style.display = "none";
  resultSection.style.display = "none";
  highScoreSection.style.display = "block";

  //Hide header
  document.getElementsByClassName("header")[0].style.visibility = "hidden";

  //Create list item for scores from localstorage
  var highScoreList = document.getElementById("highScoreList");
  var highScoreResults = localStorage.getItem("highScoresList");

  if (highScoreResults) {
    var objResults = JSON.parse(highScoreResults);

    for (let index = 0; index < objResults.length; index++) {
      var createLi = document.createElement("li");
      createLi.textContent =
        objResults[index].initial + " - " + objResults[index].score;
      highScoreList.appendChild(createLi);
    }
  }

  //clear high score event listener
  document
    .getElementById("clearHighScores")
    .addEventListener("click", function () {
      localStorage.removeItem("highScoresList");
      //Remove list items
      while (highScoreList.children[0]) {
        highScoreList.removeChild(highScoreList.children[0]);
      }
    });
}

//Intro Section Start Quiz event listener
startQuiz.addEventListener("click", function (event) {
  introScoreSection.style.display = "none";
  quizSection.style.display = "block";
  //loads next question be to answered
  loadNextQuestion();

  timerCount.textContent = remainingTime;

  intervalRef = setInterval(function () {
    remainingTime -= 1;
    timerCount.textContent = remainingTime;
    if (remainingTime <= 0) {
      clearInterval(intervalRef);
      loadResultSection();
    }
  }, 1000);
});

//View High Score section Go Back event listener, resets the page
goBack.addEventListener("click", function (event) {
  location.reload();
});

//View High Score link navigation event listener
viewHighScoreNav.addEventListener("click", loadHighScoreSection);
