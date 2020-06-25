
class Client {

    constructor() {
    }

    async AddClients( data ) {
        try {
            let response,
                responseData;

            const SETTINGS = {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
            };

            response = await fetch('http://localhost:3004/Clientes', SETTINGS);
            responseData = await response.json();
            return responseData;

        } catch (error) {
            console.log(error);
        }
    }

    async SearchClientId( param ) {
        try {
            let response,
                responseData,
                url;

            url = new URL('http://localhost:3004/Clientes')
            url.search = new URLSearchParams({
                idUsuario: param,
            })
            const SETTINGS = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
            };

            response = await fetch(url, SETTINGS);
            responseData = await response.json();
            return responseData;

        } catch (error) {
            console.log(error);
        }
    }

    async SearchClientAllCount( ) {
        try {
            let response,
                responseData,
                url
                ,count;

            count = 0 ;    

            url = new URL('http://localhost:3004/Clientes');
            const SETTINGS = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
            };

            response = await fetch(url, SETTINGS);
            responseData = await response.json();
            for (let i in responseData ){
                count = count + 1;

            }
            return count;

        } catch (error) {
            console.log(error);
        }
    }
   

}
export default Client;
