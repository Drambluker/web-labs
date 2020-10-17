const updateList = () => {
    ajaxRequest('GET', urls[select.value])
        .then((response) => {
            list.innerHTML = '';
            const todos = JSON.parse(response);
            todos.map(todo => addNewElement(todo.title, todo.completed));
        })
}

const addNewElementFromInput = () => {
    const inputValue = document.getElementById('todoInput').value;
    addNewElement(inputValue, false);
    document.getElementById('todoInput').value = '';
}

const addNewElement = (title, completed) => {
    const listItem = document.createElement('li');
    const textNode = document.createTextNode(title);
    listItem.appendChild(textNode);

    if (title === '') {
        alert('You must write something!');
        return;
    }

    document.getElementById('todoList').appendChild(listItem);

    const closeSpan = document.createElement('span');
    const closeTxt = document.createTextNode('\u00D7');
    closeSpan.className = 'close';
    closeSpan.appendChild(closeTxt);
    listItem.appendChild(closeSpan);

    if (completed) {
        listItem.classList.toggle('checked');
    }

    for (let i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            this.parentElement.remove();
        }
    }
}

updateList();
