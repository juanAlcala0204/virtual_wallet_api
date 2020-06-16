
/** Se importan utilidades para lógica registro incidencia. */
import Services from '../api/servicios.js';
import { MessageAdd, MessageError, cleanFieldsIncidents } from '../global.js';

/** Declaración objetos HTML de uso incidencia. */
const checkboxTechnical = document.querySelector('#dropdownList');
const btnRegisterIncident = document.querySelector('#registrarIncidencia');
const idClientChange = document.querySelector('#id');
const addressButton = document.querySelector('#buttonAddress');

/**
 * Función para usar servicio de agregación Incidencia
 * @param {object} object / se espera atributos de service y data 
 */
const addIncidentServie = async ({ service, data }) => {
    try {
        const responseAdd = await service.AddIncident(data);
        if (responseAdd) {
            MessageAdd();
            cleanFieldsIncidents();
        } else {
            throw "Error al utilizar servicio agregar incidencia";
        }

    } catch (error) {
        console.error("Error : " + error);
    }
}

/**
 * Función para usar servicio de buscar Cliente
 * @param {object} object / se espera atributos de service y data 
 * @returns {Promise} responseSearch /se espera una promesa con todos los datos encontrados
 */
const searchClientIdService = async ({ service, param }) => {
    try {

        const responseSearch = await service.SearchClientId( param );
        if (responseSearch) {
            return responseSearch;
        } else {
            throw "Error al utilizar busqueda de Cliente";
        }

    } catch (error) {
        console.error("Error : " + error);
    }

}

/**
 * Función para usar servicio de buscar A todos los tecnico
 * @param {object} object / se espera atributo de service
 * @returns {Promise} responseSearch /se espera una promesa con todos los datos encontrados
 */
const searchTechnicalAllService = async ({ service }) => {
    try {
        const responseSearch = await service.SearchTechnicalAll();
        if (responseSearch) {
            return responseSearch;
        } else {
            throw "Error al utilizar busqueda de Cliente";
        }

    } catch (error) {
        console.error("Error : " + error);
    }


}

/**
 * Función para manejo de Datos de registro incidencia ( registrados por el usuario )
 * @returns data - retornará los datos del usuario una vez válidados.
 */
const dataIncident = () => {
    const data = {
        idIncidencia: parseInt((Math.random() * 1000), 10),
        fechaCapturaIncidente: document.getElementById('date').value,
        definicionProblema: document.getElementById('definitionProblem').value,
        identificacionProblema: document.getElementById('identificationProblem').value,
        finalizacionIncidente: "0",
        diasIncidente: "0",
        direccionCliente: document.getElementById('address').value,
        estadoIncidente: document.getElementById('state').value,
        idUsuario: document.getElementById('id').value,
        tipoIncidente: document.getElementById('indenceType').value,
        tecnico: document.getElementById('idTecnico').value,
        address: document.getElementById('address').value
    }
    return data;
}

/**
 * Función para rellenar el dropdowlist de tecnicos presenciales 
 * @param {let} technical / se espera recibir los datos de los tecnicos en prmesa   
 * @param {let} dropdownList  /  se espera recibir el objeto html de dropDownList
 */
 const fillTechnicalData = ( technical ) => {
    let dropdownList, 
        option,
        txt;

    dropdownList = document.getElementById('idTecnico');
    const itemDropDownList  = document.createElement('select');
    itemDropDownList.id = 'idTecnico';
    itemDropDownList.className = 'form-control custom-select';
    itemDropDownList.innerHTML ='<option selected>Seleccione el tecnico presencial </option>';

    technical.then(data => {
        for (let i in data) {
           
            option = document.createElement("option");
            txt = document.createTextNode(`${data[i].nombreUsuario} ${data[i].apellidoUsuario}`);
            option.appendChild(txt);
            option.setAttribute('value', data[i].idUsuario);
            itemDropDownList.insertBefore(option, itemDropDownList.lastChild);
            dropdownListTecnnical.replaceChild(itemDropDownList, dropdownList);
        }
    });
 }
 
