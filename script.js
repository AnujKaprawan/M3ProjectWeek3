// Function to add an item to the todo list
function addItem() {
  var itemName = document.getElementById('itemName').value;
  var itemDate = formatDate(document.getElementById('itemDate').value);
  var priority = document.getElementById('priority').value;
  var todoList = JSON.parse(localStorage.getItem('todoList')) || [];
  var newItem = {name: itemName, date: itemDate, priority: priority, completed: false};
  todoList.push(newItem);
  localStorage.setItem('todoList', JSON.stringify(todoList));
  displayTasks();
}

// Function to display tasks
function displayTasks() {
  var todayTasks = document.getElementById('todayTasks');
  var futureTasks = document.getElementById('futureTasks');
  var completedTasks = document.getElementById('completedTasks');
  todayTasks.innerHTML = '';
  futureTasks.innerHTML = '';
  completedTasks.innerHTML = '';

  var todoList = JSON.parse(localStorage.getItem('todoList')) || [];
  var today = formatDate(new Date());

  todoList.forEach(function(task) {
    var taskHTML = '<div class="task-item';

    // Check if the task is completed
    if (task.completed) {
      taskHTML += ' completed';
    }

    // Check if the task date has passed
    var taskDate = new Date(task.date);
    var currentDate = new Date();
    if (!task.completed && taskDate < currentDate) {
      taskHTML += ' past-deadline';
    }

    var priority = task.priority.charAt(0).toUpperCase() + task.priority.slice(1);

    taskHTML += '">' +
                    '<span>Name: ' + task.name + '</span>' +
                    '<span> ' + task.date + '</span>' +
                    '<span>Priority: ' + priority + '</span>' +
                    '<span class="icons">' +
                      '<svg class="check-icon" onclick="toggleCompletion(this)" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18457 2.99721 7.13633 4.39828 5.49707C5.79935 3.85782 7.69279 2.71538 9.79619 2.24015C11.8996 1.76491 14.1003 1.98234 16.07 2.86" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> <path d="M22 4L12 14.01L9 11.01" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> </svg>' +
                      '<svg class="trash-icon" onclick="deleteTask(this)" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M3 6H5H21" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> <path d="M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> </svg>' +
                    '</span>' +
                  '</div>';

    if (task.completed) {
      completedTasks.innerHTML += taskHTML;
    } else if (task.date === today) {
      todayTasks.innerHTML += taskHTML;
    } else {
      futureTasks.innerHTML += taskHTML;
    }
  });
}

// Function to toggle completion of a task
function toggleCompletion(icon) {
  var taskItem = icon.parentElement.parentElement; // Adjusted parent element
  var taskIndex = Array.from(taskItem.parentElement.children).indexOf(taskItem);
  var todoList = JSON.parse(localStorage.getItem('todoList')) || [];
  todoList[taskIndex].completed = !todoList[taskIndex].completed;
  localStorage.setItem('todoList', JSON.stringify(todoList));
  displayTasks();
}

// Function to delete a task
function deleteTask(icon) {
  var taskItem = icon.parentElement.parentElement; // Adjusted parent element
  var taskIndex = Array.from(taskItem.parentElement.children).indexOf(taskItem);
  var todoList = JSON.parse(localStorage.getItem('todoList')) || [];
  todoList.splice(taskIndex, 1);
  localStorage.setItem('todoList', JSON.stringify(todoList));
  displayTasks();
}

// Function to format date as yyyy/mm/dd
function formatDate(dateString) {
  var date = new Date(dateString);
  var year = date.getFullYear();
  var month = pad(date.getMonth() + 1);
  var day = pad(date.getDate());
  return year + '/' + month + '/' + day;
}

// Function to pad single digits with leading zero
function pad(number) {
  return (number < 10) ? '0' + number : number;
}

// Initial display of tasks
displayTasks();
