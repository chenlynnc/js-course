let todoList = [{
    name: 'make dinner',
    dueDate: '2025-04-16'
}, {
    name: 'wash dishes',
    dueDate: '2025-07-14'
}];

displayList();

document.querySelector('.js-add-button').addEventListener('click', () => {
    addTodo();
    displayList();
});

function addTodo() {
    const inputElement = document.querySelector(`.js-name-input`);
    const dateInputElement = document.querySelector(`.js-date-input`);
    const name = inputElement.value;
    const dueDate = dateInputElement.value;
    
    todoList.push({
        // name: name, 
        // dueDate: dueDate
        name,   // shorthand as long as variable names are same
        dueDate
    });

    inputElement.value = ''; // Reset text box text
}

function displayList() {
    let listHTML = '';
    // const [firstObject, secondObject] = todoList   // fast way of saving index to variables
    todoList.forEach((item, index) => {
        const { name, dueDate } = item;   // shortcut called 'destructuring'
        // const date = todoList[i].dueDate;
        listHTML += `
        <div>${name}</div>
        <div>${dueDate}</div>
        <button class="delete-button js-delete-button">Delete</button>`;
    });
    /*
    for (let i = 0; i < todoList.length; i++) {
        ...
    }
    */
    document.querySelector('.js-list-display').innerHTML = listHTML;
    // querySelectorAll is an array
    document.querySelectorAll('.js-delete-button').forEach((delButton, index) => {
        delButton.addEventListener('click', () => {
            todoList.splice(index, 1);
            displayList();
        });
    });

}