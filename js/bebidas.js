/* Variables */
const agregar_item = document.querySelector('#btn-agregar-item');
const tabla = document.querySelector('#table');

document.addEventListener('DOMContentLoaded', () => {

    eventListeners();
})

function eventListeners() {
    agregar_item.addEventListener('click', agregarItem);
}

function agregarItem(e) {
    console.log(e.target);
}