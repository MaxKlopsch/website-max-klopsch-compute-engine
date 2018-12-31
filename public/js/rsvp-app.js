const form = document.getElementById('registrar');
const input = form.querySelector('input');
const ul = document.getElementById('invitedList');

function createLi(text) {
    const li = document.createElement('li');
    li.textContent = text;

    // append 'Confirmed' label and checkbox
    const label = document.createElement('label');
    label.textContent = 'Confirmed';
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    label.appendChild(checkbox);
    li.appendChild(label);

    // append 'Remove' button
    const button = document.createElement('button');
    button.textContent = 'Remove';
    li.appendChild(button);

    return li;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value;
    if (text) {
        input.value = '';
        const li = createLi(text);
        ul.appendChild(li);
    }
});

ul.addEventListener('change', (e) => {
    const checkbox = event.target;
    const checked = checkbox.checked;
    const listItem = checkbox.parentNode.parentNode;

    if (checked) {
        listItem.className = 'responded';
    } else {
        listItem.className = '';
    }
});

ul.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        const li = e.target.parentNode;
        ul.removeChild(li);
    }
});