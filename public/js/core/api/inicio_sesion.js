class Session {
    constructor() {
    }

    async login({user , password}) {
        try {
            let response,
                responseData,
                url;

            url = new URL('http://localhost:3004/Usuarios')
            url.search = new URLSearchParams({
                nameUser: user,
                password: password
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
            localStorage.setItem('UserKey', JSON.stringify(responseData));
            return responseData;

        } catch (error) {
            console.log(error);
        }
    }

   
}
export default Session;