let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const tabBtn = document.getElementById("tab-btn")
const deleteBtn = document.getElementById("delete-btn")
const ulEl = document.getElementById("ul-el")

inputBtn.addEventListener("click", () => {
    myLeads.push(inputEl.value)
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
    inputEl.value = "" // clear out the textbox
})

tabBtn.addEventListener("click", () => {
    // grab the URL of the current tab
    // active: true means to tell Google API that you are looking for the active tab
    // currentWindow: true means to tell Google API that you want the current window
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})

deleteBtn.addEventListener('dblclick', () => {
    console.log("Double clicked!")
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

const render = (leads) => {
    // ulEl.textContent = ""
    let listItem = ""
    leads.forEach(item=> {
        /* (ALTERNATIVE)
        const listItem = document.createElement('li') // <li> is the bullet point
        const linkItem = document.createElement('a')
        linkItem.textContent = item // ulEl.innerHTML += "<li>" + item + "</li>"
        linkItem.href = "item"
        linkItem.target = "_blank" // create a new tab instead of opening the link with the existing tab
        listItem.appendChild(linkItem)
        ulEl.appendChild(listItem)
        */
        // `` is a template string
        listItem += `   
            <li>
                <a target='_blank' href=${item}>${item}</a>
            </li>`
    })
    ulEl.innerHTML = listItem
}

const leadsFromStorage = JSON.parse(localStorage.getItem("myLeads"))
if (leadsFromStorage) {
    myLeads = leadsFromStorage
}

render(myLeads)