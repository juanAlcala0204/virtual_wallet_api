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
    // Método para Recargar saldo
    async loadWallet({ documento, valor } = {}) {
        const loadWalletResponse = await this.mongoDB.update(this.collection, documento, valor);
        return loadWalletResponse['response'];
    }
    // Método para consultar Saldo Wallet
    async loadSaldo({ documento, celular }) {
        const response = (documento == celular) ? await this.mongoDB.getSaldo(this.collection, documento) : {response : false, msg:'Debe coincidir el documento y el celular'} 
        return response;        
    }
    // Método para generar token
    async generateToken() {
        const randomToken =  Math.random().toString(36).substring(7);
        return randomToken;
    }
    // Método para generar isSesion
    async idSession({ documento }) {
        const idSession =  await this.mongoDB.generateSession('clientes', documento);
        return idSession;
    }
    // Método para validar datos ( confirmar pago )
    async validateDates({ idSesion, token }) {
        const giveDates =  await this.mongoDB.giveTokenPay('pagos', token);
        if ( idSesion == giveDates['sesionUser']) {

            delete giveDates['sesionUser'];
            
            return {response: true, dates: giveDates};
        }
        return false;
    }
    // Método para pagar Compra y descontar de la wallet
    async payBuy(dates) {
        const valorWallet = await this.mongoDB.getSaldo(this.collection,dates['documento'] );
        const valorSaldoNuevo = {
            valor: valorWallet['clienteInfo']['valor'] - dates['valorCompra']
        }
        const payConfirm =  await this.mongoDB.update(this.collection,dates['documento'], valorSaldoNuevo);
        return payConfirm;
    }
}


module.exports = WalletService;