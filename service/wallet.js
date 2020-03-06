/**
 * @fileoverview Archivo contenido de servicio cliente.
 * @author Juan David Alcala Sanchez
 */

/** DECLARACIÓN LIBRERÍA MONGO */
const MongoLib = require('../lib/mongo');

/** CREACIÓN CLASE CLIENTE SERVICIÓ, METODOS PARA INTERACCIÓN CON CLIENTE */
class WalletService {
    constructor() {
        this.collection = 'billetera';
        this.mongoDB = new MongoLib();
    }
    // Método para Registro cliente.
    async createWallet({ documento, celular }) {
        let datosWallet = {
            documento: documento,
            celular: celular,
            valor: 0
        }
        const createWallet = await this.mongoDB.create(this.collection, datosWallet);
        return createWallet['response'];
    }
}


module.exports = WalletService;