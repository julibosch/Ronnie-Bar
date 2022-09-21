/**** VARIABLES ****/
let proveedores = [];
let editando = false;

const btnAgregar = document.querySelector('#btn-agregar-item');
const modalPanel = document.querySelector('#modal-fondo');
const modalTitulo = document.querySelector('#modal-agregar-item h5');
const submit = document.querySelector('.submit');
const cerrar = document.querySelector('#cancel');
const formulario = document.querySelector('#form-agregar-item');
const tabla = document.querySelector('#table-body');

document.addEventListener('DOMContentLoaded', () => {
    eventListeners();
})

function eventListeners() {
    btnAgregar.addEventListener('click', abrirModal);
    cerrar.addEventListener('click', ocultarModal);
    tabla.addEventListener('click', cargarModoEdicion);
    tabla.addEventListener('click', eliminarProveedor);
}

/**** FUNCIONES ****/

/* Abrir Modal */
function abrirModal(proveedor) {
    modalPanel.style.display = 'flex';
    modalPanel.style.transform = "translateX(0%)";
    modalPanel.style.opacity = '100%';

    if (!editando) {
        modalTitulo.textContent = 'Agregar proveedor'
        submit.value = 'Agregar';
        submit.classList.remove('submit-edit');
        submit.classList.add('submit');

        formulario.onsubmit = evento => cargaProveedor(evento);
    } else {
        modalTitulo.textContent = 'Editar proveedor';
        submit.value = 'Editar';
        submit.classList.remove('submit');
        submit.classList.add('submit-edit');

        /* Funcion que rellena el formulario con el proveedor a editar */
        rellenarFormulario(proveedor);

        /* Funcion de editar proveedor */
        formulario.onsubmit = evento => editarProveedor(evento, proveedor.id);

        /* Salimos del modo de edicion */
        editando = false;
    }
}

/* Rellenar formulario */
function rellenarFormulario(proveedor) {
    const { nombre, telefono, localidad, direccion } = proveedor;

    document.querySelector('#proveedor').value = nombre;
    document.querySelector('#telefono').value = telefono;
    document.querySelector('#localidad').value = localidad;
    document.querySelector('#direccion').value = direccion;
}

/* Cargar modo edicion */
function cargarModoEdicion(e) {
    if (e.target.classList.contains('edit')) {
        editando = true;
        const row = e.target.parentElement.parentElement;

        const nombre = row.children[0].textContent;
        const telefono = row.children[1].textContent;
        const localidad = row.children[2].textContent;
        const direccion = row.children[3].textContent;
        const id = row.getAttribute('data-id');

        const proveedor = { nombre, telefono, localidad, direccion, id }

        abrirModal(proveedor);
    }
}

/* Editar proveedor */
function editarProveedor(e, idProveedor) {
    e.preventDefault();

    const nombreAct = document.querySelector('#proveedor').value;
    const telefonoAct = document.querySelector('#telefono').value;
    const localidadAct = document.querySelector('#localidad').value;
    const direccionAct = document.querySelector('#direccion').value;

    const proveedorActualizado = {nombreAct, telefonoAct, localidadAct, direccionAct};

    console.log(proveedorActualizado);

    proveedores.forEach( proveedor => {
        if(proveedor.id == idProveedor) {
            proveedor.nombre = nombreAct;
            proveedor.telefono = telefonoAct;
            proveedor.localidad = localidadAct;
            proveedor.direccion = direccionAct;
            proveedor.id = idProveedor;
        }
    });

    imprimirHTML();
    ocultarModal();
}

/* Carga Proveedor */
function cargaProveedor(e) {
    e.preventDefault();
    const nombre = document.querySelector('#proveedor').value;
    const telefono = document.querySelector('#telefono').value;
    const localidad = document.querySelector('#localidad').value;
    const direccion = document.querySelector('#direccion').value;
    const id = Date.now();

    const nuevoProveedor = { nombre, telefono, localidad, direccion, id };

    proveedores.push(nuevoProveedor);

    imprimirHTML();
    ocultarModal();
}

/* Cerrar Modal */
function ocultarModal() {
    if (editando) {
        editando = false;
    }

    modalPanel.style.opacity = '0%';
    modalPanel.style.transform = "translateX(70%)";
    setTimeout(() => {
        modalPanel.style.display = 'none';
    }, 300);
    formulario.reset();
}

/* Imprimir HTML */
function imprimirHTML() {
    limpiarHTML();

    proveedores.forEach(proveedor => {
        const { nombre, telefono, localidad, direccion, id } = proveedor;

        const nuevoProveedorHTML = document.createElement('tr');
        nuevoProveedorHTML.setAttribute('data-id', id);
        nuevoProveedorHTML.innerHTML = `
            <td class="table-data nombre">${nombre}</td>
            <td class="table-data telefono">${telefono}</td>
            <td class="table-data localidad">${localidad}</td>
            <td class="table-data direccion">${direccion}</td>
            <td class="table-data acciones">
                <button class="edit">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                        class="w-6 h-6">
                        <path
                            d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                        <path
                            d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                    </svg>
                    Editar
                </button>
                <button class="delete">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                        class="w-6 h-6">
                        <path fill-rule="evenodd"
                            d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                            clip-rule="evenodd" />
                    </svg>
                    Eliminar
                </button>
            </td>
        `;

        tabla.appendChild(nuevoProveedorHTML);
    })
}

/* Limpiar HTML */
function limpiarHTML() {
    while (tabla.firstChild) {
        tabla.removeChild(tabla.firstChild)
    }
}

/* Eliminar proveedor */
function eliminarProveedor(e) {
    if(e.target.classList.contains('delete')) {
        const row = e.target.parentElement.parentElement;
        const id = row.getAttribute('data-id');
    
        proveedores = proveedores.filter( proveedores => proveedores.id != id);
    
        imprimirHTML();
    }
}