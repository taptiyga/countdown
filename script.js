document.getElementById('form').addEventListener('submit', function (event) {
    event.preventDefault(); // Запретить отправку формы

    // Получить значения из input
    const taskTitle = document.querySelector('.form__input_title').value.trim();
    const year = document.getElementById('addYear').value ? parseInt(document.getElementById('addYear').value) : 0;
    const month = document.getElementById('addMounth').value ? parseInt(document.getElementById('addMounth').value) : 0;
    const day = document.getElementById('addDay').value ? parseInt(document.getElementById('addDay').value) : 0;
    const hours = document.getElementById('addHours').value ? parseInt(document.getElementById('addHours').value) : 0;
    const minutes = document.getElementById('addMinutes').value ? parseInt(document.getElementById('addMinutes').value) : 0;
    const seconds = document.getElementById('addSeconds').value ? parseInt(document.getElementById('addSeconds').value) : 0;

    // Проверкка наличия пустого названия задачи
    if (!taskTitle) {
        alert('Пожалуйста, введите название задачи.');
        return; // Выйти из функции, если заголовок пуст
    }

    // Создать дату на основе введенного значения
    const deadline = new Date(year, month - 1, day, hours, minutes, seconds);

    // Проверьте, наступил ли крайний срок в будущем
    const now = new Date();
    if (deadline <= now) {
        alert('Дата выполнения задачи должна быть больше текущей даты.');
        return; // Выйти из функции, если дата неверна
    }

    // Добавляет задачу и начнает обратный отсчет
    addTask(taskTitle, deadline);

    // Очистить поля формы после добавления задачи
    document.getElementById('form').reset();
});

// Функция добавления задачи
function addTask(title, deadline) {
    // Создать новый элемент задачи
    const taskWrapper = document.createElement('div');
    taskWrapper.className = 'task-wrapper';

    // Добавить название задачи с кнопкой удаления
    const taskTitleElement = document.createElement('h2');
    taskTitleElement.className = 'title';
    taskTitleElement.innerHTML = title + '<span class="delete">X</span>'; // Add delete button
    taskWrapper.appendChild(taskTitleElement);

    // Добавить прослушиватель событий для кнопки удаления
    const deleteButton = taskTitleElement.querySelector('.delete');
    deleteButton.addEventListener('click', function () {
        if (confirm('Вы уверены, что хотите удалить эту задачу?')) {
            taskWrapper.remove(); // Remove the task from the DOM
        }
    });

    // Создать элемент обратного отсчета
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

    // Начать обратный отсчет
    startCountdown(deadline, countdownElement);
}

// Функция обратного отсчета
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