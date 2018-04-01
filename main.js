let allTasks = [];
let nextIndex = 0;

let addTaskForm = document.getElementById('addTask');
let incompleteTasks = document.getElementById('incompleteTasks');
let completedTasks = document.getElementById('completedTasks');

let taskInput = document.getElementById('taskInput');
let monthSelect = document.querySelector('[name="months"]');
let daySelect = document.querySelector('[name="days"]');
let yearSelect = document.querySelector('[name="years"]');

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

  incompleteTasks.innerHTML += `
    <li>
        <h5>${taskName}</h5>

        <h5>${formatDate(allTasks[nextIndex].due_date)}</h5>

        <div class="actions">
            <button type="submit" class="edit">Edit</button>
            <button type="submit" class="delete">Delete</button>
            <button type="submit" class="undo">Undo</button>
        </div>
    </li>
  `;

  taskInput.value = '';
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
//   let incomplete = allTasks.filter(task => !task.is_completed);

//   if (type == 'asc') {
//     incomplete.sort((currentTask, nextTask) => currentTask.due_date > nextTask.due_date);
//   } else {
//     incomplete.sort((currentTask, nextTask) => currentTask.due_date < nextTask.due_date);
//   }

//   let sorted = [];

//   incomplete.forEach(task => {
//     sorted.push(incompleteTasks.querySelector(`[data-index="${task.id}"]`));
//   });

//   incompleteTasks.innerHTML = '';

//   sorted.forEach(element => {
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
