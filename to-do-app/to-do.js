// Controller
const toDoElem = document.getElementById("to-do")
const toDoList = document.getElementById("to-do-list")
const datePickerElem = document.getElementById("date-picker")
let orgTitle = ''
let orgDueDate = ''

// Model
let toDoItems
// const savedToDos = JSON.parse(localStorage.getItem('todos'))
// check if it is an array
// if (Array.isArray(savedToDos)) {
//     toDoItems = savedToDos
// } else {
toDoItems = [{title: "Cooking", dueDate: "2022-12-15", id: "id#1"}]
// }
render()

const createToDo = () => {
    if (toDoElem.value != "" && datePickerElem.value != "") {
        toDoItems.push({
            title: toDoElem.value,
            dueDate: datePickerElem.value,
            id: new Date().getTime() // in millisecond - serves as an id
        })
    }
}

// a function with no parameter
const addToDo = () => {
    createToDo()
    render()
    // saveToDos()
}

function onEdit(event) {
    const editButton = event.target
    const editId = editButton.id

    setEditing(editId)
    console.log(localStorage.getItem('todos'))
    render()
}

function setEditing(editId) {
    toDoItems.forEach(function(item) {
      if (item.id == editId) {
        item.isEditing = true
      }
    })
    // saveToDos()
}

const onUpdate = (event) => {
    const updateButton = event.target
    const updateId = updateButton.id

    const textbox = document.getElementById('edit-title-' + updateId)
    const newTitle = textbox.value

    const datePicker = document.getElementById('edit-date-' + updateId)
    const newDate = datePicker.value

    updateToDo(updateId, newTitle, newDate)

    render()
}

function updateToDo(toDoId, newTitle, newDate) {
    toDoItems.forEach(function (item) {
        if (newTitle == "" && newDate == "") {
            item.title = orgTitle
            item.dueDate = orgDueDate
        }
        else if (item.id == toDoId) {
            if (newTitle == "") {
                item.title = orgTitle
                item.dueDate = newDate
            }
            else if (newDate == "") {
                item.title = newTitle
                item.dueDate = orgDueDate
            }
            else {
                item.title = newTitle
                item.dueDate = newDate
            }
            orgTitle = ""
            orgDueDate = ""
        }
        item.isEditing = false
    })
    // saveToDos()
}

const removeToDo = deleteId => {
    // .filter works such that it creates a new array filled with elements that pass a test provided by a function
    toDoItems = toDoItems.filter(function (item) { // item is the current object when iterating
        if (item.id == deleteId) { // item.id is an int, deleteId is a string; hence different data types
            return false
        }
        else {
            return true
        }
    })
    // saveToDos()
}

function deleteToDo(event) {
    console.log("Delete")

    // delete corresponding item from the array
    const deleteButton = event.target // returns the button object
    const deleteId = deleteButton.id

    removeToDo(deleteId)
    render()
}

// View
function render() {
    toDoList.innerHTML = ""

    toDoItems.forEach(item => {
        const element = document.createElement("div")

        if (item.isEditing === true) { // if editing is true
            orgTitle = item.title
            orgDueDate = item.dueDate

            const inputPrompt = document.createElement("input")
            inputPrompt.type = "text"
            inputPrompt.innerHTML = item.title
            inputPrompt.id = 'edit-title-' + item.id
            inputPrompt.value = orgTitle
            element.appendChild(inputPrompt)

            const datePrompt = document.createElement("input")
            datePrompt.type = "date"
            datePrompt.innerHTML = item.dueDate
            datePrompt.id = 'edit-date-' + item.id
            datePrompt.value = orgDueDate
            element.appendChild(datePrompt)
            
            const updateButton = document.createElement("button")
            updateButton.innerHTML = "Update"
            updateButton.id = item.id
            updateButton.onclick = onUpdate
            element.appendChild(updateButton)
        }
        else {
            // Edit button
            element.innerHTML = item.title + " " + item.dueDate

            const editButton = document.createElement("button")
            editButton.innerHTML = "Edit"
            editButton.style.cssText = "margin-left: 12px;"
            editButton.onclick = onEdit
            editButton.id = item.id
            element.appendChild(editButton)

            // Delete button
            const deleteButton = document.createElement("button")
            deleteButton.innerHTML = "Delete"
            deleteButton.style = "margin-left: 10px;"
            deleteButton.id = item.id // give delete button an id
            deleteButton.onclick = deleteToDo // link to deleteToDo()

            element.appendChild(deleteButton) // append next to the title and date
        }
        toDoList.appendChild(element)
    })
}

// const saveToDos = () => {
//     localStorage.setItem('todos', JSON.stringify(toDoItems)) // string the array
// }