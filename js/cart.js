let productosCarrito = [];
let moneda = "UYU";

/*completa la función para actualizar el subtotal del producto al modificar la cantidad del mismo*/
function updateProductoSubtotal(id) {
    let costo = convertir(productosCarrito[id].unitCost, productosCarrito[id].currency);
    let cantidad = document.getElementById(id).value;
    if (cantidad <= 0) {
        cantidad = 1;
        document.getElementById(id).value = 1;
    }
    document.getElementById("subtotal" + id).innerHTML = cantidad * costo;
    sumaSubtotales();
    modificarTotal();
    updateTotalCosts();
}

/*muestra los productos del carrito con el input correspondiente a la cantidad*/
function showCarrito() {
    let htmlToAppend = "";
    let id = 0;
    let costo = 0;
    for (let article of productosCarrito) {
        costo = convertir(article.unitCost, article.currency);

        htmlToAppend += `
        <tr>
        <th scope="row"> ${id+1}</th>
        <td><img src="${article.src}" class = "img-fluid" style ="max-width:50px!important"></td>
        <td class="align-middle">${article.name}</td>
        <td class="align-middle" id="unitCost${id}">${moneda} ${costo}</td>
        <td class="align-middle"><input class="form-control" id="${id}" onchange="updateProductoSubtotal(${id});" type="number" min ="1" value=${article.count}></td>
        <td class="align-middle" id="subtotal${id}">${article.count * costo}</td>
        </tr>`

        id++;
    }

    document.getElementById("carrito").innerHTML = htmlToAppend;
}

//Actualiza el valor de los costos según la moneda seleccionada
function cambiarMonedas() {
    let costoUnitario = 0;
    let cantidad = 0;
    for (let i = 0; i < productosCarrito.length; i++) {
        costoUnitario = convertir(productosCarrito[i].unitCost, productosCarrito[i].currency)
        cantidad = document.getElementById(i).value;
        if (cantidad <= 0) {
            cantidad = 1;
            document.getElementById(i).value = 1;
        }
        document.getElementById("subtotal" + i).innerHTML = cantidad * costoUnitario;
        document.getElementById("unitCost" + i).innerHTML = moneda + " " + costoUnitario;
    }
    sumaSubtotales();
}

//mostrar suma de subtotales
function sumaSubtotales() {
    let htmlToAppend = "";
    let subtotal = 0;
    for (let i = 0; i < productosCarrito.length; i++) {
        subtotal = subtotal + parseFloat(document.getElementById("subtotal" + i).textContent);
    }

    document.getElementById("subtotal").innerHTML = `Subtotal (${moneda})`;
    document.getElementById("sumaSubtotal").innerHTML = subtotal;
    updateTotalCosts();
}

//hace la conversion del costo segun la moneda elegida
function convertir(costo, currency) {
    if (moneda == 'UYU' && currency == 'USD') {
        costo = costo * 40;
    } else if (moneda == 'USD' && currency == 'UYU') {
        costo = costo / 40;
    }
    return costo;
}


function getCarrito(url) {
    return fetch(url)
        .then(respuesta => {
            return respuesta.json();
        })
}

//modifica el valor del costo total 
function modificarTotal() {
    document.getElementById("total").innerHTML = `Total (${moneda})`;
    document.getElementById("costoTotal").innerHTML = `<b>${parseFloat(document.getElementById("sumaSubtotal").innerHTML) +
        parseFloat(document.getElementById("costoEnvio").innerHTML)}</b>`;
}


document.addEventListener("DOMContentLoaded", function (e) {
    getCarrito("https://japdevdep.github.io/ecommerce-api/cart/654.json")
        .then(respuesta => {
            productosCarrito = respuesta.articles;

            //se inicializan los valores en la pagina, en pesos uruguayos
            moneda = 'UYU';
            document.getElementById("subMon").innerHTML = `Subtotal (${moneda})`;
            showCarrito();
            sumaSubtotales();
            modificarTotal();

            //se acciona elegir pesos uruguayos como moneda
            document.getElementById("uruguayos").addEventListener("click", function (e) {
                moneda = 'UYU';
                document.getElementById("subMon").innerHTML = `Subtotal (${moneda})`;
                cambiarMonedas();
                modificarTotal();
            });

            //se acciona elegir dólares como moneda
            document.getElementById("dolares").addEventListener("click", function (e) {
                moneda = 'USD';
                document.getElementById("subMon").innerHTML = `Subtotal (${moneda})`;
                cambiarMonedas();
                modificarTotal();
            });
            console.log(productosCarrito);
        })
})


