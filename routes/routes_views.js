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

    router.get('/registrarCliente', async function( req, res, next ) {
        res.render('registro_cliente.html');
    });

    router.get('/historialIncidencia', async function( req, res, next ) {
        res.render('historial_incidencia.html');
    });

    router.get('/historialCliente', async function( req, res, next ) {
        res.render('historial_cliente.html');
    });

    router.get('/asignacionesTecnico', async function( req, res, next ) {
        res.render('asignaciones_tecnicos.html');
    });

    router.get('/login', async function( req, res, next ) {
        res.render('login.html');
    });

    router.get('/estadisticas', async function( req, res, next ) {
        res.render('estadisticas.html');
    });
   
}

module.exports = RoutesViews;