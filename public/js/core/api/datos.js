class DataInputs {
    constructor() {
        this.clients;
        this.incidents;
        this.address;
        this.login;
    }
    DataClient() {
        this.clients = {
            tipoId: document.getElementById('tipoId').value,
            idUsuario: document.getElementById('id').value,
            nombreUsuario: document.getElementById('name').value,
            apellidoUsuario: document.getElementById('lastName').value,
            emailUsuario: document.getElementById('email').value,
            celularUsuario: document.getElementById('phone').value,
            telefonoUsuario: document.getElementById('landline').value,
            generoUsuario: document.getElementById('gender').value,
            idTipoUsuario: "Cliente",
        };
        return this.clients;
    }

    DataIncident() {
        this.incidents = {
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
        return this.incidents;
    }

    DataAddress() {
        this.address = {
            idResidenciaUsuario: parseInt((Math.random() * 1000), 10),
            direccion: document.getElementById('address').value,
            ciudad: document.getElementById('city').value,
            pais: document.getElementById('country').value,
            departamento: document.getElementById('department').value,
            idUsuario: document.getElementById('id').value
        };
        return this.address;
    }

    DataLogin() {

        this.login = {
            nameUser: document.getElementById('email').value,
            password: document.getElementById('password').value

        };

        return this.login;
    }

}

export default DataInputs;