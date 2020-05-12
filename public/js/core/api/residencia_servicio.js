class Address extends Data {

    constructor() {
        super();
    }

    async AddAddress() {
        let response;
        let data;
        const ADDRESS = this.DataAddress();
        const SETTINGS = {
            method: 'POST',
            body: JSON.stringify(ADDRESS),
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        };

        try {
            response = await fetch('http://localhost:3000/Residencia', SETTINGS);
            data = await response.json();
            return data;
        } catch (error) {
            console.log(error)
        }
    }

    async SearchAddress(params) {
        let url ;
        let response;
        let data;
        url= new URL('http://localhost:3000/Residencia')
        url.search = new URLSearchParams({
            idUsuario : params
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

    async AddAddressAll(obj) {
        let response;
        let data;
        const ADDRESS = obj;
        const SETTINGS = {
            method: 'POST',
            body: JSON.stringify(ADDRESS),
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        };

        try {
            response = await fetch('http://localhost:3000/Residencia', SETTINGS);
            data = await response.json();
            return data;
        } catch (error) {
            console.log(error)
        }
    }
}

