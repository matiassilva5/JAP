let productosCarrito=[];


let moneda = "UYU";

/*completa la función para actualizar el subtotal del producto al modificar la cantidad del mismo*/
function updateProductoSubtotal(id){
    let costo = convertir(productosCarrito[id-1].unitCost, productosCarrito[id-1].currency);
    let cantidad = document.getElementById(id).value;
    if (cantidad<=0){
    	cantidad = 1;
    	document.getElementById(id).value = 1;
    }
    document.getElementById("subtotal"+id).innerHTML = cantidad*costo;
    sumaSubtotales();
    modificarTotal();
}


/*modificar la función showCarrito para que aparezca el subtotal del producto en base a la cantidad y precio unitario*/
function showCarrito(){
    /*mostrar los productos del carrito con el input correspondiente a la cantidad*/
    let htmlToAppend = "";
    let id = 1;
    let costo = 0;
    for(let article of productosCarrito){
        costo = convertir(article.unitCost, article.currency);

        htmlToAppend += `
        <tr>
        <td><img src="${article.src}" class = "img-fluid" style ="max-width:50px!important"></td>
        <td class="align-middle">${article.name}</td>
        <td class="align-middle" id="unitCost${id}">${moneda} ${costo}</td>
        <td class="align-middle"><input id="${id}" onchange="updateProductoSubtotal(${id});" type="number" min ="1" value=${article.count}></td>
        <td class="align-middle" id="subtotal${id}">${article.count * costo}</td>
        </tr>`
        
        id++;         
    }

    document.getElementById("carrito").innerHTML = htmlToAppend;
}


function cambiarMonedas(){
    let costoUnitario = 0;
    let cantidad = 0;
    for(let i=1;i<=productosCarrito.length;i++){
        costoUnitario = convertir(productosCarrito[i-1].unitCost, productosCarrito[i-1].currency)
        cantidad = document.getElementById(i).value;
        if (cantidad<=0){
    		cantidad = 1;
    		document.getElementById(i).value = 1;
    	}
        document.getElementById("subtotal"+i).innerHTML = cantidad*costoUnitario;
        document.getElementById("unitCost"+i).innerHTML = moneda +" "+costoUnitario;
    }
    sumaSubtotales();
}

//mostrar suma de subtotales
function sumaSubtotales(){
    let htmlToAppend = "";
    let subtotal = 0;
    for(let i=1; i<=productosCarrito.length; i++){
        subtotal = subtotal + parseFloat(document.getElementById("subtotal"+i).textContent);
    }

    document.getElementById("sumaSubtotal").innerHTML = subtotal;
}

//hace la conversion del costo segun la moneda elegida
function convertir(costo, currency){
    if (moneda == 'UYU' && currency=='USD'){
        costo = costo*40;
    } else if (moneda == 'USD' && currency=='UYU'){
        costo = costo/40;
    }
    return costo;
}


function getCarrito(url){
    
    return fetch(url)
    .then(respuesta=>{
        return respuesta.json();
    })
}
    
//modifica el valor del costo total 
function modificarTotal(){
    document.getElementById("total").innerHTML = `Total (${moneda})`; 
    document.getElementById("costoTotal").innerHTML =`<b>${parseFloat(document.getElementById("sumaSubtotal").innerHTML)+
    parseFloat(document.getElementById("costoEnvio").innerHTML)}</b>`; 
}


document.addEventListener("DOMContentLoaded", function(e){
    getCarrito("https://japdevdep.github.io/ecommerce-api/cart/654.json")
    .then(respuesta=>{
        productosCarrito = respuesta.articles;

        //se inicializan los valores en la pagina, en pesos uruguayos
        moneda = 'UYU';
        document.getElementById("subMon").innerHTML = `Subtotal (${moneda})`;
        showCarrito();
        sumaSubtotales();
        modificarTotal();

        //se acciona elegir pesos uruguayos como moneda
        document.getElementById("uruguayos").addEventListener("click", function(e){
            moneda = 'UYU';
            document.getElementById("subMon").innerHTML = `Subtotal (${moneda})`;
            cambiarMonedas();
            modificarTotal();
        });

        //se acciona elegir dólares como moneda
        document.getElementById("dolares").addEventListener("click", function(e){
            moneda = 'USD';
            document.getElementById("subMon").innerHTML = `Subtotal (${moneda})`;
            cambiarMonedas();
            modificarTotal();
        });
        console.log(productosCarrito);
    })
})




