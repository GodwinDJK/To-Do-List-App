// Get Reference to DOM elements
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

// Add event listener to the form

todoForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form from refreshing the page

    const taskText = todoInput.value;

    if (taskText === "") return // Check if input is empty

    // Create a new List Item element
    const listItem = document.createElement("li");

    // Create the Task Text
    const taskSpan = document.createElement("span");
    taskSpan.textContent = taskText;
    listItem.appendChild(taskSpan);

    // Create a delete Button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-btn");
    listItem.appendChild(deleteButton);

    // Append the list item to the list
    todoList.appendChild(listItem);

    // Clear the input field
    todoInput.value = "";

    // Add event listener to mark the task as completed when clicked
    taskSpan.addEventListener("click", function(){
        taskSpan.classList.toggle("completed");
    })

    // Add event listener to delete the task when delete button is clicked
    deleteButton.addEventListener("click", function(){
        todoList.removeChild(listItem);
    })
})