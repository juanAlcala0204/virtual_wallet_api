/**
 * @fileoverview Archivo contenido de servicio cliente.
 * @author Juan David Alcala Sanchez
 */

/** DECLARACIÓN LIBRERÍA MONGO */
const MongoLib = require('../lib/mongo');

/** CREACIÓN CLASE CLIENTE SERVICIÓ, METODOS PARA INTERACCIÓN CON CLIENTE */
class ClientService {
    constructor() {
        this.collection = 'clientes';
        this.mongoDB = new MongoLib();
    }
    // Método para Registro cliente.
    async createClient( datosCliente ) {
        const createClientId = await this.mongoDB.create(this.collection, datosCliente);
        return createClientId;
    }
}


module.exports = ClientService;