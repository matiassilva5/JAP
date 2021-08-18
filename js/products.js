/*aquí se declaran e inicializan variables y constantes que se van a usar en el js */
const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
var currentProductsArray = [];
var currentSortCriteria = undefined;

/*esta función ordena los productos según el criterio indicado (ascendente o descendente)*/
function sortProducts(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME) {
        result = array.sort(function (a, b) {
            if (a.name < b.name) { return -1; }
            if (a.name > b.name) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_NAME) {
        result = array.sort(function (a, b) {
            if (a.name > b.name) { return -1; }
            if (a.name < b.name) { return 1; }
            return 0;
        });
    }

    return result;
}
/*esta función agrega los items de la lista de productos al container del html */
function showProductsList() {

    let htmlContentToAppend = "";
    for (let i = 0; i < currentProductsArray.length; i++) {
        let product = currentProductsArray[i];

        htmlContentToAppend += `
            <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1" id="nom-prod">`+ product.name + `</h4>
                            <small class="text-muted"> ` + product.soldCount + ` artículos vendidos</small>

                        </div>
                        <p class="mb-1">` + product.description + `</p>
                        <br><br>
                        <div id="precio-prod">`+ product.cost + ` ` + product.currency + `</div>
                    </div>
                </div>
            </a>
            `
        document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
    }
}

/*esta función ordena y muestra los productos utilizando las funciones definidas anteriormente */
function sortAndShowProducts(sortCriteria, productsArray) {
    currentSortCriteria = sortCriteria;

    if (productsArray != undefined) {
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);


    //Muestro los productos ordenados
    showProductsList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    //la primera vez que mostramos la lista de productos es en orden ascendente según el nombre
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            sortAndShowProducts(ORDER_ASC_BY_NAME, resultObj.data);
        }
    });

    //si escogemos ordenar de forma ascendente (A-Z) se llama a éste evento
    document.getElementById("sortAsc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_ASC_BY_NAME);
        /*llamamos a la función que ordena y muestra los items,
        pasandole por parámetro el criterio deseado*/
    });

    //si escogemos ordenar de forma descendente (Z-A) se llama a éste evento
    document.getElementById("sortDesc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_DESC_BY_NAME);
        /*llamamos a la función que ordena y muestra los items,
        pasandole por parámetro el criterio deseado*/
    });

});