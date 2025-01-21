document.addEventListener('DOMContentLoaded', () => {
    const initialTasks = [
        { text: 'fazer o café da manhã', completed: false },
        { text: 'fazer o almoço', completed: false },
        { text: 'fazer o jantar', completed: false }
    ];

    const taskForm = document.getElementById('taskForm');
    const taskList = document.getElementById('taskList');
    const taskCounter = document.getElementById('taskCounter');
    let completedTasks = 0;

    function createTaskElement(taskText, completed = false) {
        const taskItem = document.createElement('div');
        taskItem.className = `task-item ${completed ? 'completed' : ''}`;

        const taskTextSpan = document.createElement('span');
        taskTextSpan.className = 'task-text';
        taskTextSpan.textContent = taskText;

        const actionButton = document.createElement('button');
        actionButton.className = `complete-button ${completed ? 'checked' : ''}`;
        
        if (!completed) {
            actionButton.textContent = 'Concluir';
            actionButton.onclick = () => completeTask(taskItem, actionButton);
        } else {
            const icon = document.createElement('i');
            icon.className = 'fas fa-check check-icon';
            actionButton.appendChild(icon);
        }

        taskItem.appendChild(taskTextSpan);
        taskItem.appendChild(actionButton);
        return taskItem;
    }

    function completeTask(taskItem, button) {
        taskItem.classList.add('completed');
        button.className = 'complete-button checked';
        button.textContent = '';
        const icon = document.createElement('i');
        icon.className = 'fas fa-check check-icon';
        button.appendChild(icon);
        button.onclick = null;
        completedTasks++;
        updateCounter();
    }

    function updateCounter() {
        taskCounter.textContent = `${completedTasks} ${completedTasks === 1 ? 'tarefa concluída' : 'tarefas concluídas'}`;
    }

    // Load initial tasks
    initialTasks.forEach(task => {
        const taskElement = createTaskElement(task.text, task.completed);
        taskList.appendChild(taskElement);
        if (task.completed) completedTasks++;
    });
    updateCounter();

    // Handle new task submission
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = taskForm.querySelector('.task-input');
        const taskText = input.value.trim();
        
        if (taskText) {
            const taskElement = createTaskElement(taskText);
            taskList.appendChild(taskElement);
            input.value = '';
        }
    });
});