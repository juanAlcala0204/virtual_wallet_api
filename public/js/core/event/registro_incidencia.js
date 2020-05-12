
/** Se importan utilidades para lógica registro incidencia. */
import Services from '../api/servicios.js';
import DataInputs from '../api/datos.js'
import { MessageAdd, MessageError, cleanFieldsIncidents } from '../global.js'

/** Declaración objetos HTML de uso incidencia. */
const CHECK = document.querySelector('#dropdownList');
const btnRegisterIncident = document.querySelector('#registrarIncidencia');
const IDCLIENT = document.querySelector('#id');
const ADDRESS  = document.querySelector('#buttonAddress');

/**
 * Función para usar servicio de agregación Incidencia
 * @param {object} object / se espera atributos de service y data 
 */
const addIncidentServie = async ({ service, data }) => {
    try {
        const responseAdd = await service.AddIncident( data );
        if (responseAdd.data) {
            MessageAdd();
            cleanFieldsIncidents();
        } else {
            throw "Error al utilizar servicio agregar incidencia";
        }
    
    } catch (error) {
        console.error("Error : "+error);        
    }
}

/**
 * Función para manejo de Datos de registro incidencia ( registrados por el usuario )
 * @returns data - retornará los datos del usuario una vez válidados.
 */
const DataIncident = () => {
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
        address : document.getElementById('address').value
    }
    return data;
}

/** CONTROL DE EVENTO CLICK SOBRE REGISTRO INCIDENTE */
btnRegisterIncident.addEventListener('click', () => {
        const paramsIncident = {
            service: new Services('incident'),
            data: DataIncident()
        }
        // Uso función de consumo servicio incidente
        addIncidentServie( paramsIncident );
});



const createInput = () => {
    try {
        let checkbox;
        let TECNICOS ;
        TECNICOS = document.getElementById('idTecnico');
        checkbox = document.forms['access']['dropdownList'].checked;
        
        if (!checkbox) {
            document.getElementById('showHideTechnical').style.display = 'none';
        } else {
            
            document.getElementById('showHideTechnical').style.display = 'block';
            dataClient = new Services('client');
            const CLIENT = dataClient.SearchClientType('Tecnico');
            CLIENT.then(data => {
                for(let i  in data){
                    let option ;
                    option = document.createElement("option"),txt = document.createTextNode(data[i].nombreUsuario +" "+ data[0].apellidoUsuario)
                    option.appendChild(txt);
                    option.setAttribute('value',data[i].idUsuario)
                    TECNICOS.insertBefore(option,TECNICOS.lastChild);
                }
            });
        }
    } catch (error) {
        MessageError();
        console.log(error);
    }


}

const tableClient = new Tabulator("#tabCliente", {
    ajaxURL: "http://localhost:3000/clientes/",
    ajaxConfig: "get",
    layout: "fitColumns",
    height: "30%",
    columns: [
        { title: "Id", field: "_id" },
        { title: "Nombre", field: "documento" },
        { title: "Apellidos", field: "nombre" },
        { title: "Celular", field: "email" },
        { title: "Correo", field: "celular" },
    ],
});


CHECK.addEventListener('change', () => {
    createInput();
});

IDCLIENT.addEventListener('change', () => {
    let param;
    let dataClient;
    let url;
    param = document.getElementById('id').value;
    if (param == "") {
        document.getElementById('tipoId').value = "";
        document.getElementById('name').value = "";
        document.getElementById('lastName').value = "";
        document.getElementById('email').value = "";
        document.getElementById('phone').value = "";
        document.getElementById('landline').value = "";
    } else {
        try {
            dataClient = new Services('client');
            const CLIENT = dataClient.SearchClient(param,'Cliente');
            CLIENT.then(data => {
                document.getElementById('tipoId').value = data[0].tipoId;
                document.getElementById('name').value = data[0].nombreUsuario;
                document.getElementById('lastName').value = data[0].apellidoUsuario;
                document.getElementById('email').value = data[0].emailUsuario;
                document.getElementById('phone').value = data[0].celularUsuario;
                document.getElementById('landline').value = data[0].telefonoUsuario;
            });
           
        }catch (error){
            MessageError();
        }
    }
});


ADDRESS.addEventListener('click',() =>{
    url = new URL('http://localhost:3000/Residencia');
    url.search = new URLSearchParams({
        idUsuario: document.getElementById('id').value
    })
    const tablaResidencia = new Tabulator("#tabAddress", {
        ajaxURL: url,
        layout: "fitColumns",
        paginationSize: 10,
        movableColumns: true,
        resizableRows: true,
        columns: [
            { title: "ID Residencia", field: "idResidenciaUsuario" },
            { title: "Dirección", field: "direccion", cellClick: function (e, cell) {
                document.getElementById('address').value = cell.getValue()
            }},
            { title: "Ciudad", field: "ciudad" },
            { title: "Pais", field: "pais" },
            { title: "Departamento", field: "departamento" }
        ],
        rowClick:function(e, row){                
        }
    });
});