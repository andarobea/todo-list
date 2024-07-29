
let todoList = JSON.parse(localStorage.getItem('todoList')) || [] ;
// array for tasks (it is actually an object)

function addToList() {
    const inputElement = document.querySelector('.js-task-name');
    const dateElement = document.querySelector('.js-task-date');
    const name = inputElement.value;    // get text input
    const date = dateElement.value;     // get date input
    if (name === '')                    // if there is no task written
        alert('Write task!');
    else {
        todoList.push({name, date});
        console.log(todoList);
        inputElement.value = '';
        dateElement.value = '';
        renderTodoList();
    }
}

function renderTodoList() {
    localStorage.setItem('todoList', JSON.stringify(todoList)); // save the list in localStorage to be seen after refresh
    let todoListHTML = '';
    for(let i = 0; i < todoList.length; i++) {  // generating the html for each task in the list
        const html = `
            <div><input type="checkbox" ${todoList[i].done ? 'checked' : ''} onclick="toggleTask(${i})"></div>
            <div>${todoList[i].name}</div>
            <div>${todoList[i].date}</div>
            <button onclick = "
                todoList.splice(${i}, 1);
                renderTodoList();
            " class="grid-item">Delete</button>
        `;
        todoListHTML += html;
    }
    // console.log(todoListHTML);
    document.querySelector('.js-list-html').innerHTML = 
        todoListHTML;   // add the generated html to the page
}

renderTodoList();   // initial call of function

function deleteList() {     // function to delete everything at once
    todoList = [];
    localStorage.setItem('todoList', JSON.stringify(todoList));
    renderTodoList();
}