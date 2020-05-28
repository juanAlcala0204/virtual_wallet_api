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



}

export default Technical;