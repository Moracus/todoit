document.addEventListener('DOMContentLoaded', () => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    displayTasks(savedTasks)

})
const taskContainer = document.querySelector(".task-container");
taskContainer.addEventListener('keyup',(e)=>{
    if(e.key==="Enter"&& e.target.classList.contains('task-box')){
        addTask();
    }
})
function addTask() {
    let noTasks = document.querySelector(".noTasks")
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.querySelector('#taskList');//ul
    noTasks.style.display = 'none';
    const newLi = document.createElement('li');
    newLi.innerHTML = `<div class="input-group mb-3">
        <div class="input-group-text">
            <input class="form-check-input mt-0" type="checkbox" value=""
                aria-label="Checkbox for following text input">
        </div>
        <input type="text" class="form-control task-box" aria-label="Text input with checkbox"
            placeholder="New Task">
        </div>`
        // Get the input element within the new li

    // Set focus on the input element

    taskList.appendChild(newLi)
    const taskBox = newLi.querySelector('.task-box');
    taskBox.focus();


    const inputTextList = document.querySelectorAll('.task-box')
    let requiredIndex = inputTextList.length - 2;
    if(inputTextList[requiredIndex]){
        let toPush = inputTextList[requiredIndex].value;
        if(tasks[tasks.length-1]!==toPush)
        tasks.push(toPush);

    }
    // save the updated array to localstorage
    localStorage.setItem('tasks', JSON.stringify(tasks));

}

// deletion

taskContainer.addEventListener('change', (e) => {
    const checkbox = e.target;
    taskList = document.querySelector('#taskList');
    // console.log(checkbox);
    if (checkbox.classList.contains('form-check-input') && checkbox.checked) {
        // Find the closest li element containing the checked checkbox
        let liToRemove = checkbox.closest('li');
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        // Check if the checkbox is within an li element
        if (liToRemove) {
            // Remove the li element from the taskList
            tasks = tasks.filter((task) => {
                return task !== liToRemove.querySelector('.task-box').value.trim();
            })
            console.log(tasks)
            // save the updated task array
            
            taskList.removeChild(liToRemove);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }
})
function displayTasks(tasks) {
    let noTasks = document.querySelector(".noTasks")
    const taskList = document.querySelector('#taskList');
    tasks.forEach(task => {
        const li = document.createElement('li');
        // console.log(task);
        li.innerHTML = `
        <div class="input-group mb-3">
            <div class="input-group-text">
                <input class="form-check-input mt-0" type="checkbox"  value="" aria-label="Checkbox for following text input">
            </div>
            <input type="text" class="form-control task-box" aria-label="Text input with checkbox" placeholder="New Task"
            value = "${task}">
        </div>
    `;

        taskList.appendChild(li);
    });
    if(tasks.length===0){
        noTasks.style.display = 'block';
    }
    else{
        noTasks.style.display = 'none';
    }
}
let toText = document.querySelector("#to")
let itText = document.querySelector("#it");
itText.addEventListener("mouseover",()=>{
    itText.style.opacity = '1'
    toText.style.opacity = '0.28'
});
toText.addEventListener("mouseover",()=>{
    toText.style.opacity = '1'
    itText.style.opacity = '0.28'
    itText.style.transition = '0.3s'
});
