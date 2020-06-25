/** Se importan utilidades para lógica para historial cliente  */
import Services from '../api/servicios.js';
import TableTabulator from '../class/config_tabulator.js';
import { functionCreateActionButton, MessageError, MessageAdd } from '../global.js';
/**Declaración objetos HTML de uso Historial */
const buttonSearchIncident = document.querySelector('#search');
const inputNullSearch = document.getElementById('inputSearch');
const changeTechnical = document.querySelector('#technicalType');
const checkScale = document.querySelector('#dropdownList');
const user = JSON.parse(sessionStorage.getItem('UserKey'));
let url;
url = new URL('http://localhost:3004/Incidentes');
url.search = new URLSearchParams({
    escalar: user.idTipoUsuario,
    estadoIncidente: 'Escalar'
});
const columns = [
    { title: 'Id', field: 'idIncidencia' },
    { title: "Fecha de captura", field: "fechaCapturaIncidente" },
    { title: "Definicion", field: "definicionProblema", },
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
]
const objTable = new TableTabulator(url, columns, "#tabHistorialIncidencias");
/**
 *  Variable la cual se crea para la integración de la tabla de tabulator de incidentes de usuario
 */
const tableAsignaciones = objTable.createTable();


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
const editIncident = async ({ service, data, id }) => {
    try {
        const responseSearch = await service.EditIncident(data, id);
        if (responseSearch) {
            MessageAdd()
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
 * Función para usar servicio de buscar A todos los tecnico
 * @param {object} object / se espera atributo de service
 * @returns {Promise} responseSearch /se espera una promesa con todos los datos encontrados
 */
const searchTechnicalPresentialService = async ({ service, params }) => {
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
    const dropdownListTechnical = document.getElementById('showHideTechnical');
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
const dataEditIncident = () => {
    let escalar,
        tecnico;

    if (document.getElementById('technicalType').value === "Seleccione area" && document.getElementById('editState').value === 'Finalizado') {
        escalar = user.idTipoUsuario;
        tecnico = '';
    } else {
        if (document.getElementById('technicalType').value === 'Tecnico Presencial' && document.getElementById('editState').value === 'Escalar') {
            escalar = document.getElementById('technicalType').value
            tecnico = document.getElementById('idTecnico').value
        } else {
            if (document.getElementById('technicalType').value != "Seleccione area" && document.getElementById('editState').value === 'Escalar') {
                escalar = document.getElementById('technicalType').value
            } else {
                escalar = user.idTipoUsuario;
                tecnico = '';
            }

        }
    }
    const incident = {
        definicionProblema: document.getElementById('editDefinition').value,
        identificacionProblema: document.getElementById('editIdentification').value,
        finalizacionIncidente: document.getElementById('editDate').value,
        address: document.getElementById('editAddress').value,
        estadoIncidente: document.getElementById('editState').value,
        escalar: escalar,
        tecnico: tecnico,
        idUsuario: document.getElementById('editId').value,
        tipoIncidente: document.getElementById('editTypeIncident').value
    }
    return incident;
}

/**Creacion de DropDownList en el cual se encuentra los tecnico presenciales  */
const createDropDownListTechnical = () => {
    try {
        const paramsClient = {
            service: new Services('technical'),
            params: document.getElementById('technicalType').value
        }
        const technical = searchTechnicalPresentialService(paramsClient);
        fillTechnicalData(technical);
    } catch (error) {
        MessageError();
        console.log(error);
    }


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
        fillIncidentData(incident, 'info');
        setTimeout(() => {
            const paramsClient = {
                service: new Services('client'),
                param: document.getElementById('infoId').value
            }
            const client = searchClientIdService(paramsClient);
            fillClientData(client, 'info');
    
        },100);
       


    } catch (error) {
        console.log(error);
        MessageError();
    }

}


const updateFilter = (search) => {
    try {
        let filterVal = 'idIncidencia';
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
        fillIncidentData(incident, 'edit');
        setTimeout(() => {
            const paramsClient = {
                service: new Services('client'),
                param: document.getElementById('editId').value
            }
            const client = searchClientIdService(paramsClient);
            fillClientData(client, 'edit');
        },100);
      
       



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
        data: dataEditIncident(),
        id: document.getElementById('editIdNumber').value
    }
    editIncident(paramsIncident);
});

checkScale.addEventListener('change', () => {
    try {
        let checkbox;

        checkbox = document.forms['access']['dropdownList'].checked;

        if (!checkbox) {
            document.getElementById('showHideTechnical').style.display = 'none';
            $('#showHideScaleTechnical').hide();
        } else {
            if (document.getElementById('editState').value === "Escalar") {
                $('#showHideScaleTechnical').show();
                const paramsTypeTechnical = {
                    service: new Services('typeTechnical')
                }
                const typeTechnical = searchTypeTechnicalAllService(paramsTypeTechnical);
                fillTypeTechnicalData(typeTechnical);

            } else {
                $('#showHideScaleTechnical').hide();
            }

        }
    } catch (error) {
        MessageError();
        console.log(error);
    }

});

changeTechnical.addEventListener('change', () => {
    if (document.getElementById('technicalType').value === 'Tecnico Presencial') {
        $('#showHideTechnical').show();
        createDropDownListTechnical();
    } else {
        $('#showHideTechnical').hide();
    }

});
