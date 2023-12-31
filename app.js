
const deleteBtn = document.querySelector(".delete");
const taskContainer = document.querySelector(".task-container");
const addTaskBtn = document.querySelector(".add-task")
document.addEventListener('DOMContentLoaded', () => {
    hideElement(deleteBtn);
    hideElement(addTaskBtn);
    const savedLists = Object.keys(localStorage);
    displayLists(savedLists);

})

deleteBtn.addEventListener('click', deleteList)

taskContainer.addEventListener('keyup', (e) => {
    if (e.key === "Enter" && e.target.classList.contains('task-box')) {
        addTask();
    }
})
const listDropdown = document.querySelector("#listDropdown")
listDropdown.addEventListener('change', listChange);
function listChange() {
    // console.log("heloooooo")
    const selectedValue = listDropdown.value;
    if (selectedValue === 'add') {
        hideElement(deleteBtn);
        const newListName = prompt("Enter the name of this list: ");
        if (newListName) {
            const newListOption = document.createElement('option');
            newListOption.value = newListName;
            newListOption.text = newListName;
            newListOption.classList.add("super-list")
            // push the option at current index below and replace
            // it with new option
            listDropdown.add(newListOption, listDropdown.options[1]);
            listDropdown.value = newListName;
            updateLocalStorage(newListName)//make a new key in local storage
            // passed null cuz we don't wan't any tasks assigned at first

            // clear taskList-reset
            const taskList = taskContainer.querySelector('#taskList');
            taskList.innerHTML = ""
            showElement(deleteBtn);
            showElement(addTaskBtn);


        }
    }
    else {
        showElement(deleteBtn);
        showElement(addTaskBtn);
        let savedTasks = JSON.parse(localStorage.getItem(selectedValue)) || [];
        displayTasks(savedTasks);
    }

}

function hideElement(element) {
    element.style.display = 'none';
}
function showElement(element) {
    element.style.display = 'block';
}
function noOfLists() {
    return listDropdown.options.length - 2
}

function newListItem(value = "") {
    const newLi = document.createElement('li');
    newLi.innerHTML = `<div class="input-group mb-3 list-item">
    <div class="input-group-text">
        <input class="form-check-input mt-0" type="checkbox" value=""
            aria-label="Checkbox for following text input">
    </div>
    <input type="text" class="form-control task-box" aria-label="Text input with checkbox"
        placeholder="New Task">
    <span class ="grip-vertical" ><img src = "icons/grip-vertical.svg" alt = "grip-vertical"/></span>
    </div>`
    newLi.draggable = true
    newLi.classList.add("item")
    return newLi;

}
function addTask() {
    let selectedList = listDropdown.value;
    let tasks = JSON.parse(localStorage.getItem(selectedList)) || [];

    let noTasks = document.querySelector(".noTasks")

    const taskList = document.querySelector('#taskList');//ul
    noTasks.style.display = 'none';
    let newLi = newListItem();


    // Get the input element within the new li

    // Set focus on the input element

    taskList.appendChild(newLi)
    const taskBox = newLi.querySelector('.task-box');
    taskBox.focus();
    // drag and reorder
    dragOrder();

    // updating local storage
    if (selectedList != 'add') {
        const inputTextList = document.querySelectorAll('.task-box')
        let requiredIndex = inputTextList.length - 2;
        if (inputTextList[requiredIndex]) {
            let toPush = inputTextList[requiredIndex].value;
            if (tasks[tasks.length - 1] !== toPush)
                tasks.push(toPush);

        }

        // save the updated array to localstorage
        localStorage.setItem(selectedList, JSON.stringify(tasks));
    }

}

// deletion

