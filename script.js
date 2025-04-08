// first we have to start the game
const startButton =document.getElementById('start-btn')
const nextButton =document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})
let shuffledQuestions, currentQuestionIndex
const questionElement=document.getElementById('question')
const answerButtonsElement=document.getElementById('answer-buttons')


function startGame() 
{
    console.log('started')
    startButton.classList.add('hide')
    shuffledQuestions=questions.sort(() => Math.random()-.5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion()
{
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question)
{
    questionElement.innerText=question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText=answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct=answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    });
}

function resetState()
{
    nextButton.classList.add('hide')
    while(answerButtonsElement.firstChild)
    {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }

}

function selectAnswer(e)
{
    const selectedButton=e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length>currentQuestionIndex+1)
    {
        nextButton.classList.remove('hide')
    }
    else
    {
        startButton.innerText='Restart'
        startButton.classList.remove('hide')
    }
}

function setStatusClass(element, correct)
{
    clearStatusClass(element)
    if (correct)
    {
        element.classList.add('correct')
    }
    else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element)
{
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions =[
    {
        question: "who are PAPAs of College ?",
        answers: [
            {text: 'Dhinchak Pooja ka Khasam', correct: false},
            {text: 'Yuzvinder Chahal', correct: false},
            {text: 'Samarth and Abhinav', correct: true},
            {text: 'Jaddu', correct: false}
        ]
    },
    {
        question: "Why do we click (I have read the terms and conditions) ?",
        answers: [
            {text: 'Because we actually read them', correct: false},
            {text: 'We enjoy legal documents', correct: false},
            {text: 'It makes us feel like lawyers', correct: false},
            {text: 'We just want to install the app', correct: true}
        ]
    },
    {
        question: "Why do people use 😂 in replies?",
        answers: [
            {text: 'Because it is genuinely funny', correct: false},
            {text: 'To end conversations politely', correct: true},
            {text: 'To hide the pain', correct: false},
            {text: 'It is legally required now', correct: false}
        ]
    },
    {
        question: "Why do teachers always say (This will be useful in real life) ?",
        answers: [
            {text: 'Because it is true', correct: false},
            {text: 'They care deeply about your future', correct: false},
            {text: 'To motivate students', correct: false},
            {text: 'Because lying is also an art form in education', correct: true}
        ]
    }
]