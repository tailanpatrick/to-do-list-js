function scopeMain() {
    const inputTask = document.querySelector('.input-new-task');
    const btnTask = document.querySelector('.plus-icon');
    const tasks = document.querySelector('.box-task');

    function createAndConfigureDiv() {
        const div = document.createElement('div');
        const span = document.createElement('span');
        const button = document.createElement('button');
        const iconButton = document.createElement('img');
        const theme = localStorage.getItem('palete') || 'white';


        div.classList.add('task');
        span.classList.add('task-content');
        button.classList.add('delete-icon');
        iconButton.classList.add('delete');
        button.setAttribute('title', 'Apagar esta Tarefa');


        if (theme === 'white') { iconButton.src = './assets/img/remove.png'; }
        else { iconButton.src = './assets/img/remove-white.png'; }

        button.appendChild(iconButton);
        div.appendChild(span);
        div.appendChild(button);

        return div;
    }

    function clearInput() {
        inputTask.value = '';
    }

    function createTask(textoInput) {
        const div = createAndConfigureDiv();
        div.firstElementChild.innerHTML = textoInput;
        tasks.appendChild(div);
        saveTasks();
        clearInput();
    }

    function saveTasks() { 
        const tasks = document.querySelectorAll('.task');
        const listOfTasks = [];
        
        tasks.forEach(task => {
            listOfTasks.push(task.querySelector('.task-content').innerText);
        });
        
        const listOfTasksJSON = JSON.stringify(listOfTasks);
        localStorage.setItem('tasks', listOfTasksJSON);
    }

    function loadSavedTasks() { 
        const tasksSaved =  localStorage.getItem('tasks');
        const listOfTasks = JSON.parse(tasksSaved);

        listOfTasks.forEach(task => {
            createTask(task);
        });
    }

    btnTask.addEventListener('click', () => {
        if (!inputTask.value) return;

        createTask(inputTask.value.trim());

    });

    inputTask.addEventListener('keypress', (e) => {
        if (!inputTask.value) return;

        e.keyCode === 13 ? createTask(inputTask.value.trim())
            : null;
    });

    document.addEventListener('click', (e) => {
        const el = e.target;

        // select grandFather element
        const task = el.parentNode.parentNode;

        if (el.classList.contains('delete')){
            task.remove();
        }

        saveTasks();
    });

    loadSavedTasks();
}

scopeMain();
