//Mettre le code JavaScript lié à la page photographer.html


async function init() {
    // étape 1 récupérer l'id dans l'url
    const photographerId = getUrlId();
    // étape 2 Fetch le fichier jSon et return le photographe qui a l'ID en question
    const photographerData = await getPhotographer(photographerId);
    // étape 3 display le photographe
    displayPhotographerItems(photographerData);
    displayPhotographerMedias(photographerId);
}

function displayPhotographerItems(photographerData) {

    const photographer = photographerFactory(photographerData)
    console.log("model :", photographer)
    photographer.getPhotographerDOM("photographer-container");

}


// récupère l'id dans l'url

function getUrlId() {

    const searchParams = window.location.search;
    const UrlSearchParams = new URLSearchParams(searchParams);
    const photographerId = UrlSearchParams.get("id");

    return Number(photographerId);

}



init();

