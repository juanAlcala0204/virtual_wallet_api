/** Se importan utilidades para lógica registro Cliente. */
import Services from '../api/servicios.js';
import { MessageAdd, MessageError, cleanFieldsClient } from '../global.js';

/** Declaración objetos HTML de uso incidencia. */
const buttonRegisterClient = document.querySelector('#registrarCliente');
// const idClient = document.querySelector('#id');


/**
 * Función para usar servicio de agregar Cliente
 * @param {object} object / se espera atributos de service y data 
 */
const addClientService = async ({ service, data }) => {
    try {
        const responseAdd = await service.AddClients(data);
        if (responseAdd) {
            MessageAdd();
            cleanFieldsClient();
        } else {
            throw "Error al utilizar servicio agregar cliente";
        }

    } catch (error) {
        console.error("Error : " + error);
    }
}

/**
 * Función para usar servicio de agregar dirección del cliente 
 * @param {object} object / se espera atributos de service y data 
 */
const addAddressService = async ({ service, data }) => {
    try {
        const responseAdd = await service.AddAddress(data);
        if (responseAdd) {
            MessageAdd();
            cleanFieldsClient();
        } else {
            throw "Error al utilizar servicio agregar direccion";
        }

    } catch (error) {
        console.error("Error : " + error);
    }
}

/**
 * Función para usar servicio de buscar Cliente
 * @param {object} object / se espera atributos de service y data
 * @return {Promise} responseSearch
 */
// const searchClientIdService = async ({ service, param }) => {
//     try {

//         const responseSearch = await service.SearchClientId(param);
//         if (responseSearch) {
//             return responseSearch;
//         } else {
//             throw "Error al utilizar busqueda de Cliente";
//         }

//     } catch (error) {
//         console.error("Error : " + error);
//     }


// }
/**
 * Función para manejo de Datos de registro Cliente ( registrados por el usuario )
 * @returns data - retornará los datos del usuario una vez válidados
 */
const dataClient = () => {
    const data = {
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
    return data;
}

/**
 * Función para manejo de Datos de registro Cliente ( registrados por el usuario )
 * @param {string}page el cual se enviaran los datos precisos si es un nuevo cliente o se agrea nueva direccion 
 * @returns  datadataNewClient o dataAddressPopUp- retornará los datos del usuario una vez válidados y
 *           comprobara si se agrega un nuevo cliente o un direccion a cliente existente.
 * 
 */
// const dataAddress = (page) => {
//     switch (page) {
//         case 'newClient':
//             const dataNewClient = {
//                 idResidenciaUsuario: parseInt((Math.random() * 1000), 10),
//                 direccion: document.getElementById('address').value,
//                 ciudad: document.getElementById('city').value,
//                 pais: document.getElementById('country').value,
//                 departamento: document.getElementById('department').value,
//                 idUsuario: document.getElementById('id').value
//             };
//             return dataNewClient
//         case 'addAddressClient':
//             const dataAddressPopUp = {
//                 idResidenciaUsuario: parseInt((Math.random() * 1000), 10),
//                 direccion: document.getElementById('addressAdd').value,
//                 ciudad: document.getElementById('cityAdd').value,
//                 pais: document.getElementById('countryAdd').value,
//                 departamento: document.getElementById('departmentAdd').value,
//                 idUsuario: document.getElementById('id').value
//             }
//             return dataAddressPopUp
//         default:
//             return null;


//     }


// }


/**
 * Función para integrar en los campos los datos del cliente encontrados
 * @param {object} client  
 */
// const fillClientData = (client) => {
//     client.then(data => {
//         for (let i in data) {
//             document.getElementById('tipoId').value = data[i].tipoId;
//             document.getElementById('name').value = data[i].nombreUsuario;
//             document.getElementById('lastName').value = data[i].apellidoUsuario;
//             document.getElementById('email').value = data[i].emailUsuario;
//             document.getElementById('phone').value = data[i].celularUsuario;
//             document.getElementById('landline').value = data[i].telefonoUsuario;
//             document.getElementById('gender').value = data[i].generoUsuario;
//         }
//     })

// }

/**
 * Función para limpiar los campos si no se encuentran datos del cliente
 */
const CleanfieldsChangeClient = () => {
    document.getElementById('tipoId').value = "";
    document.getElementById('name').value = "";
    document.getElementById('lastName').value = "";
    document.getElementById('email').value = "";
    document.getElementById('phone').value = "";
    document.getElementById('landline').value = "";
    document.getElementById('gender').value = "";
}

/**CAPTURA DE EVENTO CLICK RESGITRO DE CLIENTE NUEVO  */
buttonRegisterClient.addEventListener('click', () => {
    const paramsClient = {
        service: new Services('client'),
        data: dataClient()
    }
   // const paramsAddress = {
     //   service: new Services('address'),
       // data: dataAddress('newClient')
    //}
    // Uso función de consumo servicio incidente
    addClientService(paramsClient);
    //addAddressService(paramsAddress);
});


/**CAPTURA DE EVENTO CLICK DE DIRECCION PARA CLIENTES REGISTRADOS */
//buttonAddAddress.addEventListener('click', () => {
  //  const paramsAddress = {
    //    service: new Services('address'),
      ///  data: dataAddress('addAddressClient')
    //}
    // Uso función de consumo servicio  direccion
    //addAddressService(paramsAddress);
//})

/**CAPTURA DE EVENTO CAMBIO DE EL CAMPO DOCUMENTO PARA  TRAER DATOS SI ES UN CLIENTE EXISTENTE */
// idClient.addEventListener('change', () => {
//     const PARAM = document.getElementById('id').value;
//     if (PARAM == "") {
//         CleanfieldsChangeClient();
//     } else {
//         try {
//             const paramsClient = {
//                 service: new Services('client'),
//                 param: PARAM

//             }
//             const client = searchClientIdService(paramsClient);
//             fillClientData(client);
//         } catch (error) {
//             MessageError();
//             console.error("Error : " + error);
//         }
//     }
// })

