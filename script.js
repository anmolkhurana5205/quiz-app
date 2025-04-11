// first of all after making all the buttons and block with the help of html and css we have to hide them all except the start button,
// after clicking on start button, start button should disappear and by default question disappear and new question will appear and respective answers also appear and after clicking on answer next button or restart button will appear and it tells which option is right and which option is wrong.
// so for this i have to create a array of questions with their respective options and i should also assign another attribute to each option which tell that this option is correct or not ?
// 
// what functions i should create ?
// funtion which execute after clicking start button startGame().
// setNextQuestion () this is used to set which question from the question array will be the next question.
// showQuestion () this is used to show the selected question.
// function which execute after clicking next button setNextQuestion (), showQuestion ().
// function which execute after clicking any option selectAnswer() and in this i also need to check whether the questions are finished or not ?.
// function which reset the question resetState().
// 
// variable define the keyword 'const' want you to define its values during its declaration and it don't allow you to change its value.
const startButton =document.getElementById('start-btn')
const nextButton =document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
// after clicking on start button function (startGame) executes.
startButton.addEventListener('click', startGame)
// after clicking on next button currentQuestionIndex should be increase by 1 and the function which set the next question called.
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
    // the below function removes the classes "correct" and "wrong" from the html body.
    clearStatusClass(document.body)
})
// variable define the keyword 'let' allow you to change its values many times.
let shuffledQuestions, currentQuestionIndex
// the below variable is now connected to that block of html which holds the actual question or which has the id question.
const questionElement=document.getElementById('question')
// the below variable is now connected to that block of html which hold all the buttons of options or which has the id answer-buttons.
const answerButtonsElement=document.getElementById('answer-buttons')


function startGame() 
{
    // this is just to ensure that function is running or not .
    console.log('started')
    // start button hide after when this function executes.
    startButton.classList.add('hide')
    // as we know that Math.random() - 0.5 return the random values in the range (-0.5, 0.5) so it means that sort function try to sort the array internally, it first compares two value but in this case it chooses value on the basis of the value that math.random() return and this thing happen again and again and leads to shuffled array.
    shuffledQuestions=questions.sort(() => Math.random()-.5)
    currentQuestionIndex = 0
    // this is unhinding of the question by removing the hide class which i give it in html.
    questionContainerElement.classList.remove('hide')
    // this function sets the next question.
    setNextQuestion()
    // the below function removes the classes "correct" and "wrong" from the html body.
    clearStatusClass(document.body)
}

function setNextQuestion()
{
    // this is used to remove the next button everytime when we are setting the next question although the next button already have the hide class but in the further code we repeatedly remove the hide class from the next button to make it visible.
    // and this also remove the options(answers) which are already present.
    resetState()
    // this is the next and final part of setting a new question, the below function calls the function which actually display the question and their options but while calling it we have to mention which question we want it to show.
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question)
{
    // in the below line the first question is from the parameter which is bacically represent elements of the shuffledQuestions or questions array and the second question is the sub part of the element of the question array that's why we are calling it with dot operator.
    // and with the help of 'innerText' property we are overwriting the content of that block of html which was refrenced by questionElement.
    questionElement.innerText=question.question
    // as we know that in each element of the questions array there is list of answer which named as answers and this is present in each element of the quesrions array.
    // 'forEach' is used to run a loop through all the elements of the answers array.
    // and each element of answers array is now named as answer in each iteration (answer is like 'i' in "for i in range(_, _)" in python).
    question.answers.forEach(answer => {
        // in every iteration the below line create a button tag in js memory (here i said in memory because it is now ready to appear in the html as it is only created in java script memory).
        // if i write the below line like this "const button = document.createElement('btn')" then it will create the <btn></btn> (custom element) in js memory and when we use it in html it appear like this <btn></btn>.
        const button = document.createElement('button')
        // below line is used to change the content of the newly created unused button element with the help of innerText property.
        button.innerText=answer.text
        // below line gives 'btn' class to the to the newly created unused button element.
        button.classList.add('btn')
        // as we know that in the every answer of the answers array there is two element one represent the text(string) and other one represent that the current answer is correct or not by giving them boolean literals.
        // if block will allow entry to those answer whose correct member has true value.
        if (answer.correct) {
            // below line is creating custom data attribute (data-correct) in the button block and assign it the value of correct member of asnwer. (answer.correct) in the if block is always true because this is the only condition because of which it enters in to the if block. if the value of answer.correct is false then it fails to enter the if block.
            button.dataset.correct=answer.correct
        }
        // now the below line of code defines that what will happen if someone click on newly created unused button.
        // when someone click on the button it calls selectanswer() function.
        button.addEventListener('click', selectAnswer)
        // now finally the below line is responsble for using the unused button it basically append the newly created button to the block of html which holds the other buttons.
        answerButtonsElement.appendChild(button)
    });
}

