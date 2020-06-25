import Services from '../core/api/servicios.js';
/**
 * Funcion las cual da accesos a los diferentes menus a el tecnico dependiendo de que tipo de tecnico es
 */
const UserKey = () => {
    const user = JSON.parse(sessionStorage.getItem('UserKey'));
    switch (user.idTipoUsuario) {
        case 'Call Center':
            $('#AsignacionIncidente').hide();
            document.getElementById('AsignacionIncidente').style.display = 'none';
            break;
        case 'Tecnico Presencial':
            $('#AsignacionIncidente').show();
            document.getElementById('AsignacionIncidente').style.display = 'block';
            break;
        case 'Tecnico Lider':
            $('#estadisticas').show();
            document.getElementById('estadisticas').style.display = 'block';
            break;
        case 'Tecnico Nivel 2' :
            document.getElementById('AsignacionIncidente').style.display = 'block';
        default:
            console.log('Error');
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

const userTechnical = async () =>{
    const user = JSON.parse(sessionStorage.getItem('UserKey'));
    const paramsTechnical = {
        service: new Services('technical'),
        param: user.idUsuario
    }
    const technicalSession =  await searchTechnicalSessionService(paramsTechnical);
    for (let i in technicalSession ){
    document.getElementById('fullNameMenuBar').innerText = `${technicalSession[i].nombreUsuario} ${technicalSession[i].apellidoUsuario}`; 
    }
}
userTechnical();
UserKey();

