//Se guarda en el localStorage los datos ingresados por el usuario en el login
function guardar(check, inputUsuario, inputPassword) {
  if (check.checked) {
    localStorage.setItem("usuario", inputUsuario); //setItem almacena el usuario en la posición "usuario"
    localStorage.setItem("password", inputPassword); // Almaceno la contraseña de la misma manera
  }
  sessionStorage.setItem("usuario", inputUsuario);
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

function validar() {
  let usuario = document.getElementById('usuario').value;
  let pass = document.getElementById('pass').value;
  var checkbox = document.getElementById('recuerda');
  if (usuario === "") {
    alert("Ingresar usuario");
  } else if (pass === "") {
    alert("Ingresar contraseña");
  } else {
    guardar(checkbox, usuario, pass);
    window.location.href = "home.html";
  }
}
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  document.getElementById("login").addEventListener("click",
    function (event) {
      validar();
    })
})



