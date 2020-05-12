const BUTTON = document.querySelector('#registrarCliente');
const BUTTONADDADDRESS = document.querySelector('#addDireccion');
const CLIENT = document.querySelector('#id');
BUTTON.addEventListener('click', () => {
    const ADDADDRESS = new Services('address');
    const ADDCLIENT = new Services('client');
    ADDCLIENT.AddClients();
    ADDADDRESS.AddAddress();
    MessageAdd('Cliente');
    cleanFieldsClient();
});

BUTTONADDADDRESS.addEventListener('click', () => {
    try {
        const OBJADDRESS = {
            idResidenciaUsuario: parseInt((Math.random() * 1000), 10),
            direccion: document.getElementById('addressAdd').value,
            ciudad: document.getElementById('cityAdd').value,
            pais: document.getElementById('countryAdd').value,
            departamento: document.getElementById('departmentAdd').value,
            idUsuario: document.getElementById('id').value
        }
        const ALLADDRESS = new Services('address');
        ALLADDRESS.AddAddressAll(OBJADDRESS);
    } catch (error) {

    }
})


CLIENT.addEventListener('change', () => {
    let param;
    let dataClient;
    param = document.getElementById('id').value;
    if (param == "") {
        document.getElementById('tipoId').value = "";
        document.getElementById('name').value = "";
        document.getElementById('lastName').value = "";
        document.getElementById('email').value = "";
        document.getElementById('phone').value = "";
        document.getElementById('landline').value = "";
        $('#registrarCliente').disabled = false;
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
                document.getElementById('gender').value = data[0].generoUsuario;
                $('#registrarCliente').disabled = true;
            })





        } catch (error) {
            MessageError();
        }
    }
})