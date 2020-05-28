class Address {

    constructor() {
    }

    async AddAddress( data ) {
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

            response = await fetch('http://localhost:3004/Residencia', SETTINGS);
            responseData = await response.json();
            return responseData;

        } catch (error) {
            console.log(error);
        }
    }

}

export default Address;