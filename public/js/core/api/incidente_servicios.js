class Incident {
    constructor() {
    }

    async AddIncident(data) {
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

            response = await fetch('http://localhost:3004/Incidentes', SETTINGS);
            responseData = await response.json();
            return responseData;

        } catch (error) {
            console.log(error);
        }
    }

    async SearchIncidentId( id ) {
        try {
            let response,
                responseData,
                url;
            url = new URL('http://localhost:3004/Incidentes')
            url.search = new URLSearchParams({
                idIncidencia: id 
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

    async SearchIncidentBeenReceived() {
        try {
            let response,
                responseData,
                url,
                count;
            const user = JSON.parse(sessionStorage.getItem('UserKey'));
            count = 0
            url = new URL('http://localhost:3004/Incidentes');
            url.search = new URLSearchParams({
                escalar: user.idTipoUsuario 
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
            for (let i in responseData ){
                count = count + 1;

            }
            return count;

        } catch (error) {
            console.log(error);
        }
    }
    async SearchIncidentAllCount() {
        try {
            debugger;
            let response,
                responseData,
                url,
                count;
            
            const user = JSON.parse(sessionStorage.getItem('UserKey'));
            count = 0
            url = new URL('http://localhost:3004/Incidentes');
            url.search = new URLSearchParams({
                escalar: user.idTipoUsuario ,
                estadoIncidente: 'Finalizado'
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
            for (let i in responseData ){
                count = count + 1;

            }
            return count;

        } catch (error) {
            console.log(error);
        }
    }

    async EditIncident( data , id ) {
        try {
            let response,
                responseData;

            const SETTINGS = {
                method: 'PATCH',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
            };

            response = await fetch('http://localhost:3004/Incidentes'+'/'+id, SETTINGS);
            responseData = await response.json();
            return responseData;

        } catch (error) {
            console.log(error);
        }
    }

}

export default Incident;