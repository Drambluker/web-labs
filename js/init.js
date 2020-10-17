const urls = {
    all: 'http://jsonplaceholder.typicode.com/todos',
    incompleted: 'http://jsonplaceholder.typicode.com/todos?completed=false',
    completed: 'http://jsonplaceholder.typicode.com/todos?completed=true'
}

let listItems = document.getElementsByTagName('li');
for (let i = 0; i < listItems.length; i++) {
    const closeTxt = document.createTextNode('\u00D7');
    let closeSpan = document.createElement('span');
    closeSpan.className = 'close';
    closeSpan.appendChild(closeTxt);
    listItems[i].appendChild(closeSpan);
}

const close = document.getElementsByClassName('close');
for (let i = 0; i < close.length; i++) {
    close[i].onclick = function () {
        this.parentElement.remove();
    }
}

const list = document.querySelector('ul');
list.addEventListener('click', e => {
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('checked');
    }
}, false);

const select = document.querySelector('select');
select.addEventListener('change', e => {
    updateList();
}, false)
