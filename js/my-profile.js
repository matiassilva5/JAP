function save(){
	let datos = {
		pNombre: document.getElementById("primerNombre").value,
		sNombre: document.getElementById("segundoNombre").value,
		pApellido: document.getElementById("primerApellido").value,
		sApellido: document.getElementById("segundoApellido").value,
		email: document.getElementById("emailPerfil").value,
		telefono: document.getElementById("telefono").value
	}	
	localStorage.setItem("datos", JSON.stringify(datos));
}



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
	if (localStorage.getItem("datos") != null){
		let datos = JSON.parse(localStorage.getItem("datos"));
		//console.log(datos);
		document.getElementById("primerNombre").value = datos.pNombre;
		document.getElementById("segundoNombre").value = datos.sNombre;
		document.getElementById("primerApellido").value = datos.pApellido;
		document.getElementById("segundoApellido").value = datos.sApellido;
		document.getElementById("emailPerfil").value = datos.email;
		document.getElementById("telefono").value = datos.telefono;
	}
});

