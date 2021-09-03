//Se guarda en el localStorage los datos ingresados por el usuario en el login
function confirmar() {
  let usuario = document.getElementById("usuario").value;
  let pass = document.getElementById("pass").value;
  if (usuario === "") {
    alert("Ingresar usuario");
    return false;
  } else if (pass === "") {
    alert("Ingresar contraseña");
    return false;
  } else {
    localStorage.setItem("usuario", usuario); //setItem almacena el usuario en la posición "usuario"
    localStorage.setItem("password", pass); // Almaceno la contraseña de la misma manera
    return true;
  }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
  if (localStorage.getItem("usuario")!==null){
      alert("Bienvenido otra vez! Ya estas logueado!");
      location.href = "home.html";
  }
});



