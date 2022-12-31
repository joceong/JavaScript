let cards = [] // array
let sum = 0
let hasBlackJack = false
let isAlive = false
let message = ""
let messageEl = document.getElementById("message-el")
let cardsEl = document.getElementById("cards-el")
let sumEl = document.querySelector("#sum-el")

// creating objects, must put objects infront
let player = {
    name: "Per",
    chips: 145
}

let playerEl = document.getElementById("player-el") 
playerEl.textContent = player.name + ": $" + player.chips

function startGame() {
    isAlive = true
    cards = []
    sum = 0
    for (let i=0;i<2;i++) {
        cards.push(getRandomCard())
        sum += cards[i]
    }
    renderGame() 
}

function renderGame() {
    if (sum <= 20) {
        message = "Do you want to draw a new card?"
    } else if (sum === 21) {
        message = "You've got Blackjack!"
        hasBlackJack = true
    } else {
        message = "You're out of the game!"
        isAlive = false
    }
    messageEl.textContent = message
    cardsEl.textContent = "Cards:"
    // displaying the cards' numbers
    for (let i=0;i<cards.length;i++) {
        cardsEl.textContent += " " + cards[i]
    }

    // displaying the sum
    sumEl.textContent = "Sum: " + sum
}

function newCard() {
    if (isAlive && !hasBlackJack) {
        console.log("Drawing a new card from the deck!")
        let newCard = getRandomCard()
        cards.push(newCard)
        sum += newCard
        renderGame()
    }
}

function getRandomCard() {
    let randomCard = Math.floor(Math.random()*13) + 1
    if (randomCard === 1) {
        randomCard = 11
    }
    if (randomCard > 10) {
        randomCard = 10
    }
    return randomCard
}