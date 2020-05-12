const URL = 'http://localhost:3000/comments';
const BUTTON = document.querySelector('#registrarIncidencia');
let DATA
const  createData = () => {
     INCIDENT = {
        idIncidencia  : parseInt((Math.random() * 1000), 10) ,
        fechaCapturaIncidente : document.getElementById('date').value,
        definicionProblema : document.getElementById('definitionProblem').value ,
        identificacionProblema : document.getElementById('identificationProblem').value ,
        finalizacionIncidente : "0",
        diasIncidente  : "0",
        estadoIncidente : document.getElementById('state').value ,
        idUsuario : document.getElementById('id').value ,
        tipoIncidente : document.getElementById('indenceType').value
    }
}


const registrarIncidencia = () => {

    fetch(URL, {
        method: 'POST',
        body: JSON.stringify(INCIDENT),
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
    registrarIncidencia();
})