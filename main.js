'use strict';

// Get the necessary elements from the HTML
const newTaskForm = document.querySelector('#new-task-form');
const newTaskInput = document.querySelector('#new-task-input');
const tasksList = document.querySelector('#tasks');

// Load saved tasks from localStorage
let savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Add saved tasks to the task list
for (let i = 0; i < savedTasks.length; i++) {
  const taskElement = createTaskElement(savedTasks[i]);
  tasksList.appendChild(taskElement);
}

// Add an event listener to the form for submitting new tasks
newTaskForm.addEventListener('submit', function (event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the value of the new task input field
  const newTaskText = newTaskInput.value.trim();

  // If the input is empty, do nothing
  if (!newTaskText) {
    return;
  }

  // Create a new task element and add it to the list
  const newTaskElement = createTaskElement(newTaskText);
  tasksList.appendChild(newTaskElement);

  // Add the new task to saved tasks in localStorage
  savedTasks.push(newTaskText);
  localStorage.setItem('tasks', JSON.stringify(savedTasks));

  // Clear the input field and focus on it
  newTaskInput.value = '';
  newTaskInput.focus();
});

// Function to create a new task element
function createTaskElement(text) {
  // Create the necessary HTML elements for the task
  const taskElement = document.createElement('div');
  taskElement.classList.add('task');

  const contentElement = document.createElement('div');
  contentElement.classList.add('content');

  const inputElement = document.createElement('input');
  inputElement.type = 'text';
  inputElement.classList.add('text');
  inputElement.value = text;
  inputElement.readOnly = true;

  const actionsElement = document.createElement('div');
  actionsElement.classList.add('actions');

  const editButtonElement = document.createElement('button');
  editButtonElement.classList.add('edit');
  editButtonElement.textContent = 'Edit';

  const deleteButtonElement = document.createElement('button');
  deleteButtonElement.classList.add('delete');
  deleteButtonElement.textContent = 'Delete';

  // Add event listeners for editing and deleting tasks
  editButtonElement.addEventListener('click', function () {
    inputElement.readOnly = false;
    inputElement.select();
  });

  deleteButtonElement.addEventListener('click', function () {
    if (confirm('Are you sure you want to delete this task?')) {
      taskElement.remove();

      // Remove the deleted task from saved tasks in localStorage
      savedTasks.splice(savedTasks.indexOf(text), 1);
      localStorage.setItem('tasks', JSON.stringify(savedTasks));
    }
  });

  // Add the HTML elements to the task element
  contentElement.appendChild(inputElement);
  taskElement.appendChild(contentElement);

  actionsElement.appendChild(editButtonElement);
  actionsElement.appendChild(deleteButtonElement);
  taskElement.appendChild(actionsElement);

  // Return the task element
  return taskElement;
}