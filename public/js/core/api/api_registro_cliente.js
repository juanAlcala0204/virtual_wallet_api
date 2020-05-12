const URL = 'http://localhost:3000/profile';
const BUTTON = document.querySelector('#registrarCliente');
let CLIENT;
let ADDRESS;
const  createData = () => {
     CLIENT = {
        idUsuario : parseInt((Math.random() * 1000), 10),
        nombreUsuario : document.getElementById('id').value ,
        apellidoUsuario : document.getElementById('name').value,
        emailUsuario : document.getElementById('lastName').value,
        celularUsuario : document.getElementById('phone').value,
        telefonoUsuario : document.getElementById('landline').value,
        generoUsuario : document.getElementById('email').value,
        idTipoUsuario  : document.getElementById('gender').value ,
        idResidenciaUsuario : parseInt((Math.random() * 1000), 10),
        direccion:document.getElementById('city').value,
        ciudad :document.getElementById('address').value,
        pais :  document.getElementById('country').value,
        departamento :  document.getElementById('department').value,
        idUsuario :  document.getElementById('id').value
    };
    // ADDRESS = {
    //     idResidenciaUsuario : parseInt((Math.random() * 1000), 10),
    //     direccion:document.getElementById('city').value,
    //     ciudad :document.getElementById('address').value,
    //     pais :  document.getElementById('country').value,
    //     departamento :  document.getElementById('department').value,
    //     idUsuario :  document.getElementById('id').value
    // };   
}


const registrarCliente = () => {

    fetch(URL, {
        method: 'POST',
        body: JSON.stringify(CLIENT),
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors'
    })
    .then((response) => {
        return response.json();
    })
    .then ((data) =>{
        console.log(data);
    })
    

}

BUTTON.addEventListener('click', () => {
    createData();
    registrarCliente();
})