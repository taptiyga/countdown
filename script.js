document.getElementById('form').addEventListener('submit', function (event) {
    event.preventDefault(); // Запретить отправку формы

    // Получить значения из input
    const taskTitle = document.querySelector('.form__input_title').value.trim();
    const year = parseInt(document.getElementById('addYear').value) || 0;
    const month = parseInt(document.getElementById('addMounth').value) || 0;
    const day = parseInt(document.getElementById('addDay').value) || 0;
    const hours = parseInt(document.getElementById('addHours').value) || 0;
    const minutes = parseInt(document.getElementById('addMinutes').value) || 0;
    const seconds = parseInt(document.getElementById('addSeconds').value) || 0;

    // Проверка наличия пустого названия задачи
    if (!taskTitle) {
        alert('Пожалуйста, введите название задачи.');
        return; // Выйти из функции, если заголовок пуст
    }

    // Создать дату на основе введенного значения
    const deadline = new Date(year, month - 1, day, hours, minutes, seconds);

    // Проверить, наступил ли крайний срок в будущем
    const now = new Date();
    if (deadline <= now) {
        alert('Дата выполнения задачи должна быть больше текущей даты.');
        return; // Выйти из функции, если дата неверна
    }

    // Добавляет задачу и начинает обратный отсчет
    addTask(taskTitle, deadline);
    saveTasks(); // Сохраним задачи
    document.getElementById('form').reset(); // Очистить поля формы после добавления задачи
});

// Функция добавления задачи
function addTask(title, deadline) {
    const taskWrapper = document.createElement('div');
    taskWrapper.className = 'task-wrapper';
    taskWrapper.setAttribute('data-deadline', deadline); // Сохраняем дедлайн в атрибуте

    const taskTitleElement = document.createElement('h2');
    taskTitleElement.className = 'title';
    taskTitleElement.innerHTML = title + '<span class="delete">X</span>'; // Кнопка удаления
    taskWrapper.appendChild(taskTitleElement);

    // Добавить прослушиватель событий для кнопки удаления
    const deleteButton = taskTitleElement.querySelector('.delete');
    deleteButton.addEventListener('click', function () {
        if (confirm('Вы уверены, что хотите удалить эту задачу?')) {
            taskWrapper.remove(); // Удалить задачу из DOM
            saveTasks(); // Обновить задачи
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

// Сохранение задач в localStorage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('.task-wrapper').forEach(taskWrapper => {
        const title = taskWrapper.querySelector('.title').textContent.replace('X', '').trim();
        const deadline = taskWrapper.getAttribute('data-deadline');
        tasks.push({ title, deadline });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Загрузка задач из localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const deadline = new Date(task.deadline);
        addTask(task.title, deadline);
    });
}

// Загружаем задачи при загрузке страницы
window.onload = loadTasks;

