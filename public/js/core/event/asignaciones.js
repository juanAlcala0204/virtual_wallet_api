/** Se importan utilidades para lógica para historial cliente  */
import Services from '../api/servicios.js';
import { functionCreateActionButton, MessageError,  MessageAdd} from '../global.js';
/**Declaración objetos HTML de uso Historial */
const buttonSearchIncident = document.querySelector('#search');
const inputNullSearch = document.getElementById('inputSearch');
const user = JSON.parse(localStorage.getItem('UserKey'));
let url;
url = new URL('http://localhost:3004/Incidentes')
url.search = new URLSearchParams({
    tecnico: user[0].idUsuario
})

/**
 *  Variable la cual se crea para la integración de la tabla de tabulator de incidentes de usuario
 */
const tableAsignaciones = new Tabulator("#tabHistorialIncidencias", {
    ajaxURL: url,
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
            title: "Editar", field: "idIncidencia", width: 100, formatter: functionCreateActionButton, align: "center", formatterParams: {
                type: 'Edit',
            }, cellClick: function (e, cell) {
                EditIncident(cell.getValue());
            }
        },
        {
            title: "Info", field: "idIncidencia", width: 100, formatter: functionCreateActionButton, align: "center", formatterParams: {
                type: 'Info',
            }, cellClick: function (e, cell) {
                createInfoIncident(cell.getValue());
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
 * Función para usar servicio de editar incidentes 
 * @param {object} object / se espera atributos de service y data 
 * @returns {Promise} responseSearch /se espera una promesa con todos los datos encontrados dela edicion de campos correcta 
 */
const editIncident = async ({ service, data, id}) => {
    try {
        const responseSearch = await service.EditIncident(data, id );
        if (responseSearch) {
            MessageAdd()
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

        const responseSearch = await service.SearchIncidentId(param);
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
 *  @params {string} module / Recibe un strign el cual define que a que campos  se va ingresar los datos
 */
const fillClientData = (client, module) => {
    switch (module) {
        case 'info':
            client.then(data => {
                for (let i in data) {
                    document.getElementById('infoTypeId').value = data[i].tipoId;
                    document.getElementById('infoName').value = data[i].nombreUsuario;
                    document.getElementById('infoLastName').value = data[i].apellidoUsuario;
                    document.getElementById('infoPhone').value = data[i].celularUsuario;
                    document.getElementById('infoLandline').value = data[i].telefonoUsuario;
                    document.getElementById('infoEmail').value = data[i].emailUsuario;
                }

            })
        case 'edit':
            client.then(data => {
                for (let i in data) {
                    document.getElementById('editTypeId').value = data[i].tipoId;
                    document.getElementById('editName').value = data[i].nombreUsuario;
                    document.getElementById('editLastName').value = data[i].apellidoUsuario;
                    document.getElementById('editPhone').value = data[i].celularUsuario;
                    document.getElementById('editLandline').value = data[i].telefonoUsuario;
                    document.getElementById('editEmail').value = data[i].emailUsuario;

                }

            })
        default:
            return null;
    }
}


    /**
     * Función para llenar  campos de Información del Incidente
     * @params {Promesa} incident /Recibe una promesa la cual se resuelve dentro de función
     * @params {string} module / Recibe un strign el cual define que a que campos  se va ingresar los datos
     */
    const fillIncidentData = (incident, module) => {

        switch (module) {
            case 'info':
                incident.then(data => {
                    for (let i in data) {
                        document.getElementById('infoId').value = data[i].idUsuario;
                        document.getElementById('infoState').value = data[i].estadoIncidente;
                        document.getElementById('infoDefinition').value = data[i].definicionProblema;
                        document.getElementById('infoTypeIncident').value = data[i].tipoIncidente;
                        document.getElementById('infoIdentification').value = data[i].identificacionProblema;
                        document.getElementById('infoDate').value = data[i].fechaCapturaIncidente;
                        document.getElementById('infoAddress').value = data[i].address;
                    }
                });
            case 'edit':
                incident.then(data => {
                    for (let i in data) {
                        document.getElementById('editIdNumber').value = data[i].id
                        document.getElementById('editIdIncident').value = data[i].idIncidencia;
                        document.getElementById('editId').value = data[i].idUsuario;
                        document.getElementById('editState').value = data[i].estadoIncidente;
                        document.getElementById('editDefinition').value = data[i].definicionProblema;
                        document.getElementById('editTypeIncident').value = data[i].tipoIncidente;
                        document.getElementById('editIdentification').value = data[i].identificacionProblema;
                        document.getElementById('editDate').value = data[i].fechaCapturaIncidente;
                        document.getElementById('editAddress').value = data[i].address;
                    }
                });
            default:
                return null;

        }
       
    }
    /**
     * Función para optener datos de los campos escritos or el tecnico y poder editar el incidente
     * @returns {object} incident / en el cual estaran todos los campos obtenidos del DOM 
     */
    const dataEditIncident = () =>{
        const incident = {
            definicionProblema: document.getElementById('editDefinition').value,
            identificacionProblema: document.getElementById('editIdentification').value,
            finalizacionIncidente: document.getElementById('editDate').value,
            address: document.getElementById('editAddress').value,
            estadoIncidente: document.getElementById('editState').value,
            idUsuario: document.getElementById('editId').value,
            tipoIncidente: document.getElementById('editTypeIncident').value
        }
        return incident;
    }

/**
 * Función la cual crea los componenestes del apartado de informacion de el Incidente y de que cliente es y su Incidente
 * @param {string} id /se espera un Id del Incidente para poder traer todos los datos 
 */
    const createInfoIncident = (id) => {
        try {

            const paramsIncident = {
                service: new Services('incident'),
                param: id
            }

            const incident = searchIncidentIdService(paramsIncident)
            fillIncidentData(incident ,'info');

            const paramsClient = {
                service: new Services('client'),
                param: document.getElementById('infoId').value
            }
            const client = searchClientIdService(paramsClient);
            fillClientData(client , 'info');



        } catch (error) {
            console.log(error);
            MessageError();
        }

    }


    const updateFilter = (search) => {
        try {
            let filterVal = 'idUsuario';
            let typeVal = '=';

            let filter = filterVal == "function" ? customFilter : filterVal;

            if (filterVal) {
                tableAsignaciones.setFilter(filter, typeVal, search);
            }
        } catch (error) {
           console.log(error)
        }
    }


/**
 * Función la cual crea los componenestes del apartado de edicion de el Incidente y de que cliente es y su Incidente
 * @param {string} id /se espera un Id del Incidente para poder traer todos los datos para poder editarlos 
 */
    const EditIncident = (id) => {
        try {
            const paramsIncident = {
                service: new Services('incident'),
                param: id
            }

            const incident = searchIncidentIdService(paramsIncident)
            fillIncidentData(incident ,'edit');

            const paramsClient = {
                service: new Services('client'),
                param: document.getElementById('editId').value
            }
            const client = searchClientIdService(paramsClient);
            fillClientData(client ,'edit');



        } catch (error) {
            console.log(error);
            MessageError();
        }
    }
/**CAPTURA DE EVENTO CLICK EN  BOTON BUSQUEDA DE INCIDENTE ASIGNADO */
    buttonSearchIncident.addEventListener('click', () => {
        const searchInput = document.getElementById('inputSearch').value;
        updateFilter(searchInput);
    });
/** CAPTURA DE EVENTO CAMBIO DE ESTADO PARA EL CAMPO DE BUSQUEDA DE INCIDENTE */
    inputNullSearch.addEventListener('change', () => {
        if (document.getElementById('inputSearch').value == '') {
            tableAsignaciones.clearFilter();
        }
    });


/**CAPTURA DE EVENTO CLICK PARA HACER CAMBIOS EN EL INCIDENTES */
    $('.toastrDefaultSuccess').click(function () {
       
        const paramsIncident = {
            service: new Services('incident'),
            data:dataEditIncident(),
            id: document.getElementById('editIdNumber').value
        }
        editIncident(paramsIncident);
    });