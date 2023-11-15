function addTask() {
    const taskList = document.getElementById('taskList');

    // Create a new li element
    const newLi = document.createElement('li');

    // Set the innerHTML with the same structure as last li
    newLi.innerHTML = `
        <div class="input-group mb-3">
            <div class="input-group-text">
                <input class="form-check-input mt-0" type="checkbox" onclick="check()" value="" aria-label="Checkbox for following text input">
            </div>
            <input type="text" class="form-control" aria-label="Text input with checkbox" placeholder="New Task">
        </div>
    `;
    taskList.appendChild(newLi);
    // Get the input element within the new li
    const inputText = newLi.querySelector('.form-control');

    // Set focus on the input element
    inputText.focus();

}
function check() {
    let checkbox = document.querySelector(".form-check-input");
    const taskList = document.getElementById('taskList');
    if (checkbox.checked) {
        // delete the li in the taskList this checkbox was present in, 
        // Find the closest li element containing the checked checkbox
        let liToRemove = checkbox.closest('li');

        // Check if the checkbox is within an li element
        if (liToRemove) {
            // Remove the li element from the taskList
            taskList.removeChild(liToRemove);
        }
    }
}
