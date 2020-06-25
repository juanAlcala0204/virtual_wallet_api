import Services from '../api/servicios.js';

const logout = document.querySelector('#logout');

const searchClientallCountService = async ({ service}) => {
    try {

        const responseSearch = await service.SearchClientAllCount();
        if (responseSearch) {
            return responseSearch;
        } else {
            throw "Error al utilizar busqueda de Cliente";
        }

    } catch (error) {
        console.error("Error : " + error);
    }


}


const searchIncidentAllCountService = async ({ service}) => {
    try {

        const responseSearch = await service.SearchIncidentAllCount();
        if (responseSearch) {
            return responseSearch;
        } else {
            throw "Error al utilizar busqueda de Cliente";
        }

    } catch (error) {
        console.error("Error : " + error);
    }

}

    const searchIncidentBeenReceivedCountService = async ({ service}) => {
        try {
    
            const responseSearch = await service.SearchIncidentBeenReceived();
            if (responseSearch) {
                return responseSearch;
            } else {
                throw "Error al utilizar busqueda de Cliente";
            }
    
        } catch (error) {
            console.error("Error : " + error);
        }


}

const searchTechnicalSessionService = async ({ service , param}) => {
    try {
        const responseSearch = await service.SearchTechnicalId(param);
        if (responseSearch) {
            return responseSearch;
        } else {
            throw "Error al utilizar busqueda de Cliente";
        }

    } catch (error) {
        console.error("Error : " + error);
    }


}
const countClient =  async () => {
    const paramsClient = {
        service: new Services('client')

    }
    const client =  await searchClientallCountService(paramsClient);
    document.getElementById('clientesRegistrados').innerText = client;

}


const countIncident =  async () => {
    const paramsIncident = {
        service: new Services('incident')

    }
    const incident =  await searchIncidentAllCountService(paramsIncident);
    document.getElementById('historialRegistrado').innerText = incident;

}

const countIncidentBeenReceived =  async () => {
    const paramsIncidentBeenReceived = {
        service: new Services('incident')

    }
    const incidentBeenReceived =  await searchIncidentBeenReceivedCountService(paramsIncidentBeenReceived);
    document.getElementById('incidentesRecibidos').innerText= incidentBeenReceived;

}

const userTechnical = async () =>{
    const user = JSON.parse(sessionStorage.getItem('UserKey'));
    const paramsTechnical = {
        service: new Services('technical'),
        param: user.idUsuario
    }
    const technicalSession =  await searchTechnicalSessionService(paramsTechnical);
    for (let i in technicalSession ){
    document.getElementById('fullName').innerText = `${technicalSession[i].nombreUsuario} ${technicalSession[i].apellidoUsuario}`; 
    document.getElementById('tipoTecnico').innerText = user.idTipoUsuario;
    document.getElementById('email').innerHTML = `<span class="fa-li"><i class="fas fa-lg fa-building"></i></span> Correo: ${technicalSession[i].emailUsuario}`;
    document.getElementById('phone').innerHTML =`<span class="fa-li"><i class="fas fa-lg fa-phone"></i></span> Phone : ${technicalSession[i].celularUsuario}`; 
   
    }
}
countClient();
countIncident();
countIncidentBeenReceived();
userTechnical();
document.getElementById('estadisticasRegistradas').innerText = 2;

logout.addEventListener('click',() =>{

    sessionStorage.clear();
});
