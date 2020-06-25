class Technical {
    constructor() {
    }
    async SearchTechnicalAll() {
        try {
            let response,
                responseData;

            const SETTINGS = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
            };

            response = await fetch('http://localhost:3004/Tecnico', SETTINGS);
            responseData = await response.json();
            return responseData;

        } catch (error) {
            console.log(error);
        }
    }
    async SearchTechnicalGroup( group) {
        try {
            let response,
                responseData,
                url;

                url = new URL('http://localhost:3004/Tecnico')
                url.search = new URLSearchParams({
                   TipoTecnico: group 
                });

            const SETTINGS = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
            };

            response = await fetch('http://localhost:3004/Tecnico', SETTINGS);
            responseData = await response.json();
            return responseData;

        } catch (error) {
            console.log(error);
        }
    }
    async SearchTechnicalId( id ) {
        try {
            let response,
                responseData,
                url;

                url = new URL('http://localhost:3004/Tecnico')
                url.search = new URLSearchParams({
                    idUsuario: id 
                });
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




}




export default Technical;