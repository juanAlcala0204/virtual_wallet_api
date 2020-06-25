class TypeTechnical {
    constructor() {
    }
    async SearchTypeTechnicalAll() {
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

            response = await fetch('http://localhost:3004/TipoTecnico', SETTINGS);
            responseData = await response.json();
            return responseData;

        } catch (error) {
            console.log(error);
        }
    }
    async SearchTypeTechnicalId( name ) {
        try {
            let response,
                responseData,
                url;

                url = new URL('http://localhost:3004/TipoTecnico')
                url.search = new URLSearchParams({
                    area: name
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




export default TypeTechnical;