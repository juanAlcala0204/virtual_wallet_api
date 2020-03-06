/**
 * @fileoverview Archivo contenido de servicio cliente.
 * @author Juan David Alcala Sanchez
 */

/** DECLARACIÓN LIBRERÍA MONGO */
const MongoLib = require('../lib/mongo');

/** DECLARACIÓN SERVICIO WALLET */
const WalletService = require('./wallet');

/** CREACIÓN CLASE CLIENTE SERVICIÓ, METODOS PARA INTERACCIÓN CON CLIENTE */
class ClientService {
    constructor() {
        this.collection = 'clientes';
        this.mongoDB = new MongoLib();
        this.walletService = new WalletService();
    }
    // Método para Registro cliente.
    async createClient( datosCliente ) {
        const createClientId = await this.mongoDB.create(this.collection, datosCliente);
        const createWallet = await this.walletService.createWallet( datosCliente );
        const response =  (createWallet) ? createClientId['id'] : false; 
        
        return response;
    }

    async loadSaldoClient( datosClienteCargarWallet ) {
        console.log(datosClienteCargarWallet);
        const loadSaldoResponse = await this.walletService.loadWallet(datosClienteCargarWallet);
        const response =  (loadSaldoResponse) ? true : false; 

        return response;
    }
}


module.exports = ClientService;