taskContainer.addEventListener('change', (e) => {
    const checkbox = e.target;
    taskList = document.querySelector('#taskList');
    const selectedList = listDropdown.value;
    // console.log(checkbox);
    if (checkbox.classList.contains('form-check-input') && checkbox.checked) {
        // Find the closest li element containing the checked checkbox
        let liToRemove = checkbox.closest('li');
        let tasks = JSON.parse(localStorage.getItem(selectedList)) || [];
        // Check if the checkbox is within an li element
        if (liToRemove) {
            // Remove the li element from the taskList
            tasks = tasks.filter((task) => {
                return task !== liToRemove.querySelector('.task-box').value.trim();
            })
            // console.log(tasks)
            // save the updated task array

            taskList.removeChild(liToRemove);
            localStorage.setItem(selectedList, JSON.stringify(tasks));
        }
    }
})

function displayLists(lists) {
    lists.forEach((list) => {
        const option = document.createElement('option');
        option.value = list;
        option.text = list;
        listDropdown.add(option, listDropdown.options[1])

    })
}

function displayTasks(tasks) {
    let noTasks = document.querySelector(".noTasks")
    const taskList = document.querySelector('#taskList');//ul
    taskList.innerHTML = "";//for switching between lists
    tasks.forEach(task => {
        const li = newListItem(); // returns new li element
        li.querySelector('.task-box').value = task;
        taskList.appendChild(li);
        li.draggable = true
        li.classList.add("item")
        dragOrder();

    });
    if (tasks.length === 0) {
        noTasks.style.display = 'block';
    }
    else {
        noTasks.style.display = 'none';
    }
}


function deleteList() {
    if (confirm("This will delete the selected list,\nand all its tasks")) {
        // console.log(listDropdown.value);
        delete localStorage[listDropdown.value];
        listDropdown.remove(listDropdown.selectedIndex);
        document.querySelector('#taskList').innerHTML = "";
        console.log(noOfLists())
    }

    if(listDropdown.value=='add'){
        listDropdown.value=''
        hideElement(deleteBtn);
        hideElement(addTaskBtn);
    }
}

// hover 
let toText = document.querySelector("#to")
let itText = document.querySelector("#it");
itText.addEventListener("mouseover", () => {
    itText.style.opacity = '1'
    toText.style.opacity = '0.28'
});
toText.addEventListener("mouseover", () => {
    toText.style.opacity = '1'
    itText.style.opacity = '0.28'
    itText.style.transition = '0.3s'
});
function dragOrder() {
    // drag and reorder
    let savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.querySelector('#taskList')
    const items = taskList.querySelectorAll(".item");
    items.forEach((item) => {
        item.addEventListener('dragstart', () => {
            //Adding dragging class to item after a delay
            setTimeout(() => item.classList.add("dragging"), 0);
        })
        item.addEventListener('dragend', () => {
            item.classList.remove('dragging');

        })

    });
    const intisortableList = (e) => {
        let selectedList = listDropdown.value;
        const draggingItem = taskList.querySelector(".dragging");//getting the current dragging element
        e.preventDefault()
        //siblings will be an array containing all the elements with the-
        // class item within taskList, excluding those with the class dragging. 
        const siblings = [...taskList.querySelectorAll(".item:not(.dragging)")];
        // finding the sibling after which the dragging item should be placed
        let nextSibling = siblings.find(sibling => {
            return e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
        })
        taskList.insertBefore(draggingItem, nextSibling);
        // update the saved array
        updateLocalStorage(selectedList, ".task-box");


    }
    taskList.addEventListener("dragover", intisortableList);
    taskList.addEventListener("dragenter", (e) => e.preventDefault());

}
function updateLocalStorage(key, value = "") {
    // localStorage.clear();
    let savedTasks = JSON.parse(localStorage.getItem(key)) || [];
    let updatedTasks = []
    if (value !== "") {
        updatedTasks = [...document.querySelectorAll(value)];
    }
    for (let i = 0; i < updatedTasks.length; i++) {
        savedTasks[i] = updatedTasks[i].value;
    }
    localStorage.setItem(key, JSON.stringify(savedTasks));

}