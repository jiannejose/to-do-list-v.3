let allTasks = [];

let incompleteTasks = document.getElementById('incompleteTasks');
let completedTasks = document.getElementById('completedTasks');

let submitForm = document.getElementById('addTask');
let inputTask = document.getElementById('taskInput');
let monthSelect = document.querySelector('[name="months"]');
let daySelect = document.querySelector('[name="day"]');
let yearSelect = document.querySelector('[name="year"]');

inputTask.focus();

submitForm.addEventListener('submit', addTask);

function addTask(e) {
  e.preventDefault();
  
  let taskName = inputTask.value;
  let month = monthSelect[monthSelect.selectedIndex].value;
  let day = daySelect[daySelect.selectedIndex].value;
  let year = yearSelect[yearSelect.selectedIndex].value;

  let index = allTasks.length;

  allTasks.push({
    'id': index,
    'name': taskName,
    'due_date': new Date(`${year}-${month}-${day}`),
    'is_completed': false,
  });

  inputTask.value = '';
  incompleteTasksTemplate(allTasks[index]);

  rebindButtons();
}

function formatDate(date) {
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  let day = date.getDate();
  let monthIndex = date.getMonth();
  let year = date.getFullYear();

  return `${monthNames[monthIndex]}, ${day}, ${year}`;
}

function incompleteTasksTemplate(task) {

  incompleteTasks.innerHTML += `
    <li>
        <h5>${task.name}</h5>

        <h5>${formatDate(task.due_date)}</h5>

        <div class="actions">
            <button type="submit" class="edit">Edit</button>
            <button type="submit" class="delete">Delete</button>
            <button type="submit" class="done">Done</button>
        </div>
    </li>
  `;
}

function rebindButtons() {
  deletingTask();
}

function deletingTask() {
  let grandparentElement = this.parentElement.parentElement;

  console.log(grandparentElement);
}

// function rebindButtons(element) {
//   let deleteButton = element.querySelector('.delete');

//   deleteButton.addEventListener('click', deleteTask);
// }

// function deleteTask() {
//   let grandParent = this.parentElement.parentElement;
//   let index = grandParent.getAttribute('data-index');

//   console.log(grandParent);
//   allTasks.pop(index);

//   grandParent.remove();
// }

//function renderIncompleteTask(task) {
//   let newElement = document.createElement('li');

//   newElement.classList.add('js-task-item');
//   newElement.setAttribute('data-index', task.id);

//   newElement.innerHTML = incompleteTasksTemplate(task);
//   incompleteTasks.appendChild(newElement);
// }


