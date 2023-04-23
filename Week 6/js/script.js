
let addbutton = document.getElementById('add-task');
let newTaskInput = document.getElementById('task-input');
let todoListContainer = document.getElementById('todo-list');
let templateElement = document.getElementById('list-item-template');
let template = templateElement.innerHTML;



function onAddTaskClicked(event){

    let taskName = newTaskInput.value;
    newTaskInput.value = "";

    if(taskName !=""){
        let taskHTML = template.replace("<!-- TASK_NAME -->", taskName);
        
        todoListContainer.insertAdjacentHTML('afterbegin',taskHTML);
        saveTask(taskName, false);
    }
}

function onTodoListContainerClicked(event){

    let targetElement = event.target;
    while(!targetElement.classList.contains("task")){
        targetElement = targetElement.parentElement;
    }

    let checkbox = targetElement.querySelector(".checkbox");
    if (checkbox.checked){
        targetElement.classList.add("completed")
    } else {
        targetElement.classList.remove("completed")
    }

    let taskNameElement = targetElement.querySelector(".task-name")
    let taskName = taskNameElement.innerText;
    saveTask(taskName, checkbox.checked);
}

let showActiveButton = document.getElementById("show-active")
function showActiveTasks(e){
    let tasks = document.getElementsByClassName("task");
    
    for (let i=0; i<tasks.length; i++){
        if (tasks[i].classList.contains("completed")){
            tasks[i].style.display = "none";
        }
        else{
            tasks[i].style.display = "block";
        }
    }
}

let showCompletedButton = document.getElementById("show-completed")
function showCompletedTasks(e){
    let tasks = document.getElementsByClassName("task");
    
    for (let i=0; i<tasks.length; i++){
        if (tasks[i].classList.contains("completed")){
            tasks[i].style.display = "block";
        }
        else{
            tasks[i].style.display = "none";
        }
    }
}

let showAllButton = document.getElementById("show-all")
function showAllTasks(e){
    let tasks = document.getElementsByClassName("task");
    
    for (let i=0; i<tasks.length; i++){
        if (tasks[i].classList.contains("completed")){
            tasks[i].style.display = "block";
        }
        else{
            tasks[i].style.display = "block";
        }
    }
}

function saveTask(name, isCompleted){
    localStorage.setItem(name, isCompleted)
}

function renderTasks(){
    for(let i=0; i<localStorage.length; i++){
        let taskName = localStorage.key(i);
        let isCompleted = localStorage.getItem(taskName) == "true";
        let taskHTML = template.replace("<!-- TASK_NAME -->", taskName);

        if (!isCompleted){
            todoListContainer.insertAdjacentHTML('afterbegin',taskHTML);
        }
    }
}



addbutton.addEventListener('click', onAddTaskClicked);
todoListContainer.addEventListener('click', onTodoListContainerClicked);

showActiveButton.addEventListener('click', showActiveTasks);
showCompletedButton.addEventListener('click', showCompletedTasks);
showAllButton.addEventListener('click',showAllTasks);

renderTasks();