/**
 * @fileoverview Archivo contenido de lógica principal de enrutamiento negocio.
 * @author Juan David Alcala Sanchez
 */

/** DECLARACIÓN CONSTANTES DE DEPENDENCIAS */
const express = require('express');
const ClientService = require('../service/client');

/**
 *  FUNCIONALIDAD PRINCIPAL DE ENRUTAMIENTO API Y CONSUMO DE CAPA DE SERVICIOS
 * @param app // Recibe la app de express como parámetro
 */
function WalletApi( app ) {
    const router = express.Router();
    app.use('/api/wallet', router);
    // Declaración Servicio cliente
    const clientService = new ClientService(); 
    
    /** CREACIÓN ENRUTAMIENTO FUNCIONALIDAD CREACIÓN CLIENTE */
    router.post('/', async function( req, res, next ) {
        // Obtención paramentros
        const { body: client } = req;
        try {
            // Envió de parámetros a capa de servicios.
            const createdClient = await clientService.createClient(client);
            if (createdClient){
                res.status(201).json({
                    data: createdClient,
                    message: 'Cliente Creado'
                });
            }
            
        } catch (error) {
            // Control errores.
            next(error);
        }
    });

    /** CREACIÓN ENRUTAMIENTO FUNCIONALIDAD RECARGA DE SALDO */
    router.patch('/:documento', async function( req, res, next ) {
        // Obtención parámetro url
        const { documento } = req.params;
        // Obtención paramentro Cuerpo peticion
        const { valor } = req.body;
        // Datos a enviar al servicio ( Se envia el valor a actualizar como un objeto de objetos donde el indice del valor a cambiar debe ser el mismo campo en bd)
        const clientDates = {
            documento: documento,
            valor: {valor: valor}
        }
        try {
            // Envió de parámetros a capa de servicios.
            const loadWalletClient = await clientService.loadSaldoClient(clientDates);
            if (loadWalletClient){
                res.status(200).json({
                    data: loadWalletClient,
                    message: 'Recarga Exitosa'
                });
            }
            
        } catch (error) {
            // Control errores.
            next(error);
        }
    });

    /** CREACIÓN ENRUTAMIENTO FUNCIONALIDAD CONSULTA SALDO */
    router.get('/:documento', async function( req, res, next ) {
        // Obtención parámetro url
        const { documento } = req.params;
        // Obtención paramentro Cuerpo peticion
        const { celular } = req.body;
        // Datos a enviar al servicio,
        /**
         * Se adjunta en nuestro objeto a enviar al servicio, el documento y celular, porque se dbee validar que sean iguales
         */
        const clientDates = {
            documento: documento,
            celular: celular
        }
        try {
            // Envió de parámetros a capa de servicios.
            const loadWalletClient = await clientService.searchSaldoCliente(clientDates);
            if (loadWalletClient){
                res.status(200).json({
                    data: {
                        saldoBilletera:loadWalletClient['clienteInfo']['valor']
                    },
                    message: 'Información saldo'
                });
            }
            
        } catch (error) {
            // Control errores.
            next(error);
        }
    });

    /** CREACIÓN ENRUTAMIENTO FUNCIONALIDAD CREAR PAGO */
    router.post('/pagar/:documento', async function( req, res, next ) {
        // Obtención parámetro url
        const { documento } = req.params;
        // Obtención paramentro Cuerpo peticion
        const { valorCompra } = req.body;
        // Datos a enviar al servicio ( Se envia el valor a actualizar como un objeto de objetos donde el indice del valor a cambiar debe ser el mismo campo en bd)
        const clientDates = {
            documento: documento,
            valorCompra: valorCompra
        }
        try {
            // Envió de parámetros a capa de servicios.
            const loadWalletClient = await clientService.payBuyClient(clientDates);
            if (loadWalletClient){
                res.status(200).json({
                    data: loadWalletClient,
                    message: 'Se creo la solicitud de pago'
                });
            }
            
        } catch (error) {
            // Control errores.
            next(error);
        }
    });

    /** CREACIÓN ENRUTAMIENTO FUNCIONALIDAD CONFIRMAR PAGO */
    router.patch('/confirmarPay/:documento', async function( req, res, next ) {
        // Obtención parámetro url
        const { documento } = req.params;
        // Obtención paramentro Cuerpo peticion
        const { idSesion, token } = req.body;
        // Datos a enviar al servicio ( Se envia el valor a actualizar como un objeto de objetos donde el indice del valor a cambiar debe ser el mismo campo en bd)
        const clientDates = {
            documento: documento,
            idSesion: idSesion,
            token: token
        }
        try {
            // Envió de parámetros a capa de servicios.
            const loadWalletClient = await clientService.confirmPayClient(clientDates);
            if (loadWalletClient){
                res.status(200).json({
                    data: loadWalletClient,
                    message: 'Pago Confirmado'
                });
            }
            
        } catch (error) {
            // Control errores.
            next(error);
        }
    });
}

module.exports = WalletApi;