let allTasks = [];

let incompleteTasks = document.getElementById('incompleteTasks');
let completedTasks = document.getElementById('completedTasks');

let inputTask = document.getElementById('taskInput');
let addTaskButton = document.getElementById('addTask');

inputTask.focus();

addTaskButton.addEventListener('click', addTask);

function addTask(e) {
  e.preventDefault();

  let parentElement = this.parentElement;

  let selectMonth = parentElement.querySelector('[name="month"]');
  let selectDay = parentElement.querySelector('[name="day"]');
  let selectYear = parentElement.querySelector('[name="year"]');
}