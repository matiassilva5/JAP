//Se guarda en el localStorage los datos ingresados por el usuario en el login
function guardar(inputEmail, inputPassword) {

  if (inputEmail != "" && inputPassword != "") {//Chequeo que se haya ingresado un usuario y contraseña  
    localStorage.setItem("usuario", inputEmail); //setItem almacena el usuario en la posición "usuario"
    localStorage.setItem("password", inputPassword); // Almaceno la contraseña de la misma manera
    //sessionStorage.setItem("usuario", inputEmail);
  }

}

//Esta funcion es llamada cuando el usuario confirma que quiere loguearse
function confirmar() {
//Se verifica que el usuario realmente quiera recordar sus datos para un futuro ingreso al sitio
  var checkbox = document.getElementById('recuerda');
  var email = document.getElementById('inputEmail').value;
  var contrasenia = document.getElementById('inputPassword').value;
  if (checkbox.checked) {
    guardar(email.trim(), contrasenia.trim());
  }
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  /*if(localStorage.getItem("usuario")){
        //getItem obtiene el dato almacenado en la posición "usuario"

location.href = "home.html";
}*/
})



