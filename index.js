// Get Reference to DOM elements
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

// Load saved tasks from local storage when the pages loads
document.addEventListener('DOMContentLoaded', loadTasks);

// Add event listener to the form
todoForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form from refreshing the page

    const taskText = todoInput.value;

    if (taskText === "") return // Check if input is empty

    // Create a new task
    addTaskToList(taskText);
    saveTaskToLocalStorage(taskText); // Save the new task to local storage

    // Clear the input field
    todoInput.value = "";
    
})

//function to create and add task to the list
function addTaskToList(taskText, isCompleted= false) {

    // Create a new List Item element
    const listItem = document.createElement("li");

    // Create the Task Text
    const taskSpan = document.createElement("span");
    taskSpan.textContent = taskText;
    if (isCompleted) {
        taskSpan.classList.add('completed'); // Mark completed if loaded from local storage
    }
    listItem.appendChild(taskSpan);

    // Create a delete Button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-btn");
    listItem.appendChild(deleteButton);

    // Append the list item to the list
    todoList.appendChild(listItem);

    // Add event listener to mark the task as completed when clicked
    taskSpan.addEventListener("click", function(){
        taskSpan.classList.toggle("completed");
        updateTaskInLocalStorage(taskSpan.textContent, taskSpan.classList.contains('completed'));
    })

    // Add event listener to delete the task when delete button is clicked
    deleteButton.addEventListener("click", function(){
        todoList.removeChild(listItem);
        removeTaskFromLocalStorage(taskSpan.textContent);
    })
    
}

// Save task to local storage
function saveTaskToLocalStorage(taskText) {
    const tasks = getTasksFromLocalStorage();
    tasks.push({ text: taskText, completed: false })
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Get tasks from local storage
function getTasksFromLocalStorage() {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks= [];
    } else {
        tasks= JSON.parse(localStorage.getItem("tasks"));
    }
    return tasks;
}

// Update task completion status in local storage
function updateTaskInLocalStorage(taskText, isCompleted) {
    let tasks = getTasksFromLocalStorage();
    tasks = tasks.map(task => {
        if (task.text === taskText) {
            task.completed = isCompleted;
        }
        return task;
    })
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Remove Task Form Local Storage
function removeTaskFromLocalStorage(task) {
    let tasks = getTasksFromLocalStorage();
    tasks = tasks.filter( task => task.text !== taskText)
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load Tasks Form Local Storage and Display Them
function loadTasks() {
    const tasks = getTasksFromLocalStorage();
    tasks.forEach(task => {
        addTaskToList(task.text, task.completed);
    });
}