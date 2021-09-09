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
            agregarComentarios(comentarios);
        }
    });
});

/*En esta funcion vamos a agregar los comentarios al elemento html creado para contenerlos*/
function agregarComentarios(comentarios){

    let htmlContentToAppend = "";
    let coment; 
    for(let i = 0; i < comentarios.length; i++){
        coment = comentarios[i];
        agregarComentario(coment.user, coment.description, coment.score, coment.dateTime)
    }
}


function comentar(){
    var coment = document.getElementById("newComent").value;
    var box = document.getElementById("lista-comentarios");
    var user = localStorage.getItem("usuario");
    var score = document.getElementById("rating").value;

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
    document.getElementById("rating").value="Puntaje";

    return false;
}

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

        elem2 = "";
        for (let i=1; i<=score;i++){
            elem2 += `<span class="fa fa-star checked"></span>`
        }

        elem3 = "";
        for (let i=1; i<=5-score;i++){
            elem3 += `<span class="fa fa-star"></span>`
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