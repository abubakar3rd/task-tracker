let tasks = [
    { task: "ODC Web Development", completed: false },
    { task: "Business Communication Skills Assignment", completed: false },
]

function addTaskToList(newTask) {
    tasks.push(newTask);
}

let addTask = document.getElementById("add-task");
let task = document.getElementById("task-name");
let listOfTasks = document.querySelector(".list-of-tasks");

function renderTasks() {
    listOfTasks.innerHTML = "";
    tasks.forEach((t, idx) => {
        listOfTasks.innerHTML += `
        <div class="task">
            <div class="wrap-task">
                <input type="checkbox" ${t.completed ? "checked" : ""} data-index="${idx}">
                <p class="task-name${t.completed ? ' completed' : ''}">${t.task}</p>
            </div>
            <div class="action-button">
                <button class="edit-task">Edit</button>
                <button class="delete-task">Delete</button>
            </div>
        </div>
        `;
    });
}

addTask.addEventListener("click", function () {
    if (task.value.trim() !== "") {
        addTaskToList({ task: task.value, completed: false });
        renderTasks();
        task.value = "";
    } else {
        alert("Please enter a task name.");
    }
});

task.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && task.value.trim() !== "") {
        addTaskToList({ task: task.value, completed: false });
        renderTasks();
        task.value = "";
    } else if (e.key === "Enter") {
        alert("Please enter a task name.");
    }
});

// Manage actions and re-render
listOfTasks.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete-task")) {
        const taskElement = e.target.closest('.task');
        const index = Array.from(listOfTasks.children).indexOf(taskElement);
        tasks.splice(index, 1);
        renderTasks();
    } else if (e.target.classList.contains("edit-task")) {
        const taskElement = e.target.closest('.task');
        const index = Array.from(listOfTasks.children).indexOf(taskElement);
        const newTaskName = prompt("Edit Task", tasks[index].task);
        if (newTaskName !== null && newTaskName.trim() !== "") {
            tasks[index].task = newTaskName.trim();
            renderTasks();
        }
    } else if (e.target.type === "checkbox") {
        const index = e.target.getAttribute("data-index");
        tasks[index].completed = e.target.checked;
        renderTasks();
    }
});

// Initial render
renderTasks();