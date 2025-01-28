// const items = document.querySelectorAll('.countdown-item>h4')
// const countdownEl = document.querySelector('.countdown')
// let countdownDate = new Date(2026, 0, 28, 10, 43,).getTime()
// function getCountdownTime() {
//     const now = new Date().getTime()
//     const distance = countdownDate - now

//     const oneDay = 24 * 60 * 60 * 1000
//     const oneHours = 60 * 60 * 1000
//     const oneMinutes = 60 * 1000

//     let days = Math.floor(distance / oneDay)
//     console.log(days)
//     let hours = Math.floor(distance % oneDay / oneHours)
//     console.log(hours)
//     let minutes = Math.floor(distance % oneHours / oneMinutes)
//     console.log(minutes)
//     let seconds = Math.floor(distance % oneMinutes / 1000)
//     console.log(seconds)

//     const values = [days, hours, minutes, seconds]
//     console.log(values)

//     items.forEach(function (item, index) {
//         item.textContent = values[index]
//     })

//     if (distance < 0) {
//         clearInterval(countdown)
//         countdownEl.innerHTML = '<h4 class="expired">Время вышло</h4>'
//     }
// }

// let countdown = setInterval(getCountdownTime, 1000)
// getCountdownTime()


// document.getElementById('addTaskButton').addEventListener('submit', function (event) {
//     event.preventDefault(); // Предотвращаем отправку формы

//     // Получаем значения из инпутов
//     // const year = document.getElementById('year').value
//     // const mounth = document.getElementById('mounth').value
//     const days = document.getElementById('day').value
//     const hours = document.getElementById('hours').value
//     const minutes = document.getElementById('minutes').value
//     const seconds = document.getElementById('seconds').value
//     // const formList = document.getElementById('formList').value


//     // Помещаем значения в соответствующие поля
//     document.getElementById('displayDays').textContent = days;
//     document.getElementById('displayHours').textContent = hours;
//     document.getElementById('displayMinutes').textContent = minutes;
//     document.getElementById('displaySeconds').textContent = seconds;

//     // Очищаем поля ввода
//     document.getElementById('form').reset();
// });
document.getElementById('form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from submitting

    // Get values from inputs
    const taskTitle = document.querySelector('.form__input_title').value.trim();
    const year = document.getElementById('addYear').value ? parseInt(document.getElementById('addYear').value) : 0;
    const month = document.getElementById('addMounth').value ? parseInt(document.getElementById('addMounth').value) : 0;
    const day = document.getElementById('addDay').value ? parseInt(document.getElementById('addDay').value) : 0;
    const hours = document.getElementById('addHours').value ? parseInt(document.getElementById('addHours').value) : 0;
    const minutes = document.getElementById('addMinutes').value ? parseInt(document.getElementById('addMinutes').value) : 0;
    const seconds = document.getElementById('addSeconds').value ? parseInt(document.getElementById('addSeconds').value) : 0;

    // Проверка на пустое название задачи
    if (!taskTitle) {
        alert('Пожалуйста, введите название задачи.');
        return; // Выход из функции, если название пустое
    }

    // Create date based on entered values
    const deadline = new Date(year, month - 1, day, hours, minutes, seconds);

    // Проверка, что дата больше текущей
    const now = new Date();
    if (deadline <= now) {
        alert('Дата выполнения задачи должна быть больше текущей даты.');
        return; // Выход из функции, если дата некорректна
    }

    // Add the task and start the countdown
    addTask(taskTitle, deadline);

    // Clear form fields after adding task
    document.getElementById('form').reset();
});

// Function to add task
function addTask(title, deadline) {
    // Create a new task element
    const taskWrapper = document.createElement('div');
    taskWrapper.className = 'task-wrapper';

    // Add task title
    const taskTitleElement = document.createElement('h2');
    taskTitleElement.className = 'title';
    taskTitleElement.innerHTML = title + '<span>Х</span>';
    taskWrapper.appendChild(taskTitleElement);

    // Create countdown element
    const countdownElement = document.createElement('div');
    countdownElement.className = 'countdown';
    countdownElement.innerHTML = `
        <div class="countdown-item">
            <h4 class="days">0</h4>
            <span>дни</span>
        </div>
        <div class="countdown-item">
            <h4 class="hours">0</h4>
            <span>часы</span>
        </div>
        <div class="countdown-item">
            <h4 class="minutes">0</h4>
            <span>минуты</span>
        </div>
        <div class="countdown-item">
            <h4 class="seconds">0</h4>
            <span>секунды</span>
        </div>
    `;
    taskWrapper.appendChild(countdownElement);
    document.querySelector('.tasks-wrapper').appendChild(taskWrapper);

    // Start countdown
    startCountdown(deadline, countdownElement);
}

// Countdown function
function startCountdown(deadline, countdownElement) {
    const interval = setInterval(() => {
        const now = new Date();
        const timeLeft = deadline - now;

        if (timeLeft <= 0) {
            clearInterval(interval);
            countdownElement.innerHTML = 'Время вышло!';
            return;
        }

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        countdownElement.querySelector('.days').textContent = days;
        countdownElement.querySelector('.hours').textContent = hours;
        countdownElement.querySelector('.minutes').textContent = minutes;
        countdownElement.querySelector('.seconds').textContent = seconds;
    }, 1000);
}