
const tabCliente = new Tabulator("#tabHistorialIncidencias", {
    ajaxURL: "http://localhost:3000/Incidentes",
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
        // {
        //     title: "Editar", field: "Editar", width: 100, formatter: functionCreateActionButton, align: "center", formatterParams: {
        //         type: 'Edit',
        //     }
        // },
        {
            title: "Info", field: "idIncidencia", width: 100, formatter: functionCreateActionButton, align: "center", formatterParams: {
                type: 'Info',
            }, cellClick: function (e, cell) {
                CreacionInformacion(cell.getValue());
            },
        },
    ],
});


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
        const CLIENT = DATACLIENT.SearchClient(document.getElementById('infoId').value,'Cliente');
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


$('.toastrDefaultSuccess').click(function () {
    toastr.success('Lorem ipsum dolor sit amet, consetetur sadipscing elitr.')
});