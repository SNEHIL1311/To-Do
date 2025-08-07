const input = document.getElementById('input');
const addButton = document.getElementById('add-task');  
const taskList = document.getElementById('task-list');

// Load tasks from Local Storage on page load
window.addEventListener('load', function () {
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  savedTasks.forEach(task => addTaskToDOM(task.text, task.completed));
});

addButton.addEventListener('click', function () {
  const taskText = input.value.trim();
  if (taskText) {
    addTaskToDOM(taskText, false);
    saveTaskToLocal(taskText, false);
    input.value = '';
  } else {
    alert('Please enter a task.');
  }
});

function addTaskToDOM(taskText, isCompleted) {
  const listItem = document.createElement('li');

  const textDiv = document.createElement('div');
  textDiv.textContent = taskText;
  textDiv.classList.add('task-text');
  if (isCompleted) textDiv.classList.add('completed');

  const completeButton = document.createElement('button');
  completeButton.innerHTML = '✔️';
  completeButton.classList.add('complete-btn');
  completeButton.disabled = isCompleted;
  completeButton.style.cursor = isCompleted ? 'not-allowed' : 'pointer';
  completeButton.addEventListener('click', function () {
    textDiv.classList.add('completed');
    completeButton.disabled = true;
    completeButton.style.cursor = 'not-allowed';
    updateTaskStatus(taskText, true);
  });

  const deleteButton = document.createElement('button');
  deleteButton.innerHTML = '✖️';
  deleteButton.classList.add('delete-btn');
  deleteButton.addEventListener('click', function () {
    taskList.removeChild(listItem);
    deleteTaskFromLocal(taskText);
  });

  const actions = document.createElement('div');
  actions.classList.add('action-buttons');
  actions.appendChild(completeButton);
  actions.appendChild(deleteButton);

  listItem.appendChild(textDiv);
  listItem.appendChild(actions);
  taskList.appendChild(listItem);
}

// Save task to localStorage
function saveTaskToLocal(text, completed) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push({ text, completed });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Delete task from localStorage
function deleteTaskFromLocal(taskText) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks = tasks.filter(task => task.text !== taskText);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Update completion status in localStorage
function updateTaskStatus(taskText, completed) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks = tasks.map(task =>
    task.text === taskText ? { ...task, completed } : task
  );
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
