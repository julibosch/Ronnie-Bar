/* Variables */
let bebidas = [];
let clara = false;
let editando = false;

const agregar_item = document.querySelector('#btn-agregar-item');
const tabla = document.querySelector('#table-body');
const modal = document.querySelector('#modal-fondo');
const modalTitulo = document.querySelector('#modal-agregar-item h5');
const modalVentana = document.querySelector('#modal-agregar-item');
const formulario = document.querySelector('#form-agregar-item');
const cancelarBtn = document.querySelector('#cancel');
const alertaTablaVacia = document.querySelector('#tabla-vacia');

document.addEventListener('DOMContentLoaded', () => {

    eventListeners();

    setTimeout(() => {
        checkearTabla();
    }, 100);
})

function eventListeners() {
    agregar_item.addEventListener('click', mostrarModal);

    tabla.addEventListener('click', editarBebida);
}

function mostrarModal() {
    /* Muestra el modal */
    modalTitulo.textContent = 'Agregar bebida';
    modal.style.display = 'flex';

    /* Submitear formulario */
    formulario.onsubmit = (e) => {
        if(editando == false) {

            e.preventDefault();
            
            /* Crea un objeto a partir de los inputs.value */
            const nombre = document.querySelector('#bebida').value;
            const categoria = document.querySelector('#categoria').value;
            const precio = Number(document.querySelector('#precio').value);
            const proveedor = document.querySelector('#proveedor').value;
            const id = Date.now();
            
            const nuevaBebida = { nombre, categoria, precio, proveedor, id };
            
            console.log(bebidas);
            
            crearBebidaNueva(nuevaBebida);
        } else {
            e.preventDefault()

            /* const nombreAct = document.querySelector('#bebida').value;
            const categoriaAct = document.querySelector('#categoria').value;
            const precioAct = Number(document.querySelector('#precio').value);
            const proveedorAct = document.querySelector('#proveedor').value;
            const idAct = id;

            bebidas.forEach( bebida => {
                console.log(id);
                console.log(idAct);
                if(bebida.id == idAct) {
                    console.log('Cambiaso')

                    bebida.nombre = nombreAct;
                    bebida.categoria = categoriaAct;
                    bebida.precio = precioAct;
                    bebida.proveedor = proveedorAct;
                }
            })

            console.log(bebidas);

            limpiarHTML();
            imprimirBebidas();
            ocultarModal(); */
        }
    }

    /* Cancelar formulario */
    cancelarBtn.onclick = () => {
        ocultarModal();
    }
}

function crearBebidaNueva(nuevaBebida) {
    limpiarHTML();

    /* Agrego la nueva bebida al arreglo de bebidas */
    bebidas.push(nuevaBebida);

    imprimirBebidas();

    ocultarModal();
}

function limpiarHTML() {
    while (tabla.firstChild) {
        tabla.removeChild(tabla.firstChild)
    }
}

function ocultarModal() {
    modal.style.transform = "translateX(70%)";
    modal.style.opacity = '0%';
    setTimeout(() => {
        modal.style.display = 'none';
        modal.style.transform = "translateX(0%)";
        modal.style.opacity = '100%';
    }, 400);
    formulario.reset();
}

function imprimirBebidas() {
    /* Recorro el arreglo de bebidas para ir creando cada table row */
    bebidas.forEach(bebida => {
        const { nombre, categoria, precio, proveedor, id } = bebida;

        const bebidaHTML = document.createElement('tr');

        if (clara === false) {
            bebidaHTML.classList.add('table-row')
        } else {
            bebidaHTML.classList.add('table-row', 'clara')
        }

        bebidaHTML.setAttribute('data-id', id);
        bebidaHTML.innerHTML = `
                                <td class="table-data nombre">${nombre}</td>
                                <td class="table-data categoria">${categoria}</td>
                                <td class="table-data precio">$ ${precio}</td>
                                <td class="table-data proovedor">${proveedor}</td>
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
        `
        tabla.appendChild(bebidaHTML);

        if (clara === false) {
            clara = true;
        } else {
            clara = false
        };
    });

    checkearTabla();
}

function checkearTabla() {
    if (bebidas.length == 0) {
        alertaTablaVacia.style.display = 'flex'
    } else {
        alertaTablaVacia.style.display = 'none'
    }
}

function editarBebida(e) {
    if(e.target.classList.contains('edit')) {
        editando = true;
        
        /* Muestra el modal */
        modal.style.display = 'flex';
        modalTitulo.textContent = 'Editar bebida';
        
        nombre = e.target.parentElement.parentElement.children[0].textContent;
        categoria = e.target.parentElement.parentElement.children[1].textContent;
        precio = Number(e.target.parentElement.parentElement.children[2].textContent.substr(1,));
        proveedor = e.target.parentElement.parentElement.children[3].textContent;
        id = e.target.parentElement.parentElement.getAttribute('data-id');
    
        /* Lleno los inputs con los datos de la bebida a editar */
        document.querySelector('#bebida').value = nombre;
        document.querySelector('#categoria').value = categoria;
        document.querySelector('#precio').value = precio;
        document.querySelector('#proveedor').value = proveedor;

        /* Si estamos en el modo edicion, obtengo los datos de los inputs actualizados */
            const nombreAct = document.querySelector('#bebida').value;
            const categoriaAct = document.querySelector('#categoria').value;
            const precioAct = Number(document.querySelector('#precio').value);
            const proveedorAct = document.querySelector('#proveedor').value;
            const idAct = id;

            bebidas.forEach( bebida => {
                if(bebida.id === idAct) {
                    bebida.nombre = nombreAct;
                    bebida.categoria = categoriaAct;
                    bebida.precio = precioAct;
                    bebida.proveedor = proveedorAct;
                }
            })

        /* imprimirBebidas();
    
        formulario.reset();
    
        ocultarModal(); */
       
        editando = false;
    }
}