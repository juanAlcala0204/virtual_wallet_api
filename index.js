/**
 * @fileoverview Archivo contenido de lógica principal de enrutamiento negocio.
 * @author Juan David Alcala Sanchez
 */

/** DECLARACIÓN CONSTANTES DE DEPENDENCIAS */
const express = require('express');
const app = express();

const { config } = require('./config/index');
const walletApi = require('./routes/wallet');

// Middleware para obtención de datos formato json.
app.use(express.json());
// Uso de función principal de enrutamiento API
walletApi(app);

// Listening servidor node
app.listen(config.port, function() {
    console.log(`Listening http://localhost:${config.port}`);
});