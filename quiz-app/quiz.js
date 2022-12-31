const quizData = [
    {
        question: "Which is the smallest ocean in the world?",
        a: 'Indian',
        b: 'Pacific',
        c: 'Atlantic',
        d: 'Arctic',
        correct: 'd',
    }, {
        question: "Who is the president of USA as of 2022?",
        a: 'Mike Pence',
        b: 'Joe Biden',
        c: 'Donald Trump',
        d: 'Kamala Harris',
        correct: 'b',
    }, {
        question: "What does HTML stand for?",
        a: 'Hypertext Markup Language',
        b: 'Jason Object Notation',
        c: 'Cascading Style Sheet',
        d: 'Helicoper Terminals Motorbikes Language',
        correct: 'a',     
    }, {
        question: "Which country has the most number of lakes?",
        a: 'Canada',
        b: 'USA',
        c: 'Finland',
        d: 'Sweden',
        correct: 'a'
    }, {
        question: "The number of bones in the human is?",
        a: '301',
        b: '120',
        c: '217',
        d: '206',
        correct: 'd'
    }
]

const quiz = document.getElementById("quiz")
const question_text = document.getElementById("question")
const a_text = document.getElementById("a_text")
const b_text = document.getElementById("b_text")
const c_text = document.getElementById("c_text")
const d_text = document.getElementById("d_text")
const submitBtn = document.getElementById("submit")

let currentQuestion = 0
let score = 0

const loadQuiz = () => {
    const currQuizData = quizData[currentQuestion]
    question_text.textContent = currQuizData.question
    a_text.textContent = currQuizData.a
    b_text.textContent= currQuizData.b
    c_text.textContent = currQuizData.c
    d_text.textContent = currQuizData.d
}

const getSelected = () => {
    const answerEls = document.querySelectorAll(".answer")
    let answer = undefined
    answerEls.forEach((answerEl) => {
        if (answerEl.checked) {
            answer = answerEl.id
        }
    })
    return answer
}

const deselectAnswer = () => {
    const answerEls = document.querySelectorAll(".answer")
    answerEls.forEach((answerEl) => {
        answerEl.checked = false
    })
}

submitBtn.addEventListener("click", () => {
    const answer = getSelected()

    if (answer === quizData[currentQuestion].correct) {
        score++
    }
    if (answer) {
        if (currentQuestion < quizData.length - 1) {
            deselectAnswer()
            currentQuestion++
            loadQuiz()
        } else {
            quiz.innerHTML = 
            `
            <h2>You answered correctly at ${score}/${quizData.length}.</h2>
            <button onclick="location.reload()">Reload</button>
            `
        }
    }
    // loadQuiz()
})

loadQuiz()

