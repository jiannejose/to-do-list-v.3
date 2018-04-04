let allTasks = [];
let nextIndex = 0;

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

  allTasks.push({
    'id': nextIndex,
    'name': taskName,
    'due_date': new Date(`${year}-${month}-${day}`),
    'is_completed': false,
  });

  taskInput.value = '';

  renderIncompleteTask(allTasks[nextIndex]);
  nextIndex++;
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
  newLi.setAttribute('data-index', task.id);

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
  let taskIndex = grandparentElement.getAttribute('data-index');

  allTasks.pop(taskIndex);

  grandparentElement.remove();
}

/* done task */
function doneTask() {
  let grandparentElement = this.parentElement.parentElement;
  let taskIndex = grandparentElement.getAttribute('data-index');
  allTasks[taskIndex].is_completed = true;

  grandparentElement.remove();
  grandparentElement.innerHTML = completedTaskTemplate(allTasks[taskIndex]);

  completedTasks.appendChild(grandparentElement);

  rebindButtons(grandparentElement);
}

/* undo task */
function undoTask() {
  let grandparentElement = this.parentElement.parentElement;
  let taskIndex = grandparentElement.getAttribute('data-index');
  allTasks[taskIndex].is_completed = false;

  grandparentElement.remove();
  grandparentElement.innerHTML = incompleteTaskTemplate(allTasks[taskIndex]);

  incompleteTasks.appendChild(grandparentElement);

  rebindButtons(grandparentElement);
}


