//Se acciona cuando se selecciona la imagen
function previewFile() {
	let preview = document.getElementById("foto"); //contenedor de la imagen
	let file = document.getElementById("inputFoto").files[0]; 

	let reader = new FileReader(); //instancia del objeto

	//se acciona cuando se selecciona la imagen
	reader.onloadend = function () {
		preview.src = reader.result;
	}

	//si file no tiene una imagen seleccionada, se pone imagen por defecto
	if (file) {
		reader.readAsDataURL(file);
	} else {
		preview.src = "https://i.ibb.co/NFJM7W5/Figura-2-Avatar-que-aparece-por-defecto-en-Facebook.png";
	}
}

//guarda los datos del perfil del usuario en el localstorage
function guardarDatos() {
	let preview = document.getElementById("foto");
	let datos = {
		pNombre: document.getElementById("primerNombre").value,
		sNombre: document.getElementById("segundoNombre").value,
		pApellido: document.getElementById("primerApellido").value,
		sApellido: document.getElementById("segundoApellido").value,
		email: document.getElementById("emailPerfil").value,
		telefono: document.getElementById("telefono").value,
		imagen: preview.src
	}
	localStorage.setItem("datos", JSON.stringify(datos));
}

//se acciona cuando se ingresa a la pagina para mostrar los datos que el usuario tiene guardados
function mostrarDatos() {
	let preview = document.getElementById("foto");
	if (localStorage.getItem("datos") != null) {
		let datos = JSON.parse(localStorage.getItem("datos"));
		//console.log(datos);
		document.getElementById("primerNombre").value = datos.pNombre;
		document.getElementById("segundoNombre").value = datos.sNombre;
		document.getElementById("primerApellido").value = datos.pApellido;
		document.getElementById("segundoApellido").value = datos.sApellido;
		document.getElementById("emailPerfil").value = datos.email;
		document.getElementById("telefono").value = datos.telefono;
		preview.src = datos.imagen;
	} else {
		preview.src = "https://i.ibb.co/NFJM7W5/Figura-2-Avatar-que-aparece-por-defecto-en-Facebook.png";
	}
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
	mostrarDatos();
});

