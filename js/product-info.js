var product = {};

function showImagesGallery(array) {
    let htmlContentToAppend = "";
    htmlContentToAppend = `<div class="carousel-item active">
                        <img class="d-block w-100" src="${array[0]}" alt="">
                        </div>`
    let indicators = `<li data-target="#carouselExampleIndicators" data-slide-to="0"
                    class="active"></li>`;

    for(let i=1; i<array.length;i++){
        let imageSrc = array[i];
        htmlContentToAppend += `<div class="carousel-item">
                        <img class="d-block w-100" src="${array[i]}" alt="">
                        </div>`
        indicators += `<li data-target="#carouselExampleIndicators" data-slide-to="${i}"></li>`;
    }

    document.getElementById("indicators").innerHTML = indicators;
    document.getElementById("carousel").innerHTML = htmlContentToAppend;
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    //INFORMACIÓN DEL PRODUCTO
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            product = resultObj.data;

            let productNameHTML = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCostHTML = document.getElementById("productCost");
            let soldCountHTML = document.getElementById("soldCount");
            let categoryHTML = document.getElementById("category");


            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productCostHTML.innerHTML = product.cost + ` ` + product.currency;
            soldCountHTML.innerHTML = product.soldCount;
            categoryHTML.innerHTML = product.category;

            getJSONData(PRODUCTS_URL).then(function (resultObj2) {
                if (resultObj2.status === "ok") {
                    products = resultObj2.data;
                    related = product.relatedProducts;
                    agregarProductosRelacionados(products, related)
                
                }
            });

            //Muestro las imagenes
            showImagesGallery(product.images);
        }
    });

    //LISTA DE COMENTARIOS
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj2) {
        if (resultObj2.status === "ok") {
            comentarios = resultObj2.data;
            insertarComentarios(comentarios);
        }
    });
});

function agregarProductosRelacionados(products, related){
    let htmlContentToAppend = "";

    for (let i = 0; i < related.length; i++) {
        let prodRel = products[related[i]];
        htmlContentToAppend += `
        <div class="card" style="width:40%; display:inline-block">
            <img class="card-img-top" src="${prodRel.imgSrc}" alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title">${prodRel.name}</h5>
              <p class="card-text">${prodRel.description}</p>
              <a href="#" class="btn btn-primary">Ver</a>
            </div>
        </div>`
        document.getElementById("relatedProducts").innerHTML = htmlContentToAppend;
    }
}

/*En esta función vamos a agregar todos los comentarios al elemento html creado para contenerlos*/
function insertarComentarios(comentarios) {

    let htmlContentToAppend = "";
    let coment;
    //en este for agrego los comentarios sacados del json
    for (let i = 0; i < comentarios.length; i++) {
        coment = comentarios[i];
        agregarComentario(coment.user, coment.description, coment.score, coment.dateTime)
    }

    if (localStorage.getItem("comentarios") != null) {//si existen comentarios nuevos (que no son del json)
        var comentariosNuevos = JSON.parse(localStorage.getItem("comentarios"));//los convierto en un elemento js
        //en este for agrego los comentarios nuevos que no son del json
        for (let i = 0; i < comentariosNuevos.length; i++) {
            coment = comentariosNuevos[i];
            agregarComentario(coment.user, coment.description, coment.score, coment.dateTime)
        }
    }
}

/*Esta función agrega un comentario a la lista del html*/
function agregarComentario(user, description, score, dateTime) {    
    var htmlContentToAppend = "";

    htmlContentToAppend = `<li class="">
                                <div class="row">
                                    <div class=" comment-box" >
                                        <div class="comment-head">
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <h6 class="comment-name by-author">
                                                        <a href="#">${user}</a>
                                                    </h6>
                                                    <span id="time"> ${dateTime}</span>
                                                </div>
                                                <div class="col-md-6">${drawStars(score)}</div>
                                            </div>
                                        </div>
                                        <div class="comment-content">${description}</div>
                                    </div>
                                </div>
                            </li>`;

    document.getElementById("lista-comentarios").innerHTML += htmlContentToAppend;
}

function drawStars(score){
    var checked = "";
    var unChecked = "";
    for (let i = 1; i <= 5; i++) {
        if (i <= score) {
            checked += `<span class="fa fa-star checked"></span>`
        } else {
            unChecked += `<span class="fa fa-star"></span>`
        }
    }
    return (checked+unChecked);
}

/*Esta función se activa cuando se quiere crear un nuevo comentario*/
function comentar() {
    var coment = document.getElementById("newComent").value;
    var user = localStorage.getItem("usuario");
    var score = obtenerScore();
    var dateTime = obtenerFechaActual();

    //se agrega el comentario a la lista en el html
    agregarComentario(user, coment, score, dateTime);


    //se guarda el comentario nuevo en el local storage
    var nuevo = [{
        "score": score,
        "description": coment,
        "user": user,
        "dateTime": dateTime
    }]
    guardarComentario(nuevo);
    document.getElementById("newComent").value = ""; /*vacío el textarea*/
}

function obtenerScore() {
    var estrella1 = document.getElementById("radio5");
    var estrella2 = document.getElementById("radio4");
    var estrella3 = document.getElementById("radio3");
    var estrella4 = document.getElementById("radio2");
    var estrella5 = document.getElementById("radio1");
    var score = 0
    if (estrella5.checked)
        score = 5
    else if (estrella4.checked)
        score = 4
    else if (estrella3.checked)
        score = 3
    else if (estrella2.checked)
        score = 2
    else if (estrella1.checked)
        score = 1

    return score;
}

function obtenerFechaActual() {
    let date = new Date();
    let day = date.getDate().toString().padStart(2, '0');
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let year = date.getFullYear().toString().padStart(2, '0');
    var hour = date.getHours().toString().padStart(2, '0');
    var minutes = date.getMinutes().toString().padStart(2, '0');
    var seconds = date.getSeconds().toString().padStart(2, '0');
    //se le da el formato deseado
    var dateTime = `${year}-${month}-${day} ${hour}:${minutes}:${seconds} `;

    return dateTime;
}
/* 
"persistencia" para comentarios nuevos. 
Existen hasta que se cierra sesión y se limpia el localstorage
*/
function guardarComentario(nuevo) {
    var array = [];//inicializo el arreglo

    if (localStorage.getItem("comentarios") != null) //si ya existen comentarios
        array = JSON.parse(localStorage.getItem("comentarios"));//paso de json a objeto js

    array = array.concat(nuevo);
    localStorage.setItem("comentarios", JSON.stringify(array))//inserto el comentario en formato json
}


