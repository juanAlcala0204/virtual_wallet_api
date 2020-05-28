/** Se importan utilidades para lógica registro Cliente. */
import Services from '../api/servicios.js'; 

/** Declaración objetos HTML de uso incidencia. */
const inputs = document.querySelectorAll(".input");
const buttonLogin = document.querySelector("#login");


/**
 * Función para agregar animacion de de focus a al ingreso de los datos Password y user 
 */
function addFocus() {
	let parent = this.parentNode.parentNode;
	parent.classList.add("focus");
}


/**
 * Función para remover animacion de de focus a al ingreso de los datos Password y user 
 */
function removeFocus() {
	let parent = this.parentNode.parentNode;
	if (this.value == "") {
		parent.classList.remove("focus");
	}
}
/**
 * Función para usar servicio de login de tecnico en pagina
 * @param {object} object / se espera atributos de service y data 
 */
const login = async ({ service, data }) => {
    try {
        const responseLogin = await service.login(data);
        if (responseLogin) {
			return responseLogin;
        } else {
            throw "Error al utilizar servicio agregar incidencia";
        }

    } catch (error) {
        console.error("Error : " + error);
    }
}

/**
 * Función que verifica si el user y la contraseña esten correctos 
 * @param {Promise} user 
 */
const userVerification = (user) =>{
	user.then ( data =>  {
		if (data.length === 0){
			document.getElementById('incorrectoLogin').style.display ='block';
		}else {
			window.location.href ='/'
		}
				
	})	
}
/**
 * Función para guardar lso datos que saquen del campo user y password
 */
const dataUser = () =>{
	const  user = {
		user: document.getElementById('email').value ,
		password : document.getElementById('password').value
	}
	return user;
}

/**
 * Uso de ForEach para Integracion de función addFocus y removeFocus para los campos user y password
 */
inputs.forEach(input => {
	input.addEventListener("focus",addFocus);
	input.addEventListener("blur", removeFocus);
});

/** CAPTURA DE VENTO CLICK PARA INGRESAR A LA PAGINA COMO TECNICO  */
buttonLogin.addEventListener('click', () => {
	const paramUser = {

		service : new Services('login'),
		data: dataUser()

	}
	const user = login(paramUser);
	userVerification(user);
})