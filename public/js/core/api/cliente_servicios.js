
class Client extends Data{

    constructor() {
        super();
    }

    async AddClients() {
        let response;
        let data;
        const CLIENTE = this.DataClient();
        const SETTINGS = {
            method: 'POST',
            body: JSON.stringify(CLIENTE),
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        };

        try {
            response = await fetch('http://localhost:3000/Usuarios', SETTINGS);
            data = await response.json();
            return data;
        } catch (error) {
            console.log(error)
        }
    }

    async SearchClient(param,TipoUsuario) {
        let url ;
        let response;
        let data;
        url= new URL('http://localhost:3000/Usuarios')
        url.search = new URLSearchParams({
            idUsuario: param,
            idTipoUsuario:TipoUsuario
        })
        const SETTINGS = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        };
        try {
            response = await fetch(url, SETTINGS);
            data = await response.json();
            return data;
        } catch (error) {
            console.log(error)
        }
    }

    async SearchClientType(TipoUsuario) {
        let url ;
        let response;
        let data;
        url= new URL('http://localhost:3000/Usuarios')
        url.search = new URLSearchParams({
            idTipoUsuario:TipoUsuario
        })
        const SETTINGS = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        };
        try {
            response = await fetch(url, SETTINGS);
            data = await response.json();
            return data;
        } catch (error) {
            console.log(error)
        }
    }

}

