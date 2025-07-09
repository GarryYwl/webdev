var questions = [
    {
        text: "Which invention was crucial to the Agricultural Revolution?",
        answers: {
            a: "Steam Engine",
            b: "Plow",
            c: "Internet",
            d: "Telegraph"
        },
        correct: "b"
    },
    {
        text: "What was a key feature of the Industrial Revolution?",
        answers: {
            a: "Agricultural Machinery",
            b: "Electric Power",
            c: "Mass Production",
            d: "Information Technology"
        },
        correct: "c"
    },
    {
        text: "Which item is associated with the Digital Revolution?",
        answers: {
            a: "Factory System",
            b: "Computer",
            c: "Steam Engine",
            d: "Electricity"
        },
        correct: "b"
    },
    {
        text: "What are the negative impacts of the Industrial Revolution?",
        answers: {
            a: "Increased urbanization and overcrowded cities",
            b: "Expansion of global trade and cultural exchange",
            c: "Enhanced labor rights and worker protections",
            d: "Improved healthcare and sanitation"
        },
        correct: "a"
    },
    {
        text: "What was the First Agricultural Revolution known as?",
        answers: {
            a: "The Age of Exploration",
            b: "The Renaissance",
            c: "The Industrial Revolution",
            d: "The Neolithic Revolution"
        },
        correct: "d"
    },
    {
        text: "Which technological advancements marked significant milestones during the Digital Revolution?",
        answers: {
            a: "The invention of the internet and email communication",
            b: "The development of artificial intelligence and machine learning",
            c: "The introduction of e-commerce, social media platforms, and smartphones",
            d: "The implementation of cloud computing and big data analytics"
        },
        correct: "c"
    },
    {
        text: "Which event during the Digital Revolution had a significant impact on global finance and transactions?",
        answers: {
            a: "The creation of Facebook in 2004",
            b: "The introduction of e-commerce by Amazon in 1994",
            c: "The launch of the iPhone in 2007",
            d: "The introduction of Bitcoin and blockchain technology in 2008"
        },
        correct: "d"
    },
    {
        text: "What was a significant consequence of the Agricultural Revolution?",
        answers: {
            a: "The development of advanced tools and weapons.",
            b: "The establishment of permanent farming settlements.",
            c: "The invention of long-distance trade routes.",
            d: "The emergence of large urban centers."
        },
        correct: "b"
    },
    {
        text: "Which of the following developments was introduced during the first Industrial Revolution to enhance livestock quality?",
        answers: {
            a: "The Crystal Palace Exhibition.",
            b: "The Spinning Jenny.",
            c: "The Norfolk four-course rotation.",
            d: "Selective breeding by Robert Bakewell and Thomas Coke."
        },
        correct: "d"
    },
    {
        text: "What was a key impact of James Watt's improvements to the steam engine during the Industrial Revolution?",
        answers: {
            a: "Increased crop and livestock yields.",
            b: "Revolutionized textile production.",
            c: "Transformed transportation and manufacturing.",
            d: "Established the first industrial factory."
        },
        correct: "c"
    },
];

var currentQuestionIndex = 0;
var score = 0;
var quizContainer = document.getElementById('quiz-container');
var nextButton = document.getElementById('next-btn');
var retryButton = document.getElementById('retry-btn');
var resultDiv = document.getElementById('result');

function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function startQuiz() {
    shuffle(questions);
    currentQuestionIndex = 0;
    score = 0;
    nextButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    resultDiv.innerHTML = '';
    loadQuestion();
}

function loadQuestion() {
    var question = questions[currentQuestionIndex];
    quizContainer.innerHTML =
        '<p>' + 'Q' + (currentQuestionIndex + 1) + '. ' + question.text + '</p>' +
        '<form id="question-form">' +
        '<input type="radio" name="answer" value="a" id="answer-a"><label for="answer-a">' + question.answers.a + '</label><br>' +
        '<input type="radio" name="answer" value="b" id="answer-b"><label for="answer-b">' + question.answers.b + '</label><br>' +
        '<input type="radio" name="answer" value="c" id="answer-c"><label for="answer-c">' + question.answers.c + '</label><br>' +
        '<input type="radio" name="answer" value="d" id="answer-d"><label for="answer-d">' + question.answers.d + '</label><br>' +
        '</form>'
        ;
}

function checkAnswer() {
    var selectedAnswer = document.querySelector('input[name="answer"]:checked');
    if (selectedAnswer) {
        var answerValue = selectedAnswer.value;
        if (answerValue == questions[currentQuestionIndex].correct) {
            score++;
        }
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            displayResult();
        }
    } else {
        window.alert('Please select an answer.');
    }
}

function displayResult() {
    var resultHtml = '<p>You got ' + score + ' out of ' + questions.length + ' questions right!</p>';
    resultHtml += '<h2>Correct Answers:</h2>';

    questions.forEach(function (question, index) {
        resultHtml += '<p><strong>Question ' + (index + 1) + ':</strong> ' + question.text + '<br>';
        resultHtml += 'Correct Answer: ' + question.answers[question.correct] + '</p>';
    });

    resultDiv.innerHTML = resultHtml;
    nextButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
}

startQuiz();

nextButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', startQuiz);