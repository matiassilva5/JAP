/*aquí se declaran e inicializan variables y constantes que se van a usar en el js */
const ORDER_ASC_BY_COST = "asc$";
const ORDER_DESC_BY_COST = "desc$";
const ORDER_BY_REL = "Rel.";
var currentProductsArray = [];
var currentSortCriteria = undefined;
var minCost = undefined;
var maxCost = undefined;

/*esta función ordena los productos según el criterio indicado (ascendente o descendente)*/
function sortProducts(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_COST) {
        result = array.sort(function (a, b) {
            let aCount = parseInt(a.cost);
            let bCount = parseInt(b.cost);
            
            if (aCount < bCount) { return -1; }
            if (aCount > bCount) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_COST) {
        result = array.sort(function (a, b) {
            let aCount = parseInt(a.cost);
            let bCount = parseInt(b.cost);

            if (aCount > bCount) { return -1; }
            if (aCount < bCount) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_REL) {
        result = array.sort(function (a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if (aCount > bCount) { return -1; }
            if (aCount < bCount) { return 1; }
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

        if (((minCost == undefined) || (minCost != undefined && parseInt(product.cost) >= minCost)) &&
            ((maxCost == undefined) || (maxCost != undefined && parseInt(product.cost) <= maxCost))) {

            htmlContentToAppend += `
              <div class="col-md-4 text-center">
                <a href="product-info.html" class="card mb-4 shadow-sm custom-card">
                  <img class="bd-placeholder-img card-img-top" src="${product.imgSrc}">
                  <h3 class="m-3" id="nom-prod">${product.name}</h3>
                  <div class="card-body">
                    <p class="card-text">${product.description}</p>
                    <div id="precio-prod"> ${product.cost}  ${product.currency}</div>
                    <small class="m-3 text-muted"> ${product.soldCount} artículos vendidos</small>
                  </div>
                </a>
              </div>
            `


            /*htmlContentToAppend += `
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
            `*/
        }
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
            sortAndShowProducts(ORDER_ASC_BY_COST, resultObj.data);
        }
    });

    //si escogemos ordenar de forma ascendente (A-Z) se llama a éste evento
    document.getElementById("sortAsc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_ASC_BY_COST);
        /*llamamos a la función que ordena y muestra los items,
        pasandole por parámetro el criterio deseado*/
    });

    //si escogemos ordenar de forma descendente (Z-A) se llama a éste evento
    document.getElementById("sortDesc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_DESC_BY_COST);
        /*llamamos a la función que ordena y muestra los items,
        pasandole por parámetro el criterio deseado*/
    });
    /*arreglar segun criterio de relevancia*/
    document.getElementById("sortByRel").addEventListener("click", function () {
        sortAndShowProducts(ORDER_BY_REL);
    });


    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        document.getElementById("rangeFilterCostMin").value = "";
        document.getElementById("rangeFilterCostMax").value = "";

        minCost = undefined;
        maxCost = undefined;

        showProductsList();
    });

    document.getElementById("rangeFilterCost").addEventListener("click", function () {
        //Obtengo el mínimo y máximo de los intervalos para filtrar por precio de los productos
        minCost = document.getElementById("rangeFilterCostMin").value;
        maxCost = document.getElementById("rangeFilterCostMax").value;

        if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0) {
            minCost = parseInt(minCost);
        }
        else {
            minCost = undefined;
        }

        if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0) {
            maxCost = parseInt(maxCost);
        }
        else {
            maxCost = undefined;
        }

        showProductsList();
    });


});