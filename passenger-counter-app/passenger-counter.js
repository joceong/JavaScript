let countEl = document.getElementById("count-el") // does not take the current value of "count-el"
let saveEl = document.getElementById("save-el") // does not take the current value of "save-el"

// run this to see what countEl prints
console.log(countEl)

let count = 0

function increment() {
    count += 1
    countEl.textContent = count
}

function save() {
    let countStr = count + " - "
    saveEl.textContent += countStr; // textContent property returns all descendants including spaces and CSS hidden text (not human readable)
    countEl.textContent = 0
    count = 0
}
