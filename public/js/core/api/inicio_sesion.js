class Session {
    constructor() {
    }

    async login({user , password}) {
        try {
            
            let response,
                responseData,
                url,
                userTechnical;

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
            for (let i in responseData) {
                 userTechnical = {
                    idTipoUsuario:responseData[i].idTipoUsuario,
                    idUsuario:responseData[i].idUsuario
                }
            }
            sessionStorage.setItem('UserKey', JSON.stringify(userTechnical));
            return responseData;

        } catch (error) {
            console.log(error);
        }
    }

   
}
export default Session;