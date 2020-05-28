/** Se importan utilidades para lógica Historial Incidente. */
import Services from './api/servicios.js';
import {functionCreateActionButton,MessageError } from './global.js';
/**
 * variable constate en la cual es creada la tabla donde se encuentran todos losIncidentes con tabulator
 */
const tabCliente = new Tabulator("#tabHistorialIncidencias", {
    ajaxURL: "http://localhost:3004/Incidentes",
    layout: "fitColumns",
    height: false,
    pagination: "local",
    paginationSize: 10,
    movableColumns: true,
    resizableRows: true,
    columns: [
        { title: "Fecha de captura", field: "fechaCapturaIncidente" },
        { title: "Definicion", field: "definicionProblema", },
        { title: "Identificion del problema ", field: "identificacionProblema" },
        { title: "Cliente", field: "idUsuario" },
        { title: "Estado", field: "estadoIncidente" },
        {
            title: "Info", field: "idIncidencia", width: 100, formatter: functionCreateActionButton, align: "center", formatterParams: {
                type: 'Info',
            }, cellClick: function (e, cell) {
                CreateInfo(cell.getValue());
            },
        },
    ],
});
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
 * Función para usar servicio de buscar Registro de incidentes 
 * @param {object} object / se espera atributos de service y data 
 * @returns {Promise} responseSearch /se espera una promesa con todos los datos encontrados
 */
const searchIncidentIdService = async ({ service, param }) => {
    try {

        const responseSearch = await service.SearchIncidentId( param );
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
 * Función para llenar  campos de Informacion del cliente 
 * @params {Promesa} client /Recibe una promesa la cual se resuelve dentro de función
 */
const fillClientData = ( client ) =>{
    client.then(data => {
        for (let i in data){
        document.getElementById('infoTypeId').value = data[i].tipoId;
         document.getElementById('infoName').value = data[i].nombreUsuario;
         document.getElementById('infoLastName').value = data[i].apellidoUsuario;
         document.getElementById('infoPhone').value = data[i].celularUsuario;
         document.getElementById('infoLandline').value = data[i].telefonoUsuario;
         document.getElementById('infoEmail').value = data[i].emailUsuario;
        }
     
     }) 

}


/**
 * Función para llenar  campos de Información del Incidente
 * @params {Promesa} incident /Recibe una promesa la cual se resuelve dentro de función
 */
const fillIncidentData = ( incident ) =>{
    incident.then(data => {
        for (let i in data){
        document.getElementById('infoId').value = data[i].idUsuario;
        document.getElementById('infoState').value = data[i].estadoIncidente;
        document.getElementById('infoDefinition').value = data[i].definicionProblema;
        document.getElementById('infoTypeIncident').value = data[i].tipoIncidente;
        document.getElementById('infoIdentification').value = data[i].identificacionProblema;
        document.getElementById('infoDate').value = data[i].fechaCapturaIncidente;
        document.getElementById('infoAddress').value = data[i].address;
        }
    });
}

/**
 * Funcion la cual crea los componenestes del apartado de informacion de el Incidente y de que cliente es y su Incidente
 * @param {string} id /se espera un Id del Incidente para poder traer todos los datos 
 */
const CreateInfo = ( id ) => {
    try {
        
        const paramsIncident = {
            service: new Services('incident'),
            param: id
        }

        const incident = searchIncidentIdService(paramsIncident)
        fillIncidentData(incident);

        const paramsClient = {
            service: new Services('client'),
            param: document.getElementById('infoId').value
        }
        const client = searchClientIdService(paramsClient);
        fillClientData(client);



    } catch (error) {
        console.log(error);
        MessageError();
    }

}

