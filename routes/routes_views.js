/**
 * @fileoverview Archivo contenido de lógica principal de enrutamiento negocio.
 * @author Juan David Alcala Sanchez
 */

/** DECLARACIÓN CONSTANTES DE DEPENDENCIAS */
const express = require('express');

function RoutesViews( router ) {
    
    router.get('/', async function( req, res, next ) {
        res.render('index.html');
    });

    router.get('/registrarIncidencia', async function( req, res, next ) {
        res.render('registro_incidencia.html');
    });
}

module.exports = RoutesViews;