function resetState()
{
    // below line is responsible for hiding the next button because we want that next button would only appear when user click on any options.
    nextButton.classList.add('hide')
    // below line initiates the while loop with the entry condition that it will iterate only run when there exist a child in that html element which was pointed by answerButtonsElement (it is basically the block which hold all the answer buttons).
    while(answerButtonsElement.firstChild)
    {
        // answerButtonsElement.removeChild this tells what it do.
        // answerButtonsElement.firstChild this tell to whom it do.
        // it basically remove the first child of that html element which is pointed by answerButtonsElement.
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}
// in the calling of the below function no arguement was passed but in the defintion of the function there is a parameter. 
// So whenever this type function was called by the event listener then in that case java script automatically consider parameter of the function as event object which tells us the following things:
// here e is not the keyword it can be anything but the thing written after dot can't be anything.
// 1. e.type = Type of event (e.g., "click", "keydown").
// 2. e.target = The actual HTML element that triggered the event.
// 3. e.clientX & e.clientY = X and Y coordinates of the mouse pointer (for mouse events).
// 4. e.key = The key that was pressed (for keyboard events).
// 5. e.timeStamp = time when the event occur.
// 6. e.currentTarget = Not the actual HTML element but the js variable in this case it const button that triggered the event.
function selectAnswer(e)
{
    // selectedButton will be connected to that element on which the event occured.
    const selectedButton=e.target
    // if the selected buttonn (or option) has the correct: true then the value of constant variable correct will be true othervise undefined as we fill data-correct only when the value is true not for the false. 
    const correct = selectedButton.dataset.correct
    // so below line contain the funtion setStatusClass which is responsible for giving the class named "correct" or class named "wrong" to the body of the html on the basis of second arguement of setStatusClass(___, Correct)
    setStatusClass(document.body, correct)
    // answerButtonsElement.children this is to reprsent the HTML collection and this is not a array just a collection.
    // so to run a 'for loop' over this collection we first convert it into js array.
    // button => and this is same method we studied earlier in "question.answers.forEach(answer =>" and in python for loop "for i in list:".
    Array.from(answerButtonsElement.children).forEach(button => {
        // in the below line we again use the setStatusClass function for assigning class "correct" or "wrong" to the button on the basis of button.dataset.correct this criteria.
        setStatusClass(button, button.dataset.correct)
    })
    // now the below if and else block determining whether we have to show start button (restart button) or the next button.
    // shuffledQuestions.length>currentQuestionIndex+1 for understanding this lets say we have 5 questions and we are on fifth or last one( for last one currentQuestionIndex+1=5)(shuffledQuestions.length=5) and we set our code in such a way that it show next button (to move to the next question) or restart button (to restart the quiz) after click on any option. 
    // if we are on last question so next button should not appear and this is what our condition do (5>5) which is false. 
    if (shuffledQuestions.length>currentQuestionIndex+1)
    {
        // below line is for unhiding the next button 
        nextButton.classList.remove('hide')
    }
    else
    {
        // below line changes the contect of the start button to restart because our start button here act as a restarter of the quiz.
        startButton.innerText='Restart'
        // // below line is for unhiding the start button
        startButton.classList.remove('hide')
    }
}

function setStatusClass(element, correct)
{
    // below function is responsible for removing the current "correct" or "wrong" class from any element
    clearStatusClass(element)
    // if the sencond arguement of the setStatusClass (correct) has the value then the if block runs
    if (correct)
    {
        // it gives class named "correct" to the the first arguement of the setStatusClass
        element.classList.add('correct')
    }
    else {
        // // it gives class named "wrong" to the the first arguement of the setStatusClass
        element.classList.add('wrong')
    }
}

// below function is responsible for the removal of class named "correct" and class named "wrong" the element
function clearStatusClass(element)
{
    // below line removes the class named "correct" from the element
    element.classList.remove('correct')
    // below line removes the class named "wrong" from the element
    element.classList.remove('wrong')
}

const questions =[
    {
        question: "What’s the first thing most people do after waking up?",
        answers: [
            {text: 'A) Brush their teeth', correct: false},
            {text: 'B) Check their phone', correct: true},
            {text: 'C) Do 50 push-ups', correct: false},
            {text: 'D) Meditate on the meaning of life', correct: false}
        ]
    },
    {
        question: "What’s the real reason people go to the gym?",
        answers: [
            {text: 'A) To get fit', correct: false},
            {text: 'B) To lift weights', correct: false},
            {text: 'C) To find lost motivation', correct: false},
            {text: 'D) For Instagram stories', correct: true}
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
    },
    {
        question: "What’s the best way to avoid doing your homework?",
        answers: [
            {text: 'A) Start early', correct: false},
            {text: 'B) Ask a friend', correct: false},
            {text: 'C) Watch one YouTube video and forget everything', correct: true},
            {text: 'D) Cry and accept your fate', correct: false}
        ]
    },
    {
        question: "What’s the most used app during exams?",
        answers: [
            {text: 'A) Calculator', correct: false},
            {text: 'B) Notes', correct: false},
            {text: 'C) Google Maps (just in case?)', correct: false},
            {text: 'D) WhatsApp', correct: true}
        ]
    }
]