function desplegarFormTarjeta(){
    document.getElementById("formTarjeta").style.display = 'block';
    document.getElementById("formTransferencia").style.display = 'none';

    document.getElementById("nroCuenta").disabled = true;

    document.getElementById("nroTarjeta").disabled = false;
    document.getElementById("titular").disabled = false;
    document.getElementById("cvv").disabled = false;
    document.getElementById("caducidad").disabled = false;
};

function desplegarFormTransferencia(){
    document.getElementById("formTarjeta").style.display = 'none';
    document.getElementById("formTransferencia").style.display = 'block';

    document.getElementById("nroTarjeta").disabled = true;
    document.getElementById("titular").disabled = true;
    document.getElementById("cvv").disabled = true;
    document.getElementById("caducidad").disabled = true;

    document.getElementById("nroCuenta").disabled = false;

};



comissionPercentage = 0;
document.getElementById("premium").addEventListener("change", function(){
    comissionPercentage = 0.15;
    updateTotalCosts();
});

document.getElementById("express").addEventListener("change", function(){
    comissionPercentage = 0.07;
    updateTotalCosts();
});

document.getElementById("standard").addEventListener("change", function(){
    comissionPercentage = 0.05;
    updateTotalCosts();
});

//Función que se utiliza para actualizar los costos de publicación
function updateTotalCosts(){
    let subtotal = parseFloat(document.getElementById("sumaSubtotal").innerHTML);
    
    let costoEnvio = subtotal * comissionPercentage;
    document.getElementById("costoEnvio").innerHTML = costoEnvio;

    let total =  subtotal +  costoEnvio;
    document.getElementById("costoTotal").innerHTML = total;
}


  // Example starter JavaScript for disabling form submissions if there are invalid fields
  (function() {
    'use strict';
    window.addEventListener('load', function() {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName('needs-validation');
      // Loop over them and prevent submission
      var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated');
        }, false);
      });
    }, false);
  })();


function validarCompra() {
    if (document.getElementById("tarjeta").checked) {
        let tarjeta = document.getElementById("nroTarjeta").value;
        let titular = document.getElementById("titular").value;
        let cvv = document.getElementById("cvv").value;
        let caducidad = document.getElementById("caducidad").value;

        if ((tarjeta != "") && (titular != "") && (caducidad != "") && (cvv != "")){
            return true
        } else {
            alert("Completar campos de tarjeta");
            return false;
        }
    } else if(document.getElementById("transferencia").checked) {
         let nrocuenta = document.getElementById("nroCuenta").value;
         if (nrocuenta != ""){
                return true
         } else {
            alert("Completar campos de transferencia");
            return false;   
         }
    } else if (!(document.getElementById("tarjeta").checked || document.getElementById("transferencia").checked)){
        alert("Seleccionar forma de pago");
        return false;
    }    
}

function habilitarCompra(){
     if (document.getElementById("tarjeta").checked) {
        let tarjeta = document.getElementById("nroTarjeta").value;
        let titular = document.getElementById("titular").value;
        let cvv = document.getElementById("cvv").value;
        let caducidad = document.getElementById("caducidad").value;

        if ((tarjeta != "") && (titular != "") && (caducidad != "") && (cvv != "")){
            /*jquery*/
           $("#exampleModal").modal('hide');
        }
    } else if(document.getElementById("transferencia").checked) {
         let nrocuenta = document.getElementById("nroCuenta").value;
         if (nrocuenta != ""){
            /*jquery*/
           $("#exampleModal").modal('hide');
         }
    }
    return false;
}