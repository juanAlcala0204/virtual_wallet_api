const inputs = document.querySelectorAll(".input");
const BUTTONLOGIN = document.querySelector("#login");

function addcl() {
	let parent = this.parentNode.parentNode;
	parent.classList.add("focus");
}

function remcl() {
	let parent = this.parentNode.parentNode;
	if (this.value == "") {
		parent.classList.remove("focus");
	}
}


inputs.forEach(input => {
	input.addEventListener("focus", addcl);
	input.addEventListener("blur", remcl);
});


BUTTONLOGIN.addEventListener('click', () => {

	const ALLADDRESS = new Services('login');
	const SESSION = ALLADDRESS.IniciarSesion();
	SESSION.then(data =>{
		if (data === undefined){
			document.getElementById('incorrectoLogin').style.display ='block';
		}else {
			window.location.href ='../index.html'
		}
	})
})