let num1 = 8
let num2 = 2
document.getElementById("num1-el").textContent = num1
document.getElementById("num2-el").textContent = num2

const sum = document.getElementById("sum-el")

function add() {
    console.log("add clicked")
    sum.textContent = "Sum: " + (num1 + num2)
}

function subtract() {
    console.log("subtract clicked")
    sum.textContent = "Sum: " + (num1 - num2)
}

function multiply() {
    console.log("multiply clicked")
    sum.textContent = "Sum: " + (num1 * num2)
}

function divide() {
    console.log("divide clicked")
    sum.textContent = "Sum: " + (num1 / num2)
}