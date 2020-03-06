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

}

module.exports = WalletApi;