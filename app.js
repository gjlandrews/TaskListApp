//Selectors
const taskInput = document.querySelector('.task-input');
const taskButton = document.querySelector('.task-button');
const taskList = document.querySelector('.task-list');
const filterOption = document.querySelector('.filter-tasks');
//Event Listeners
document.addEventListener('DOMContentLoaded', getTasks);
taskButton.addEventListener('click', addTask);
taskList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTasks);

//Functions

function addTask(event){
    //Prevent form from submitting
    event.preventDefault();
    console.log('hello');
    //Task Div
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");
    //Create LI
    const newTask = document.createElement('li');
    newTask.innerText = taskInput.value;
    newTask.classList.add('task-item');
    taskDiv.appendChild(newTask);
    //ADD Task to Local Storage
    saveLocalTodos(taskInput.value);
    //Check Mark Button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    taskDiv.appendChild(completedButton);
    //Delete Button
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add("trash-btn");
    taskDiv.appendChild(deleteButton);
    //APPEND TO LIST
    taskList.appendChild(taskDiv);
    //Clear task input text
    taskInput.value = "";
}

function deleteCheck(event){
    console.log(event.target);
    const item = event.target;
    //DELETE TASK
    if(item.classList[0] === "trash-btn"){
        const task = item.parentElement;
        //Animate delete
        task.classList.add("fall");
        removeLocalTasks(task);
        task.addEventListener('transitionend', function(){
            task.remove();
        });
    }

    //Check mark
    if(item.classList[0] === "complete-btn") {
        const task = item.parentElement;
        task.classList.toggle("completed");
    }
}

function filterTasks(event){
    const tasks = taskList.childNodes;
    // console.log(tasks);
    tasks.forEach(function(task){
        switch(event.target.value){
            case "all":
                task.style.display = 'flex';
                break;
            case "completed":
                if(task.classList.contains('completed')){
                    task.style.display = 'flex';
                }
                else{
                    task.style.display = 'none';
                }
                break;
            case "not-completed":
                if(!task.classList.contains('completed')){
                    task.style.display = 'flex';
                }
                else{
                    task.style.display = 'none';
                }
                break;

        }
    });
}

function saveLocalTodos(task){
    //Check for previous tasks
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasks(){
    let tasks;
    // Check for previous tasks
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.forEach(function(task){
        //Task Div
        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task");
        //Create LI
        const newTask = document.createElement('li');
        newTask.innerText = task;
        newTask.classList.add('task-item');
        taskDiv.appendChild(newTask);

        //Check Mark Button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        taskDiv.appendChild(completedButton);
        //Delete Button
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.classList.add("trash-btn");
        taskDiv.appendChild(deleteButton);
        //APPEND TO LIST
        taskList.appendChild(taskDiv);  
    });
}

function removeLocalTasks(task){
    let tasks;
    // Check for previous tasks
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    console.log(task);
    console.log(tasks);
    const taskIndex = task.children[0].innerText;
    tasks.splice(tasks.indexOf(taskIndex),1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}