// VARIABLES
const formulario = document.querySelector('#formulario');
const user_input = document.querySelector('#user-input');
const pass_input = document.querySelector('#pass-input');
const submit_btn = document.querySelector('#submit');

const body = document.querySelector('body');
const contenedor_principal = document.querySelector('.contenedor-principal')


document.addEventListener('DOMContentLoaded', () => {

    eventListeners();
});

function eventListeners() {
    formulario.addEventListener('submit', validateInputs);
}

function redireccionar() {
    body.style.backgroundPosition = 'top';
    contenedor_principal.classList.add('desplazamiento');
    
    setTimeout(() => {
        window.location.href = 'instrucciones.html'
    }, 1200);
}

function validateInputs(e) {
    e.preventDefault();
    console.log(e.target);

    const user = user_input.value;
    const pass = pass_input.value;

    if (user == '' || pass == '') {
        imprimirAlerta('Todos los campos son obligatorios', 'warning')
        console.log({ user, pass })
    } else {
        redireccionar();
    }
}

function imprimirAlerta(mensaje, tipo) {
    const alerta = document.createElement('div');
    alerta.innerHTML = 
    `
        <svg class="warn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
            <path fill-rule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
        </svg>
        <p>${mensaje}</p>
   `;

    if (tipo == 'warning') {
        alerta.classList.add('warning');
    }

    submit_btn.style.bottom = '4%'
    formulario.insertBefore(alerta, submit_btn);

    setTimeout(() => {
        alerta.remove();
        submit_btn.style.bottom = '10%'
    }, 3000);
}


