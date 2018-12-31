const form = document.getElementById('registrar');
const input = form.querySelector('input');
const ul = document.getElementById('invitedList');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value;
    if (text) {
        const li = document.createElement('li');
        li.textContent = text;
        ul.appendChild(li);

        input.value = '';
    }
});