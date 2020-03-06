const EXPRESS = require('express');
const APP = EXPRESS();

const { CONFIG } = require('./config/index');

APP.get('/', function(req, res){
    res.send("Hello world");
});

APP.get('/json', function(req, res){
    res.send({ hello: 'world' });
});

APP.listen(CONFIG.port, function() {
    console.log(`Listening http://localhost:${CONFIG.port}`);
});