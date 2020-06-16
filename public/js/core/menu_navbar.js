


/**
 * Funcion las cual da accesos a los diferentes menus a el tecnico dependiendo de que tipo de tecnico es
 */
const UserKey = () => {
    const user = JSON.parse(sessionStorage.getItem('UserKey'));
    switch (user.idTipoUsuario) {
        case 'CallCenter':
            $('#AsignacionIncidente').hide();
            document.getElementById('AsignacionIncidente').style.display = 'none';
            break;
        case 'TecnicoPresencial':
            $('#AsignacionIncidente').show();
            document.getElementById('AsignacionIncidente').style.display = 'block';
            break;
        case 'TecnicoLider':
            $('#estadisticas').show();
            document.getElementById('estadisticas').style.display = 'block';
            break;
        default:
            console.log('Error');
    }
}
UserKey();

