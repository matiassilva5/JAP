var product = {};

function showImagesGallery(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;

            let productNameHTML  = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCostHTML = document.getElementById("productCost");
            let soldCountHTML = document.getElementById("soldCount");
            let categoryHTML = document.getElementById("category");
            //let relatedProductsHTML = document.getElementById("relatedProducts");

        
            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productCostHTML.innerHTML = product.cost + ` ` + product.currency;
            soldCountHTML.innerHTML = product.soldCount;
            categoryHTML.innerHTML = product.category;

/*    "relatedProducts": [1, 3]
*/

            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
        }
    });




    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj2){
        if (resultObj2.status === "ok")
        {
            comentarios = resultObj2.data;
            insertarComentarios(comentarios);
        }
    });
});

/*En esta función vamos a agregar los comentarios al elemento html creado para contenerlos*/
function insertarComentarios(comentarios){

    let htmlContentToAppend = "";
    let coment; 
    for(let i = 0; i < comentarios.length; i++){
        coment = comentarios[i];
        agregarComentario(coment.user, coment.description, coment.score, coment.dateTime)
    }
}

/*Esta función sirve para crear un nuevo comentario*/
function comentar(){
    var coment = document.getElementById("newComent").value;
    var box = document.getElementById("lista-comentarios");
    var user = localStorage.getItem("usuario");
    var estrella1 = document.getElementById("radio5");
    var estrella2 = document.getElementById("radio4");
    var estrella3 = document.getElementById("radio3");
    var estrella4 = document.getElementById("radio2");
    var estrella5 = document.getElementById("radio1");
    var score = 0
    if(estrella5.checked)
        score = 5
    else if (estrella4.checked)
        score = 4
    else if (estrella3.checked)
        score = 3
    else if (estrella2.checked)
        score = 2
    else if (estrella1.checked)
        score = 1

    let date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    if(month < 10){
        month = `0${month}`;
    }
    if (day < 10){
        day = `0${day}`;
    }
    var hour = date.getHours();
    if (hour < 10){
        hour = `0${hour}`;
    }
    var minutes = date.getMinutes();
    if (minutes < 10){
        minutes = `0${minutes}`;
    }
    var seconds = date.getSeconds();
    if (seconds < 10){
        seconds = `0${seconds}`;
    }
    var dateTime = `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`; 

    agregarComentario(user, coment, score, dateTime);

    document.getElementById("newComent").value="";

    return false;
}

/*Esta función agrega un comentario a la lista*/
function agregarComentario(user, description, score, dateTime){
        var elem1 = "";
        var elem2 = "";
        var elem3 = "";
        var elem4 = "";
        var htmlContentToAppend = "";
        elem1 = `<li class="">
             <div class="row">
                <div class=" comment-box" >

               
             <!-- Contenedor del Comentario -->
                <div class="comment-head">
                    <div class="row">
                        <div class="col-md-6">
                            <h6 class="comment-name by-author">
                                <a href="http://creaticode.com/blog">${user}</a>
                            </h6>
                            <span id="time"> ${dateTime}</span>
                        </div>
                        <div class="col-md-6">
                        `

            for (let i=1; i<=5;i++){
                if (i<=score){
                    elem2 += `<span class="fa fa-star checked"></span>`
                } else {
                    elem3 += `<span class="fa fa-star"></span>`
                }
            }
            elem4 = `</div>
                   </div>
                  </div>
                    <div class="comment-content">
                       ${description}
                    </div>
                     </div>
             </div>
            </li>
        `
        htmlContentToAppend = elem1+elem2+elem3+elem4;

        document.getElementById("lista-comentarios").innerHTML += htmlContentToAppend;
}