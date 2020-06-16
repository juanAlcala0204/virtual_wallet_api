import Incident from './incidente_servicios.js'; 
import Client from './cliente_servicios.js';
import Technical from './tecnico_servicios.js';
import Address from './residencia_servicio.js';
import Session from './inicio_sesion.js'

class Services {
    constructor(page) {
        
        switch (page) {
            case 'client':
                return new Client();
            case 'address':
                return new Address();
            case 'incident':
                return new Incident();
            case 'login':
                return new Session();
            case 'technical':
                return new Technical();
            default:
                return null;
        }

    }
}

export default Services;
