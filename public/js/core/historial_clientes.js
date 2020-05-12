const BUTTONSEARCH = document.querySelector('#search');
const INPUTNULL = document.getElementById('inputSearch');

const tableCliente = new Tabulator("#tabHistorialIncidencias", {
    ajaxURL: "http://localhost:3000/Usuarios?idTipoUsuario=Cliente",
    layout: "fitColumns",
    pagination: "local",
    paginationSize: 10,
    movableColumns: true,
    resizableRows: true,
    columns: [
        { title: "Id", field: "idUsuario" },
        { title: "Nombre", field: "nombreUsuario" },
        { title: "Apellidos", field: "apellidoUsuario" },
        { title: "Correo", field: "emailUsuario" },
        { title: "Telefono", field: "telefonoUsuario" },
        { title: "Celular", field: "celularUsuario" },
        {
            title: "Dirección", field: "idUsuario", formatter: the_Function, align: "center"
            , cellClick: function (e, cell) {
                url = new URL('http://localhost:3000/Residencia');
                url.search = new URLSearchParams({
                    idUsuario: cell.getValue()
                })
                const tablaResidencia = new Tabulator("#tabResidencia", {
                    ajaxURL: url,
                    layout: "fitColumns",
                    paginationSize: 10,
                    movableColumns: true,
                    resizableRows: true,
                    columns: [
                        { title: "ID Residencia", field: "idResidenciaUsuario" },
                        { title: "Dirección", field: "direccion" },
                        { title: "Ciudad", field: "ciudad" },
                        { title: "Pais", field: "pais" },
                        { title: "Departamento", field: "departamento" }
                    ],
                });
            }

        }
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
    }catch(error){
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