const BUTTONSEARCH = document.querySelector('#search');
const INPUTNULL = document.getElementById('inputSearch');
const USER = JSON.parse(localStorage.getItem('UserKey'));
let url;
url = new URL('http://localhost:3000/Incidentes')
url.search = new URLSearchParams({
    tecnico: USER[0].idUsuario
})
const tableCliente = new Tabulator("#tabHistorialIncidencias", {
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
                ModificarIncidente(cell.getValue());
            }
        },
        {
            title: "Info", field: "idIncidencia", width: 100, formatter: functionCreateActionButton, align: "center", formatterParams: {
                type: 'Info',
            }, cellClick: function (e, cell) {
                CreacionInformacion(cell.getValue());
            },
        },
    ],
});


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
    }
}

const CreacionInformacion = (id) => {
    try {
        const SEARCH = new Services('incident');
        const INCIDENT = SEARCH.SearchIncident(id);
        INCIDENT.then(data => {
            document.getElementById('infoId').value = data[0].idUsuario;
            document.getElementById('infoState').value = data[0].estadoIncidente;
            document.getElementById('infoDefinition').value = data[0].definicionProblema;
            document.getElementById('infoTypeIncident').value = data[0].tipoIncidente;
            document.getElementById('infoIdentification').value = data[0].identificacionProblema;
            document.getElementById('infoDate').value = data[0].fechaCapturaIncidente;
            document.getElementById('infoAddress').value = data[0].address;
        });
        const DATACLIENT = new Services('client');
        const CLIENT = DATACLIENT.SearchClient(document.getElementById('infoId').value, 'Cliente');
        CLIENT.then(dataClient => {
            document.getElementById('infoTypeId').value = dataClient[0].tipoId;
            document.getElementById('infoName').value = dataClient[0].nombreUsuario;
            document.getElementById('infoLastName').value = dataClient[0].apellidoUsuario;
            document.getElementById('infoPhone').value = dataClient[0].celularUsuario;
            document.getElementById('infoLandline').value = dataClient[0].telefonoUsuario;
            document.getElementById('infoEmail').value = dataClient[0].emailUsuario;

        })



    } catch (error) {
        console.log(error);
        MessageError();
    }

}

const ModificarIncidente = (id) => {
    try {
        const SEARCH = new Services('incident');
        const INCIDENT = SEARCH.SearchIncident(id);
        INCIDENT.then(data => {
            document.getElementById('editIdNumber').value = data[0].id
            document.getElementById('editIdIncident').value = data[0].idIncidencia;
            document.getElementById('editId').value = data[0].idUsuario;
            document.getElementById('editState').value = data[0].estadoIncidente;
            document.getElementById('editDefinition').value = data[0].definicionProblema;
            document.getElementById('editTypeIncident').value = data[0].tipoIncidente;
            document.getElementById('editIdentification').value = data[0].identificacionProblema;
            document.getElementById('editDate').value = data[0].fechaCapturaIncidente;
            document.getElementById('editAddress').value = data[0].address;
        });
        const DATACLIENT = new Services('client');
        const CLIENT = DATACLIENT.SearchClient(document.getElementById('editId').value, 'Cliente');
        CLIENT.then(dataClient => {
            document.getElementById('editTypeId').value = dataClient[0].tipoId;
            document.getElementById('editName').value = dataClient[0].nombreUsuario;
            document.getElementById('editLastName').value = dataClient[0].apellidoUsuario;
            document.getElementById('editPhone').value = dataClient[0].celularUsuario;
            document.getElementById('editLandline').value = dataClient[0].telefonoUsuario;
            document.getElementById('editEmail').value = dataClient[0].emailUsuario;

        })



    } catch (error) {
        console.log(error);
        MessageError();
    }
}

BUTTONSEARCH.addEventListener('click', () => {
    const SEARCHINPUT = document.getElementById('inputSearch').value;
    updateFilter(SEARCHINPUT);
});

INPUTNULL.addEventListener('change', () => {
    if (document.getElementById('inputSearch').value == '') {
        tableCliente.clearFilter();
    }
});
$('.toastrDefaultSuccess').click(function () {
    const INCIDENT = {
        definicionProblema: document.getElementById('editDefinition').value,
        identificacionProblema: document.getElementById('editIdentification').value,
        finalizacionIncidente: document.getElementById('editDate').value,
        address: document.getElementById('editAddress').value,
        estadoIncidente: document.getElementById('editState').value,
        idUsuario: document.getElementById('editId').value,
        tipoIncidente: document.getElementById('editTypeIncident').value

    }
    const PUTINCIDENT = new Services('incident');
    const DATAUPDATEINCIDENT = PUTINCIDENT.EditIncident(INCIDENT, document.getElementById('editIdNumber').value);
    toastr.success('Lorem ipsum dolor sit amet, consetetur sadipscing elitr.')
});