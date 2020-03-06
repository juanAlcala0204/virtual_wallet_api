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
    // Método para cargar saldo wallet del Cliente
    async loadSaldoClient( datosClienteCargarWallet ) {
        const loadSaldoResponse = await this.walletService.loadWallet(datosClienteCargarWallet);
        const response =  (loadSaldoResponse) ? true : false; 

        return response;
    }
    // Método para crear pago cliente
    async payBuyClient( datosClienteCargarWallet ) {
        let response;
        const giveTokenBuy = await this.walletService.generateToken();
        const giveIdSession = await this.walletService.idSession( datosClienteCargarWallet );
        const datosPago = {
            ...datosClienteCargarWallet,
            token: giveTokenBuy,
            sesion: giveIdSession
        }
        if (giveIdSession) {
            const creacionPago = await this.mongoDB.create('pagos',datosPago);
            if (creacionPago['response'] == true){
                response = {
                    token: giveTokenBuy,
                    sesion: giveIdSession
                }
            } 
        } 

        return response;
    }
    // Método para consultar saldo Wallet Cliente
    async searchSaldoCliente(datosCliente) {
        const searchSaldoClienteResponse = await this.walletService.loadSaldo(datosCliente);
        
        return searchSaldoClienteResponse;
    }

    // Método para confirmar Pago cliente
    async confirmPayClient(datosCliente) {
        const validacionDatos = await this.walletService.validateDates(datosCliente);
        const datosClientePay = {
            ...validacionDatos['dates'],
            documento: datosCliente['documento']
        }
        if (validacionDatos['response'] == true) {
            await this.walletService.payBuy(datosClientePay);
            return {response: 'Se confirmo pago correctamente'}
        }
        return {response: 'Hubo un error al confirmar el pago'};
    }
}


module.exports = ClientService;