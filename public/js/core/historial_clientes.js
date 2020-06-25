/** Se importan utilidades para lógica para historial cliente  */
import {the_Function,MessageError } from './global.js';
import  TableTabulator from './class/config_tabulator.js';

/**Declaración objetos HTML de uso Historial */
const buttonSearch = document.querySelector('#search');
const inputSearch = document.getElementById('inputSearch');
const columns = [
    { title: "Id", field: "idUsuario" },
    { title: "Nombre", field: "nombreUsuario" },
    { title: "Apellidos", field: "apellidoUsuario" },
    { title: "Correo", field: "emailUsuario" },
    { title: "Telefono", field: "telefonoUsuario" },
    { title: "Celular", field: "celularUsuario" },
];

const objTable = new TableTabulator("http://localhost:3004/Clientes",columns,"#tabHistorialIncidencias",)

/**
 * Variable la cual crea la tabla de historial Cliente
 */
const tableClient = objTable.createTable();

/**
 * Función en la cual busca en tabla por idUsuario y se trae a la tabla existente
 * @param {string} search
 */
const updateFilter = (search) => {
    try {
        let filterVal = 'idUsuario';
        let typeVal = '=';

        let filter = filterVal == "function" ? customFilter : filterVal;

        if (filterVal) {
            tableCliente.setFilter(filter, typeVal, search);
        }
    } catch (error) {
        MessageError();
        console.error("ERROR", error);
    }
}

// /**
//  * Función que crea la tabla de direcciones de cliente seleccionado en la tabla
//  * @param {const} URL
//  */
// const createTableAddressClient = ( URL ) => {
//     const tablaResidencia = new Tabulator("#tabResidencia", {
//         ajaxURL: URL,
//         layout: "50px",
//         paginationSize: 10,
//         movableColumns: true,
//         resizableRows: true,
//         columns: [
//             { title: "ID Residencia", field: "idResidenciaUsuario" },
//             { title: "Dirección", field: "direccion" },
//             { title: "Ciudad", field: "ciudad" },
//             { title: "Pais", field: "pais" },
//             { title: "Departamento", field: "departamento" }
//         ],
//     });
// }

/**
 * CAPTURA DE EVNTO CLICK PARA CAPTURA DE CLIENTE BUSCADO EN LA TABLA
 */
buttonSearch.addEventListener('click', () => {
    const SEARCHINPUT = document.getElementById('inputSearch').value;
    updateFilter(SEARCHINPUT);
});

/**
 * CAPTURA DE EVENTO DE CASAMBIO DE ESTADO DEL BUSCADOR PARA RESTAURAR TABLAS
 */
inputSearch.addEventListener('change', () => {
    if (document.getElementById('inputSearch').value == '') {
        tableCliente.clearFilter();
    }
});