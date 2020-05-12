/**
 * @fileoverview Archivo contenido de lógica principal de enrutamiento negocio.
 * @author Juan David Alcala Sanchez
 */

/** DECLARACIÓN CONSTANTES DE DEPENDENCIAS */
const express = require('express');
const app = express();
const path = require('path');
const { config } = require('./config/index');
const walletApi = require('./routes/routes');

// Settings

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');


// Middleware para obtención de datos formato json.
app.use(express.json());
// Uso de función principal de enrutamiento API
app.use(walletApi(app));

// static files
app.use(express.static(path.join(__dirname, 'public')));


// Listening servidor node
app.listen(config.port, function() {
    console.log(`Listening http://localhost:${config.port}`);
});