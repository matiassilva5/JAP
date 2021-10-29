var category = {};

function showImagesGallery(array) {
    /*
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
        */

    let htmlContentToAppend = "";
    htmlContentToAppend = `<div class="carousel-item active">
                        <img class="d-block w-100" src="${array[0]}" alt="">
                        </div>`
    let indicators = `<li data-target="#carouselExampleIndicatorsCat" data-slide-to="0"
                    class="active"></li>`;

    for (let i = 1; i < array.length; i++) {
        let imageSrc = array[i];
        htmlContentToAppend += `<div class="carousel-item">
                        <img class="d-block w-100" src="${array[i]}" alt="">
                        </div>`
        indicators += `<li data-target="#carouselExampleIndicatorsCat" data-slide-to="${i}"></li>`;
    }

    document.getElementById("indicatorsCat").innerHTML = indicators;
    document.getElementById("carouselCat").innerHTML = htmlContentToAppend;
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CATEGORY_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            category = resultObj.data;

            let categoryNameHTML = document.getElementById("categoryName");
            let categoryDescriptionHTML = document.getElementById("categoryDescription");
            let productCountHTML = document.getElementById("productCount");
            let productCriteriaHTML = document.getElementById("productCriteria");

            categoryNameHTML.innerHTML = category.name;
            categoryDescriptionHTML.innerHTML = category.description;
            productCountHTML.innerHTML = category.productCount;
            productCriteriaHTML.innerHTML = category.productCriteria;

            //Muestro las imagenes en forma de galería
            showImagesGallery(category.images);

        }
    });
});