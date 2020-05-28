const UserKey = () =>{
    const user = JSON.parse(localStorage.getItem('UserKey'));
    switch (user[0].idTipoUsuario) {
        case 'CallCenter':
            $('#AsignacionIncidente').hide();
            document.getElementById('AsignacionIncidente').style.display ='none';
            break;
        case 'TecnicoPresencial':
            $('#AsignacionIncidente').show();
             document.getElementById('AsignacionIncidente').style.display ='block';
             break;
        default:
            console.log('Error');
    }
 }
UserKey();