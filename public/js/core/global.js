
var the_Function = function (cell, formatterParams, onRendered) { //plain text value
    return '<button class="btn btn-success btn-sm text-right" data-toggle="modal" data-target="#modal-address"><i class="fa fa-location-arrow" style="margin-right: 5px;" ></i>Seleccionar</button>';
};

const LOGOUT = document.querySelector('#logout');

function MessageAdd(page) {
     toastr.success(`Se agrego el ${page} correctamente `);
}

function MessageError(){
     toastr.error('Ocurrio un error');
}

function cleanFieldsIncidents() {
     document.getElementById('tipoId').value = "";
     document.getElementById('name').value = "";
     document.getElementById('lastName').value = "";
     document.getElementById('email').value = "";
     document.getElementById('phone').value = "";
     document.getElementById('landline').value = "";
     document.getElementById('date').value = "";
     document.getElementById('definitionProblem').value = "";
     document.getElementById('identificationProblem').value = "";
     document.getElementById('state').value = "Seleccionar Estado";
     document.getElementById('id').value = "";
     document.getElementById('indenceType').value = " Seleccionar tipo de incidente";
     document.forms['access']['dropdownList'].checked = false;
     document.getElementById('showHideTechnical').style.display = 'none';
}

function cleanFieldsClient() {
     document.getElementById('tipoId').value = "";
     document.getElementById('id').value = "";
     document.getElementById('name').value = "";
     document.getElementById('lastName').value = "";
     document.getElementById('email').value = "";
     document.getElementById('phone').value = "";
     document.getElementById('landline').value = "";
     document.getElementById('address').value = "";
     document.getElementById('city').value  = "";
     document.getElementById('country').value = "";
     document.getElementById('department').value = "";

}

function functionCreateActionButton(cell, formatterParams, onRendered) { //plain text value
     let htmlButton,
         fail = {
             blockFail: '',
             msgFail: ''
         };
     try {
         switch (formatterParams['type']) {
             case 'Edit':
                 htmlButton = '<button class="btn btn-warning btn-sm text-right" style="color: white;" data-toggle="modal" data-target="#modal-lg"><i class="fas fa-edit"></i></button>';
                 return htmlButton;
             case 'Info':
                 htmlButton = '<button class="btn btn-info btn-sm text-right"  data-toggle="modal" data-target="#modal-info"><i class="fas fa-eye"></i></button>';
                 return htmlButton;
             case 'Delete':
                 htmlButton = '<button class="btn btn-danger btn-sm text-right"><i class="fas fa-trash-alt"></i></button>';
                 return htmlButton;
             default:
                 fail['blockFail'] = 'Creacion Error botones.';
                 fail['msgFail'] = 'Error al generar botones de Acción sobre datos en la tabla, el posible caso de cración no esta contemplado en el switch.';
                 throw fail;
         };
     } catch (fail) {
         if (typeof fail === 'object') console.error(`Error presentado en el bloque ${fail['blockFail']}, mensaje error: ${fail['msgError']}`);
         alert('Se ha presentado un error, por favor comunicarse con SUPPORT SHILOT.');
         return false;
     }
 };

 function UserKey(){

    const USER = JSON.parse(localStorage.getItem('UserKey'));
    switch (USER[0].idTipoUsuario) {
        case 'CallCenter':
            $('#AsignacionIncidente').hide();
            document.getElementById('AsignacionIncidente').style.display ='none';
            break;
        case 'TecnicoPresencial':
            $('#AsignacionIncidente').show();
             document.getElementById('AsignacionIncidente').style.display ='block';
             break;
        default:
            console.log('QUE BOBADA');
    }
 }


export { the_Function, MessageAdd, MessageError, cleanFieldsClient, cleanFieldsIncidents, functionCreateActionButton };