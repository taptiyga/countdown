const items = document.querySelectorAll('.countdown-item>h4')
const countdownEl = document.querySelector('.countdown')
let countdownDate = new Date(2026, 0, 28, 10, 43,).getTime()
function getCountdownTime() {
    const now = new Date().getTime()
    const distance = countdownDate - now

    const oneDay = 24 * 60 * 60 * 1000
    const oneHours = 60 * 60 * 1000
    const oneMinutes = 60 * 1000

    let days = Math.floor(distance / oneDay)
    console.log(days)
    let hours = Math.floor(distance % oneDay / oneHours)
    console.log(hours)
    let minutes = Math.floor(distance % oneHours / oneMinutes)
    console.log(minutes)
    let seconds = Math.floor(distance % oneMinutes / 1000)
    console.log(seconds)

    const values = [days, hours, minutes, seconds]
    console.log(values)

    items.forEach(function (item, index) {
        item.textContent = values[index]
    })

    if (distance < 0) {
        clearInterval(countdown)
        countdownEl.innerHTML = '<h4 class="expired">Время вышло</h4>'
    }
}

let countdown = setInterval(getCountdownTime, 1000)
getCountdownTime()