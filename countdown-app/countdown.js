const newYear = "1 January 2023"
const daysEl = document.getElementById('days')
const hoursEl = document.getElementById('hours')
const minutesEl = document.getElementById('minutes')
const secondsEl = document.getElementById('seconds')

function countdown() {
    const newYearsDate = new Date(newYear)
    const currentDate = new Date()

    const totalSeconds = (newYearsDate-currentDate)/1000 // convert to seconds from milliseconds
    const seconds = Math.floor(totalSeconds) % 60
    const minutes = Math.floor(totalSeconds / 60) % 60
    const hours = Math.floor(totalSeconds / 3600) % 24
    const days = Math.floor(totalSeconds/3600/24)
    
    daysEl.innerHTML = formatTime(days)
    hoursEl.innerHTML = formatTime(hours)
    minutesEl.innerHTML = formatTime(minutes)
    secondsEl.innerHTML = formatTime(seconds)
}

function formatTime(time) {
    return time < 10 ? (`0${time}`) : time
}

countdown()
setInterval(countdown, 1000)