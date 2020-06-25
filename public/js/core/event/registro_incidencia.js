
/** Se importan utilidades para lógica registro incidencia. */
import Services from '../api/servicios.js';
import  TableTabulator from '../class/config_tabulator.js';
import { MessageAdd, MessageError, cleanFieldsIncidents } from '../global.js';

/** Declaración objetos HTML de uso incidencia. */
const btnRegisterIncident = document.querySelector('#registrarIncidencia');
const idClientChange = document.querySelector('#id');
const stateChange = document.querySelector('#state');
const changeTechnical = document.querySelector('#technicalType');
const columns = [
    { title: "Id", field: "idUsuario" },
    { title: "Nombre", field: "nombreUsuario" },
    { title: "Apellidos", field: "apellidoUsuario" },
    { title: "Correo", field: "emailUsuario" },
    { title: "Telefono", field: "telefonoUsuario" },
    { title: "Celular", field: "celularUsuario" },
];
const objTable = new TableTabulator("http://localhost:3004/Clientes",columns,"#tabCliente");
/**creacion de tabla de clientes registrados*/
const tableClients = objTable.createTable();
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

        const responseSearch = await service.SearchClientId(param);
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
const searchTechnicalPresentialService = async ({ service,params }) => {
    try {
        const responseSearch = await service.SearchTechnicalGroup(params);
        if (responseSearch) {
            return responseSearch;
        } else {
            throw "Error al utilizar busqueda de Cliente";
        }

    } catch (error) {
        console.error("Error : " + error);
    }


}

const searchTypeTechnicalAllService = async ({ service }) => {
    try {
        const responseSearch = await service.SearchTypeTechnicalAll();
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
    let escalar,
        tecnico  ;

    if (document.getElementById('technicalType').value === "Seleccione area" ){
        escalar = 'Call Center';
        tecnico = 'trivial';
    }else {
        escalar = document.getElementById('technicalType').value
        if ( document.getElementById('technicalType').value === 'Tecnico Presencial'){
            tecnico = document.getElementById('idTecnico').value
        }else {
            tecnico = ''
        }
    }
    const data = {
        idIncidencia: parseInt((Math.random() * 1000), 10),
        fechaCapturaIncidente: document.getElementById('date').value,
        definicionProblema: document.getElementById('definitionProblem').value,
        identificacionProblema: document.getElementById('identificationProblem').value,
        direccionCliente: document.getElementById('address').value,
        estadoIncidente: document.getElementById('state').value,
        idUsuario: document.getElementById('id').value,
        tipoIncidente: document.getElementById('indenceType').value,
        escalar: escalar,
        tecnico: tecnico,
        address: document.getElementById('address').value
    }
    return data;
}

const fillTypeTechnicalData = (type) => {
    let dropdownList,
        option,
        txt;
    const dropdownListTypeTecnnical = document.getElementById('showHideScaleTechnical');
    dropdownList = document.getElementById('technicalType');
    type.then(data => {
        for (let i in data) {

            option = document.createElement("option");
            txt = document.createTextNode(`${data[i].area}`);
            option.appendChild(txt);
            option.setAttribute('value', data[i].area);
            dropdownList.insertBefore(option, dropdownList.lastChild);
        }
    });
    

}
/**
 * Función para rellenar el dropdowlist de tecnicos presenciales 
 * @param {let} technical / se espera recibir los datos de los tecnicos en prmesa   
 * @param {let} dropdownList  /  se espera recibir el objeto html de dropDownList
 */
const fillTechnicalData = (technical) => {
    let dropdownList,
        option,
        txt;
    const dropdownListTechnical =document.getElementById('showHideTechnical');
    dropdownList = document.getElementById('idTecnico');
    const itemDropDownList = document.createElement('select');
    itemDropDownList.id = 'idTecnico';
    itemDropDownList.className = 'form-control custom-select';
    itemDropDownList.innerHTML = '<option selected>Seleccione el tecnico presencial </option>';

    technical.then(data => {
        for (let i in data) {

            option = document.createElement("option");
            txt = document.createTextNode(`${data[i].nombreUsuario} ${data[i].apellidoUsuario}`);
            option.appendChild(txt);
            option.setAttribute('value', data[i].idUsuario);
            itemDropDownList.insertBefore(option, itemDropDownList.lastChild);
            dropdownListTechnical.replaceChild(itemDropDownList, dropdownList);
        }
    });
}

/**Creacion de DropDownList en el cual se encuentra los tecnico presenciales  */
const createDropDownListTechnical = () => {
    try {
        const paramsClient = {
            service: new Services('technical'),
            params:document.getElementById('technicalType').value
        }
        const technical = searchTechnicalPresentialService(paramsClient);
        fillTechnicalData(technical);
    } catch (error) {
        MessageError();
        console.log(error);
    }


}

/**
 * Función para integrar en los campos los datos del cliente encontrados
 * @param {object} client  
 */
const fillClientData = (client) => {
    client.then(data => {
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


/** CAPTURA DE EVENTO CLICK SOBRE REGISTRO INCIDENTE */
btnRegisterIncident.addEventListener('click', () => {
    const paramsIncident = {
        service: new Services('incident'),
        data: dataIncident()
    }
    // Uso función de consumo servicio incidente
    addIncidentServie(paramsIncident);
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


stateChange.addEventListener('change', () => {
    if (document.getElementById('state').value === "Escalar") {
        $('#showHideScaleTechnical').show();
        const paramsTypeTechnical = {
            service: new Services('typeTechnical')
        }
        const typeTechnical = searchTypeTechnicalAllService(paramsTypeTechnical);
        fillTypeTechnicalData(typeTechnical);

    } else {
        $('#showHideScaleTechnical').hide();
    }

});

changeTechnical.addEventListener('change', () => {
    if (document.getElementById('technicalType').value === 'Tecnico Presencial'){
        $('#showHideTechnical').show();
        createDropDownListTechnical();
    }else{
        $('#showHideTechnical').hide();
    }
    
});
