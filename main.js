let allTasks = [];
let nextId = 1;

let addTaskForm = document.getElementById('addTask');
let incompleteTasks = document.getElementById('incompleteTasks');
let completedTasks = document.getElementById('completedTasks');

let taskInput = document.getElementById('taskInput');
let monthSelect = document.querySelector('[name="months"]');
let daySelect = document.querySelector('[name="days"]');
let yearSelect = document.querySelector('[name="years"]');

taskInput.focus();

addTaskForm.addEventListener('submit', addTask);

function addTask(event) {
  event.preventDefault();

  let taskName = taskInput.value;
  let month = monthSelect[monthSelect.selectedIndex].value;
  let day = daySelect[daySelect.selectedIndex].value;
  let year = yearSelect[yearSelect.selectedIndex].value;

  if(taskInput.value == '') {
    alert('Please enter a name of your task. :)');
    return;
  }

  allTasks.push({
    'id': nextId,
    'name': taskName,
    'due_date': new Date(`${year}-${month}-${day}`),
    'is_completed': false,
  });

  taskInput.value = '';

  let taskIndex = allTasks.findIndex((task) => task.id == nextId);
  console.log(taskIndex);
  renderIncompleteTask(allTasks[taskIndex]);
  nextId++;
}

function formatDate(date) {
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return `${monthNames[monthIndex]} ${day}, ${year}`;
}

function renderIncompleteTask(task) {

  let newLi = document.createElement('li');
  newLi.setAttribute('data-id', task.id);

  newLi.innerHTML = incompleteTaskTemplate(task);
  incompleteTasks.appendChild(newLi);

  rebindButtons(newLi);

}

function incompleteTaskTemplate(task) {
  return `
    <h5>${task.name}</h5>

    <h5>${formatDate(task.due_date)}</h5>

    <div class="actions">
        <button type="submit" class="edit">Edit</button>
        <button type="submit" class="delete">Delete</button>
        <button type="submit" class="done">Done</button>
    </div>
  `;
}

function completedTaskTemplate(task) {
  return `
    <h5>${task.name}</h5>

    <h5>${formatDate(task.due_date)}</h5>

    <div class="actions">
        <button type="submit" class="edit">Edit</button>
        <button type="submit" class="delete">Delete</button>
        <button type="submit" class="undo">Undo</button>
    </div>
  `;
}

function rebindButtons(element) {
  let deleteButton = element.querySelector('.delete');
  let doneButton = element.querySelector('.done');
  let undoButton = element.querySelector('.undo');
  let editButton = element.querySelector('.edit');

  deleteButton.addEventListener('click', deleteTask);

  editButton.addEventListener('click', editTask);

  if(doneButton) {
    doneButton.addEventListener('click', doneTask);
  }

  if(undoButton) {
    undoButton.addEventListener('click', undoTask);
  }
}

/* deleting tasks */

function deleteTask() {
  let grandparentElement = this.parentElement.parentElement;
  let taskId = grandparentElement.getAttribute('data-id');
  let taskIndex = allTasks.findIndex((task) => task.id == taskId);

  allTasks.splice(taskIndex, 1);

  grandparentElement.remove();
}

/* done task */
function doneTask() {
  let grandparentElement = this.parentElement.parentElement;
  let taskId = grandparentElement.getAttribute('data-id');
  allTasks[taskId].is_completed = true;

  grandparentElement.remove();
  grandparentElement.innerHTML = completedTaskTemplate(allTasks[taskId]);

  completedTasks.appendChild(grandparentElement);

  rebindButtons(grandparentElement);
}

/* undo task */
function undoTask() {
  let grandparentElement = this.parentElement.parentElement;
  let taskId = grandparentElement.getAttribute('data-id');
  allTasks[taskId].is_completed = false;

  grandparentElement.remove();
  grandparentElement.innerHTML = incompleteTaskTemplate(allTasks[taskId]);

  incompleteTasks.appendChild(grandparentElement);

  rebindButtons(grandparentElement);
}


