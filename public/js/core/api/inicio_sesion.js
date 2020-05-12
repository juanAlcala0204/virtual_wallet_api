class session extends Data {
    constructor() {
        super();
    }

    async IniciarSesion() {
        let url;
        let response;
        let data;
        let required;
        required = this.DataLogin();
        url = new URL('http://localhost:3000/UsuariosApp')
        url.search = new URLSearchParams({
            nameUser: required.nameUser,
            password: required.password
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
            localStorage.setItem('UserKey', JSON.stringify(data));
            return data;
        } catch (error) {
            console.log(error)
        }


    }

   
}