/* editing task */
function editTask() {
  let grandparentElement = this.parentElement.parentElement;
  let taskIndex = grandparentElement.getAttribute('data-index');
  
  grandparentElement.innerHTML = `
    <form class="edit-form">
        <input type="text" value="${allTasks[taskIndex].name}" class="inputNewName"/>
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
  let taskIndex = grandparentElement.getAttribute('data-index');
  let taskNewName = grandparentElement.querySelector('.inputNewName').value;
  let taskList = grandparentElement.parentElement;
  allTasks[taskIndex].name = taskNewName;

  console.log(taskNewName);
  if(taskList.id == 'incompleteTasks') {
    grandparentElement.innerHTML = incompleteTaskTemplate(allTasks[taskIndex]);
  } else if(taskList.id == 'completedTasks') {
    grandparentElement.innerHTML = completedTaskTemplate(allTasks[taskIndex]);
  }

  rebindButtons(grandparentElement);
}

/* testing for sort */
function addTestData(name, date, isCompleted) {
  allTasks.push({
    id: nextIndex,
    name: name,
    due_date: date,
    is_completed: isCompleted,
  });

  renderTestData(allTasks[nextIndex]);
  nextIndex++;
}

function renderTestData(task) {

  let newLi = document.createElement('li');
  newLi.setAttribute('data-index', task.id);

  if(task.is_completed) {
    newLi.innerHTML = completedTaskTemplate(task);
    completedTasks.appendChild(newLi);
  } else {
    newLi.innerHTML = incompleteTaskTemplate(task);
    incompleteTasks.appendChild(newLi);
  }

  rebindButtons(newLi);

}

addTestData('Test 4', new Date('2019-03-28'), true);
addTestData('Test 1', new Date('2018-04-05'), true);
addTestData('Honey', new Date('2018-04-03'), false);
addTestData('Test 3', new Date('2018-12-03'), true);
addTestData('Test 2', new Date('2018-06-13'), true);


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
    sorted.push(incompleteTasks.querySelector(`[data-index="${task.id}"]`));
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
    sorted.push(completedTasks.querySelector(`[data-index="${task.id}"]`));
  });
 
  completedTasks.innerHTML = '';

  sorted.forEach((element) => {
    completedTasks.appendChild(element);
  });

}







// let allTasks = [];
// let nextIndex = 0;

// let addTaskForm = document.getElementById('addTask');
// let incompleteTasks = document.querySelector('.js-incomplete-tasks');
// let completedTasks  = document.querySelector('.js-completed-tasks');

// let taskInput   = addTaskForm.querySelector('[name="task"]');
// let monthSelect = addTaskForm.querySelector('[name="month"]');
// let daySelect   = addTaskForm.querySelector('[name="day"]');
// let yearSelect  = addTaskForm.querySelector('[name="year"]');

// addTaskForm.addEventListener('submit', addTask);

// function addTask(event) {
//   event.preventDefault();
//   let task  = taskInput.value;
//   let month = monthSelect[monthSelect.selectedIndex].value;
//   let day   = daySelect[daySelect.selectedIndex].value;
//   let year  = yearSelect[yearSelect.selectedIndex].value;

//   allTasks.push({
//     'id': nextIndex,
//     'name': task,
//     'due_date': new Date(`${year}-${month}-${day}`),
//     'is_completed': false,
//   });

//   taskInput.value = '';

//   renderIncompleteTask(allTasks[nextIndex]);
//   nextIndex++;
// }

// function formatDate(date) {
//   var monthNames = [
//     "January", "February", "March",
//     "April", "May", "June", "July",
//     "August", "September", "October",
//     "November", "December"
//   ];

//   var day = date.getDate();
//   var monthIndex = date.getMonth();
//   var year = date.getFullYear();

//   return `${monthNames[monthIndex]} ${day}, ${year}`;
// }


// function renderIncompleteTask(task) {
//   let newEl = document.createElement('li');

//   newEl.classList.add('js-task-item');
//   newEl.setAttribute('data-index', task.id);

//   newEl.innerHTML = incompleteTemplate(task);
//   incompleteTasks.appendChild(newEl);

//   rebindButtons(newEl);
// }

// function incompleteTemplate(task) {
//   return `
//     <div>
//         <h4>${task.name}</h4>
//     </div>

//     <div>
//       ${formatDate(task.due_date)}
//     </div>

//     <div class="actions">
//         <button class="js-edit">Edit</button>
//         <button class="js-delete">Delete</button>
//         <button class="js-done">Done</button>
//     </div>
//   `;
// }

// function completeTemplate(task) {
//   return `
//     <div>
//         <h4>${task.name}</h4>
//     </div>

//     <div>
//       ${formatDate(task.due_date)}
//     </div>

//     <div class="actions">
//         <button class="js-edit">Edit</button>
//         <button class="js-delete">Delete</button>
//         <button class="js-undo">Undo</button>
//     </div>
//   `;
// }

// function rebindButtons(element) {
//   let deleteButton = element.querySelector('.js-delete');
//   let doneButton = element.querySelector('.js-done');
//   let undoButton = element.querySelector('.js-undo');
//   let editButton = element.querySelector('.js-edit');

//   deleteButton.addEventListener('click', deleteTask);

//   editButton.addEventListener('click', editTask);

//   if(doneButton) {
//     doneButton.addEventListener('click', doneTask);
//   }

//   if(undoButton) {
//     undoButton.addEventListener('click', undoTask);
//   }
// }

// function deleteTask() {
//   let grandParent = this.parentElement.parentElement;
//   let index = grandParent.getAttribute('data-index');

//   allTasks.pop(index);

//   grandParent.remove();
// }

// function doneTask() {
//   let grandParent = this.parentElement.parentElement;
//   let index = grandParent.getAttribute('data-index');
//   allTasks[index].is_completed = true;

//   grandParent.remove();
//   grandParent.innerHTML = completeTemplate(allTasks[index]);

//   completedTasks.appendChild(grandParent);

//   rebindButtons(grandParent);
// }

// function undoTask() {
//   let grandParent = this.parentElement.parentElement;
//   let index = grandParent.getAttribute('data-index');
//   allTasks[index].is_completed = false;

//   grandParent.remove();
//   grandParent.innerHTML = incompleteTemplate(allTasks[index]);

//   incompleteTasks.appendChild(grandParent);

//   rebindButtons(grandParent);
// }

// function editTask() {
//   let grandParent = this.parentElement.parentElement;
//   let index = grandParent.getAttribute('data-index');

//   grandParent.innerHTML = `
//     <div>
//         <input type="text" value="${allTasks[index].name}" placeholder="Task...">
//     </div>

//     <div class="actions">
//         <button class="js-save">Save</button>
//     </div>
//   `;

//   let saveButton = grandParent.querySelector('.js-save');

//   saveButton.addEventListener('click', updateTask);
// }

// function updateTask() {
//   let grandParent = this.parentElement.parentElement;
//   let taskList  = grandParent.parentElement;
//   let inputTask = grandParent.querySelector('input[type="text"]').value;
//   let index = grandParent.getAttribute('data-index');

//   allTasks[index].name = inputTask;

//   if(taskList.classList.contains('js-incomplete-tasks')) {
//     grandParent.innerHTML = incompleteTemplate(allTasks[index]);
//   } else if(taskList.classList.contains('js-completed-tasks')){
//     grandParent.innerHTML = completeTemplate(allTasks[index]);
//   }

//   rebindButtons(grandParent);
// }

// function sortIncomplete(type = 'desc') {
//   let incomplete = allTasks.filter((task) => !task.is_completed);

//    if (type == 'asc') {
//     incomplete.sort((currentTask, nextTask) => currentTask.due_date > nextTask.due_date);
//   } else {
//     incomplete.sort((currentTask, nextTask) => currentTask.due_date < nextTask.due_date);
//   }

//   let sorted = [];

//   incomplete.forEach((task) => {
//     sorted.push(incompleteTasks.querySelector(`[data-index="${task.id}"]`));
//   });

//   console.log(sorted);
//   incompleteTasks.innerHTML = '';

//   sorted.forEach((element) => {
//     incompleteTasks.appendChild(element);
//   });
// }

// function sortCompleted(type = 'desc') {
//   let completed = allTasks.filter(task => task.is_completed);

//   if (type == 'asc') {
//     completed.sort((currentTask, nextTask) => currentTask.due_date > nextTask.due_date);
//   } else {
//     completed.sort((currentTask, nextTask) => currentTask.due_date < nextTask.due_date);
//   }

//   let sorted = [];

//   completed.forEach(task => {
//     sorted.push(completedTasks.querySelector(`[data-index="${task.id}"]`));
//   });

//   completedTasks.innerHTML = '';

//   sorted.forEach(element => {
//     completedTasks.appendChild(element);
//   });
// }
