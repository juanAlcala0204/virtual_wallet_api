/**
 * @fileoverview Archivo contenido de servicio cliente.
 * @author Juan David Alcala Sanchez
 */

/** DECLARACIÓN LIBRERÍA MONGO */
const MongoLib = require('../lib/mongo');

/** DECLARACIÓN SERVICIO WALLET */
const WalletService = require('./wallet');

/** CREACIÓN CLASE CLIENTE SERVICIÓ, METODOS PARA INTERACCIÓN CON CLIENTE */
class IncidentService {
    constructor() {
        this.collection = 'incidente';
        this.mongoDB = new MongoLib();
        this.walletService = new WalletService();
    }

    // Método para Registro incidente.
    async createIncident( datosIncidente ) {

        const createIncidentId = await this.mongoDB.create(this.collection, datosIncidente);   
        const response =  (createIncidentId) ? createIncidentId['id'] : false; 
        
        return response;
    }

}


module.exports = IncidentService;