/* editing task */
function editTask() {
  let grandparentElement = this.parentElement.parentElement;
  let taskId = grandparentElement.getAttribute('data-id');
  
  grandparentElement.innerHTML = `
    <form class="edit-form">
        <input type="text" value="${allTasks[taskId].name}" class="inputNewName"/>
        <button type="submit" class="save">Save</button>
    </form>
  `;

grandparentElement.querySelector('.inputNewName').focus();

let saveButton = grandparentElement.querySelector('.save');

saveButton.addEventListener('click', saveTask);

}

/* saving task's new name */
function saveTask(e) {
  e.preventDefault();
  
  let grandparentElement = this.parentElement.parentElement;
  let taskId = grandparentElement.getAttribute('data-id');
  let taskNewName = grandparentElement.querySelector('.inputNewName').value;
  let taskList = grandparentElement.parentElement;
  allTasks[taskId].name = taskNewName;

  if(taskList.id == 'incompleteTasks') {
    grandparentElement.innerHTML = incompleteTaskTemplate(allTasks[taskId]);
  } else if(taskList.id == 'completedTasks') {
    grandparentElement.innerHTML = completedTaskTemplate(allTasks[taskId]);
  }

  rebindButtons(grandparentElement);
}

/* testing for sort */
function addTestData(name, date, isCompleted) {
  allTasks.push({
    id: nextId,
    name: name,
    due_date: date,
    is_completed: isCompleted,
  });

  let taskIndex = allTasks.findIndex((task) => task.id == nextId);
  renderTestData(allTasks[taskIndex]);
  nextId++;
}

function renderTestData(task) {

  let newLi = document.createElement('li');
  newLi.setAttribute('data-id', task.id);

  if(task.is_completed) {
    newLi.innerHTML = completedTaskTemplate(task);
    completedTasks.appendChild(newLi);
  } else {
    newLi.innerHTML = incompleteTaskTemplate(task);
    incompleteTasks.appendChild(newLi);
  }

  rebindButtons(newLi);

}

addTestData('A', new Date('2019-03-28'), false);
addTestData('B', new Date('2018-04-03'), false);
addTestData('C', new Date('2018-04-05'), false);
addTestData('D', new Date('2018-06-13'), false);
addTestData('E', new Date('2018-12-03'), false);


/* sorting tasks */
let incAscButton = document.querySelector('.js-incomplete-asc');
let incDescButton = document.querySelector('.js-incomplete-desc');
let compAscButton = document.querySelector('.js-complete-asc');
let compDescButton = document.querySelector('.js-complete-desc');

incAscButton.addEventListener('click', sortIncomplete);
incDescButton.addEventListener('click', sortIncomplete);
compAscButton.addEventListener('click', sortCompleted);
compDescButton.addEventListener('click', sortCompleted);

function sortIncomplete() {
  let sortType = this.getAttribute('data-sort-type');
  let incomplete = allTasks.filter((task) => !task.is_completed);

  if(sortType == 'ascending') {
    incomplete.sort((currentTask, nextTask) => currentTask.due_date > nextTask.due_date);
  } else if(sortType == 'descending') {
    incomplete.sort((currentTask, nextTask) => currentTask.due_date < nextTask.due_date);
  }

  let sorted = [];

  incomplete.forEach((task) => {
    sorted.push(incompleteTasks.querySelector(`[data-id="${task.id}"]`));
  });

  incompleteTasks.innerHTML = '';

  sorted.forEach((element) => {
    incompleteTasks.appendChild(element);
  }); 

}

function sortCompleted() {
  let sortType = this.getAttribute('data-sort-type');
  let completed = allTasks.filter((task) => task.is_completed);

  if(sortType == "ascending") {
    completed.sort((currentTask, nextTask) => currentTask.due_date > nextTask.due_date);
  } else if(sortType == "descending") {
    completed.sort((currentTask, nextTask) => currentTask.due_date < nextTask.due_date);
  }

  let sorted = [];

  completed.forEach((task) => {
    sorted.push(completedTasks.querySelector(`[data-id="${task.id}"]`));
  });
 
  completedTasks.innerHTML = '';

  sorted.forEach((element) => {
    completedTasks.appendChild(element);
  });

}