/**Creacion de DropDownList en el cual se encuentra los tecnico presenciales  */
const createDropDownListTechnical = () => {
    try {
        let checkbox;
        checkbox = document.forms['access']['dropdownList'].checked;

        if (!checkbox) {
            document.getElementById('showHideTechnical').style.display = 'none';
        } else {
            document.getElementById('showHideTechnical').style.display = 'block';
            const paramsClient = {
                service: new Services('technical')
            }
            const technical = searchTechnicalAllService(paramsClient);
            fillTechnicalData( technical  );
        }
    } catch (error) {
        MessageError();
        console.log(error);
    }


}

/**
 * Función para integrar en los campos los datos del cliente encontrados
 * @param {object} client  
 */
const fillClientData = ( client ) => {
    client.then(data =>{
        for (let i in data) {
            document.getElementById('tipoId').value = data[i].tipoId;
            document.getElementById('name').value = data[i].nombreUsuario;
            document.getElementById('lastName').value = data[i].apellidoUsuario;
            document.getElementById('email').value = data[i].emailUsuario;
            document.getElementById('phone').value = data[i].celularUsuario;
            document.getElementById('landline').value = data[i].telefonoUsuario;
    
        }
    })

}

/**
 * Función para limpiar los campos si no se encuentran datos del cliente
 */
const cleanfieldsChangeClient = () => {
    document.getElementById('tipoId').value = "";
    document.getElementById('name').value = "";
    document.getElementById('lastName').value = "";
    document.getElementById('email').value = "";
    document.getElementById('phone').value = "";
    document.getElementById('landline').value = "";
}
/**
 * Función para crear tabla con la direccion del cliente
 * @param {const} URL 
 */
const createTableAddress = ( URL ) =>{

    const tablaResidencia = new Tabulator("#tabAddress", {
        ajaxURL: URL,
        layout: "50px",
        paginationSize: 10,
        movableColumns: true,
        resizableRows: true,
        columns: [
            { title: "ID Residencia", field: "idResidenciaUsuario" },
            {
                title: "Dirección", field: "direccion", cellClick: function (e, cell) {
                    document.getElementById('address').value = cell.getValue()
                }
            },
            { title: "Ciudad", field: "ciudad" },
            { title: "Pais", field: "pais" },
            { title: "Departamento", field: "departamento" }
        ],
        rowClick: function (e, row) {
        }
    });

};

/**creacion de tabla de clientes registrados*/
const tableClient = new Tabulator("#tabCliente", {
    ajaxURL: "http://localhost:3000/clientes/",
    ajaxConfig: "get",
    layout: "fitColumns",
    height: "30%",
    columns: [
        { title: "Id", field: "documento" },
        { title: "Nombre", field: "nombre" },
        { title: "Apellidos", field: "_id" },
        { title: "Celular", field: "celular" },
        { title: "Correo", field: "email" },
    ],
});

/** CAPTURA DE EVENTO CLICK SOBRE REGISTRO INCIDENTE */
btnRegisterIncident.addEventListener('click', () => {
    const paramsIncident = {
        service: new Services('incident'),
        data: dataIncident()
    }
    // Uso función de consumo servicio incidente
    addIncidentServie(paramsIncident);
});

/**CAPTURA DE EVENTO  CAMBIO DE ESTADO DE CHECKBOX  DE TECNICO PRESENCIAL */
checkboxTechnical.addEventListener('change', () => {
    createDropDownListTechnical();
});

/**CAPTURA DE EVENTO CAMBIO DE DOCUMENTO  PARA RELLENADO DE DATOS */
idClientChange.addEventListener('change', () => {
    const PARAM = document.getElementById('id').value;
    if (PARAM == "") {
        cleanfieldsChangeClient();
    } else {
        try {
            const paramsClient = {
                service: new Services('client'),
                param: PARAM

            }
            const client = searchClientIdService(paramsClient);
            fillClientData(client);
        } catch (error) {
            MessageError();
            console.error("Error : " + error);
        }
    }
});

/**CAPTURA DE EVENTO CLICK PARA COLECCIONES DE DIRECCIONES DE CLIENTE */
addressButton.addEventListener('click', () => {
    const url = new URL('http://localhost:3004/Residencia');
    url.search = new URLSearchParams({
        idUsuario: document.getElementById('id').value
    })

    createTableAddress(url);
    
});